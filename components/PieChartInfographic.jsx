/* @flow */

import React from 'react'

import { Pie } from 'nivo'

import { TimeSeries, TimeRange, sum } from "pondjs";
import { Series, DataFrame } from 'pandas-js';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,Resizable, styler, Legend } from "react-timeseries-charts"
import { API_LINK } from '../constants/api'
import _ from 'lodash';
import Sparkline from 'react-sparkline';
import Parser from 'html-react-parser';

window.$ = $;

class PieChartInfographic extends React.Component {

   constructor (props: Object) {
    super(props)

    if(
        this.props.api == undefined || 
        this.props.infographicDefinitions === undefined
      ) {
      throw "Invalid Props"
    }


    const now = new Date()
    const currentYear = now.getFullYear()
    const minTime = new Date(this.props.infographicDefinitions.startYear,1,1);

    this.state = {
      eventApi : "/device/event",
      maxLimit: 1000,
      nameCountBy: "device.generic_name.exact",
      API_LINK: API_LINK,
      defs: {
        "1": "Class I (low to moderate risk)",
        "2": "Class II \n(moderate to high risk)",
        "3": "Class III (high risk)",
        "U": "Unclassified",
        "N": "Not classified",
        "f": "HDE"
      },
      classSelection: null,
      minTime: minTime,
      maxTime: now,
      defaultTimeRange: new TimeRange([minTime, now]),
      selection:  null,
      tracker:   null,
      sparklineData:  null,
      lineChartColumns: [],
      trackerInfoValues: "",
      width: this.props.infographicDefinitions.lineChartConfig.width
    };

    // functions
    this.onClick = this.onClick.bind(this)
    this.onHighlightChange = this.onHighlightChange.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onTrackerChanged = this.onTrackerChanged.bind(this)
    this.handleChartResize = this.handleChartResize.bind(this)
  }

  componentDidMount () {
    this._getAllData().then((res) => {
      this.setState({
        data: res.data,
        timerange: new TimeRange(this.state.minTime, this.state.maxTime),
      })
      this.onClick({"data":{"id":2}}, null)
    })
  }

  fetchJSON (url: string): Object {  
    return new Promise((resolve, reject) => {
      $.getJSON(url)
        .done((json) => resolve(json, url))
        .fail((xhr, status, err) => reject(status + err.message));
    });
  }

  _getAllData () {
    const that = this;
    var urls = [`${that.state.API_LINK}${that.props.api}.json?count=${that.props.infographicDefinitions.countBy}`]

    let filesPromise = Promise.resolve([]);
    filesPromise = Promise.all(urls.map(this.fetchJSON)).then(function(results) {

      var res = results[0].results

      var total = res.map( (item) => {
        return item.count
      }).reduce((a, b) => a + b, 0);

      var data = res.map( (item) => {
        return {
          "id": item.term,
          "label": that.state.defs[item.term],
          "value": item.count,
          "pct": (item.count / total).toLocaleString("en", {style: "percent"})
        }
      })

      return { 
        "data": data
      }
    })

    return filesPromise

  }

  onClick (data, event){
    ////
    // 1) get product codes - https://api.fda.gov/device/recall.json?search=openfda.device_class:2&count=product_code
    // 2) for product_code in product_codes[:10]:
    //  use api to define product code
    //  3) for each product code get the timeseries 
    // 2) for each product code create a line and name it with device classification 
    //
    /////
    if(this.state.classSelection === data.data.id){
      return
    }

    const that = this;
    var subfields_url = `${that.state.API_LINK}${that.props.api}.json?search=${that.props.infographicDefinitions.countBy}:${data.data.id}&count=${that.props.infographicDefinitions.subfield}`

    fetch(subfields_url)
      .then(res => res.json())
      .then(res => {
        var terms = {};

        var timeseries_urls = res.results.map( value => `${that.state.API_LINK}${that.props.api}.json?search=${that.props.infographicDefinitions.countBy}:${data.data.id}+AND+${that.props.infographicDefinitions.subfield}:${value.term}&count=${that.props.infographicDefinitions.dateField}`);

        let filesPromise = Promise.resolve([]);
        filesPromise = Promise.all(timeseries_urls.map(this.fetchJSON)).then( results => {
          var columns = res.results.map( value => value.term )
          
          const dataset = []

          for (var i = 0, len = results.length; i < len; i++) {
            var series = new TimeSeries({
              name: "timeseries",
              columns: ["time","value"],
              points: results[i].results.map(function(i){
                  let x = i.time.slice(0,4) + '-' + i.time.slice(4,6) + '-' + i.time.slice(6,8)
                  return [new Date(x), i.count]
             }) 
            }).yearlyRollup({
              aggregation: {
                value: {
                  value: sum()
                }
              },
              toTimeEvents : true
            }).toJSON()
            
            dataset.push(series.points)
          }

          var dataKeys = {};

          dataset.forEach( arr => {
            arr.forEach( val => {
              dataKeys[val[0]] = 0 
            })
          })

          var dataKeys = Object.keys(dataKeys).sort();

          var keysPosition = {};
          dataKeys.forEach( (key, i) => keysPosition[key] = i );

          // normalize
          const items = []
          dataset.forEach( arr => {
            const item = new Array(dataKeys.length).fill(0);

            arr.forEach( val => {
              var key = val[0],
                  value = val[1],
                  index = keysPosition[key];
              item[index] = value
            })
            items.push(item)
          })

          const final = [];


          // transpose..... list of points in a series to a list of points for a timestamp
          var findMax = []
          var rows = []
          for (var i = 0, len_i = items[0].length; i < len_i; i++) {
            var row = []
            for (var j = 0, len_j = items.length; j < len_j; j++) {
              var val = items[j][i] || 0
              row.push(val)
              findMax.push(val)
            }
            rows.push(row)
          }
          dataKeys.forEach( (key, i) => {
            final.push([parseInt(key)].concat(rows[i])) 
          });

          var series = new TimeSeries({
            name: "timeseries",
            columns: ["time"].concat(columns),
            points: final
          })

          // set categories
          var categories = columns.map(column => {
            return {
              key: column,
              label: column[0].toUpperCase() + column.slice(1,column.length),
              value: null
            }
          })
          var colorRange = d3.scale.linear().domain([0, 10, 35]).range(["LightSalmon", "darkred", "DarkOrange"]);

          const customColorsList = [
            "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
            "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
            "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
            "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5","#00008B"
        ];

          // set style according to categories
          var legendStyle = styler(columns.map((column,idx)=> {
            console.log(colorRange(idx), idx)
            return {
              key: column,
              color: customColorsList[idx],
              width: 2
            }
          }))


          that.setState({
            legendStyle,
            categories,
            selectedClassName: this.state.defs[data.data.id],
            sparklineData: series,
            sparklineDataMax: Math.max(...findMax),
            lineChartColumns: ["time"].concat(columns),
            classSelection: data.data.id
          })

          this.onSelectionChange(categories[0].key)
          $(".fOXeFO").removeClass("fOXeFO")
        })
      })
  }

  onHighlightChange (highlight){
    // console.log(highlight)
    // this.setState({ highlight })
  }
  onSelectionChange(selection) {
    this.setState({ 
      selection,
      selectionName: selection[0].toUpperCase() + selection.slice(1,selection.length)
    })
    this.onTrackerChanged(this.state.tracker, selection)
  }
  onTrackerChanged(tracker, selection) {
    if(!this.state.categories || !this.state.sparklineData){
      return;
    }
    let index;
    try{
      index = this.state.sparklineData.bisect(tracker);
    } catch (e) {
      return;
    }
    const trackerEvent = this.state.sparklineData.at(index);
    
    var highlight = this.state.highlight;
    var selection = selection || this.state.selection;

    var categories = [],
        trackerInfoValues = [];
    this.state.categories.forEach((value, idx) => {
      var num = trackerEvent.get(value.key)
      // value.value = num
      
      categories.push(value)
      if(value.key === selection){
        trackerInfoValues.push({
          label: value.key[0].toUpperCase() + value.key.slice(1,value.key.length),
          value: num.toString()
        })
      }
    })
    this.setState({
      categories,
      trackerInfoValues,
      tracker
    })
  }
  handleChartResize(width){
    this.setState({width})
  }

  render (): ?React.Element {
    if (!this.state.data) return <span />

    const timeStyle = {
        fontSize: "1.2rem",
        color: "#999"
    };

    return (
        <section className='float-r infographic-container'>
        <div>
          {Parser(this.props.infographicDefinitions.title)}
          <hr className="datamap-hr"/>
          <Pie
            data={this.state.data}
            width={400}
            height={400}
            onClick={this.onClick}
            margin={{
                "top": 80,
                "right": 80,
                "bottom": 80,
                "left": 80
            }}
            sortByValue={false}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors="d310"
            colorBy="id"
            borderWidth={0}
            borderColor="inherit:darker(0.6)"
            enableRadialLabels={false}
            radialLabel="label"
            radialLabelsSkipAngle={90}
            radialLabelsTextXOffset={1}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            enableSlicesLabels={true}
            sliceLabel="pct"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#FFFFFF"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
        /> 
        </div>
        <p className='datamap-infographic-header-params'> 
              {this.props.infographicDefinitions.subtitle} for <i className='datamap-infographic-header-text-bold'>{this.state.selectionName} Medical Speciality</i> in <i className='datamap-infographic-header-text-bold'>{this.state.selectedClassName}</i>
            </p>
        <div className="flex-box">
        { !this.state.sparklineData ? null : 
              <ChartContainer 
                timeRange={this.state.timerange} 
                enablePanZoom={this.state.enablePanZoom}
                onTimeRangeChanged={timerange => { this.setState({ timerange }) }}
                trackerPosition={this.state.tracker}
                onTrackerChanged={this.onTrackerChanged}
                minTime={this.state.minTime}
                maxTime={this.state.maxTime}
                showGrid={this.props.infographicDefinitions.lineChartConfig.showGrid}
                onChartResize={this.handleChartResize}
                width={this.props.infographicDefinitions.lineChartConfig.width}
              >
                  <ChartRow 
                    trackerInfoValues={this.state.trackerInfoValues}
                    {...this.props.infographicDefinitions.lineChartConfig.chartRow}
                  >
                      <YAxis 
                        id="axis1"
                        max={this.state.sparklineDataMax}
                        {...this.props.infographicDefinitions.lineChartConfig.yAxis}
                      />
                      <Charts>
                          <LineChart 
                            style={this.state.legendStyle}
                            axis="axis1"
                            series={this.state.sparklineData}
                            columns={this.state.lineChartColumns}
                            interpolation={this.props.infographicDefinitions.lineChartConfig.interpolation}
                            highlight={this.state.highlight}
                            onHighlightChange={this.onHighlightChange}
                            selection={this.state.selection}
                            onSelectionChange={this.onSelectionChange}
                          />
                      </Charts>
                  </ChartRow>
              </ChartContainer>
            }
          { !this.state.sparklineData ? null :
            <div className="piechart-timeseries">
              <Legend
                  type="swatch"
                  align="right"
                  style={this.state.legendStyle}
                  highlight={this.state.highlight}
                  onHighlightChange={this.onHighlightChange}
                  selection={this.state.selection}
                  onSelectionChange={this.onSelectionChange}
                  categories={this.state.categories}
              />
            </div>
          }
          
        </div>
        </section>
    )
  }
}

  export default PieChartInfographic


