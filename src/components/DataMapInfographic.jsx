/* @flow */

import React from 'react'

import {InfographicLegend} from './InfographicLegend'
import {default as $} from "jquery";
import { Series } from 'pandas-js';
import { API_LINK } from '../constants/api'
import _ from 'lodash';
import { default as Tooltip } from 'rc-tooltip';
import { default as Slider } from 'rc-slider';
import { default as Datamap } from 'react-datamaps';
import { default as Parser } from 'html-react-parser';
import { default as ReactTable } from "react-table";
import 'whatwg-fetch'

Object.entries = x =>
  Object.keys(x).reduce((y, z) =>
    y.push([z, x[z]]) && y, []);


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

    this.state = {
      api: this.props.api,
      API_LINK: API_LINK,
      min: startYear+1,
      step: 1,
      slider_marks: null,
      years: null,
      selectedState: null,
      _rows: [],
      original_rows: [],
      bubbles: [{
        radius: 5,
        centered: this.props.infographicDefinitions.selectedState,
        fillColor: "#080808"
      }],
      ReactDataGrid: null,
      isLoaded: false
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
        timeseries: res.timeseries,
        selectedState: this.props.infographicDefinitions.selectedState
      })
      this.mapOnClick()
      // use ajax request to get IP address and state
      Promise.resolve(this.fetchJSON(this.props.infographicDefinitions.ipURL)).then( (res) => {
        var options = ["",undefined,null]
        if(options.indexOf(res.region_code) === -1){
          this.setState({selectedState: res.region_code})
          this.mapOnClick()
        }
      })

      $(".rc-slider-mark").css("font-size",this.props.infographicDefinitions.slider.style.fontSize)


    }).catch(res => {
        console.log(res)
        console.log("DataMapInfographic data did not load")
    })
  }

  fetchJSON (url: string): Object {
    const jQuery = $;
    return new Promise((resolve, reject) => {
      jQuery.getJSON(url)
        .done((json) => resolve(json, url))
        .fail((xhr, status, err) => reject(status + err.message));
    });
  }

  _getAllData () {
    const that = this;

    let download_url = `${API_LINK}/download.json`
    return fetch(download_url)
      .then(res => res.json())
      .then(res => {

        const apiParts = that.state.api.split('/')
        const latestDataDate = new Date(res.results[apiParts[1]][apiParts[2]].export_date)
        const latestYear = latestDataDate.getFullYear()

        ////////
        // we set the min to be currentyear - 1 due to YOY analysis
        // _.range is exclusive of max value, therefore use +1
        const years = _.range(that.state.min-1, latestYear+1)
        const slider_marks = years.slice(1,100).reduce(function(result, item, index, array) {
          result[item] = item;
          return result;
        }, {})

        this.setState({
            slider_marks: slider_marks,
            years: years,
            defaultValue: latestYear,
            currentValue: latestYear,
            max: latestYear,
            startYear: latestYear,
            endYear: latestYear
        })
        //////

        const urlPrefix = `${that.state.API_LINK}${that.state.api}.json?search=${that.props.infographicDefinitions.dateField}`,
              urlPostfix = `&count=${that.props.infographicDefinitions.countBy}`

        const urls = years.filter(y => 
          y <= latestYear
        ).map(year => `${urlPrefix}:[${year}0101+TO+${year}1231]${urlPostfix}`)

        const emptyYearsArray = years.map(y => 0);

        return Promise.all(urls.map(this.fetchJSON)).then(function(results) {
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

            var filteredResults = item.results.map( v => {
              v.term = v.term.toUpperCase()
              return v
            })

            var terms = filteredResults.filter(function(v) {
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
              var all = new Set(Object.keys(that.props.infographicDefinitions.states))
              terms.map(t => all.add(t))
              all.forEach(function(term){
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
            filteredResults.filter(function(v) {
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
      })
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
        onlyValues = Object.keys(data).map(function(key) {
            return data[key];
        });

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
      `${that.state.API_LINK}${that.state.api}.json?search=${that.props.infographicDefinitions.dateField}:[${currentValue}0101+TO+${currentValue}1231]+AND+${that.props.infographicDefinitions.countBy}:"${_id}"&limit=100`
      ];

    $('.react-grid-HeaderCell-sortable--ascending').find("span").hide()
    $('.react-grid-HeaderCell-sortable--descending').find("span").hide()

    Promise.all(urls.map(this.fetchJSON))
      .catch(function(results){})
      .then(function(results) {
        let result;
        let totalAvailableResults;
        let rowsFound;

        // use default data
        if(results === undefined){
          totalAvailableResults = 0
          result = that.props.infographicDefinitions.gridConfig.defaultData;
          rowsFound = 0;
        } else {
          // continue
          totalAvailableResults = results[0].meta.results.total;
          result = results[0].results;
          rowsFound = results[0].results.length;
        }
        var finalData = [];
        result.forEach( item => {
          var record = {}
          that.props.infographicDefinitions.gridConfig.reactTableColumns.forEach( column => {
            let val = "";
            // we need to access a key with type of array
            if(column.baseObject !== undefined){
                // is there any data in the baseObject
                var baseObject = item[column.baseObject] !== undefined && item[column.baseObject].length ? item[column.baseObject][0]: "";
                // directly call subObject
                if(column.subObject === undefined){
                    val = baseObject[column.accessor] || ""
                } else if(baseObject[column.subObject] !== undefined){
                    // if subobject defined, use it
                    val = baseObject[column.subObject][column.accessor]
                }
            } else {
                val = item[column.accessor] || ""
            }
            record[column.accessor] = val.length >= 200 ? val.slice(0,200) + '...' : val
          })
          finalData.push(record)
        })

        that.setState({
          totalAvailableResults,
          rowsFound,
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
    if (!this.state.data) return <span />

    const handle = (props) => {
      const createSliderWithTooltip = Slider.createSliderWithTooltip;
      const Range = createSliderWithTooltip(Slider.Range);
      const Handle = Slider.Handle;
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

            <InfographicLegend {...this.props.infographicDefinitions.legend} />
          </div>
          <div>
            <p className='datamap-infographic-header-params'> 
              {this.props.infographicDefinitions.subtitle} for 
              <i className='datamap-infographic-header-text-bold'>
                {' '}{this.props.infographicDefinitions.states[this.state.selectedState]}{' '}
              </i> 
              in 
              <i className='datamap-infographic-header-text-bold'>
                {' '}{this.state.currentValue}
              </i>
              {' '}(first {this.state.rowsFound} of {this.state.totalAvailableResults})
            </p>
            <div>
            { !this.state._rows.length ? null : 
              <ReactTable
                data={this.state._rows}
                columns={this.props.infographicDefinitions.gridConfig.reactTableColumns}
                defaultPageSize={this.state._rows.length}
                showPagination={false}
                style={{
                  height: "400px"
                }}
                className="-striped -highlight"
              />
            }
            </div>
          </div>
        </section>
    )
  }
}

  export default DataMapInfographic