/* @flow */

import React from 'react'

import { Pie } from 'nivo'

import { TimeSeries, TimeRange, sum } from "pondjs";
import { Series, DataFrame } from 'pandas-js';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,Resizable } from "react-timeseries-charts"
import { API_LINK } from '../constants/api'
import _ from 'lodash';
import Sparkline from 'react-sparkline';

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
      lineChartColumns: []
    };

    // /////////
    // this.state = {
    //   API_LINK: API_LINK,
    //   title: this.props.infographicDefinitions.title,
    //   api: this.props.api,
    //   selection:  null,
    //   tracker:   null,
    //   sparklineData:  null,
    //   timerange:  null,
    //   queries:  this.props.infographicDefinitions.queries,
    //   xTerms: [],
    //   step: 1,
    //   min: this.props.infographicDefinitions.startYear+1,
    //   max: currentYear,
    //   defaultValue: currentYear,
    //   currentValue: currentYear,
    //   startYear: this.props.infographicDefinitions.startYear,
    //   endYear: currentYear,
    //   countBy: this.props.infographicDefinitions.countBy,
    //   slider_marks: slider_marks,
    //   years: years,
    //   minTime: minTime,
    //   maxTime: now,
    //   enablePanZoom: false,
    //   defaultTimeRange: new TimeRange([minTime, now]),
    //   _rows: [],
    //   original_rows: []
    // }
    // ///////////////


    // functions
    this.onClick = this.onClick.bind(this)
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
        var sliced_data = res.results.slice(0,10)
        var classification_urls = sliced_data.map( value => `${that.state.API_LINK}${that.props.api}.json?search=${that.props.infographicDefinitions.subfield}:${value.term}`)
        var terms = {};
        sliced_data.forEach( value => terms[value.term] = {});

        let classification_urls_promise = Promise.resolve([]);
        classification_urls_promise = Promise.all(classification_urls.map(this.fetchJSON)).then( results => {
          results.forEach( (product_code_res,i) => {
            var d = product_code_res.results[0]
            terms[d.product_code].description =  d.openfda.device_name.split(',').splice(0,1)  + " - " + d.openfda.medical_specialty_description + i
          })
          that.setState({
            terms
          })
        })

        var timeseries_urls = sliced_data.map( value => `${that.state.API_LINK}${that.props.api}.json?search=${that.props.infographicDefinitions.countBy}:${data.data.id}+AND+${that.props.infographicDefinitions.subfield}:${value.term}&count=${that.props.infographicDefinitions.dateField}`);

        let filesPromise = Promise.resolve([]);
        filesPromise = Promise.all(timeseries_urls.map(this.fetchJSON)).then( results => {
          var columns = Object.values(that.state.terms).map( value => value.description )
          
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
            if(parseInt(key) === 1246553999999){
              console.log(1)
            }
            final.push([parseInt(key)].concat(rows[i])) 
          });

          console.log(final)

          var series = new TimeSeries({
              name: "timeseries",
              columns: ["time"].concat(columns),
              points: final
            })

          that.setState({
            sparklineData: series,
            sparklineDataMax: Math.max(...findMax),
            lineChartColumns: ["time"].concat(columns),
            classSelection: data.data.id
          })
        })
      })
  }

  render (): ?React.Element {
    if (!this.state.data) return <span />

    return (
        <section className='float-r infographic-container'>
        <div>
          { !this.state.sparklineData ? null : 
            <Resizable>
                <ChartContainer 
                  timeRange={this.state.timerange} 
                  width={this.props.infographicDefinitions.lineChartConfig.width}
                  enablePanZoom={this.state.enablePanZoom}
                  onTimeRangeChanged={timerange => { this.setState({ timerange }) }}
                  trackerPosition={this.state.tracker}
                  onTrackerChanged={tracker => this.setState({ tracker })}
                  minTime={this.state.minTime}
                  maxTime={this.state.maxTime}
                  showGrid={this.props.infographicDefinitions.lineChartConfig.showGrid}
                >
                    <ChartRow height={this.props.infographicDefinitions.lineChartConfig.chartRowHeight}>
                        <YAxis 
                          id="axis1"
                          max={this.state.sparklineDataMax}
                          {...this.props.infographicDefinitions.lineChartConfig.yAxis}
                        />
                        <Charts>
                            <LineChart 
                              axis="axis1"
                              series={this.state.sparklineData}
                              columns={this.state.lineChartColumns}
                              interpolation={this.props.infographicDefinitions.lineChartConfig.interpolation}
                              highlight={this.state.highlight}
                              onHighlightChange={highlight => this.setState({ highlight })}
                              selection={this.state.selection}
                              onSelectionChange={selection => this.setState({ selection })}
                            />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
              </Resizable>
            }
          </div>

          <Pie
            data={this.state.data}
            width={500}
            height={500}
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
          
       
        </section>
    )
  }
}

  export default PieChartInfographic


