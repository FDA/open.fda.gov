/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import createClass from 'create-react-class'
import Select from 'react-select'
import FileSaver from 'file-saver'
import jsonexport from 'jsonexport'
import PropTypes from 'prop-types'
import Moment from 'moment'
import Collapsible from 'react-collapsible'
import {default as $} from 'jquery'
import TwoLevelPieChart from './InteractivePie'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, Tooltip, LegendR} from 'Recharts'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, styler, Legend, TimeMarker, EventMarker } from "react-timeseries-charts"
import { TimeSeries, TimeRange, sum } from "pondjs"
import _ from 'lodash'


const GravatarOption = createClass({
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
    let gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
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
      columns: [],
      placeholder: "Manage Columns",
      pivotBy: [],
      sorted: [],
      pageSize: 200,
      expanded: {},
      resized: [],
      filtered: []
    }
    this.onColumnToggle = this.onColumnToggle.bind(this)
    this.onExportChoosen = this.onExportChoosen.bind(this)
    this.toTitleCase = this.toTitleCase.bind(this)
    this.getFormattedColumns = this.getFormattedColumns.bind(this)
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

  onColumnToggle(selectionObj){

    this.state.columns[selectionObj.idx].show = !selectionObj.show
    const shownColumnsCount = this.state.columns.filter(c => c.show).length

    this.setState({
      columns: [...this.state.columns],
      placeholder: `Manage Columns ${shownColumnsCount}/${this.state.columns.length}`
    })
  }

  onExportChoosen(selectionObj){

    if(selectionObj.label === "CSV"){
      try {
        let csv = ''
        jsonexport(this.props.parent.state._rows, function(err, export_csv){
          if(err) return console.log(err);
          csv = export_csv
        });
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "download.csv");
      } catch (err) {
        console.error(err);
      }
    } else {
      var blob = new Blob(this.props.parent.state._rows.map(obj => JSON.stringify(obj)), {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "download.json");
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps(){
    const columnsData = this.getFormattedColumns()
    const pivotBy = this.props.parent.state.view.pivotBy


    if(pivotBy && pivotBy.length){
      columnsData.columns.map(value => {
        if(pivotBy.indexOf(value.accessor) > -1){
          value.aggregate = (vals => {
            return [...new Set(vals)]
          }),
          value.Aggregated = (row => {
            return (<span>{row.value}</span>)
          })
        }

        if (value.dedup){
          value.aggregate = (vals => {
            var unique_list = Array.from(new Set(vals)).filter(val => [null, undefined, 'null'].indexOf(val) === -1)
            return unique_list.join(', ')
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
      placeholder: `Manage Columns ${columnsData.shownColumnsCount}/${columnsData.columns.length}`
    })
  }

  getFormattedColumns(){
    let columns = this.props.parent.state.view.columns
    const shownColumnsCount = columns.filter(c => c.show).length
    columns = columns.map((d,idx) => {
      d.idx = idx
      d.Cell = (props) => {
        let value = this.toTitleCase(props.value)

        let html = null
        if(props.column.filter_values && value){
          props.column.filter_values.forEach(filter_value => {
            value = value.replace(filter_value, "")
          })
          value = value.trim().replace(':', '').replace(new RegExp("^s ", "i"), "")
        }
        if(props.column.split && value){
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
                     • {v.trim()}
                    </li>
                  )
                }
              </ol>
            )
          }
        }

        if (props.column.type === "date") {
          value = Moment(value).format('MM/DD/YYYY')
        }

        if (html === null) {
          html = (
            <span
              style={{
                whiteSpace: "initial"
              }}
            >
              { value }
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

    if(this.props.parent.state._rows === undefined){
      return (<span/>)
    }

    return (
      <div>
        <div style={{
          height: 40,
          display:"flex",
          justifyContent: "space-between",
          paddingTop: 40,
          paddingBottom: 43
        }}>
          {/* <p >{this.props.parent.state._rows.length} matches out of {this.props.parent.state.totalRecords}</p> */}
          <div style={{
            display: "flex"
          }}>
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
              ref={(ref)=>{this.DOMNode = ref}}
              removeSelected={false}
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
                options={this.props.parent.state.dataset.exportOptions}
                resetValue="Header"
                ref={(ref)=>{this.DOMNode = ref}}
                removeSelected={false}
                clearable={false}
                closeOnSelect={true}
                placeholder={"Export"}
              />
            </div>
          </div>
        </div>
        <ReactTable
          data={this.props.parent.state._rows}
          pageSize={this.state.pageSize}
          columns={this.state.columns}
          pivotBy={this.state.pivotBy}
          defaultPageSize={this.props.parent.state._rows.length}
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
          filterable={true}
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

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fontSize={8} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
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
      <BarChart
        ref="bar"
        data={this.props.infographics.state.data}
        {...this.props.parent.state.infographicsConfig.barChart}
      >
        <XAxis dataKey="name" interval={0} tick={<CustomizedAxisTick/>}/>
        <YAxisR/>
        <CartesianGrid strokeDasharray="8 8"/>
        <Tooltip/>
        <Bar
          dataKey="substance_name"
          fill="#8884d8"
          barCategoryGap={"50%"}
          barGap={"50%"}
        />
      </BarChart>
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
  }

  componentDidMount () {
    this.onClick(this.props.parent.state.infographicsConfig.pieChart.default, this.props.parent.state.infographicsConfig.pieChart.default.index)
  }

  onClick(obj, index){
    if(this.refs && this.props.infographics.state.categories.length){
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
      const viewBox = this.props.parent.state.infographicsConfig.pieChart.viewBox
      this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.x = viewBox.x
      this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.y = viewBox.y
      this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.width = viewBox.width
      this.refs.child.refs.pieChart.container.children[0].viewBox.baseVal.height = viewBox.height
    }

    return (
      <div className="collapsible-container">
        {
          this.props.infographics.state.categories.length ?
            <TwoLevelPieChart
              onClick={this.onClick}
              data={this.props.infographics.state.categories}
              parent={this}
              ref="child"
              {...this.props.parent.state.infographicsConfig.pieChart}
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
    this.onYearToggle(this.props.parent.state.infographicsConfig.select.default)

    const all = [{
      value: "All",
      label: "All"
    }]
    const now = new Date()
    const that = this
    let yearsRange = _.range(this.props.parent.state.infographicsConfig.select.startYear, now.getFullYear()+1)
    yearsRange = yearsRange.filter(v => {
      return this.props.parent.state.infographicsConfig.select.yearsWithNoData.indexOf(v) === -1
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
    if(!Object.keys(this.props.parent.state.infographicsConfig).length){
      return
    }
  }

  getBarChartData(obj, index) {
    if(!obj.full_name){
      if(this.state.categories.length){
        const defaultCategory = this.state.categories[index]
        obj.full_name = defaultCategory.full_name
      }
    }

    const countBy = this.props.parent.state.infographicsConfig.pieChart.barChartCountBy
    const path = `${this.props.parent.state.dataset.url}/${this.props.parent.state.dataset.endpoint}`
    let url = `${path}?count=${countBy}&search=${this.props.parent.state.infographicsConfig.pieChart.countBy}:"${obj.full_name}"`
    let data = []

    if (this.state.yearSelection.value !== "All") {
      url += `+AND+${this.props.parent.state.infographicsConfig.pieChart.dateField}:[${this.state.yearSelection.value}0101+TO+${this.state.yearSelection.value}1231]`
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
          }).slice(0,this.props.parent.state.infographicsConfig.barChart.limiter)
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
    let url = `${this.props.parent.state.dataset.url}/${this.props.parent.state.dataset.endpoint}?count=${this.props.parent.state.infographicsConfig.pieChart.countBy}&`
    if(selection.value !== "All"){
      url += `search=${this.props.parent.state.infographicsConfig.pieChart.dateField}:[${selection.value}0101+TO+${selection.value}1231]`
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
              id: this.props.parent.state.infographicsConfig.pieChart.categories[category.term],
              name: this.props.parent.state.infographicsConfig.pieChart.categories[category.term],
              pct: `${pct}%`,
              value: category.count,
              textLabel: this.props.parent.state.infographicsConfig.pieChart.textLabel,
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
          const defaultIndex = that.props.parent.state.infographicsConfig.pieChart.default.index
          // this.getBarChartData(categories[defaultIndex], defaultIndex)
          that.refs.parent.onClick(categories[defaultIndex], defaultIndex)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render (): ?React.Element {
    if(!Object.keys(this.props.parent.state.infographicsConfig).length){
      return (<span/>)
    }

    this.onOpen()
    return (
      <div>
        <Collapsible
          trigger={this.props.parent.state.infographicsConfig.collapsible.title}
          onOpen={this.onOpen}
          open={true}
        >
          <div className="infographic-title-div">
            <h3>{this.props.parent.state.infographicsConfig.select.title}</h3>
            <h3 className="infographic-barchart-title">{this.props.parent.state.infographicsConfig.barChart.title}</h3>
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
            ref={(ref)=>{this.DOMNode = ref}}
            removeSelected={false}
            clearable={false}
            closeOnSelect={true}
            placeholder={"Select Year"}
          />
          <div style={{display:"flex"}}>
            <PieChartComponent
              parent={this.props.parent}
              infographics={this}
              onClick={this.getBarChartData}
              ref="parent"
            />
            <BarChartComponent
              parent={this.props.parent}
              infographics={this}
            />
          </div>
        </Collapsible>
      </div>
    )
  }
}

class ResultsInfographicLineBarComponent extends React.Component {

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
      config: {
        "chartRow": {
          "height": 200,
          "trackerInfoWidth": 130
        },
        "chartContainer": {
          "width": 500,
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
          "label": "Reaction Frequency",
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
          "infoTimeFormat":"%m-%Y",
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
    this.transpose = this.transpose.bind(this)
    this.getBarChartData = this.getBarChartData.bind(this)
  }

  componentDidMount () {
    this.getLineChartData()
    this.getBarChartData()
  }
  componentDidUpdate() {
    if(!Object.keys(this.props.parent.state.infographicsConfig).length){
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

  getLineChartData(){
    let url = `${this.props.parent.state.dataset.url}/${this.props.parent.state.dataset.endpoint}?count=${this.props.parent.state.infographicsConfig.lineChart.countBy}`

    fetch(`${url}`)
      .then(res => res.json())
      .then((json) => {
        if(json.results){

          let options = json.results.filter(value => value.term.indexOf("'") === -1).map(term => {
            return term.term
          }).slice(0,4)

          let data = []

          const urls = options.map(option => {
            return `${this.props.parent.state.dataset.url}/${this.props.parent.state.dataset.endpoint}?search=${this.props.parent.state.infographicsConfig.lineChart.countBy}:"${option}"&count=${this.props.parent.state.infographicsConfig.lineChart.dateField}`
          })

          Promise.all(urls.map($.getJSON)).then(results => {
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
                  return [new Date(i.term,1,1), i.count]
                })
              }).toJSON()

              if (series !== undefined) {
                listOfSeries.push(series.points)
              }
            }

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

            var series = new TimeSeries({
              name: "timeseries",
              columns: ["time"].concat(options),
              points: final
            })

            // set style according to categories
            var legendStyle = styler(options.map((column,idx)=> {
              return {
                key: column,
                color: this.state.config.colors[idx],
                width: 2
              }
            }))

            this.setState({
              timerange: new TimeRange(new Date(2014,1,1), new Date()),
              _max: Math.max(...findMax),
              legendStyle: legendStyle,
              series: series,
              columns: options,
              legendCategories: options.map(d => ({ key: d, label: d }))
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

  getBarChartData() {
    const path = `${this.props.parent.state.dataset.url}/${this.props.parent.state.dataset.endpoint}`
    let url = `${path}?count=${this.props.parent.state.infographicsConfig.barChart.countBy}`
    let data = []

    fetch(url)
      .then(res => res.json())
      .then((json) => {
        if (json.results) {
          data = json.results.map(value => {
            return {
              name: value.term,
              substance_name: value.count,
              amt: value.count
            }
          }).slice(0,this.props.parent.state.infographicsConfig.barChart.limiter)
        } else {
          console.log('????')
        }
        this.setState({data})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onSelectionChange(selectionObj) {
    console.log(selectionObj)
  }

  render (): ?React.Element {
    if(!Object.keys(this.props.parent.state.infographicsConfig).length){
      return (<span/>)
    }

    return (
      <div>
        <Collapsible
          trigger={this.props.parent.state.infographicsConfig.collapsible.title}
          onOpen={this.onOpen}
          open={true}
        >
          { this.state.series.length === 0 ?
            <div className="infographic-loading-div">
              <img src="/img/loading.gif" className="infographic-loading-img"/>
            </div>
            :
            <div style={{display:"flex"}}>
              <div style={{
                width: 550,
                marginTop: 18
              }}>
                <h3
                  style={{
                    paddingLeft: "15%",
                    paddingBottom: 15
                  }}
                >{this.props.parent.state.infographicsConfig.lineChart.title}</h3>
                <ChartContainer
                  timeRange={this.state.timerange}
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
                        onSelectionChange={this.onSelectionChange}
                        {...this.state.config.lineChart}
                      />
                    </Charts>
                  </ChartRow>
                </ChartContainer>
                <div style={{paddingLeft:105}}>
                  <Legend categories={this.state.legendCategories} style={this.state.legendStyle} type="line" />
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <h3
                  style={{
                    paddingLeft: "36%",
                    paddingBottom: 15
                  }}
                >{this.props.parent.state.infographicsConfig.barChart.title}</h3>
                <BarChartComponent
                  parent={this.props.parent}
                  infographics={this}
                />
              </div>
            </div>
          }
        </Collapsible>
      </div>
    )
  }
}


class SelectedFiltersComponent extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {}
    this.formatValues = this.formatValues.bind(this)
    this.removeValue = this.removeValue.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  componentDidMount () {
  }

  removeValue(idx, valueIdx){
    const filter = this.props.parent.state.filters[idx]
    if(!filter){ return }

    if(filter.value.length && valueIdx){
      filter.value.splice(valueIdx, 1)
    } else {
      filter.value.splice(0, filter.value.length)
    }

    this.props.parent.state.filters[idx].value = filter.value

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  clearAll(){
    this.props.parent.setState({
      filters: this.props.parent.state.filters.map((filter, idx) => {
        if(filter.query_type !== "range"){
          filter.value = []
        }
        return filter
      })
    })
  }

  formatValues(values){
    const filters = []
    this.props.parent.state.filters.forEach((filter,idx) => {
      if (
        filter.query_type === "term" &&
        filter.type === "checkbox"
      ){
        filter.value.forEach( (f, valueIdx) => {
          var valueObj = filter.options.filter(o => o.value === f)
          if(valueObj.length){
            filters.push({
              value: valueObj[0].label,
              label: filter.label,
              query_type: filter.query_type,
              idx: idx,
              valueIdx: valueIdx
            })
          }
        })
      } else if(
        filter.query_type === "range" &&
        filter.value.length
      ){
        const startDay = Moment(filter.value[0]).format('MM/DD/YYYY')
        const endDay = Moment(filter.value[1]).format('MM/DD/YYYY')
        filters.push({
          value: `${startDay} - ${endDay}`,
          label: filter.label,
          query_type: filter.query_type,
          idx: idx
        })
      } else if (
        filter.query_type === "term" &&
        filter.type === "yearpicker" &&
        filter.value.length
      ) {
        filters.push({
          value: `${filter.value[0]} - ${filter.value[filter.value.length - 1]}`,
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
          filters.push({
            value: f,
            label: filter.label,
            query_type: filter.query_type,
            idx: idx,
            valueIdx: valueIdx
          })
        })
      }
    })

    return filters.map((filter, idx) => {
      return (
        <button
          key={`button${idx}`}
          onClick={() => this.removeValue(filter.idx, filter.valueIdx)}
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
    const filters = this.formatValues()
    return (
      <div className='content-selected-filters'>
        <h3>Selected Filters:</h3>
        <div>
          {filters}
          <a onClick={ () => this.clearAll() }>Clear All</a>
        </div>
      </div>
    )
  }
}

class DatasetExplorerContentComponent extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {

    let infographic = null

    if (this.props.visualization === true) {
      if (Object.keys(this.props.parent.state.infographicsConfig).length) {
        if (this.props.parent.state.infographicsConfig.type === "pieBar") {
          infographic =
            <ResultsInfographicPieBarComponent
              parent={this.props.parent}
            />
        } else if (this.props.parent.state.infographicsConfig.type === "lineBar") {
          infographic =
            <ResultsInfographicLineBarComponent
              parent={this.props.parent}
            />
        }
      }
      return (
        <div className={'dataset-explorer-content '} id='dataset-explorer-content'>
          <div>
            {
              infographic
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className={'dataset-explorer-content '} id='dataset-explorer-content'>
          <div>
            <SelectedFiltersComponent
              parent={this.props.parent}
            />
          </div>
          <ResultsComponent
            parent={this.props.parent}
          />
        </div>
      )
    }
  }
}

export default DatasetExplorerContentComponent



