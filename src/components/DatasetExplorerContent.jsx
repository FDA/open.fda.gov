/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

var createReactClass = require('create-react-class');
import Select from 'react-select'
import FileSaver from 'file-saver'
import jsonexport from 'jsonexport'
import PropTypes from 'prop-types'
import Moment from 'moment'
import {default as $} from 'jquery'
import TwoLevelPieChart from './InteractivePie'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, ResponsiveContainer, Tooltip, LegendR} from 'Recharts'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler, Legend, ScatterChart, TimeMarker, EventMarker } from "react-timeseries-charts"
import { TimeSeries, TimeRange, sum } from "pondjs"
import _ from 'lodash'
import update from "immutability-helper/index";

const re = new RegExp('\\s+');

function sortFrequenciesOfReportedSign(a, b, desc){
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
  render () {
    return (
      <div className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}>
        <input type='checkbox' checked={this.props.option.show}/>
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
      placeholder: "Manage Columns",
      pivotBy: [],
      sorted: [],
      pageSize: 200,
      expanded: {},
      expandedRows: {},
      resized: [],
      filtered: []
    }
    this.onColumnToggle = this.onColumnToggle.bind(this)
    this.onExportChoosen = this.onExportChoosen.bind(this)
    this.toTitleCase = this.toTitleCase.bind(this)
    this.getFormattedColumns = this.getFormattedColumns.bind(this)
    this.convertToStartCase = this.convertToStartCase.bind(this)
    this.collapseAll = this.collapseAll.bind(this)

 }

  componentDidMount () {
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.view){
      const columnsData = this.getFormattedColumns(nextProps.view.columns)
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
        placeholder: `Manage Columns ${columnsData.shownColumnsCount} / ${columnsData.columns.length}`
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


  onColumnToggle(selectionObj){
    if (selectionObj.show === true) {
      this.setState({
        columns: update(this.state.columns, {[selectionObj.idx]: {show: {$set: false}}}),
        placeholder: `Manage Columns ${this.state.columns.filter(c => c.show).length - 1} / ${this.state.columns.length}`
      })
    } else {
      this.setState({
        columns: update(this.state.columns, {[selectionObj.idx]: {show: {$set: true}}}),
        placeholder: `Manage Columns ${this.state.columns.filter(c => c.show).length + 1} / ${this.state.columns.length}`
      })
    }
  }

  onExportChoosen(selectionObj){

    if(selectionObj.label === "CSV"){
      try {
        let csv = ''
        jsonexport(this.props.rows, function(err, export_csv){
          if(err) return console.log(err);
          csv = export_csv
        });
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "download.csv");
      } catch (err) {
        console.error(err);
      }
    } else {
      var blob = new Blob(this.props.rows.map(obj => JSON.stringify(obj)), {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "download.json");
    }
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
        let value = this.toTitleCase(options.value)

        let html = null
        if(options.column.filter_values && value){
          options.column.filter_values.forEach(filter_value => {
            value = value.replace(filter_value, "")
          })
          value = value.trim().replace(':', '').replace(new RegExp("^s ", "i"), "")
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
    if(this.props.rows === undefined){
      return (<span/>)
    }

    let data = this.props.rows
    let searchColumns = this.state.columns.filter(column => {return column.show})
    let searchText = this.state.search

    if (searchText) {
      var regex = new RegExp( searchText, "i");
        data = data.filter(row => {
          for (let i =0; i < searchColumns.length;i++) {
            if (regex.test(String(getNestedValue(row, searchColumns[i].accessor)))) {
              return true;
            }
          }
          return false;
        })
    }



      return (
      <div className={this.props.hideContent ? 'blur': ''}>
        <div className='dataset-table-menubar'>
          {/* <p >{this.props.parent.state._rows.length} matches out of {this.props.parent.state.totalRecords}</p> */}
          <div>
            <Select
              name="toggle"
              optionComponent={GravatarOption}
              menuStyle={{
                maxHeight: 130
              }}
              style={{
                width: 300
              }}
              options={this.state.columns}
              onChange={this.onColumnToggle}
              resetValue="Header"
              removeSelected={false}
              searchable={false}
              clearable={false}
              closeOnSelect={false}
              placeholder={this.state.placeholder}
            />
            <div style={{paddingLeft: 30}}>
              <Select
                name="toggle"
                menuStyle={{
                  maxHeight: 130
                }}
                style={{
                  width: 80
                }}
                onChange={this.onExportChoosen}
                options={this.props.dataset.exportOptions}
                resetValue="Header"
                removeSelected={false}
                searchable={false}
                clearable={false}
                closeOnSelect={true}
                placeholder={"Export"}
              />
            </div>
          </div>
          {showCollapseRows &&
            <div>
              <button className='collapse-rows' onClick={this.collapseAll}>Collapse Rows</button>
            </div>
          }
        </div>

      Search: <input value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
      <ReactTable
          expanded={this.state.expanded}
          data={data}
          pageSize={this.state.pageSize}
          columns={this.state.columns}
          pivotBy={this.state.pivotBy}
          defaultPageSize={this.props.rows.length}
          showPageSizeOptions={true}
          pageSizeOptions={[25, 50, 100, 200, 250, 500, 1000]}
          showPagination={true}
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
        <text x={0} y={0} dy={16} fontSize={8} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
});

const CustomTooltip  = createReactClass({

  render() {

    if (this.props.active) {
      return (
        <div className="custom-tooltip">
          <h3 className="label">{this.props.label}</h3>
          <em className="intro">{`${this.props.yLabel} : ${this.props.payload[0].value}`}</em>
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

    return (
          <ResponsiveContainer width="90%" height={400}>
            <BarChart
              ref="bar"
              data={this.props.data}
              {...this.props.chartConfig.barChart}
            >
              <XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick/>}/>
              <YAxisR/>
              <CartesianGrid strokeDasharray="8 8"/>
              <Tooltip content={<CustomTooltip yLabel={this.props.yLabel}/>}/>
              {
                this.props.xAxis &&
                  <Bar
                    dataKey={this.props.xAxis}
                    fill="#8884d8"
                    barCategoryGap={"50%"}
                    barGap={"50%"}
                  />
              }
            </BarChart>
          </ResponsiveContainer>
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
          "#00008B"
        ],
        "xLegendCoordinate": -45,
        "eventMarker": {
          "infoTimeFormat":"%Y",
          "markerRadius": 0,
          "markerStyle":{
            "fill": "black"
          },
          "infoWidth": 175,
          "infoStyle": {
            "fill": "white",
            "opacity": 0.90,
            "stroke": "#0000",
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
    this.transpose = this.transpose.bind(this)
    this.handleMouseNear = this.handleMouseNear.bind(this)
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
        show: i < 4
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
          }).then(res => res.json())})).then(results => {
            data = results.map(result => {
              return result.results
            })

            const listOfSeries = []

            for (var i = 0, len = results.length; i < len; i++) {
              const orderedResults = results[i].results.map(value => {
                return {
                  term: parseInt(value.term),
                  count: value.count
                }
              }).sort((a, b) => a.term - b.term)

              var series = new TimeSeries({
                name: "timeseries",
                columns: ["time","value"],
                points: orderedResults.map(i => {
                  return [new Date(i.term - 1,12,1), i.count]
                })
              }).toJSON()

              if (series !== undefined) {
                listOfSeries.push(series.points)
              }
            }

            console.log("listOfSeries: ", listOfSeries[0][0][0])
            let startTime = new Date(listOfSeries[0][0][0])
            let endTime = new Date(listOfSeries[0][listOfSeries[0].length - 1][0])
            startTime.setDate(startTime.getDate() - 5)
            endTime.setMonth(endTime.getMonth() + 1)


            // get all timestamps
            // use obj to avoid duplicates
            let timestamps = {};
            // for each column of aggregated points
            listOfSeries.forEach( arr => {
              arr.forEach( val => {
                // add timestamp for each series to timestamps with default 0
                timestamps[val[0]] = 0
              })
            })
            timestamps = Object.keys(timestamps).sort();
            let timestampsPosition = {};
            timestamps.forEach( (key, i) => timestampsPosition[key] = i );
            ///

            // normalize
            const normalizedSeries = []
            listOfSeries.forEach( arr => {
              const normalizedSerie = new Array(timestamps.length).fill(null);

              arr.forEach( val => {
                var timestamp = val[0],
                  value = val[1],
                  index = timestampsPosition[timestamp];

                // add the value for the timestamp in item array
                normalizedSerie[index] = value
              })
              normalizedSeries.push(normalizedSerie)
            })

            // transpose..... from list of points per series, to a list of points per timestamp
            var res = this.transpose(timestamps, normalizedSeries)

            var final = res.final,
              findMax = res.findMax,
              rows = res.rows;
            console.log("options: ", options)

            var series = new TimeSeries({
              name: "timeseries",
              columns: ["time"].concat(options),
              points: final
            })

            let lineWidth = 2

            if(options.length > 4) {
              lineWidth = 1
            }

            // set style according to categories
            let legendStyle = styler(options.map((column,idx)=> {
              return {
                key: column,
                color: this.state.config.colors[idx],
                width: lineWidth
              }
            }))

            this.setState({
              timerange: new TimeRange(startTime, endTime),
              _max: Math.max(...findMax),
              legendStyle: legendStyle,
              placeholder: placeholder,
              series: series,
              columns: options,
              legendCategories: options.map(d => ({ key: d, label: d })),
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
    console.log(selectionObj)
    this.getLineChartData(this.props, selectionObj)
  }

  onOptionChange(selectionObj) {
    if (selectionObj.show === true) {
      this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {[selectionObj.idx]: {show: {$set: false}}}))
    } else {
      this.getLineChartData(this.props, this.state.xAxis, update(this.state.dataOptions, {[selectionObj.idx]: {show: {$set: true}}}))
    }
  }

  handleTrackerChanged = t => {
    if (t) {
      let e = this.state.series.atTime(t)
      let limiter = this.props.chartConfig.lineChart.limiter

      const eventTime = new Date(
        e.begin().getTime() + (e.end().getTime() - e.begin().getTime()) / 2
      )

      const eventData = e.toJSON().data;


      let infoValues = this.state.columns.map( label => {
        return {
          label : label.length < 20 ? label : label.slice(0,20) + " ... ",
          value: eventData[label].toString()
        }
      })

      const defaultInfoValues = [
        {
          label: "Maximum options to display",
          value: limiter
        }
      ]
      // Show only 5 labels
      infoValues = infoValues.length > limiter ? defaultInfoValues : infoValues;
      let infoHeight = infoValues.length <= limiter ? ((infoValues.length * 13) + 15) : 0;

      this.setState({
        tracker: eventTime,
        trackerEvent: e,
        trackerInfoValues: infoValues,
        infoHeight: infoHeight
      });
    } else {
      this.setState({ tracker: null, infoHeight: 0, trackerEvent: null });
    }
  }

  handleMouseNear = point => {
    this.setState({
      highlight: point
    });
  };

  render (): ?React.Element {
    if(!Object.keys(this.props.chartConfig).length){
      return (<span/>)
    }

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
            options={this.state.dataOptions}
            onChange={this.onOptionChange}
            resetValue="Header"
            removeSelected={false}
            searchable={false}
            clearable={false}
            closeOnSelect={false}
            placeholder={this.state.placeholder}
          />
        </div>
        { this.state.series.length === 0 ?
          <div className="infographic-loading-div">
            <img src="/img/loading.gif" className="infographic-loading-img"/>
          </div>
          :
          <div style={{display:"flex"}}>
            <div style={{
              width: '90%',
              marginTop: 18
            }}>
              <h3
                style={{
                  paddingLeft: "15%",
                  paddingBottom: 15
                }}
              >{`${this.props.chartConfig.lineChart.yAxisTitle} ${this.state.xAxis.label} by ${this.props.chartConfig.lineChart.xAxisTitle}`}</h3>
              <Resizable>
                <ChartContainer
                  timeRange={this.state.timerange}
                  onTrackerChanged={this.handleTrackerChanged}
                  {...this.state.config.chartContainer}
                >
                  <ChartRow
                    {...this.state.config.chartRow}
                  >
                    <YAxis
                      id="axis1"
                      max={this.state._max}
                      {...this.state.config.yAxis}
                    />
                    <Charts>
                      <LineChart
                        style={this.state.legendStyle}
                        axis="axis1"
                        series={this.state.series}
                        columns={this.state.columns}
                        onHighlightChange={highlight => this.setState({ highlight })}
                        highlight={this.state.highlight}
                        {...this.state.config.lineChart}
                      />
                      <EventMarker
                        type="flag"
                        axis="axis1"
                        event={this.state.trackerEvent}
                        column={this.state.highlight ? this.state.highlight: this.state.columns[0]}
                        info={this.state.trackerInfoValues}
                        infoHeight={this.state.infoHeight}
                        {...this.state.config.eventMarker}
                      />
                    </Charts>
                  </ChartRow>
                </ChartContainer>
              </Resizable>
              <div style={{paddingLeft:105}}>
                <Legend categories={this.state.legendCategories} style={this.state.legendStyle} type="line" />
              </div>
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
              substance_name: value.count,
              amt: value.count
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
          <h3 className="infographic-barchart-title">{this.props.chartConfig.barChart.title}</h3>
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
        <div style={{display:"flex"}}>
          <PieChartComponent
            categories={this.state.categories}
            chartConfig={this.props.chartConfig}
            onClick={this.getBarChartData}
            ref="parent"
          />
          <BarChartComponent
            data={this.state.data}
            chartConfig={this.props.chartConfig}
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

  getBarData (props, xAxis) {
    let data = []

    props.drs.getData(props.applied_filters, {
      searchType: "aggregation",
      groupingField: xAxis.value
    }).then(results => {
      if (results.results) {
        data = results.results.map(value => {
          return {
            name: value.term,
            [xAxis.label]: value.count,
            amt: value.count
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
            dataset={this.props.dataset}
            drs={this.props.drs}
            chartConfig={this.props.chartConfig}
          />
      } else if (this.props.chartConfig.type === "line") {
        infographic =
          <LineChartComponent
            applied_filters={this.props.applied_filters}
            data={this.state.data}
            dataset={this.props.dataset}
            drs={this.props.drs}
            chartConfig={this.props.chartConfig}
          />
      } else if (this.props.chartConfig.type === "bar") {
        infographic =
          <BarChartComponent
            applied_filters={this.props.applied_filters}
            data={this.state.data}
            dataset={this.props.dataset}
            drs={this.props.drs}
            chartConfig={this.props.chartConfig}
            yLabel={this.props.chartConfig.barChart.yLabel}
            xAxis={this.state.xAxis.label}
            yAxis={this.props.chartConfig}
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
      if (filter.query_type === "term" && filter.type === "checkbox") {
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
        filter.type === "yearpicker" &&
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
        filter.query_type === "term" &&
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
          { filter.query_type === "range" ? null :
            <i className='fa fa-times-circle' />
          }
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
        <h3>Applied Filters:</h3>
        <div>
          {filter_list}
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
        <div className='dataset-explorer-content' id='dataset-explorer-content'>
          {
            this.props.hideContent &&
            <div className='dataset-overlay' />
          }
          <InfographicMenubar
            infographicsConfig={this.props.infographicsConfig}
            selectChart={this.selectChart}
          />
          <div className='dataset-explorer-results'>
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
        <div className='dataset-explorer-content dataset-explorer-results' id='dataset-explorer-content'>
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



