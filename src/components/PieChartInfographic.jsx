/* @flow */

import React from 'react'

import { TimeSeries, TimeRange, sum } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,Resizable, styler, Legend, TimeMarker, EventMarker } from "react-timeseries-charts"
import { API_LINK } from '../constants/api'
import states from '../pages/apis/states.json'
import _ from 'lodash';
import Parser from 'html-react-parser';
import {default as $} from "jquery";
import TwoLevelPieChart from './InteractivePie';
import { PieChart, Pie, Sector } from "Recharts";
import Select from 'react-select'
import 'whatwg-fetch'
import createClass from 'create-react-class';
import PropTypes from 'prop-types';


const stringOrNode = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
]);

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
        <input type="checkbox" checked={this.props.option.isSelected}/>
          <div style={{
              width: 20, 
              height: 20, 
              backgroundColor: this.props.option.color,
              display: 'inline-block',
              paddingTop: 5 
            }}>
          </div>
          {"  "}{ this.props.option.label }
      </div>
    );
  }
});

const GravatarValue = createClass({
  propTypes: {
    children: PropTypes.node,
    placeholder: stringOrNode,
    value: PropTypes.object,
    ref: PropTypes.any
  },
  render () {
    var gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label select-label">
            Select <i className="select-placeholder">{this.props.placeholder}</i> to Compare
        </span>
      </div>
    );
  }
});


class PieChartInfographic extends React.Component {

   constructor (props: Object) {
    super(props)

    if(
        this.props.api == undefined || 
        this.props.infographicDefinitions === undefined
      ) {
      throw "Invalid Props"
    }

    const minTime = new Date(this.props.globalDefs.startYear,1,1);

    this.state = {
      maxLimit: 1000,
      API_LINK: API_LINK,
      minTime: minTime,
      maxTime: null,
      selection:  null,
      selected: [],
      reverseProductLabels: null,
      tracker:   null,
      trackerValue: null,
      trackerEvent: null,
      sparklineData:  null,
      lineChartColumns: [],
      trackerInfoValues: "",
      infoHeight: 0,
      activeIndex: null,
      choosenColumn: null,
      columnStyles: null,
      lineChartLoaded: 0,
      width: this.props.globalDefs.lineChartConfig.width
    };

    // functions
    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
    // this.removeSelected = this.removeSelected.bind(this)
    this.handleChartResize = this.handleChartResize.bind(this)
    this.handleTrackerChanged = this.handleTrackerChanged.bind(this)
    this.renderOption = this.renderOption.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.setTextStyle = this.setTextStyle.bind(this)

  }
  componentWillReceiveProps(){
    
    this.setState({lineChartLoaded: 0}, this.componentDidMount())
  }
  componentDidMount () {
    const that = this

    let download_url = `${API_LINK}/download.json`
    fetch(download_url)
      .then(function(download_res) {
        return download_res.json()
      }).then(function(download_res) {

        const apiParts = that.props.globalDefs.api.split('/'),
              latestDataDate = new Date(download_res.results[apiParts[1]][apiParts[2]].export_date),
              latestYear = latestDataDate.getFullYear()
        
        const currentDate = new Date()

        that.setState({
          maxTime: new Date(currentDate.getFullYear(), 12,1)
        })

        that[that.props.infographicDefinitions.dataFunction]().then((res) => {
          let data = res;
          if(that.props.infographicDefinitions.pieChartConfig.categoryLimiter !== undefined){
            data = res.slice(0,that.props.infographicDefinitions.pieChartConfig.categoryLimiter)
          }
          that.setState({
            data: data,
            timerange: new TimeRange(that.state.minTime, that.state.maxTime)
          })
          that.onClick(that.props.infographicDefinitions.pieChartConfig.default, that.props.infographicDefinitions.pieChartConfig.default.index)
        }).catch(res => console.log("PieChartInfographic data did not load"))

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
      return Promise.all(xUrls.map(this.fetchJSON)).then((xresults) => {
        var that = this;
        var dataLocal = data;

        var res = _.zip(xresults, that.props.infographicDefinitions.fields.categories)

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
            "pct": (( count / data['fieldTotal'] ) * 100).toFixed(0) + '%'
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
        res = results[0].results.sort((a,b) => b.count - a.count)
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
          "pct": ((item.count / total) * 100).toFixed(0) + '%'
        }
      })
    })
  }

  onClick (data, index){
    if(this.state.activeIndex === index && this.state.lineChartLoaded > 0){
      return
    }
    this.setState({
      sparklineData: null
    })

    const that = this;

    let searchField;
    if(this.props.infographicDefinitions.dataFunction === "_getAllDataByFields"){
      searchField = `${data.id}:${this.props.infographicDefinitions.fields.subsetValue}`
    } else if (this.props.infographicDefinitions.dataFunction === "_getAllData") {
      searchField = `${that.props.infographicDefinitions.countBy}:"${data.id}"`

      if(this.props.infographicDefinitions.existsField){
        searchField += `+AND+_exists_:${this.props.infographicDefinitions.subfield}`
      }
    }

    const subfields_url = `${that.state.API_LINK}${that.props.api}.json?search=${searchField}&count=${that.props.infographicDefinitions.subfield}`

    fetch(subfields_url)
      .then(function(res) {
        return res.json()
      }).then(function(res) {
        // clean to original
        var terms = {};

        var localSearchField = searchField;

        var columns = res.results.filter( (value) => {
            var hasInvalidChar = value.term.indexOf("^") === -1 &&
                                 value.term.indexOf(",") === -1 &&
                                 value.term.indexOf("/") === -1 &&
                                 value.term.indexOf("'") === -1 &&
                                 value.term.indexOf("&") === -1 &&
                                 value.term.indexOf("®") === -1

            var isAnAcceptedTerm = that.props.infographicDefinitions.acceptedTerms !== undefined ?
                                   that.props.infographicDefinitions.acceptedTerms[value.term.toUpperCase()] !== undefined : 
                                   true;

            var excludedField = false
            if(that.props.infographicDefinitions.excludedTerms !== undefined){
              if (that.props.infographicDefinitions.excludedTerms.includes(value.term.toUpperCase())){
                excludedField = true
              }
            }

            return hasInvalidChar && isAnAcceptedTerm && !excludedField
          }).map(value => {
              let term = ""
              let value_term = value.term.replace('.','')

              ///  filter out characters for linechart items that are not useful for frontend users //
              if(that.props.infographicDefinitions.subfield_filter){
                value_term = value_term.replace(that.props.infographicDefinitions.subfield_filter, '')
              }
              /// 

              /// split by space and uppercase first letter, lowercase [0:]
              value_term.split(" ").forEach( (word,idx) => {
                if(idx > 0){
                  term += " "
                }
                if(word && word.length){
                  term += word[0].toUpperCase() + word.slice(1,word.length).toLowerCase().replace('.','')
                }
              })
              // 

              terms[term] = value.term

              return term
          })

          that.setState({
            terms
          })

        var timeseries_urls =  columns.map( value => {
          var dirtyValue = that.state.terms[value]
          return `${that.state.API_LINK}${that.props.api}.json?search=${searchField}+AND+${that.props.infographicDefinitions.subfield}:"${dirtyValue}"&count=${that.props.infographicDefinitions.dateField}`
        }).slice(0,that.props.infographicDefinitions.lineLimiter)

        Promise.all(timeseries_urls.map(that.fetchJSON).map(r => r.catch(e => e))).then( results => {


          //// ERROR handing //////
          const errors = results.map( (r, index) => {
            if(typeof(r) !== "object"){
              return index
            }
          }).filter(r => r !== undefined)

          results = results.filter((r,index) => errors.indexOf(index) === -1)

          columns = columns.filter((column, index) => errors.indexOf(index) === -1)

          // columns = 

          //// End ERROR handing //////

          /// we only want to graph specific terms defined in acceptedTerms object
          if(that.props.infographicDefinitions.acceptedTerms !== undefined){
            columns = columns.filter(val => {
              return that.props.infographicDefinitions.acceptedTerms[val.toUpperCase()] !== undefined
            }).map(val => {
              return that.props.infographicDefinitions.acceptedTerms[val.toUpperCase()]
            })
          }
          //////
          const useProductCodes = (that.props.globalDefs.productCodes !== undefined && that.props.infographicDefinitions.useProductCodes)
          const useStatesNames = (that.props.infographicDefinitions.subfield === "state.exact")
          columns = columns.slice(0,that.props.infographicDefinitions.lineLimiter).map( column => {
            let cleanedColumnName = ""
            if(useProductCodes){
              var fullProductCode = that.props.globalDefs.productCodes[column.toUpperCase()]
              cleanedColumnName = fullProductCode === undefined ? column : fullProductCode
            } else if (useStatesNames){
              cleanedColumnName = states.states[column.toUpperCase()]
            }
            cleanedColumnName = !cleanedColumnName ? column : cleanedColumnName
            return cleanedColumnName.slice(0,55)
          })
          
          const listOfSeries = []

          for (var i = 0, len = results.length; i < len; i++) {
            var series = new TimeSeries({
              name: "timeseries",
              columns: ["time","value"],
              points: results[i].results.filter(v => {
                return parseInt(v.time.slice(0,4)) >= that.props.globalDefs.startYear
              }).map(function(i){
                  let x = i.time.slice(0,4) + '-' + i.time.slice(4,6) + '-' + i.time.slice(6,8)
                  return [new Date(x), i.count]
              })
            }).monthlyRollup({
              aggregation: {
                value: { value: sum() }
              },
              toTimeEvents : true
            }).toJSON()

            if(series !== undefined){
              listOfSeries.push(series.points)
            }
          }

          // get all timestamps
          // use obj to avoid duplicates
          var timestamps = {};
          // for each column of aggregated points
          listOfSeries.forEach( arr => {
            arr.forEach( val => {
              // add timestamp for each series to timestamps with default 0
              timestamps[val[0]] = 0 
            })
          })
          var timestamps = Object.keys(timestamps).sort();
          var timestampsPosition = {};
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
          var res = that.transpose(timestamps, normalizedSeries)

          var final = res.final,
              findMax = res.findMax,
              rows = res.rows;

          var series = new TimeSeries({
            name: "timeseries",
            columns: ["time"].concat(columns),
            points: final.sort( (a,b) => a[0] - b[0])
          })

          // set style according to categories
          var legendStyle = styler(columns.map((column,idx)=> {
            return {
              key: column,
              color: that.props.globalDefs.lineChartConfig.colors[idx],
              width: 2
            }
          }))
          var legendStyle1 = legendStyle.lineChartStyle()
          Object.keys(legendStyle1).forEach(value => {
            legendStyle1[value].selected.opacity = 0
            legendStyle1[value].normal.opacity = 0
            legendStyle1[value].highlighted.opacity = 0
            legendStyle1[value].muted.opacity = 0
          })

          var columnStyles = Object.keys(legendStyle1).map(column => {
            let formattedColumn = ""
            if(column.length){
              formattedColumn = column[0].toUpperCase() + column.slice(1,column.length)
            }
            return {
              label: formattedColumn,
              color: legendStyle1[column].normal.stroke,
              isSelected: false
            }
          })

          var allMaxes = {}
          _.zip(columnStyles.map(s => s.label), normalizedSeries).forEach(value => {
            allMaxes[value[0]] = Math.max(...value[1])
          })

          that.setState({
            allMaxes,
            columnStyles,
            legendStyle: legendStyle1,
            timerange: new TimeRange(new Date(series.toJSON().points[0][0]), that.state.maxTime),
            selectedClassName: that.props.infographicDefinitions.defs[data.id],
            sparklineData: series,
            sparklineDataMax: Math.max(...findMax),
            lineChartColumns: ["time"].concat(columns),
            lineChartLoaded: that.state.lineChartLoaded += 1
          },function(){
            that.DOMNode.setState({isOpen: true})
          })

          columnStyles.slice(0,3).forEach( styl =>{
            that.onSelectionChange(styl)
          })

          if(that.refs){
            that.refs.child.setState({
              activeIndex: index
            })
          }

          that.setPieChartText()
          var vals = $("text").filter(function () {
              return $(that).attr("transform") == "rotate(-90)"
          })
          if(vals.length){
            $(vals[0]).attr("x",that.props.infographicDefinitions.xLegendCoordinate)
          }
        })
      })
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

  onSelectionChange (selectionObj) {
    var selection = selectionObj.label;
    var selectionName = this.props.infographicDefinitions.selectionPostFix !== undefined ? 
                        selection +  this.props.infographicDefinitions.selectionPostFix : 
                        selection;

    let toggle = null
    let selected = []
    let maxes = []
    const columnStyles = this.state.columnStyles.map(obj => {
      if(obj.label === selection){
        obj.isSelected = obj.isSelected ? false : true
        toggle = obj.isSelected ? 1 : 0;
      }
      if(obj.isSelected){
        selected.push(obj.label)
        maxes.push(this.state.allMaxes[obj.label])
      }
      return obj
    })

    const legendStyle = {}
    Object.keys(this.state.legendStyle).map(columnName => {
      var obj = this.state.legendStyle[columnName]
      if(selection === columnName){
        if(toggle){
          obj.normal.opacity       = toggle
          obj.selected.opacity     = toggle
          obj.highlighted.opacity  = toggle
        } else {
          obj.normal.opacity       = 0.005
          obj.selected.opacity     = 0.005
          obj.highlighted.opacity  = 0.005
        }

      }
      legendStyle[columnName] = obj
    })

    this.setState({
      sparklineDataMax: maxes.length ? Math.max(...maxes)+Math.round(Math.random() * 100, 2)/100 : 10,
      sparklineData: this.state.sparklineData,
      choosenColumn: selectionObj,
      selection,
      selected,
      legendStyle,
      columnStyles,
      selectionName: selectionName
    }, function(){
      this.setTextStyle()
      this.setPieChartText()
    })
  }

  setTextStyle(){
    $("text").css("font-family",this.props.globalDefs.font.fontFamily)
    $('text').css('fill', this.props.globalDefs.font.color)
  }

  handleTrackerChanged(t) {
    if (t) {
      const e = this.state.sparklineData.atTime(t);
      const eventTime = new Date(
          e.begin().getTime() + (e.end().getTime() - e.begin().getTime()) / 2
      )

      const eventData = e.toJSON().data;
      
      let infoValues = this.state.selected.map( label => {
          return {
            label : label.length < 20 ? label : label.slice(0,20) + " ... ",
            value: eventData[label]
          }
      })
      const defaultInfoValues = [
        {
          label: "Refer to legend below",
          value: ""
        }
      ]
      // Show only 5 labels
      infoValues = infoValues.length > 5 ? defaultInfoValues : infoValues;
      const infoHeight = infoValues.length <= 5 ? (infoValues.length * 10 + 30) : 0;

      // const eventValue = e.toJSON().data[this.state.selection]
      // const v = `${eventValue}`;

      this.setState({
        tracker: eventTime, 
        trackerEvent: e,
        trackerInfoValues: infoValues,
        infoHeight: infoHeight
      }, this.setTextStyle())

    } else {
        this.setState({ tracker: null, trackerValue: null, trackerEvent: null });
    }
  }

  renderOption (option){
    return (
      <div>
        <input type="checkbox" checked={this.props.isSelected} onChange={() => {} }/>
        <div style={{
            width: 20, 
            height: 20, 
            backgroundColor: option.color,
            display: 'inline-block',
            paddingTop: 5 
          }}>
        </div>
            {"  "}{option.label}
      </div>
    );
  }

  handleChartResize(width){
    this.setState({width})
  }

  onClose (){
    this.DOMNode.setState({isOpen: true})
  }

  render (): ?React.Element {
    if (!this.state.data) return <span />
      var viewBox = this.props.infographicDefinitions.pieChartConfig.viewBox;
      $('.recharts-surface').removeAttr('viewBox');
      $('.recharts-surface').each(function () { $(this)[0].setAttribute('viewBox', viewBox) });
      $('.recharts-wrapper').width(this.props.infographicDefinitions.pieChartConfig.widthReset)
      this.setPieChartText()

    return (
        <section className='infographic-container'>
        <div>
          <p className='datamap-infographic-header'>
            {Parser(this.props.infographicDefinitions.title)}
            <i className="infographic-dropdown">{' '}View by:{' '}</i>
          </p>
          <hr className="datamap-hr"/>
        </div>


        <div className='pie-infographic-headers'>
          <p className="piechart-title">
            Each <i className="bold-font">{this.props.infographicDefinitions.pieChartCategoryName}</i> <br/>
            as % of all <i className="bold-font">{this.props.infographicDefinitions.pieChartApiName}</i>
          </p>


          <p>
            Display of 
            {' '}
            <i className='datamap-infographic-header-text-bold'>{this.props.globalDefs.apiName}</i>             
            {' by '}
            <i className='datamap-infographic-header-text-bold'>{this.props.parent.state.choice.subfieldLabel}</i>
            {' '}for{' '}
            <i className='datamap-infographic-header-text-bold'>{this.state.selectedClassName}</i> 
            {' '}
            {this.props.infographicDefinitions.yTitle}
          </p>
        </div>

        <div className="flex-box piechart-container">
          <TwoLevelPieChart
            onClick={this.onClick}
            data={this.state.data}
            ref="child"
            parent={this}
            {...this.props.globalDefs.pieChartConfig}
            {...this.props.infographicDefinitions.pieChartConfig}
          />
          { !this.state.sparklineData ? 
                <div className="infographic-loading-div">
                  <img src="/img/loading.gif" className="infographic-loading-img"/>
                </div> 
                : 
                <ChartContainer
                  timeRange={this.state.timerange} 
                  enablePanZoom={this.state.enablePanZoom}
                  onTimeRangeChanged={timerange => { this.setState({ timerange }) }}
                  trackerPosition={this.state.tracker}
                  onTrackerChanged={this.handleTrackerChanged}
                  minTime={this.state.minTime}
                  maxTime={this.state.maxTime}
                  onChartResize={this.handleChartResize}
                  {...this.props.globalDefs.lineChartConfig.chartContainer}
                >
                    <ChartRow
                      {...this.props.globalDefs.lineChartConfig.chartRow}
                    >
                        <YAxis 
                          id="axis1"
                          max={this.state.sparklineDataMax}
                          {...this.props.globalDefs.lineChartConfig.yAxis}
                        />
                        <Charts>
                            <LineChart 
                              style={this.state.legendStyle}
                              axis="axis1"
                              series={this.state.sparklineData}
                              columns={this.state.lineChartColumns}
                              onSelectionChange={this.onSelectionChange}
                              {...this.props.globalDefs.lineChartConfig.lineChart}
                            />
                              <EventMarker
                                type="flag"
                                axis="axis1"
                                event={this.state.trackerEvent}
                                column={this.state.selection}
                                infoHeight={this.state.infoHeight}
                                info={this.state.trackerInfoValues}
                                {...this.props.globalDefs.lineChartConfig.eventMarker}
                              />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
          }
        </div>
        { !this.state.sparklineData ? null :
          <div className="flex-box piechart-legend-div">
            <div className="piechart-legend">
              <Select
                name="toggle"
                value={this.state.choosenColumn}
                optionComponent={GravatarOption}
                arrowRenderer={()=>{<span></span>}}
                menuStyle={{maxHeight: 130  }}
                options={this.state.columnStyles}
                onChange={this.onSelectionChange}
                placeholder="Search the fields"
                resetValue="label"
                isOpen={true}
                ref={(ref)=>{this.DOMNode = ref}}
                removeSelected={false}
                valueComponent={GravatarValue}
                clearable={false}
                closeOnSelect={false}
                onClose={this.onClose}
                placeholder={this.props.parent.state.choice.subfieldLabel}
              />
            </div>
          </div>
        }
        </section>
    )
  }
}


export default PieChartInfographic





