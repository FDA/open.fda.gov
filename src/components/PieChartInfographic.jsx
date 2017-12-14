/* @flow */

import React from 'react'

import { TimeSeries, TimeRange, sum } from "pondjs";
import { Series, DataFrame } from 'pandas-js';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,Resizable, styler, Legend, TimeMarker } from "react-timeseries-charts"
import { API_LINK } from '../constants/api'
import _ from 'lodash';
import Parser from 'html-react-parser';
import {default as $} from "jquery";
import TwoLevelPieChart from './InteractivePie';
import { PieChart, Pie, Sector } from "Recharts";
import calculateSize from 'calculate-size';



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
    const maxTime = new Date(currentYear+1,1,1)
    const minTime = new Date(this.props.infographicDefinitions.startYear,1,1);

    this.state = {
      eventApi : "/device/event",
      maxLimit: 1000,
      nameCountBy: "device.generic_name.exact",
      API_LINK: API_LINK,
      classSelection: null,
      minTime: minTime,
      maxTime: maxTime,
      selection:  null,
      tracker:   null,
      sparklineData:  null,
      lineChartColumns: [],
      trackerInfoValues: "",
      trackerTimeFormat:"%Y",
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
    this[this.props.infographicDefinitions.dataFunction]().then((res) => {
      this.setState({
        data: res,
        timerange: new TimeRange(this.state.minTime, this.state.maxTime), 
      })
      this.onClick(this.props.infographicDefinitions.pieChartConfig.default, null)
    })
  }

  fetchJSON (url: string): Object {  
    return new Promise((resolve, reject) => {
      $.getJSON(url)
        .done((json) => resolve(json, url))
        .fail((xhr, status, err) => reject(status + err.message));
    });
  }

  setPieChartText(){
    $("#textLabel1").text(this.props.infographicDefinitions.pieChartConfig.textLabel[0])
    $("#textLabel2").text(this.props.infographicDefinitions.pieChartConfig.textLabel[1])
  }

  _getAllDataByFields () {

    var urls = [`${this.state.API_LINK}${this.props.api}.json?count=${this.props.infographicDefinitions.fields.subsetField}`]
    const itemPromises = urls.map(this.fetchJSON);
    return Promise.all(itemPromises).then((results) => {
      var that = this;
      var terms = {}
      results[0].results.map((item) => {
        terms[item.term] =  item.count  
      })
      var total = terms[that.props.infographicDefinitions.fields.subsetValue]

      return {
        "fieldTotal": total
      }
    }).then( (data) => {
      var that = this;
      var xUrls = this.props.infographicDefinitions.fields.categories.map((category) => {
        return `${this.state.API_LINK}${this.props.api}.json?count=${category}`
      })

      var final = []
      var yterms = []
      const XTermsPromises = xUrls.map(this.fetchJSON);
      return Promise.all(XTermsPromises).then((xresults) => {
        var that = this;
        var dataLocal = data;

        var res = _.zip(xresults, this.props.infographicDefinitions.fields.categories)

        var total = res.map( (item) => {
          return item.count
        }).reduce((a, b) => a + b, 0);

        return res.map( (item) => {
          var data = dataLocal;
          var id = item[1];
          var terms = {}
          item[0].results.map((val) => {
            terms[val.term] = val.count
          })
          var count = terms[that.props.infographicDefinitions.fields.subsetValue];

          return {
            "id": id,
            "name": that.props.infographicDefinitions.defs[id],
            "value": count,
            "pct": (count / data['fieldTotal']).toLocaleString("en", {style: "percent"})
          }
        })
      })
    })
  }

  _getAllData () {
    const that = this;
    var urls = [`${that.state.API_LINK}${that.props.api}.json?count=${that.props.infographicDefinitions.countBy}`]

    return Promise.all(urls.map(this.fetchJSON)).then(function(results) {

      /// Order, get total, and filter

      /// ordering
      let res;
      if(that.props.infographicDefinitions.pieChartConfig.sort === undefined){
        res = results[0].results
      } else if (that.props.infographicDefinitions.pieChartConfig.sort === "descending"){
        res = results[0].results.sort()
      } else if (that.props.infographicDefinitions.pieChartConfig.sort === "ascending"){
        res = results[0].results.sort( (a,b) => a.count - b.count)
      }
      /// 

      var total = res.map( (item) => {
        return item.count
      }).reduce((a, b) => a + b, 0);

      /// filtering
      if(that.props.infographicDefinitions.excludeFields !== undefined){
        res = res.filter(value => {
          return (that.props.infographicDefinitions.excludeFields.indexOf(value.term) === -1)
        })  
      }
      ///

      return res.map( (item) => {
        return {
          "id": item.term,
          "name": that.props.infographicDefinitions.defs[item.term],
          "value": item.count,
          "pct": (item.count / total).toLocaleString("en", {style: "percent"})
        }
      })
    })
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
    if(this.state.classSelection === data.id){
      return
    }

    const that = this;
    let searchField;
    if(this.props.infographicDefinitions.dataFunction === "_getAllDataByFields"){
      searchField = `${data.id}:${this.props.infographicDefinitions.fields.subsetValue}`
    } else if (this.props.infographicDefinitions.dataFunction === "_getAllData") {
      searchField = `${that.props.infographicDefinitions.countBy}:${data.id}`
    }
    var subfields_url = `${that.state.API_LINK}${that.props.api}.json?search=${searchField}&count=${that.props.infographicDefinitions.subfield}`

    fetch(subfields_url)
      .then(res => res.json())
      .then(res => {
        // clean to original
        var terms = {};

        var localSearchField = searchField;

        var columns = res.results.filter( (value) => {
            var hasInvalidChar = value.term.indexOf("^") === -1 && 
                                 value.term.indexOf(",") === -1 &&
                                 value.term.indexOf("/") === -1

            var isAnAcceptedTerm = that.props.infographicDefinitions.acceptedTerms !== undefined ?
                                   that.props.infographicDefinitions.acceptedTerms[value.term] !== undefined : 
                                   true;
            return hasInvalidChar && isAnAcceptedTerm
          }).map(value => {
              var term = ""
              value.term.split(" ").forEach( (word,idx) => {
                if(idx > 0){
                  term += " "
                }
                if(word && word.length){
                  term += word[0].toUpperCase() + word.slice(1,word.length).toLowerCase().replace('.','')
                }
              })

              terms[term] = value.term

              return term
          })

          this.setState({
            terms
          })

        var timeseries_urls =  columns.map( value => {
          var dirtyValue = this.state.terms[value]
          return `${that.state.API_LINK}${that.props.api}.json?search=${searchField}+AND+${that.props.infographicDefinitions.subfield}:"${dirtyValue}"&count=${that.props.infographicDefinitions.dateField}`
        }).slice(0,that.props.infographicDefinitions.lineLimiter)

        let filesPromise = Promise.resolve([]);
        filesPromise = Promise.all(timeseries_urls.map(this.fetchJSON)).then( results => {
          var that = this;

          /// we only want to graph specific terms defined in acceptedTerms object
          if(that.props.infographicDefinitions.acceptedTerms !== undefined){
            columns = columns.filter(val => {
              return that.props.infographicDefinitions.acceptedTerms[val.toUpperCase()] !== undefined
            })
          }
          //////
          columns = columns.slice(0,that.props.infographicDefinitions.lineLimiter)
          
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

          var final = [];


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
            var int = parseInt(key)
            if(int > 0){
              final.push([int].concat(rows[i])) 
            }
          });


          var series = new TimeSeries({
            name: "timeseries",
            columns: ["time"].concat(columns),
            points: final.sort( (a,b) => a[0] - b[0])
          })

          // set categories
          var categories = columns.map(column => {
            return {
              key: column,
              label: column[0].toUpperCase() + column.slice(1,column.length),
              value: null
            }
          })
          var vals = columns.map((column,idx)=> {
            return {
              key: column,
              color: that.props.infographicDefinitions.lineChartConfig.customColorsList[idx],
              width: 2
            }
          })
          // set style according to categories
          var legendStyle = styler(vals)


          that.setState({
            legendStyle,
            categories,
            timerange: new TimeRange(new Date(series.toJSON().points[0][0]), that.state.maxTime),
            selectedClassName: that.props.infographicDefinitions.defs[data.id],
            sparklineData: series,
            sparklineDataMax: Math.max(...findMax),
            lineChartColumns: ["time"].concat(columns),
            classSelection: data.id
          })

          this.onSelectionChange(categories[0].key)
          
          var vals = $("text").filter(function () {
              return $(this).attr("transform") == "rotate(-90)"
          })
          if(vals.length){
            $(vals[0]).attr("x",that.props.infographicDefinitions.xLengendCoordinate)
          }
        })
      })
  }

  onHighlightChange (highlight){
    // console.log(highlight)
    // this.setState({ highlight })
  }

  onSelectionChange(selection) {
    var selectionName = this.props.infographicDefinitions.selectionPostFix !== undefined ? 
                        selection +  this.props.infographicDefinitions.selectionPostFix : 
                        selection;

    this.setState({ 
      selection,
      selectionName: selectionName
    })

    // calculate size of div for tooltip, add 35 for numbers
    // const size = calculateSize(selectionName, this.props.infographicDefinitions.tooltip)
    // $($('rect')[2]).css("width",size.width+35)

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
      // var num = trackerEvent.get(value.key)
      var num = trackerEvent.toJSON().data[value.key]
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

    const size = calculateSize(`${trackerInfoValues[0].label}: ${trackerInfoValues[0].value}`, this.props.infographicDefinitions.tooltip)
    setTimeout(() => this.setChartStyles(size),5)
  }

  setChartStyles(size){
    $($('rect')[2]).css("width",size.width+15)
  //   var vals = $("[style*='pointer-events']").filter(function () {
  //       return $(this).css('pointer-events') == 'none' && this.nodeName == "g" && $(this).find("text").length
  //   })
  //   if(vals.length){
  //     $(vals[0]).find("text").css("fill",this.props.infographicDefinitions.lineChartConfig.font.color)
  //   }
  }

  handleChartResize(width){
    this.setState({width})
  }

  render (): ?React.Element {
    if (!this.state.data) return <span />
      // <Pie
      //       data={this.state.data}
      //       onClick={this.onClick}
      //       {...this.props.infographicDefinitions.pieChartConfig}
      //   /> 


      var viewBox = this.props.infographicDefinitions.pieChartConfig.viewBox;
      $('.recharts-surface').removeAttr('viewBox');
      $('.recharts-surface').each(function () { $(this)[0].setAttribute('viewBox', viewBox) });
      $('.recharts-wrapper').width(this.props.infographicDefinitions.pieChartConfig.widthReset)
      this.setPieChartText()
      $(".sc-bdVaJa .cXgeQK").css("padding-top","2px")
      $("text").css("font-family",this.props.infographicDefinitions.lineChartConfig.font.fontFamily)
      $('text').css('fill', this.props.infographicDefinitions.lineChartConfig.font.color)



    return (
        <section className='infographic-container'>
        <div>
          {Parser(this.props.infographicDefinitions.title)}
          <hr className="datamap-hr"/>
          
        </div>


        <p className='pie-infographic-header-params'> 
          Number of &nbsp;
            <i className='datamap-infographic-header-text-bold'>
              {this.state.selectionName} 
            </i>
            {this.props.infographicDefinitions.xTitle}
            {this.props.infographicDefinitions.subtitle},
            <i className='datamap-infographic-header-text-bold'>
               &nbsp;{this.state.selectedClassName}
            </i>&nbsp;
            {this.props.infographicDefinitions.yTitle}&nbsp;
        </p>
        <div className="flex-box piechart-container">
          <TwoLevelPieChart
            onClick={this.onClick}
            data={this.state.data}
            {...this.props.infographicDefinitions.pieChartConfig}
          />
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
                    trackerTime={this.state.tracker}
                    trackerTimeFormat={this.state.trackerTimeFormat}
                    timeFormat={this.state.trackerTimeFormat}
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
        </div>
        { !this.state.sparklineData ? null :
            <div className="piechart-legend">
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
        </section>
    )
  }
}


  export default PieChartInfographic


