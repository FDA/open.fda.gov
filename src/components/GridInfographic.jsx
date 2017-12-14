/* @flow */

import React from 'react'

import { API_LINK } from '../constants/api'
import { Series } from 'pandas-js';
import { HeatMap } from 'nivo'
import { Charts, ChartContainer, ChartRow, styler, YAxis, LineChart,Resizable } from "react-timeseries-charts"
import { TimeSeries, TimeRange, sum } from "pondjs";
import {default as Parser } from 'html-react-parser';
import {default as $ } from "jquery"
import {default as Tooltip } from 'rc-tooltip';
import {default as Slider } from 'rc-slider';

import _ from 'lodash';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class GridInfographic extends React.Component {

   constructor (props: Object) {
    super(props)

    if(
        this.props.api === undefined || 
        this.props.infographicDefinitions === undefined 
      ) {
      throw "Invalid Props"
    }

    this.state = {
      API_LINK: API_LINK,
      api: this.props.api,
      xTerms: [],
      data:[],
      countBy: this.props.infographicDefinitions.countBy
    }

    this._getAllData = this._getAllData.bind(this)
    this.fetchJSON = this.fetchJSON.bind(this)
  }

  componentDidMount () {
    this._getAllData().then((res) => {
      this.setState({
        data: res.data,
        keys: res.yterms
      })
      $("svg > g").attr("transform", this.props.infographicDefinitions.gridConfig.transform)
      $("text").css("font-size",this.props.infographicDefinitions.gridConfig.theme.fontSize)
      $("text").css("font-family",this.props.infographicDefinitions.gridConfig.theme.fontFamily)
      $("text").css("fill",this.props.infographicDefinitions.gridConfig.theme.fontColor)
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


    //// steps
    //// 1) get the categories for the x field by doing  a count query for xfield
    //// 2) loop over categories for x field and get do a search and count with Y value
    ////
    ////
    ////
    ////
    ////
    var urls = [`${this.state.API_LINK}${this.state.api}.json?count=${this.props.infographicDefinitions.xField}`]
    let xTerms = []

    const itemPromises = urls.map(this.fetchJSON);
    return Promise.all(itemPromises).then((results) => {

      var that = this;
      xTerms = results[0].results.map((item) => {
        return item.term
      })

      if(this.props.infographicDefinitions.exclusions !== undefined){
        xTerms = xTerms.filter( res => this.props.infographicDefinitions.exclusions.indexOf(res) === -1)
      }

      return {
        "keys":xTerms
      }
    }).then( (data) => {
      var that = this;
      var xUrls = data.keys.map((term) => {
        return `${this.state.API_LINK}${this.state.api}.json?search=${term}&count=${this.props.infographicDefinitions.yField}`
      })

      var final = []
      var yterms = []
      const XTermsPromises = xUrls.map(this.fetchJSON);
      return Promise.all(XTermsPromises).then((xresults) => {
        var that = this;

        var res = _.zip(xresults, xTerms)
        res[0][0].results.map( (d) => {
          var term = d.term
          yterms.push(term.charAt(0).toUpperCase() + term.slice(1).toLowerCase())
        })

        res.forEach( (row, index) => {
          var thing = {
            "xTerm": that.props.infographicDefinitions.defs[row[1]]
          }
          row[0].results.map( (e) => {
            thing[e.term.charAt(0).toUpperCase() + e.term.slice(1).toLowerCase()] = e.count
          })
          final.push(thing)
        })

        data['data'] = final
        data['yterms'] = yterms.slice(0,that.props.infographicDefinitions.xTermLimit)
        return data
      })
    })
  }


  render (): ?React.Element {
    if (!this.state.data.length) return <span />

    return (
        <section className='infographic-container'>

          {Parser(this.props.infographicDefinitions.title)}
          <hr className="datamap-hr"/>
          <br/><br/>
          
          <div className="flex-box">
            <div className="heatmap-infographic">
            <p className="grid-infographic-ylabel" style={ this.props.infographicDefinitions.yLabelStyle }>
              {this.props.infographicDefinitions.yLabel}
            </p>
              <HeatMap
                data={this.state.data}
                keys={this.state.keys}
                {...this.props.infographicDefinitions.gridConfig}
              />
              <p className="grid-infographic-xlabel">
                {this.props.infographicDefinitions.xLabel}
              </p>
            </div>
          </div>
        </section>
    )
  }
}

export default GridInfographic