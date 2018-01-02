/* @flow */

import React from 'react'

import { API_LINK } from '../constants/api'
import { Series } from 'pandas-js';
import { HeatMap } from 'nivo'
import { Charts, ChartContainer, ChartRow, styler, YAxis, LineChart,Resizable } from "react-timeseries-charts"
import { TimeSeries, TimeRange, sum } from "pondjs";
import { default as Parser } from 'html-react-parser';
import { default as $ } from "jquery";
import { default as Tooltip } from 'rc-tooltip';
import { default as Slider } from 'rc-slider';
import _ from 'lodash';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class HeatMapInfographic extends React.Component {

   constructor (props: Object) {
    super(props)

    if(
        this.props.api === undefined || 
        this.props.infographicDefinitions === undefined 
      ) {
      throw "Invalid Props"
    }
    
    const now = new Date()
    const currentYear = 2017
    const years = _.range(this.props.infographicDefinitions.startYear, currentYear+1)
    const slider_marks = years.slice(1,100).reduce(function(result, item, index, array) {
      result[item] = item;
      return result;
    }, {})
    const minTime = new Date(this.props.infographicDefinitions.startYear,1,1);

    this.state = {
      API_LINK: API_LINK,
      api: this.props.api,
      selection:  null,
      tracker:   null,
      sparklineData:  null,
      timerange:  null,
      queries:  this.props.infographicDefinitions.queries,
      xTerms: [],
      xTermsReverse: [],
      step: 1,
      min: this.props.infographicDefinitions.startYear+1,
      max: currentYear,
      defaultValue: this.props.infographicDefinitions.defaults.year,
      currentValue: currentYear,
      startYear: this.props.infographicDefinitions.startYear,
      endYear: currentYear,
      countBy: this.props.infographicDefinitions.countBy,
      slider_marks: slider_marks,
      years: years,
      lineStyle: this.props.infographicDefinitions.chartConfig.lineStyle,
      minTime: minTime,
      maxTime: now,
      enablePanZoom: false,
      defaultTimeRange: new TimeRange([minTime, now]),
      _rows: [],
      original_rows: [],
      trackerInfoValues: "",
    }


    this.changeValue = this.changeValue.bind(this)
    this.onClick = this.onClick.bind(this)
    this.togglePanZoom = this.togglePanZoom.bind(this)
    this.onTrackerChanged = this.onTrackerChanged.bind(this)
  }

  componentDidMount () {
    this._getAllData().then((res) => {
      this.setState({
        all_data: res.data,
        keys: res.keys,
        data: res.data[this.state.defaultValue]
      })
      this.onClick(this.props.infographicDefinitions.defaults)
      $(".rc-slider-mark").css("font-size",this.props.infographicDefinitions.slider.style.fontSize)
      $(".rc-slider-mark").css("font-size",this.props.infographicDefinitions.slider.style.fontSize)
      $("text").css("font-size",this.props.infographicDefinitions.heatMapConfig.theme.fontSize)
      $("text").css("font-family",this.props.infographicDefinitions.heatMapConfig.theme.fontFamily)
      $("text").css("fill",this.props.infographicDefinitions.heatMapConfig.theme.fontColor)
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
    const l = Object.values(this.state.queries).map(q => q.query),
          urls = [],
          that = this;

    l.forEach(function(param){
      that.state.years.forEach(function(year){
        var url = `${that.state.API_LINK}${that.state.api}.json?search=${that.props.infographicDefinitions.dateField}[${year}0101+TO+${year}1231]`
        if(param != ""){
          url += "+AND+" + param
        }
        url += `&count=${that.state.countBy}`
        urls.push(url)
      })
    })

    const emptyYearsArray = this.state.years.map(y => 0);

    const itemPromises = urls.map(this.fetchJSON);
    return Promise.all(itemPromises).then((results) => {
      var d = [],
          e = {},
          allResult = {}, 
          final = {},
          keys = [],
          response = {},
          yearsObj = {};

      results.forEach(function(item, index) {
        var url = urls[index],
            urlSplit = url.split("&")[0].split("AND+"),
            s = urlSplit.length == 1 ? "all" : urlSplit[1].split(':')[1],
            dayRegex = /\d{1,8}/,
            dayRegexMatch = url.match(dayRegex),
            year = null,
            yearPosition = null;
        
        if(dayRegexMatch.length){
          year = parseInt(dayRegexMatch[0].slice(0,4))

          that.state.years.forEach(function(y, idx){
            if(y == year){
              yearPosition = idx;
            }
          })
        }

        var results = item.results.filter( res => {
          return res.term.indexOf("/") == -1 && res.term !== "None"
        })

        var terms = results.map(v => {
          // rename terms
          var d = v.term.split('('),
              renamedTerm = that.props.infographicDefinitions.xTerms[v.term],
              term = (renamedTerm === undefined ?  d[0] : renamedTerm);

          term = term.slice(0,1).toUpperCase() + term.slice(1,100).toLowerCase();

          if(that.props.infographicDefinitions.xTermsFormatting !== undefined){
            var reformatted = that.props.infographicDefinitions.xTermsFormatting[term]
            term = reformatted === undefined ?  term :  reformatted;
          }

          that.state.xTerms[d[0]] = term;
          that.state.xTermsReverse[term] = v.term;
          return term
        });

        // define data structure
        if(final[s] == undefined){
          var local_dict = {}
          terms.forEach(function(term){
            local_dict[term] = $.extend(true, [], emptyYearsArray)
          })
          final[s] = local_dict;
        } 
        // add extra categories
        else {
          terms.forEach(function(term){
            // term not found
            if(final[s][term] == undefined){
              final[s][term] = $.extend(true, [], emptyYearsArray)
            }
          })
        }

        // now that data structure has been built, add the data to timeseries for
        // coresponding year
        results.forEach(function(v){
          var d = v.term.split('(')[0];
          var term = that.state.xTerms[d];
          final[s][term][yearPosition] = v.count
        })        

      })

      var sorter = {};
      Object.keys(final.all).forEach(function(key){
        var sum = final.all[key].reduce(function (a, b) {
          return a + b;
        }, 0);
        sorter[key] = sum;
      })

      var sorted_keys = Object.keys(sorter).sort(function(a,b){return sorter[a]-sorter[b]}).reverse();

      sorted_keys.forEach(function(key, idx){
        if(idx <= 15){
          keys.push(key)
        }
        Object.keys(final).forEach(function(category){
          // remove keys after limit
          if(idx > 15){
            delete final[category][key]
          } 
          // make sure we fill keys with empty array if not already covered...
          else {
            if (final[category][key] == undefined){
              final[category][key] = $.extend(true, [], emptyYearsArray)
            }
          }
        })
      })

      Object.keys(final).forEach(function(k){
        response[k] = {}
        Object.keys(final[k]).forEach(function(category){
          const original_series = new Series(final[k][category])
          var r = original_series.diff().shift(-1)

          var g = _.zip(r._data._tail.array, original_series._data)
          
          var YOYs = [];

          g.forEach(function(zipped){
            if(zipped[0] != null){
              var z = null;
              if(zipped[0] > 0 && zipped[1] == 0){
                z = 1
              } else if (zipped[0] == 0 && zipped[1] == 0){
                z = 0
              } else {
                z = zipped[0]/zipped[1];
              }

              YOYs.push(z);
            }
          })

          response[k][category] = YOYs;
        })
      })

      that.state.years.slice(1,100).forEach(function(y,idx){
        var data = [];
        Object.keys(response).forEach(function(k){
          const f = {
            "_type": that.props.infographicDefinitions.queries[k].name
          }
          Object.keys(response[k]).forEach(function(category, index){
            var yoy = response[k][category][idx],
                shortenedCategory = category.slice(0,1) + category.slice(1,100).toLowerCase();
            f[category] = Math.floor(yoy * 100);
          })
          data.push(f)
        })
        yearsObj[y] = data;
      })

      return { 
        "data": yearsObj,
        "keys": keys
      }
    })
  }

  onClick(node, event){
    if(node.value === '-') return
    let yQueryInfo;
    if (node["yKey"].toLowerCase().split(' ')[0] === "all"){
      yQueryInfo = this.props.infographicDefinitions.queries["all"]
    } else {
      yQueryInfo = _.find(this.props.infographicDefinitions.queries, function(o) {
        return o.name === node["yKey"];
      })
    }
    var xKey = this.state.xTermsReverse[node['xKey']],
        yKey = yQueryInfo.query.toLowerCase() === "" ? "" :  ("+AND+" + yQueryInfo.query.toLowerCase()),
        url = `${this.state.API_LINK}${this.state.api}.json?search=${this.props.infographicDefinitions.countBy}:` + xKey + yKey + `&count=${this.props.infographicDefinitions.dateField}`,
        that = this,
        key = node['key'],
        color = node['color'];

    Promise.all([url].map(this.fetchJSON)).then(function(results) {
      var series = new TimeSeries({
        name: "timeseries",
        columns: ["time","value"],
        points: results[0].results.map(function(i){
            let x = i.time.slice(0,4) + '-' + i.time.slice(4,6) + '-' + i.time.slice(6,8)
            return [new Date(x), i.count]
       }) 
      }).monthlyRollup({
        aggregation: {
          value: {
            value: sum()
          }
        },
        toTimeEvents : true
      })

      var lineStyle = styler([{
          key: "value",
          color: color,
          width: 5
        }])


      that.setState({
        lineStyle,
        sparklineData: series,
        sparklindDataMax: series.max(),
        timerange: new TimeRange(that.state.minTime, new Date(that.state.currentValue+1, 1,20)),
        currentXkey: node['xKey'].charAt(0).toUpperCase() + node['xKey'].slice(1).toLowerCase(),
        currentYkey: yQueryInfo.name
      })

      that.onTrackerChanged(that.state.tracker)

      // adjust the y positioning of the y axis label
      var vals = $("text").filter(function () {
        return $(this).attr("transform") == "rotate(-90)"
      })
      if(vals.length){
        $(vals[0]).attr("x",that.props.infographicDefinitions.heatMapConfig.theme.yAxisPositioning)
      }

      $("text").css("font-family",that.props.infographicDefinitions.heatMapConfig.theme.fontFamily)
      $("text").css("fill",that.props.infographicDefinitions.heatMapConfig.theme.fontColor)

    })
  }

  changeValue (d){
    this.setState({
      currentValue : d,
      data: this.state.all_data[d],
      timerange: new TimeRange(this.state.minTime, new Date(d+1, 1,20))
    })
  }
  onTrackerChanged(tracker) {
    let index;
    try{
      index = this.state.sparklineData.bisect(tracker);
    } catch (e) {
      return;
    }

    var trackerInfoValues = [{
        label: "Value", 
        value: this.state.sparklineData.at(index).get("value").toString()
    }]
    this.setState({
      trackerInfoValues,
      tracker
    })
  }

  togglePanZoom (){
    this.setState({
      enablePanZoom: this.state.enablePanZoom ? false : true
    })
  }

  render (): ?React.Element {
    if (!this.state.data) return <span />

      // <div className="heatmap-header">
      //       <p className="interactive-infographic-center"> Selected Year - <i className="interactive-infographic-bold">{this.state.currentValue}</i></p>
      //     </div>

    $('text').css('fill', this.props.infographicDefinitions.chartConfig.font.color)

    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    return (
        <section className='infographic-container'>

          {Parser(this.props.infographicDefinitions.title)}
          <hr className="datamap-hr"/>
          <br/><br/>
          
          <div className="flex-box">
            <div className="infographic-slider">
                <Slider
                  min={this.state.min}
                  max={this.state.max}
                  defaultValue={this.state.defaultValue}
                  marks={this.state.slider_marks}
                  onAfterChange={this.changeValue}
                  step={this.state.step}
                  handle={handle}
                  vertical={true}
                  {...this.props.infographicDefinitions.slider}
                />
            </div>
            <div className="heatmap-infographic">
              <HeatMap
                data={this.state.data}
                keys={this.state.keys}
                onClick={this.onClick}
                {...this.props.infographicDefinitions.heatMapConfig}
              />
            </div>
          </div>
          <br/><br/>

          <div>
            <button className="heatmap-infographic-zoom-button" onClick={this.togglePanZoom }> { this.state.enablePanZoom ? 'Disable' : 'Enable' } Zoom</button>
            { !this.state.sparklineData ? null : 
              <p className="interactive-infographic-center"> 
                <span className="interactive-infographic-subtitle">{this.props.infographicDefinitions.yName}</span>: {this.state.currentYkey}<br/>
                <span className="interactive-infographic-subtitle">{this.props.infographicDefinitions.xName}</span>: {this.state.currentXkey} 
              </p> 
            }

            { !this.state.sparklineData ? null : 
              <div>
                <Resizable>
                  <ChartContainer 
                    timeRange={this.state.timerange} 
                    width={this.props.infographicDefinitions.chartConfig.width}
                    enablePanZoom={this.state.enablePanZoom}
                    onTimeRangeChanged={timerange => { this.setState({ timerange }) }}
                    trackerPosition={this.state.tracker}
                    onTrackerChanged={this.onTrackerChanged}
                    minTime={this.state.minTime}
                    maxTime={this.state.maxTime}
                    showGrid={this.props.infographicDefinitions.chartConfig.showGrid}
                  >
                      <ChartRow 
                        trackerInfoValues={this.state.trackerInfoValues}
                        {...this.props.infographicDefinitions.chartConfig.chartRow}
                      >
                          <YAxis 
                            id="axis1"
                            max={this.state.sparklindDataMax}
                            {...this.props.infographicDefinitions.chartConfig.yAxis}
                          />
                          <Charts>
                              <LineChart 
                                axis="axis1"
                                series={this.state.sparklineData}
                                style={this.state.lineStyle}
                                interpolation={this.props.infographicDefinitions.chartConfig.interpolation}
                                highlight={this.state.highlight}
                                onHighlightChange={highlight => this.setState({ highlight })}
                                selection={this.state.selection}
                                onSelectionChange={selection => this.setState({ selection })}
                              />
                          </Charts>
                      </ChartRow>
                  </ChartContainer>
                </Resizable>
              </div>
            }
          </div>
        </section>
    )
  }
}

export default HeatMapInfographic