/* @flow */

import React from 'react'

import { LongTextFormatter, DeviceFormatter, EventDescriptionFormatter, ShortTextFormatter} from '../utils/formatters'
import {InfographicLegend} from 'components/InfographicLegend'
import { Bar, Line, HeatMap } from 'nivo'
import $ from "jquery"
import { TimeSeries, sum} from "pondjs";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { Series, DataFrame } from 'pandas-js';
import { API_LINK } from '../constants/api'
// import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import _ from 'lodash';
import Sparkline from 'react-sparkline';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Datamap from 'react-datamaps';
import ReactDataGrid from 'react-data-grid';
import Parser from 'html-react-parser';


window.$ = $;

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


class DataMapInfographic extends React.Component {

   constructor (props: Object) {
    super(props)

    if(
        this.props.api == undefined || 
        this.props.infographicDefinitions === undefined
      ) {
      throw "Invalid Props"
    }
    const startYear = this.props.infographicDefinitions.startYear
    const now = new Date()
    const currentYear = now.getFullYear()
    const years = _.range(startYear, currentYear+1)
    const slider_marks = years.slice(1,100).reduce(function(result, item, index, array) {
      result[item] = item;
      return result;
    }, {})

    this.LongTextFormatter = LongTextFormatter
    this.DeviceFormatter = DeviceFormatter
    this.EventDescriptionFormatter = EventDescriptionFormatter
    this.ShortTextFormatter = ShortTextFormatter
  
    const dataGridProperties = this.props.infographicDefinitions.gridConfig.dataGridProperties.map((value) => {
      if(value.formatter !== undefined){
        value.formatter = this[value.formatter];
      } 
      return value;
    }, this)    

    this.state = {
      api: this.props.api,
      API_LINK: API_LINK,
      dateField: this.props.infographicDefinitions.dateField,
      defaultValue: currentYear, 
      currentValue: currentYear,
      max: currentYear,
      startYear: startYear,
      endYear: currentYear,
      countBy: this.props.infographicDefinitions.countBy,
      min: startYear+1,
      step: 1,
      slider_marks: slider_marks,
      years: years,
      selectedState: null,
      dataGridProperties: dataGridProperties,
      _rows: [],
      original_rows: [],
      bubbles: [{
        radius: 5,
        centered: this.props.infographicDefinitions.selectedState,
        fillColor: "#080808"
      }]
    };


    // functions
    this.rowGetter = this.rowGetter.bind(this)
    this.handleGridSort = this.handleGridSort.bind(this)
    this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this)
    this.mapOnClick = this.mapOnClick.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.fetchJSON = this.fetchJSON.bind(this)
  }

  componentDidMount () {
    this._getAllData().then((res) => {
      this.setState({
        all_data: res.data
      })

      this.setState({
        keys: res.keys,
        data: this._get_dataset(this.state.defaultValue),
        timeseries: res.timeseries
      })
      // use ajax request to get IP address and state
      const p2 = Promise.resolve(this.fetchJSON(this.props.infographicDefinitions.ipURL)).then( (res) => {
        this.setState({selectedState: res.region_code})
        this.mapOnClick()
      });
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
    var urls = this.state.years.map(year => 
      `${that.state.API_LINK}${that.state.api}.json?search=${that.state.dateField}:[${year}0101+TO+${year}1231]&count=${that.state.countBy}`
    ,that)

    const emptyYearsArray = this.state.years.map(y => 0);

    let filesPromise = Promise.resolve([]);
    filesPromise = Promise.all(urls.map(this.fetchJSON)).then(function(results) {
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

          var terms = item.results.filter(function(v) {
            if (!v.term || v.term === "*") {
              return false;
            }
            return true;
          }).map(v => {
            var d = v.term.split('(')
            return d[0]
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
          item.results.filter(function(v) {
            if (!v.term || v.term === "*") {
              return false;
            }
            return true;
          }).forEach(function(v){
            var term = v.term.split('(')[0]
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
          keys.push(key)
          Object.keys(final).forEach(function(category){
            // remove keys after limit
            // make sure we fill keys with empty array if not already covered...
            if (final[category][key] == undefined){
              final[category][key] = $.extend(true, [], emptyYearsArray)
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
          const f = {}
          Object.keys(response[k]).forEach(function(category, index){
            var yoy = response[k][category][idx];
            f[category] = Math.floor(yoy * 100)
          })
          data.push(f)
        })
        yearsObj[y] = data;
      })

      return { 
        "data": yearsObj,
        "keys": keys,
        "timeseries": response
      }
    })

    return filesPromise

  }

  changeValue (d){
    if(d === this.state.currentValue){
      return;
    }
    // set current year
    this.setState({
      currentValue : d,
      data: this._get_dataset(d)
    })
    this.mapOnClick(undefined, undefined, d)
  }

  _get_dataset (d, all_data) {
    var all_data = (all_data !== undefined) ? all_data[d][0] : undefined,
        data = (this.state.all_data[d] !== undefined) ? this.state.all_data[d][0] : all_data,
        dataset = {},
        onlyValues = Object.values(data);

    var minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues),
        paletteScaleGreen1 = d3.scale.linear()
            .domain([ -500, -1])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb(this.props.infographicDefinitions.colorCodes.greens[1]), d3.rgb(this.props.infographicDefinitions.colorCodes.greens[0])]),
        paletteScaleGreen2 = d3.scale.linear()
            .domain([ -1000, -501])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb(this.props.infographicDefinitions.colorCodes.greens[2]), d3.rgb(this.props.infographicDefinitions.colorCodes.greens[1])]),
        paletteScaleRed1 = d3.scale.linear()
            .domain([1, 500])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb(this.props.infographicDefinitions.colorCodes.reds[0]), d3.rgb(this.props.infographicDefinitions.colorCodes.reds[1])]),
        zeroGreen = this.props.infographicDefinitions.colorCodes.zero,
        positiveFivehundredTOthousand = this.props.infographicDefinitions.colorCodes.reds[2],
        negativeFivehundredTOthousand = this.props.infographicDefinitions.colorCodes.greens[2],
        extremeGreen = this.props.infographicDefinitions.colorCodes.greens[3],
        extremeRed = this.props.infographicDefinitions.colorCodes.reds[3];

      console.log(this.props.infographicDefinitions.colorCodes.greens[0], this.props.infographicDefinitions.colorCodes.greens[1])
      console.log(2)


    var f = function(val){
      var res = null;
      // 0
      if (val === 0){
        res = zeroGreen;
      }
      // REDS
      else if(val > 0){
          // 1 - 500
         if(val < 501){
            res = paletteScaleRed1(val)
          }
          // 501 - 1000
          else if (val > 501 && val < 1001){
            res = positiveFivehundredTOthousand;
          } 
          // 1000+
          else {
            res = extremeRed;
          }
      }
      // GREENS
      else if (val < 0){
          // -1 - -500
         if(val > -501){
            res = paletteScaleGreen1(val)
          } 
          // -1000 - -500
          else if ( val > -1001){
            res = paletteScaleGreen2(val);
          } 
          // 1000+
          else {
            res = extremeGreen;
          }
      }
      return res;
    }

    // fill dataset in appropriate format
    Object.entries(data).forEach(function(obj){
        dataset[obj[0]] = { numberOfThings: obj[1], fillColor: f(obj[1]) };
    });

    return dataset
  }

  rowGetter(i) {
    return this.state._rows[i];
  }

  mapOnClick(data, _id, currentValue){
    const that = this;
    if(_id === undefined){
      _id = this.state.selectedState
    }
    const bubbles = that.state.bubbles
    bubbles[0].centered = _id
    that.setState({
      bubbles: bubbles
    })
    if(currentValue === undefined){
      currentValue = this.state.currentValue  
    }
    var urls = [
      `${that.state.API_LINK}${that.state.api}.json?search=${that.state.dateField}:[${currentValue}0101+TO+${currentValue}1231]+AND+${that.state.countBy}:${_id}&limit=100`
      ];

    $('.react-grid-HeaderCell-sortable--ascending').find("span").hide()
    $('.react-grid-HeaderCell-sortable--descending').find("span").hide()

    let filesPromise = Promise.resolve([]);
    filesPromise = Promise.all(urls.map(this.fetchJSON))
      .catch(function(results){})
      .then(function(results) {
        var result = results === undefined ? that.props.infographicDefinitions.gridConfig.defaultData : results[0].results;
        var finalData = []
        result.forEach( item => {
          var record = {}
          that.props.infographicDefinitions.gridConfig.dataGridProperties.forEach( column => {
            var val  = item[column.key]
            column._getter !== undefined ? eval("val = item." + column._getter) : null;
            record[column.key] = val
          })
          finalData.push(record)

        })
        that.setState({
          _rows : finalData,
          original_rows: finalData,
          selectedState: _id
        })
      })

  }

  handleGridSort(sortColumn, sortDirection) {
    $('.react-grid-HeaderCell-sortable--ascending').find("span").show()
    $('.react-grid-HeaderCell-sortable--descending').find("span").show()
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const _rows = sortDirection === 'NONE' ? 
                 this.state.original_rows.slice(0) :
                 this.state._rows.sort(comparer);

    this.setState({ _rows });
  }

  onGridRowsUpdated(e) {
  }

  render (): ?React.Element {

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
        <section className='float-r infographic-container'>
          <div>
            {Parser(this.props.infographicDefinitions.title)}
            <hr className="datamap-hr"/>

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

            <InfographicLegend {...this.props.infographicDefinitions.legend} />

            <div className="datamap-infographic">
              <Datamap
                scope={this.props.infographicDefinitions.dataMapConfig.scope}
                onClick={this.mapOnClick}
                geographyConfig={{
                  highlightBorderColor: this.props.infographicDefinitions.dataMapConfig.geographyConfigInfo.highlightBorderColor,
                  popupTemplate: (geography, data) =>  {
                    let properties = {
                      this : this,
                      geography : geography,
                      data: data
                    }
                    return new Function('return `' + this.props.infographicDefinitions.dataMapConfig.geographyConfigInfo.popupTemplate + '`;').call(properties)
                  },
                  highlightBorderWidth: this.props.infographicDefinitions.dataMapConfig.geographyConfigInfo.highlightBorderWidth,
                  highlightFillColor: this.props.infographicDefinitions.dataMapConfig.geographyConfigInfo.highlightFillColor
                }}
                bubbles={this.state.bubbles}
                data={this.state.data}
                {...this.props.infographicDefinitions.dataMapConfig}
              />
            </div>
            <p className='datamap-infographic-header-params'> 
              {this.props.infographicDefinitions.subtitle} for <i className='datamap-infographic-header-text-bold'>{this.props.infographicDefinitions.states[this.state.selectedState]}</i> in <i className='datamap-infographic-header-text-bold'>{this.state.currentValue}</i>
            </p>
            <div>
            { !this.state._rows.length ? null : 
              <ReactDataGrid
                columns={this.state.dataGridProperties}
                rowGetter={this.rowGetter}
                rowsCount={this.state._rows.length}
                onGridSort={this.handleGridSort}
                onFilter={this.onGridRowsUpdated}
                {...this.props.infographicDefinitions.gridConfig}
              />
            }
            </div>
          </div>
        </section>
    )
  }
}

  export default DataMapInfographic