/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { default as ReactTable } from "react-table"
import Select from 'react-select'
import FileSaver from 'file-saver'
import PropTypes from 'prop-types'
import Moment from 'moment'
import {default as $} from 'jquery'
import TwoLevelPieChart from './InteractivePie'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, ResponsiveContainer, Tooltip, Legend as LegendR} from 'recharts'
import { createContainer, VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryGroup, VictoryLegend, VictoryLine, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from "victory"
import { TimeSeries, TimeRange, sum } from "pondjs"
import _ from 'lodash'
import update from "immutability-helper/index";
import XLSX from 'xlsx'
import NestedDataWindow from '../components/NestedDataWindow'

var createReactClass = require('create-react-class');

const re = new RegExp('\\s+');
const numberRe = new RegExp(/[0-9]/i);

function ssortFrequenciesOfReportedSign(a, b, desc){
    a = a.toString();
    b = b.toString();
    var a1 = parseInt(a.split(",")[0]);
    var b1 = parseInt(b.split(",")[0]);

    if(a1 - b1 === 0 && (a.split(",")[1] || b.split(","))[1]){
        if(a.split(",")[1] && !b.split(",")[1]){
            return 1
        } else if(!a.split(",")[1] && b.split(",")[1]){
            return -1
        }
        return sortFrequenciesOfReportedSign(a.slice(a.indexOf(",") +1), b.slice(a.indexOf(",") +1),desc)
    } else return (a1 - b1)
}

function getNestedValue(rowObj, path) {
    var props = path.split('.');
    props.forEach(function(prop){
        if (rowObj) {
            rowObj = rowObj[prop];
        }
    })
    return rowObj;
}

/* generate a download */
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

function flattenJSON(data) {

    var flattenedJSON = []

    for (var i =  0; i < data.length; i ++) {
        var newRow = {}
        for (var item in data[i]){
            if (typeof data[i][item] === "object") {
                if (data[i][item] && data[i][item].constructor === Array) {
                    newRow[item] = data[i][item].join("; ")
                } else if (data[i][item]) {
                    newRow[item] = flattenJSON(data[i][item])
                }
            } else {
                newRow[item] = data[i][item]
            }
        }

        flattenedJSON.push(newRow)
    }

    return flattenedJSON

}


let checkAllColumnsOption = { Header: "Select All Columns", className: PropTypes.string , show: false}
let resetColumnsOption = { Header: "Reset Column Selection", style: {fontSize: 16, fontWeight: 20}, show: false}



const GravatarOption = createReactClass({
    propTypes: {
        children: PropTypes.node,
        className: PropTypes.string,
        isDisabled: PropTypes.bool,
        isFocused: PropTypes.bool,
        isSelected: PropTypes.bool,
        onFocus: PropTypes.func,
        onSelect: PropTypes.func,
        option: PropTypes.object.isRequired,
    },
    handleMouseDown (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    },
    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event);
    },
    handleMouseMove (event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    },
    handleCheckChange() {},
    render () {
        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 title={this.props.option.title}>
                <input type='checkbox' checked={this.props.option.show} onChange={this.handleCheckChange}/>
                {"  "}{ this.props.option['Header'] }
            </div>
        );
    }
});



class ResultsComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            data: [],
            columns: [],
            placeholder: "Selected Columns",
            pivotBy: [],
            sorted: [],
            pageSize: 25,
            expanded: {},
            expandedRows: {},
            resized: [],
            filtered: []
        }
        this.onColumnToggle = this.onColumnToggle.bind(this)
        this.toTitleCase = this.toTitleCase.bind(this)
        this.getFormattedColumns = this.getFormattedColumns.bind(this)
        this.updateNestedData = this.updateNestedData.bind(this)
        this.convertToStartCase = this.convertToStartCase.bind(this)
        this.collapseAll = this.collapseAll.bind(this)
        this.findChildColumnId = this.findChildColumnId.bind(this)
        this.exportToCSV = this.exportToCSV.bind(this)
        this.exportToXLS = this.exportToXLS.bind(this)
        this.getOptions = this.getOptions.bind(this)
        this.generateCheckAllColumnsJSON = this.generateCheckAllColumnsJSON.bind(this)

    }

    componentDidMount(): void {
        let thead = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-thead")[0];
        let tbody = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-tbody")[0];

        tbody.addEventListener("scroll", () => {
            thead.scrollLeft = tbody.scrollLeft;
        });
    }

    componentDidUpdate(): void {
        let thead = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-thead")[0];
        let tbody = ReactDOM.findDOMNode(this.dataTableElement).getElementsByClassName("rt-tbody")[0];

        if (tbody.scrollHeight > tbody.clientHeight) {
            thead.classList.add("vertical-scrollbar-present");
        }
        else {
            thead.classList.remove("vertical-scrollbar-present");
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.view){
            const columnsData = this.getFormattedColumns(this.props.view.label === nextProps.view.label && this.state.columns.length > 0 ?
                this.state.columns:nextProps.view.columns)
            const pivotBy = nextProps.view.pivotBy

            if(pivotBy && pivotBy.length) {
                columnsData.columns.map(value => {
                    if (value.unique_count) {
                        value.aggregate = (vals => {
                            let unique_list = Array.from(new Set(vals)).filter(vals => [null, undefined, 'null'].indexOf(vals) === -1)
                            return (unique_list.join(';;'))
                        }),
                            value.Aggregated = (row => {
                                let row_array = row.value.split(';;')
                                let unique_list = Array.from(new Set(row_array)).filter(row_array => [null, undefined, 'null'].indexOf(row_array) === -1)
                                let count_name = value.count_name
                                if (unique_list.length > 1){
                                    count_name = value.count_name + 's'
                                }

                                return (<span>{unique_list.length + ' ' + count_name}</span>)
                            })
                    } else if (value.sum) {
                        value.aggregate = (vals => {
                            return (_.sum(vals))
                        }),
                            value.Aggregated = (row => {
                                return (<span>{row.value + ' ' + value.count_name}</span>)
                            })
                    } else if (pivotBy.indexOf(value.accessor) > -1) {
                        value.aggregate = (vals => {
                            return [...new Set(vals)]
                        }),
                            value.Aggregated = (row => {
                                return (<span>{row.value}</span>)
                            })
                    }
                })
            }

            this.setState({
                columns: columnsData.columns,
                pivotBy: (pivotBy || []),
                placeholder: `Selected Columns ${columnsData.shownColumnsCount} (out of ${columnsData.columns.length})`
            })
        }
    }

    collapseAll() {
        this.setState({
            expanded: {}
        })
    }

    toTitleCase(str) {
        if(!str){
            return str
        } else if (typeof(str) === "object" && str.constructor === Array) {
            str = str.join()
        } else if (typeof(str) === "object") {
            str = str[0]
        } else if (typeof(str) === "number") {
            str += String("")
        }

        return str
    }

    convertToStartCase(str) {
        return str.toLowerCase().split(re).map(function (x) {
            if (x && x.length > 0){
                return (x[0].toUpperCase() + x.slice(1))
            } else return x
        }).join(' ')
    }

    findChildColumnId(columns, selectionObj) {
        for (var i=0; i < columns.length; i ++)
            if (columns[i].Header === selectionObj.childColumn) {
                return i
            }
    }

    generateCheckAllColumnsJSON(columns) {

        var checkAllJson = {}
        for (var i=0; i < columns.length; i ++) {
            checkAllJson[i] = {show:{$set: true}}
        }

        return checkAllJson
    }

    generateResetColumnsJSON(columns) {

        var resetColumnsJson = {}
        for (var i=0; i < columns.length; i ++) {
            resetColumnsJson[i] = {show:{$set: columns[i].showDefault}}
        }

        return resetColumnsJson
    }

    getOptions() {
        var options = this.state.columns.filter(column => !column.hideInManageColumns)
        options.splice(0, 0, checkAllColumnsOption, resetColumnsOption)

        return options
    }


    onColumnToggle(selectionObj){

        if (selectionObj.Header === "Select All Columns"){
            this.setState({
                columns: update(this.state.columns, this.generateCheckAllColumnsJSON(this.state.columns)),
                placeholder: `Selected Columns ${this.state.columns.length} (out of ${this.state.columns.length})`
            })
        } else if (selectionObj.Header === "Reset Column Selection"){
            this.setState({
                columns: update(this.state.columns, this.generateResetColumnsJSON(this.state.columns)),
                placeholder: `Selected Columns ${this.state.columns.filter(c => c.showDefault).length} (out of ${this.state.columns.length})`
            })
        }  else if (selectionObj.childColumn){
            if (selectionObj.show === true) {
                this.setState({
                    columns: update(this.state.columns, {[selectionObj.idx]: {show: {$set: false}}, [this.findChildColumnId(this.state.columns, selectionObj)]: {show: {$set: false}}}),
                    placeholder: `Selected Columns ${this.state.columns.filter(c => c.show).length - 2} (out of ${this.state.columns.length})`
                })
            } else {
                this.setState({
                    columns: update(this.state.columns, {[selectionObj.idx]: {show: {$set: true}}, [this.findChildColumnId(this.state.columns, selectionObj)]: {show: {$set: true}}}),
                    placeholder: `Selected Columns ${this.state.columns.filter(c => c.show).length + 2} (out of ${this.state.columns.length})`
                })
            }
        } else {
            if (selectionObj.show === true) {
                this.setState({
                    columns: update(this.state.columns, {[selectionObj.idx]: {show: {$set: false}}}),
                    placeholder: `Selected Columns ${this.state.columns.filter(c => c.show).length - 1} (out of ${this.state.columns.length})`
                })
            } else {
                this.setState({
                    columns: update(this.state.columns, {[selectionObj.idx]: {show: {$set: true}}}),
                    placeholder: `Selected Columns ${this.state.columns.filter(c => c.show).length + 1} (out of ${this.state.columns.length})`
                })
            }
        }

        resetColumnsOption.show = (selectionObj.Header === "Reset Column Selection")
        checkAllColumnsOption.show = (selectionObj.Header === "Select All Columns")
    }

    exportToXLS() {
        try {

            /* export only visible columns */
            var visibleColumns = []
            this.state.columns.forEach(function(column) {
                if (column.show) {
                    visibleColumns.push(column.accessor)
                }
            })

            var exportableRows = []
            this.props.rows.forEach(function(row) {
                var truncatedRow = {}
                var rowData = ""
                visibleColumns.forEach(function(visibleColumn) {
                    var columnValue = getNestedValue(row, visibleColumn)
                    truncatedRow[visibleColumn] = columnValue
                    rowData += columnValue ? columnValue : ""
                })
                if(rowData) {
                    exportableRows.push(truncatedRow)
                }
            })

            /* make the worksheet */
            var ws = XLSX.utils.json_to_sheet(flattenJSON(exportableRows));

            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "data");

            /* write workbook (use type 'binary') */
            var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

            FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), this.props.dataset.label + ".xlsx");
        } catch (err) {
            console.error(err);
        }
    }

    exportToCSV(){
        /*try {
            let csv = ''
            jsonexport(this.props.rows, function(err, export_csv){
                if(err) return console.log(err);
                csv = export_csv
            });
            var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, this.props.dataset.label + ".csv");
        } catch (err) {
            console.error(err);
        }*/
    }

    updateNestedData (options) {
        options.value.forEach(eachValue => {
            options.column.nested_properties.forEach(eachColumn => {
                if(eachColumn.buildData) {
                    let updatedData = "";
                    eachColumn.sub_properties.forEach(eachProperty => {
                        if(eachProperty.indexOf('numerator') > 0) {
                            if(eachValue[eachProperty]["unit"] == "1") {
                                updatedData += eachValue[eachProperty]["value"] + " in "
                            }else {
                                updatedData += eachValue[eachProperty]["value"] + " " + eachValue[eachProperty]["unit"]+" in "
                            }
                        }else if(eachProperty.indexOf('denominator') > 0) {
                            updatedData += eachValue[eachProperty]["value"]
                            if(eachValue[eachProperty]["unit"] && eachValue[eachProperty]["unit"] !== "1") {
                                updatedData += " " + eachValue[eachProperty]["unit"]
                            }
                        }else {
                            if(eachValue[eachColumn.accessor]) {
                                updatedData += (updatedData ? " ": "") +
                                    eachValue[eachColumn.accessor][eachProperty]
                            }
                        }
                    })
                    eachValue[eachColumn["accessor"]] = updatedData
                }
            })
        })
    }

    getFormattedColumns(columns){
        columns.forEach(function(column){
            if(column.sortType === "commaSeparatedNumbers"){
                column.sortMethod = (a, b, desc) => {
                    return sortFrequenciesOfReportedSign(a,b,desc)
                };
            }
        });
        const shownColumnsCount = columns.filter(c => c.show).length
        columns = columns.map((d,idx) => {
            d.idx = idx
            d.Cell = (options) => {
                let value = options.value
                let html = null
                if(options.column.array && value) {
                   //update data to match table definations
                    let updateData = options.column.nested_properties.find(column => column.buildData)
                    if(updateData) {
                        this.updateNestedData(options)
                    }

                    html = (
                        <NestedDataWindow
                            header={options.column.Header}
                            data={options.value}
                            column_def={options.column.nested_properties}
                            data_text={`Expand ( ${options.value.length} ) `}
                            getFormattedColumns={this.getFormattedColumns}
                        />
                    )
                } else {
                    value = this.toTitleCase(options.value)
                }
                if(options.column.filter_values && value){
                    options.column.filter_values.forEach(filter_value => {
                        value = value.replace(filter_value, "")
                    })
                    value = value.trim().replace(':', '').replace(new RegExp("^s ", "i"), "")
                }

                if(options.column.getPreNumbersPart && value){
                    value=value.split(numberRe)[0]
                }

                if(options.column.split && value){
                    var split = value.split(',').length > 1 ? value.split(',') : value.split('•')
                    if(split.length > 1){
                        html = (
                            <ol style={{
                                height:150,
                                overflowY: "scroll"
                            }}>
                                {
                                    split.filter(v => (v !== null && v.length !== 0 && v !== " ")).map((v,idx) =>
                                        <li
                                            key={`key-${idx}`}
                                            style={{
                                                whiteSpace: "initial"
                                            }}
                                        >
                                            • {v && options.column.startCase? this.convertToStartCase(v.trim()):v.trim()}
                                        </li>
                                    )
                                }
                            </ol>
                        )
                    }
                }

                if (options.column.type === "date") {
                    value = Moment(value).format('MM/DD/YYYY')
                }

                if (options.column.link && value) {
                    html = (
                      <a href={value} target="_blank">{value}</a>
                    )
                }

                if (html === null) {
                    html = (
                        <span
                            style={{
                                whiteSpace: "initial"
                            }}
                        >
              { value && options.column.startCase? this.convertToStartCase(value):value  }
            </span>
                    )
                }

                return (
                    html
                )
            }
            return d
        })
        return {
            columns: columns,
            shownColumnsCount: shownColumnsCount
        }
    }

    render (): ?React.Element {
        const showCollapseRows = this.props.view.show_collapse_rows_button
        const hideManageColumns = this.props.view.hide_manage_columns

        if(this.props.rows === undefined){
            return (<span/>)
        }

        let data = this.props.rows
        let searchColumns = this.state.columns.filter(column => {return column.show})
        let searchText = this.state.search

        if (searchText) {
            var regex = new RegExp( searchText, "i")
            data = data.filter(row => {
                for (let i = 0; i < searchColumns.length; i++) {
                    if (regex.test(String(getNestedValue(row, searchColumns[i].accessor)))) {
                        return true
                    }
                }
                return false
            })
        }



        return (
            <div className={this.props.hideContent ? 'blur': ''}>
                <div className='dataset-table-menubar'>
                    <div>
                        {!hideManageColumns &&
                        <Select
                            name="toggle"
                            optionComponent={GravatarOption}
                            menuStyle={{
                                maxHeight: 130
                            }}
                            style={{
                                width: 300
                            }}
                            options={this.getOptions()}
                            onChange={this.onColumnToggle}
                            resetValue="Header"
                            removeSelected={false}
                            searchable={false}
                            clearable={false}
                            closeOnSelect={false}
                            placeholder={this.state.placeholder}
                        />
                        }
                    </div>
                    {showCollapseRows &&
                    <div>
                        <button className='collapse-rows' onClick={this.collapseAll}>Collapse Rows</button>
                    </div>
                    }

                    <div style={{width: "67%"}}>
                        <input className='search-input' value={this.state.search} onChange={e => this.setState({search: e.target.value})}
                               placeholder="Type to Search in Results..." type="search" autoFocus/>

                        <a href='javascript:void(0)' onClick={this.exportToXLS} style={{ position: "absolute", right:30, lineHeight: 2.5, display: "inline"}} >
                            <img alt='Export to XLS' style={{float: "left", width: 31, padding: 5}}
                                 src='/img/xls-icon.svg'/>Export to XLS
                        </a>

                        {/*<a href='javascript:void(0)' onClick={this.exportToCSV} style={{ position: "absolute", right:160, lineHeight: 2.5, display: "inline"}} >
                    <img alt='Export to CSV' style={{float: "left", width: 31, padding: 5}}
                         src='/img/csv-icon.svg'/>Export to CSV
                </a>*/}

                    </div>

                </div>

                <ReactTable
                    expanded={this.state.expanded}
                    data={data}
                    pageSize={this.state.pageSize}
                    columns={this.state.columns}
                    pivotBy={this.state.pivotBy}
                    showPageSizeOptions={true}
                    pageSizeOptions={[10, 25, 50, 100, 200, 250, 500, 1000]}
                    showPagination={true}
                    showPaginationTop={true}
                    resized={this.state.resized}
                    onSortedChange={sorted => this.setState({ sorted })}
                    onPageChange={page => this.setState({ page })}
                    onPageSizeChange={(pageSize, page) =>
                        this.setState({ page, pageSize })}
                    onExpandedChange={expanded => this.setState({ expanded })}
                    onResizedChange={resized => this.setState({ resized })}
                    onFilteredChange={filtered => this.setState({ filtered })}
                    filtered={this.state.filtered}
                    minRows={10}
                    filterable={false}
                    style={{
                        height: 800,
                        width: "100%"
                    }}
                    className="-striped -highlight"
                    ref={(element) => { this.dataTableElement = element; }}
                    SubComponent={this.props.dataset.showFormView && (row => {
                        // a SubComponent for the "form view."
                        const columns = [
                            {
                                Header: "Property",
                                accessor: "property",
                                width: 200,
                                Cell: ci => {
                                    return `${ci.value}:`;
                                },
                                style: {
                                    backgroundColor: "#DDD",
                                    textAlign: "right",
                                    fontWeight: "bold"
                                }
                            },
                            { Header: "Value", accessor: "value" }
                        ];
                        const rowData = Object.keys(row.original).map(key => {
                            return {
                                property: key,
                                value: row.original[key] != null ? row.original[key].toString(): ''
                            };
                        });
                        return (
                            <div style={{ padding: "10px" }}>
                                <ReactTable
                                    data={rowData}
                                    columns={columns}
                                    pageSize={rowData.length}
                                    showPagination={false}
                                />
                            </div>
                        );
                    })}
                />
            </div>
        )
    }
}

const CustomizedAxisTick = createReactClass({
    render () {
        const {x, y, stroke, payload} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} fontSize={10} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
    }
});

const CustomTooltip  = createReactClass({

    render() {

        if (this.props.active && this.props.payload) {
            return (
                <div className="custom-tooltip">
                    <h5 className="label">{this.props.label}</h5>
                    <p className="intro">{`${this.props.yLabel} : ${this.props.payload[0].value}`}</p>
                    {
                        this.props.detail &&
                        <p className="intro">{`${this.props.detail} : ${this.props.payload[1].value}`}</p>
                    }
                </div>
            );
        }

        return null;
    }
});

class BarChartComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
        }
    }

    componentDidMount () {
    }

    render (): ?React.Element {
        // if(this.refs.bar && this.refs.bar.container.childNodes.length){
        //   const viewBox = this.props.parent.state.infographicsConfig.barChart.viewBox
        //   this.refs.bar.container.childNodes[0].viewBox.baseVal.x = viewBox.x
        //   this.refs.bar.container.childNodes[0].viewBox.baseVal.y = viewBox.y
        //   this.refs.bar.container.childNodes[0].viewBox.baseVal.width = viewBox.width
        //   this.refs.bar.container.childNodes[0].viewBox.baseVal.height = viewBox.height

        // }
        let alpha = false

        if (this.props.data) {
            this.props.data.forEach(function (value) {
                if (value.name.length > 25) {
                    alpha = true
                }
            })
        }


        return (
            <div className='dataset-bar-chart'>
                <ResponsiveContainer className='chart-background bar-chart-background' width={this.props.barWidth} height={this.props.barHeight}>
                    <BarChart
                        ref="bar"
                        data={this.props.data}
                        {...this.props.chartConfig.barChart}
                    >
                        <XAxis dataKey={alpha ? "alpha" : "name"} interval={0} tick={<CustomizedAxisTick/>}/>
                        <YAxisR label={{ value: this.props.yLabel, angle: -90, position: 'insideLeft' }}/>
                        <CartesianGrid strokeDasharray="8 8"/>
                        <Tooltip content={<CustomTooltip detail={this.props.detail} yLabel={this.props.xAxis}/>}/>
                        <LegendR height={36} verticalAlign='top'/>
                        {
                            this.props.xAxis &&
                            <Bar
                                dataKey={this.props.xAxis}
                                fill="#8884d8"
                                barCategoryGap={"50%"}
                                barGap={"50%"}
                            />
                        }
                        {
                            this.props.detail &&
                            <Bar
                                dataKey={this.props.detail}
                                fill="#82ca9d"
                                barCategoryGap={"50%"}
                                barGap={"50%"}
                            />
                        }
                    </BarChart>
                </ResponsiveContainer>
                {
                    alpha &&
                    <ReactTable
                        data={this.props.data}
                        columns={[
                            {
                                Header: "Column",
                                accessor: "alpha",
                                width: 55
                            },
                            {
                                Header: this.props.dataElement,
                                accessor: "name"
                            }
                        ]}
                        showPagination={false}
                        defaultPageSize={-1}
                        className="-striped -highlight"
                        style={{
                            width: '90%',
                            height: '600px',
                            position: 'relative'
                        }}
                    />
                }
            </div>
        )
    }
}

class LineLegend extends React.Component {
    constructor (props: Object) {
        super(props)

        this.state = {

        }
    }

    render (): ?React.Element {

        let legend_items = this.props.legendCategories.map(item => {
            return <div className='legend-item' key={`legend-item-${item.column}`} style={{width: Math.ceil(item.column.length / 20) * 180}}>
                <span style={{backgroundColor: item.color}}/>
                <text>{item.column}</text>
            </div>
        })

        return (
            <div className='line-legend'>
                {legend_items}
            </div>
        )
    }
}

//Standalone line chart component
class LineChartComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            yearSelection: null,
            categories: [],
            timerange: new TimeRange(new Date(2000,11,31), new Date()),
            _max: 0,
            legendStyle: null,
            series: [],
            columns: [],
            xAxis: {},
            dataOptions: [],
            placeholder: "Manage Options",
            showTopFive: true,
            showTopTen: false,
            trackerInfoValues: null,
            config: {
                "chartRow": {
                    "height": 400,
                    "trackerInfoWidth": 130
                },
                "chartContainer": {
                    "width": 800,
                    "showGrid": true,
                    "format": "year",
                    "timeAxisStyle": {
                        "labels": {
                            "labelColor": "black",
                            "labelWeight": 150,
                            "labelSize": 13
                        },
                        "axis": {
                            "axisColor": "grey",
                            "axisWidth": 1
                        }
                    }
                },
                "yAxis": {
                    "label": this.props.chartConfig.lineChart.yAxisTitle,
                    "min": 0,
                    "width": 70,
                    "type": "linear",
                    "labelOffset": 5,
                    "style": {
                        "labelFont": "Merriweather,Georgia,serif",
                        "labels": {
                            "labelColor": "#000000",
                            "labelWeight": 150,
                            "labelSize": 11
                        },
                        "axis": {
                            "axisColor": "#000000"
                        }
                    }
                },
                "lineChart": {
                    "interpolation": "curveLinear"
                },
                "colors": [
                    "#1f77b4", "#00d899", "#ff3300", "#2ca02c", "#ff7f0e",
                    "#006666", "#990099", "#9467bd", "#c5b0d5", "#ff33cc",
                    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
                    "#1f77b4", "#00d899", "#ff3300", "#2ca02c", "#ff7f0e",
                    "#006666", "#990099", "#9467bd", "#c5b0d5", "#ff33cc",
                    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
                    "#1f77b4", "#00d899", "#ff3300", "#2ca02c", "#ff7f0e",
                    "#006666", "#990099", "#9467bd", "#c5b0d5", "#ff33cc",
                    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
                    "#1f77b4", "#00d899", "#ff3300", "#2ca02c", "#ff7f0e",
                    "#006666", "#990099", "#9467bd", "#c5b0d5", "#ff33cc",
                    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
                    "#1f77b4", "#00d899", "#ff3300", "#2ca02c", "#ff7f0e",
                    "#006666", "#990099", "#9467bd", "#c5b0d5", "#ff33cc",
                    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
                    "#1f77b4", "#00d899", "#ff3300", "#2ca02c", "#ff7f0e",
                    "#006666", "#990099", "#9467bd", "#c5b0d5", "#ff33cc",
                    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
                    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
                ],
                "xLegendCoordinate": -45,
                "eventMarker": {
                    "infoTimeFormat":"%Y",
                    "markerRadius": 0,
                    "markerStyle":{
                        "fill": "black"
                    },
                    "infoWidth": 250,
                    "infoStyle": {
                        "fill": "white",
                        "opacity": 1.0,
                        "stroke": "grey",
                        "pointerEvents": "none"
                    },
                    "markerLabelStyle": {
                        "fill": "#000000"
                    }
                }
            }
        }

        this.onOpen = this.onOpen.bind(this)
        this.getLineChartData = this.getLineChartData.bind(this)
        this.onOptionChange = this.onOptionChange.bind(this)
        this.changeXAxis = this.changeXAxis.bind(this)
        this.showTopFive = this.showTopFive.bind(this)
        this.showTopTen = this.showTopTen.bind(this)
        this.transpose = this.transpose.bind(this)
        this.handleZoom = this.handleZoom.bind(this)
    }

    componentDidMount () {
        this.getLineChartData(this.props, this.props.chartConfig.lineChart.xOptions[0])
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.applied_filters !== nextProps.applied_filters) {
            this.getLineChartData(nextProps, nextProps.chartConfig.lineChart.xOptions[0])
        }
    }

    componentDidUpdate() {
        if(!Object.keys(this.props.chartConfig).length){
            return
        }
    }
    onOpen() {

    }

    transpose (timestamps, normalizedSeries){
        // transpose..... from list of points per series, to a list of points per timestamp
        var findMax = [],
            final = [],
            rows = [];
        for (var i = 0, len_i = normalizedSeries[0].length; i < len_i; i++) {
            var row = []
            for (var j = 0, len_j = normalizedSeries.length; j < len_j; j++) {
                var val = normalizedSeries[j][i] || 0
                row.push(val)
                findMax.push(val)
            }
            rows.push(row)
        }
        timestamps.forEach( (key, i) => {
            var int = parseInt(key)
            if(int > 0){
                final.push([int].concat(rows[i]))
            }
        });
        return {
            findMax: findMax,
            final: final,
            rows: rows
        }
    }

    formatDefaultOptions(options) {
        let option_list = []
        for (let i in options) {
            option_list.push({
                Header: options[i],
                idx: i,
                show: i < 5
            })
        }
        return option_list
    }

    getShownOptions(options) {
        let option_list = []
        for (let i in options) {
            if (options[i].show) {
                option_list.push(options[i].Header)
            }
        }
        return option_list
    }

    getLineChartData(props, xAxis, dataOptions){
        const data = props.drs.convertFiltersToJson(props.applied_filters, {
            searchType: "aggregation",
            groupingField: xAxis.value
        })
        fetch(`${props.dataset.url}/${props.dataset.endpoint}`, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            mode: 'cors'
        })
            .then(res => res.json())
            .then((json) => {
                if(json.results){
                    let all_options = json.results.filter(value => value.term.indexOf("'") === -1).map(term => {
                        return term.term
                    })

                    let options_list = []

                    if (dataOptions) {
                        let selected = false
                        for (let i = 0; i < dataOptions.length; i++) {
                            if (dataOptions[i].show === true) {
                                selected = true
                            }
                        }
                        if (selected === false) {
                            dataOptions[0].show = true
                        }
                        options_list = dataOptions
                    } else {
                        options_list = this.formatDefaultOptions(all_options)
                    }

                    let options = this.getShownOptions(options_list)
                    let placeholder = `Manage Options ${options.length} / ${all_options.length}`

                    let data = []

                    let filter_list = options.map(option => {
                        return props.drs.addValue(props.applied_filters, xAxis.value, [option])
                    })

                    Promise.all(filter_list.map(filters => {
                        let converted_filters = props.drs.convertFiltersToJson(filters, {
                            searchType: "aggregation",
                            groupingField: props.chartConfig.lineChart.dateField
                        })
                        return fetch(`${props.dataset.url}/${props.dataset.endpoint}`, {
                            body: JSON.stringify(converted_filters),
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: 'POST',
                            mode: 'cors'
                        }).then(res => res.json())
                    })).then(results => {
                        data = results.map(result => {
                            return result.results
                        })

                        const listOfSeries = []

                        for (let i = 0, len = results.length; i < len; i++) {
                            const orderedResults = results[i].results.map(value => {
                                if (value[this.props.chartConfig.lineChart.detail]) {
                                    return {
                                        term: parseInt(value.term),
                                        count: value.count,
                                        detail: value[this.props.chartConfig.lineChart.detail]
                                    }
                                } else {
                                    return {
                                        term: parseInt(value.term),
                                        count: value.count
                                    }
                                }
                            }).sort((a, b) => a.term - b.term)

                            let series = orderedResults.map(j => {
                                return {
                                    x: new Date(j.term, 0, 1), y: j.count,
                                    label: this.props.chartConfig.lineChart.detailText ?
                                        `${options[i]}: ${j.count} \n ${this.props.chartConfig.lineChart.detailText}: ${j.detail}`:
                                        `${options[i]}: ${j.count}`
                                }
                            })

                            if (series !== undefined) {
                                listOfSeries.push(series)
                            }
                        }


                        let startTime = new Date(listOfSeries[0][0].x)
                        let panZoom = false
                        if (listOfSeries[0].length > 11) {
                            startTime = new Date(listOfSeries[0][listOfSeries[0].length - 11].x)
                            panZoom = true
                        }
                        let endTime = new Date(listOfSeries[0][listOfSeries[0].length - 1].x)
                        startTime.setDate(startTime.getDate() - 5)
                        endTime.setMonth(endTime.getMonth() + 1)
                        let legendCategories = options.map((column, idx) => ({ column: column, color: this.state.config.colors[idx] }))

                        this.setState({
                            zoomDomain: {x:[startTime, endTime]},
                            panZoom: panZoom,
                            options: options,
                            placeholder: placeholder,
                            series: listOfSeries,
                            legendCategories: legendCategories.concat().sort(function(a, b){return a.column.length - b.column.length}),
                            xAxis: xAxis,
                            dataOptions: options_list
                        })

                        let vals = $("text").filter(function () {
                            return $(this).attr("transform") == "rotate(-90)"
                        })
                        if (vals.length) {
                            $(vals[0]).attr("x",this.state.config.xLegendCoordinate)
                        }
                    })
                } else {
                    console.log('????')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    changeXAxis(selectionObj) {
        this.getLineChartData(this.props, selectionObj)
    }

    onOptionChange(selectionObj) {
        if (selectionObj.show === true) {
            this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {[selectionObj.idx]: {show: {$set: false}}}))
        } else {
            this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {[selectionObj.idx]: {show: {$set: true}}}))
        }
    }

    showTopFive() {
        if (this.state.showTopTen === false) {
            if (this.state.showTopFive === true) {
                this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {
                    [0]: {show: {$set: false}},
                    [1]: {show: {$set: false}},
                    [2]: {show: {$set: false}},
                    [3]: {show: {$set: false}},
                    [4]: {show: {$set: false}}
                }))
                this.setState({
                    showTopFive: false
                })
            } else {
                this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {
                    [0]: {show: {$set: true}},
                    [1]: {show: {$set: true}},
                    [2]: {show: {$set: true}},
                    [3]: {show: {$set: true}},
                    [4]: {show: {$set: true}}
                }))
                this.setState({
                    showTopFive: true,
                    showTopTen: false
                })
            }
        } else {
            this.setState({
                showTopFive: true
            })
        }
    }

    showTopTen() {
        if (this.state.showTopTen === true && this.state.showTopFive === false) {
            this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {
                [0]: {show: {$set: false}},
                [1]: {show: {$set: false}},
                [2]: {show: {$set: false}},
                [3]: {show: {$set: false}},
                [4]: {show: {$set: false}},
                [5]: {show: {$set: false}},
                [6]: {show: {$set: false}},
                [7]: {show: {$set: false}},
                [8]: {show: {$set: false}},
                [9]: {show: {$set: false}}
            }))
            this.setState({
                showTopTen: false
            })
        }
        else if (this.state.showTopTen === true && this.state.showTopFive === true) {
            this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {
                [0]: {show: {$set: true}},
                [1]: {show: {$set: true}},
                [2]: {show: {$set: true}},
                [3]: {show: {$set: true}},
                [4]: {show: {$set: true}},
                [5]: {show: {$set: false}},
                [6]: {show: {$set: false}},
                [7]: {show: {$set: false}},
                [8]: {show: {$set: false}},
                [9]: {show: {$set: false}}
            }))
            this.setState({
                showTopTen: false
            })
        } else {
            this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {
                [0]: {show: {$set: true}},
                [1]: {show: {$set: true}},
                [2]: {show: {$set: true}},
                [3]: {show: {$set: true}},
                [4]: {show: {$set: true}},
                [5]: {show: {$set: true}},
                [6]: {show: {$set: true}},
                [7]: {show: {$set: true}},
                [8]: {show: {$set: true}},
                [9]: {show: {$set: true}}
            }))
            this.setState({
                showTopTen: true
            })
        }
    }

    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render (): ?React.Element {
        if(!Object.keys(this.props.chartConfig).length){
            return (<span/>)
        }

        let containerComponent = <VictoryVoronoiContainer/>
        let victoryBrushGroup = <div/>

        if (this.state.panZoom) {
            const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")
            containerComponent = <VictoryZoomVoronoiContainer
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom}
            />
            victoryBrushGroup = this.state.series.map(data => {
                let index = this.state.series.indexOf(data)
                return <VictoryGroup
                    color={this.state.config.colors[index]}
                    data={data}
                    key={this.state.options[index]}
                >
                    <VictoryLine
                        style={{
                            data: {
                                strokeWidth: 2
                            }
                        }}
                    />
                </VictoryGroup>
            })
        }

        let victoryGroups = this.state.series.map(data => {
            let index = this.state.series.indexOf(data)
            return <VictoryGroup
                color={this.state.config.colors[index]}
                data={data}
                key={this.state.options[index]}
                labelComponent={
                    <VictoryTooltip
                        flyoutStyle={{ fill: "white" }}
                        //orientation={(d) => d.eventKey === 0 ? 'right' : 'left'}
                    />
                }
                name={`victory-group-${index}`}
                style={{
                    labels: {fill: this.state.config.colors[index]}
                }}
            >
                <VictoryLine
                    name={`victory-line-${index}`}
                    style={{
                        data: {
                            strokeWidth: (d, active) => {return active ? 3 : 2;}
                        }
                    }}
                />
                <VictoryScatter
                    name={`victory-scatter-${index}`}
                    size={(d, a) => {return a ? 6 : 1;}}
                />
            </VictoryGroup>
        })

        return (
            <div>
                <div className='dataset-explorer-infographic-select-bar'>
                    <em>Select Data Element to Visualize:</em>
                    <Select
                        clearable={false}
                        name='toggle'
                        options={this.props.chartConfig.lineChart.xOptions}
                        onChange={this.changeXAxis}
                        placeholder='Select x-axis'
                        resetValue='label'
                        value={this.state.xAxis}
                    />
                    <em>Select Options to Visualize:</em>

                    <Select
                        name="toggle"
                        optionComponent={GravatarOption}
                        menuStyle={{
                            maxHeight: 130
                        }}
                        style={{
                            width: 300
                        }}
                        options={Array.prototype.slice.call(this.state.dataOptions).sort(function(a, b) {
                            let nameA = a.Header.toUpperCase(); // ignore upper and lowercase
                            let nameB = b.Header.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                        })}
                        onChange={this.onOptionChange}
                        resetValue="Header"
                        removeSelected={false}
                        searchable={false}
                        clearable={false}
                        closeOnSelect={false}
                        placeholder={this.state.placeholder}
                    />
                    <div className="show-top-results">
                        <div><input type='checkbox' checked={this.state.showTopFive} onChange={this.showTopFive}/>Show Top Five</div>
                        <div><input type='checkbox' checked={this.state.showTopTen} onChange={this.showTopTen}/>Show Top Ten</div>
                    </div>
                </div>
                { this.state.series.length === 0 ?
                    <div className="infographic-loading-div">
                        <img src="/img/loading.gif" className="infographic-loading-img"/>
                    </div>
                    :
                    <div style={{display:"flex"}}>
                        <div className='chart-background'>
                            <LineLegend legendCategories={this.state.legendCategories}/>
                            <VictoryChart
                                height={400}
                                width={800}
                                scale={{ x: "time" }}
                                containerComponent={containerComponent}
                            >
                                {victoryGroups}
                            </VictoryChart>
                            {
                                this.state.panZoom &&
                                <VictoryChart
                                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                                    width={600} height={100} scale={{ x: "time" }}
                                    containerComponent={
                                        <VictoryBrushContainer
                                            brushDimension="x"
                                            brushDomain={this.state.zoomDomain}
                                            onBrushDomainChange={this.handleZoom.bind(this)}
                                        />
                                    }
                                >
                                    <VictoryAxis
                                        name={`victory-axis`}
                                        tickFormat={(x) => new Date(x).getFullYear()}
                                    />
                                    {victoryGroups}
                                </VictoryChart>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

/// piechart width 300 height 300, contentInner display flex, legend bottom -200

class PieChartComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            data: {}
        }
        this.onClick = this.onClick.bind(this)
        this.setIndex = this.setIndex.bind(this)
    }

    componentDidMount () {
        this.onClick(this.props.chartConfig.pieChart.default, this.props.chartConfig.pieChart.default.index)
    }

    setIndex (activeIndex) {
        this.setState({
            activeIndex: activeIndex
        })
    }

    onClick(obj, index){
        if(this.refs && this.props.categories.length){
            this.refs.child.setState({
                activeIndex: index
            })

            if(this.props.onClick){
                this.props.onClick(obj, index)
            }

        }
    }

    // that.onClick(that.props.infographicDefinitions.pieChartConfig.default, that.props.infographicDefinitions.pieChartConfig.default.index)



    render (): ?React.Element {
        if(this.refs.child && this.refs.child.refs.pieChart.container.children.length){
            const viewBox = this.props.chartConfig.pieChart.viewBox
            this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.x = viewBox.x
            this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.y = viewBox.y
            this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.width = viewBox.width
            this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.height = viewBox.height
        }

        return (
            <div className="collapsible-container">
                {
                    this.props.categories.length ?
                        <TwoLevelPieChart
                            onClick={this.onClick}
                            data={this.props.categories}
                            ref="child"
                            setIndex={this.setIndex}
                            {...this.props.chartConfig.pieChart}
                        /> :
                        <div style={{height:300,width:700}}>
                        </div>
                }
            </div>
        )
    }
}

class ResultsInfographicPieBarComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            yearSelection: null,
            categories: []
        }
        this.onOpen = this.onOpen.bind(this)
        this.onYearToggle = this.onYearToggle.bind(this)
        this.getBarChartData = this.getBarChartData.bind(this)
    }

    componentDidMount () {
        this.onYearToggle(this.props.chartConfig.select.default)

        const all = [{
            value: "All",
            label: "All"
        }]
        const now = new Date()
        const that = this
        let yearsRange = _.range(this.props.chartConfig.select.startYear, now.getFullYear()+1)
        yearsRange = yearsRange.filter(v => {
            return this.props.chartConfig.select.yearsWithNoData.indexOf(v) === -1
        })
        const years = all.concat(
            _.reverse(yearsRange.map(value => {
                    return {
                        value: value,
                        label: value
                    }
                })
            )
        )
        this.setState({
            years
        })

    }
    componentDidUpdate() {
        if(!Object.keys(this.props.chartConfig).length){
            return
        }
    }

    getBarChartData(obj, index) {
        if (!obj.full_name) {
            if (this.state.categories.length) {
                const defaultCategory = this.state.categories[index]
                obj.full_name = defaultCategory.full_name
            }
        }

        const countBy = this.props.chartConfig.pieChart.barChartCountBy
        const path = `${this.props.dataset.url}/${this.props.dataset.endpoint}`
        let url = `${path}?count=${countBy}&search=${this.props.chartConfig.pieChart.countBy}:"${obj.full_name}"`
        let data = []

        if (this.state.yearSelection.value !== "All") {
            url += `+AND+${this.props.chartConfig.pieChart.dateField}:[${this.state.yearSelection.value}0101+TO+${this.state.yearSelection.value}1231]`
        }

        fetch(url)
            .then(res => res.json())
            .then((json) => {
                if(json.results){
                    data = json.results.map(value => {
                        return {
                            name: value.term,
                            [this.props.chartConfig.barChart.countLabel]: value.count,
                            [this.props.chartConfig.barChart.detailLabel]: value[this.props.chartConfig.barChart.detail]
                        }
                    }).slice(0,this.props.chartConfig.barChart.limiter)
                } else {
                    console.log('????')
                }
                this.setState({data})
            })
            .catch((err) => {
                console.log(err)
            })

    }

    onOpen(){
        // const pieChartConfig = this.props.parent.state.infographicsConfig.pieChart
        // $('.recharts-surface').each(function () {
        //   $(this).removeAttr('viewBox');
        //   $(this)[0].setAttribute('viewBox', pieChartConfig.viewBox)
        //   return false;
        // });
        // $('.recharts-wrapper').each(function()  {
        //   $(this).width(pieChartConfig.widthReset)
        //   $(this).height(pieChartConfig.heightReset)
        // })
    }

    onYearToggle(selection) {
        if(this.state.value && selection.value === this.state.value.value){
            return
        }
        let url = `${this.props.dataset.url}/${this.props.dataset.endpoint}?count=${this.props.chartConfig.pieChart.countBy}&`
        if(selection.value !== "All"){
            url += `search=${this.props.chartConfig.pieChart.dateField}:[${selection.value}0101+TO+${selection.value}1231]`
        }

        let sum = 0
        let categories = []
        const that = this

        fetch(`${url}`)
            .then(res => res.json())
            .then((json) => {
                if(json.results){
                    sum = json.results.reduce((a,b) => a + b.count,0)

                    categories = json.results.map(category => {
                        const pct = Math.round(category.count / sum *100)
                        // {"id":"Class II","name":"Class II","value":6522,"pct":"82%"},
                        return {
                            id: this.props.chartConfig.pieChart.categories[category.term],
                            name: this.props.chartConfig.pieChart.categories[category.term],
                            pct: `${pct}%`,
                            value: category.count,
                            textLabel: this.props.chartConfig.pieChart.textLabel,
                            full_name: category.term
                        }
                    })

                } else {
                    console.log('????')
                }
                that.setState({
                    categories: categories,
                    yearSelection: selection
                }, function() {
                    this.onOpen()
                    const defaultIndex = that.props.chartConfig.pieChart.default.index
                    that.refs.parent.onClick(categories[defaultIndex], defaultIndex)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render (): ?React.Element {
        if(!Object.keys(this.props.chartConfig).length){
            return (<span/>)
        }

        this.onOpen()
        return (
            <div>
                <div className="infographic-title-div">
                    <h3>{this.props.chartConfig.select.title}</h3>
                    <h3>{this.props.chartConfig.barChart.title}</h3>
                </div>
                <Select
                    name="toggle"
                    menuStyle={{
                        width: 125
                    }}
                    style={{
                        width: 125,
                        height:35,
                        paddingLeft: 25
                    }}
                    wrapperStyle={{
                        width: 125,
                        height:35
                    }}
                    value={this.state.yearSelection}
                    options={this.state.years}
                    onChange={this.onYearToggle}
                    resetValue="Header"
                    removeSelected={false}
                    clearable={false}
                    closeOnSelect={true}
                    placeholder={"Select Year"}
                />
                <div className='pie-bar-chart-container'>
                    <PieChartComponent
                        categories={this.state.categories}
                        chartConfig={this.props.chartConfig}
                        onClick={this.getBarChartData}
                        ref="parent"
                    />
                    <BarChartComponent
                        applied_filters={this.props.applied_filters}
                        barHeight={500}
                        barWidth={this.props.chartConfig.barChart.width}
                        data={this.state.data}
                        detail={this.props.chartConfig.barChart.detailLabel}
                        dataset={this.props.dataset}
                        drs={this.props.drs}
                        chartConfig={this.props.chartConfig}
                        yLabel={this.props.chartConfig.barChart.yAxisTitle}
                        xAxis={this.props.chartConfig.barChart.countLabel}
                        yAxis={this.props.chartConfig}
                    />
                </div>
            </div>
        )
    }
}


class InfographicComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            data: [],
            xAxis: {}
        }

        this.getBarData = this.getBarData.bind(this)
        this.changeXAxis = this.changeXAxis.bind(this)
        this.toLetters = this.toLetters.bind(this)
    }

    componentDidMount () {
        if (this.props.chartConfig.type === 'bar') {
            this.getBarData(this.props, this.props.chartConfig.barChart.xOptions[0])
        }
    }

    componentWillReceiveProps (nextProps) {
        if ((this.props.applied_filters !== nextProps.applied_filters) || (this.props.chartType !== nextProps.chartType)) {
            if (nextProps.chartConfig.type === 'bar') {
                this.getBarData(nextProps, nextProps.chartConfig.barChart.xOptions[0])
            }
        }
    }

    toLetters(num) {
        "use strict";
        var mod = num % 26,
            pow = num / 26 | 0,
            out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
        return pow ? this.toLetters(pow) + out : out;
    }

    getBarData (props, xAxis) {
        let data = []

        props.drs.getData(props.applied_filters, {
            searchType: "aggregation",
            groupingField: xAxis.value
        }).then(results => {
            if (results.results) {
                data = results.results.map((value, i) => {
                    let count = value.count
                    if (props.chartConfig.barChart.convert) {
                        count = value.count / 24
                    }
                    return {
                        name: value.term,
                        alpha: this.toLetters(i + 1),
                        [props.chartConfig.barChart.countLabel]: count,
                        [(props.chartConfig.barChart.detailLabel ? props.chartConfig.barChart.detailLabel : 'detail')]: (props.chartConfig.barChart.detail ? value[props.chartConfig.barChart.detail] : 'detail')
                    }
                }).slice(0,props.chartConfig.barChart.limiter)

                this.setState({
                    data: data,
                    xAxis: xAxis
                })
            }
        })
    }

    changeXAxis(selectionObj) {
        this.getBarData(this.props, selectionObj)
    }


    render (): ?React.Element {
        let infographic = null
        if (Object.keys(this.props.chartConfig).length) {
            if (this.props.chartConfig.type === "pieBar") {
                infographic =
                    <ResultsInfographicPieBarComponent
                        applied_filters={this.props.applied_filters}
                        detail={this.props.chartConfig.barChart.detailLabel}
                        dataset={this.props.dataset}
                        drs={this.props.drs}
                        chartConfig={this.props.chartConfig}
                        yLabel={this.props.chartConfig.barChart.yAxisTitle}
                        xAxis={this.props.chartConfig.barChart.countLabel}
                    />
            } else if (this.props.chartConfig.type === "line") {
                infographic =
                    <LineChartComponent
                        applied_filters={this.props.applied_filters}
                        dataset={this.props.dataset}
                        drs={this.props.drs}
                        chartConfig={this.props.chartConfig}
                    />
            } else if (this.props.chartConfig.type === "bar") {
                infographic =
                    <BarChartComponent
                        applied_filters={this.props.applied_filters}
                        barHeight={600}
                        barWidth='90%'
                        data={this.state.data}
                        dataElement={this.state.xAxis.label}
                        detail={this.props.chartConfig.barChart.detailLabel}
                        dataset={this.props.dataset}
                        drs={this.props.drs}
                        chartConfig={this.props.chartConfig}
                        yLabel={this.props.chartConfig.barChart.yAxisTitle}
                        xAxis={this.props.chartConfig.barChart.countLabel}
                        xLabel={this.state.alpha ? "alpha" : "name"}
                    />
            }
        }
        return (
            <div>
                {
                    this.props.chartConfig.type === 'bar' &&
                    <div className='dataset-explorer-infographic-select-bar'>
                        <em>Select Data Element to Visualize:</em>
                        <Select
                            clearable={false}
                            name='toggle'
                            options={this.props.chartConfig.barChart.xOptions}
                            onChange={this.changeXAxis}
                            placeholder='Select x-Axis'
                            resetValue='label'
                            value={this.state.xAxis}
                        />
                    </div>
                }
                {
                    infographic
                }
            </div>
        )
    }
}


class InfographicMenubar extends React.Component {

    constructor (props: Object) {
        super(props)

        let options = this.getOptions(this.props.infographicsConfig)

        this.state = {
            chartType: options[0],
            options: options
        }

        this.selectChart = this.selectChart.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.infographicsConfig !== nextProps.infographicsConfig) {
            let options = this.getOptions(nextProps.infographicsConfig)
            this.setState({
                chartType: options[0],
                options: options
            })
        }
    }

    selectChart (chart) {
        this.setState({
            chartType: chart
        })

        this.props.selectChart(chart.value)
    }

    componentDidMount () {
    }

    getOptions (infographicsConfig) {
        let options = Object.keys(infographicsConfig).map(value => {
            return {
                value: value,
                label: infographicsConfig[value].title
            }
        })
        return(options)
    }

    render (): ?React.Element {
        return (
            <div className='dataset-explorer-infographic-menubar'>
                <em>Select Chart Type:</em>
                <Select
                    clearable={false}
                    name='toggle'
                    options={this.state.options}
                    onChange={this.selectChart}
                    placeholder='Select chart type'
                    resetValue='label'
                    value={this.state.chartType}
                />
            </div>
        )
    }
}


class SelectedFiltersComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {}
        this.formatValues = this.formatValues.bind(this)
    }

    componentDidMount () {
    }

    formatValues () {
        const filter_list = []
        this.props.applied_filters.forEach((filter,idx) => {
            if ((filter.query_type === "term" || filter.query_type === "prefix" || filter.query_type === "exists") &&
                (filter.type === "checkbox" || filter.type === "boolean")) {
                filter.value.forEach( (f, valueIdx) => {
                    var valueObj = filter.options.filter(o => o.value === f)
                    if(valueObj.length){
                        filter_list.push({
                            value: valueObj[0].label,
                            label: filter.label,
                            query_type: filter.query_type,
                            idx: idx,
                            valueIdx: valueIdx
                        })
                    }
                })
            } else if (
                filter.query_type === "range" &&
                (filter.type === "yearpicker" || filter.type === "numeric_range") &&
                filter.value.length
            ) {
                filter_list.push({
                    value: `${filter.value[0]} - ${filter.value[filter.value.length - 1]}`,
                    label: filter.label,
                    query_type: filter.query_type,
                    idx: idx,
                    valueIdx: [0, 1]
                })
            } else if(
                filter.query_type === "range" &&
                filter.value.length
            ){
                const startDay = Moment(filter.value[0]).format('MM/DD/YYYY')
                const endDay = Moment(filter.value[1]).format('MM/DD/YYYY')
                filter_list.push({
                    value: `${startDay} - ${endDay}`,
                    label: filter.label,
                    query_type: filter.query_type,
                    idx: idx
                })
            } else if (
                (filter.query_type === "term" || filter.query_type === "match") &&
                filter.value.length &&
                filter.type !== "checkbox"
            ){
                filter.value.forEach( (f, valueIdx) => {
                    filter_list.push({
                        value: f,
                        label: filter.label,
                        query_type: filter.query_type,
                        idx: idx,
                        valueIdx: valueIdx
                    })
                })
            }
        })

        return filter_list.map((filter, idx) => {
            return (
                <button
                    key={`button${idx}`}
                    onClick={() => this.props.removeFilter(filter.idx, filter.valueIdx)}
                    className='content-selected-filter'
                >
          <span>
            {`${filter.label}: ${filter.value}`}
          </span>
                    <i className='fa fa-times-circle' />
                </button>
            )
        })
    }

    render (): ?React.Element {
        const filter_list = this.formatValues()
        if (filter_list === undefined || filter_list.length == 0) {
            return (
                <div />
            )
        }
        return (
            <div className='content-selected-filters'>
                <div>
                    <strong style={{fontSize: 17}}>Applied Filters:</strong> {filter_list}
                    <a onClick={this.props.clearAllFilters}>Clear All</a>
                </div>
            </div>
        )
    }
}

class DatasetExplorerContentComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            chartType: Object.keys(this.props.infographicsConfig)[0]
        }
        this.selectChart = this.selectChart.bind(this)
    }

    componentDidMount () {

    }

    componentWillReceiveProps (nextProps) {
        if (this.props.infographicsConfig !== nextProps.infographicsConfig) {
            this.setState({
                chartType: Object.keys(nextProps.infographicsConfig)[0]
            })
        }
    }

    selectChart (chart) {
        this.setState({
            chartType: chart
        })
    }

    render (): ?React.Element {

        if (this.props.visualization === true) {
            return (
                <div className={'dataset-explorer-content flex-content ' + (this.props.displayFilters ? 'width-77': 'width-100 pad-r-30')} id='dataset-explorer-content'>
                    {
                        this.props.hideContent &&
                        <div className='dataset-overlay' />
                    }
                    <InfographicMenubar
                        infographicsConfig={this.props.infographicsConfig}
                        selectChart={this.selectChart}
                    />
                    <div className={'dataset-explorer-results ' + (this.props.displayFilters ? 'width-100': 'width-77')}>
                        <SelectedFiltersComponent
                            applied_filters={this.props.applied_filters}
                            clearAllFilters={this.props.clearAllFilters}
                            infographicsConfig={this.props.infographicsConfig}
                            removeFilter={this.props.removeFilter}
                        />
                        <InfographicComponent
                            applied_filters={this.props.applied_filters}
                            chartType={this.state.chartType}
                            dataset={this.props.dataset}
                            drs={this.props.drs}
                            chartConfig={this.props.infographicsConfig[this.state.chartType]}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'dataset-explorer-content dataset-explorer-results ' + (this.props.displayFilters ? 'width-77': 'width-100')} id='dataset-explorer-content'>
                    {
                        this.props.hideContent &&
                        <div className='dataset-overlay' />
                    }
                    <div>
                        <SelectedFiltersComponent
                            applied_filters={this.props.applied_filters}
                            clearAllFilters={this.props.clearAllFilters}
                            infographicsConfig={this.props.infographicsConfig}
                            removeFilter={this.props.removeFilter}
                        />
                    </div>
                    <ResultsComponent
                        dataset={this.props.dataset}
                        hideContent={this.props.hideContent}
                        infographicsConfig={this.props.infographicsConfig}
                        rows={this.props.rows}
                        view={this.props.view}
                    />
                </div>
            )
        }
    }
}

export default DatasetExplorerContentComponent



