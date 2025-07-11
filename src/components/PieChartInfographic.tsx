/* @flow */

import React from 'react'

import {sum, TimeRange, TimeSeries} from "pondjs"
import {ChartContainer, ChartRow, Charts, EventMarker, LineChart, styler, YAxis} from "react-timeseries-charts"
import _ from 'lodash'
import 'whatwg-fetch'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import {default as $} from "jquery"

import TwoLevelPieChart from './InteractivePie'
import Checkbox from "./Checkbox"
import states from '../pages/apis/states.json'
import {API_LINK} from '../constants/api'


const stringOrNode = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
])

/* const GravatarOption = createClass({
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
});*/


interface PieChartInfographicProps {
  api: string;
  infographicDefinitions: any;
  globalDefs: any;
  parent: any;
  [key: string]: any;
}

interface PieChartInfographicState {
  [key: string]: any;
}

class PieChartInfographic extends React.Component<PieChartInfographicProps, PieChartInfographicState> {
  refs: any

  constructor (props: PieChartInfographicProps) {
    super(props)

    if (
      this.props.api == undefined ||
        this.props.infographicDefinitions === undefined
    ) {
      throw "Invalid Props"
    }

    const minTime = new Date(this.props.globalDefs.startYear, 1, 1)

    this.state = {
      maxLimit: 1000,
      API_LINK: API_LINK,
      minTime: minTime,
      maxTime: null,
      selection: null,
      selected: [],
      reverseProductLabels: null,
      tracker: null,
      trackerValue: null,
      trackerEvent: null,
      sparklineData: null,
      lineChartColumns: [],
      trackerInfoValues: "",
      infoHeight: 0,
      activeIndex: null,
      choosenColumn: null,
      columnStyles: null,
      lineChartLoaded: 0,
      width: this.props.globalDefs.lineChartConfig.width
    }

    // functions
    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleChartResize = this.handleChartResize.bind(this)
    this.handleTrackerChanged = this.handleTrackerChanged.bind(this)
    this.renderOption = this.renderOption.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.setTextStyle = this.setTextStyle.bind(this)

  }
  componentWillReceiveProps () {

    this.setState({lineChartLoaded: 0}, () => this.componentDidMount())
  }
  componentDidMount () {
    const that = this

    const download_url = `${API_LINK}/download.json`
    fetch(download_url)
      .then(function (download_res) {
        return download_res.json()
      }).then(function (download_res) {

        const apiParts = that.props.globalDefs.api.split('/')
        const latestDataDate = new Date(download_res.results[apiParts[1]][apiParts[2]].export_date)
        const latestYear = latestDataDate.getFullYear()

        const currentDate = new Date()

        that.setState({
          maxTime: new Date(currentDate.getFullYear(), 12, 1)
        })

        const dataFunctionName = that.props.infographicDefinitions.dataFunction as keyof PieChartInfographic;
        if (typeof (that as any)[dataFunctionName] === "function") {
          (that as any)[dataFunctionName]().then((res: any) => {
          let data = res
          if (that.props.infographicDefinitions.pieChartConfig.categoryLimiter !== undefined) {
            data = res.slice(0, that.props.infographicDefinitions.pieChartConfig.categoryLimiter)
          }
          that.setState({
            data: data,
            timerange: new TimeRange(that.state.minTime, that.state.maxTime)
          })
          that.onClick(that.props.infographicDefinitions.pieChartConfig.default, that.props.infographicDefinitions.pieChartConfig.default.index)
        }).catch((res: any) => console.log("PieChartInfographic data did not load"))

  }});
  }

  fetchJSON (url: string): Promise<{ results: any[] }> {
    return new Promise((resolve, reject) => {
      $.getJSON(url)
        .done((json) => resolve(json))
        .fail((xhr, status, err) => reject(status + err))
    })
  }

  setPieChartText () {
    $("#textLabel1").text(this.props.infographicDefinitions.pieChartConfig.textLabel[0])
    $("#textLabel2").text(this.props.infographicDefinitions.pieChartConfig.textLabel[1])
  }

  _getAllDataByFields () {

    const urls = [`${this.state.API_LINK}${this.props.api}.json?count=${this.props.infographicDefinitions.fields.subsetField}`]
    const itemPromises = urls.map(this.fetchJSON)
    return Promise.all(itemPromises).then((results) => {
      const that = this
      const terms: Record<string, number> = {}
      results[0].results.map((item: any) => {
        terms[item.term as string] = item.count
      })
      const total = terms[that.props.infographicDefinitions.fields.subsetValue]

      return {
        "fieldTotal": total
      }
    }).then((data) => {
      const that = this
      const xUrls = this.props.infographicDefinitions.fields.categories.map((category: string) => {
        return `${this.state.API_LINK}${this.props.api}.json?count=${category}`
      })

      const final: any[][] = []
      const yterms = []
      return Promise.all(xUrls.map(this.fetchJSON)).then((xresults) => {
        const that = this
        const dataLocal = data

        const res = _.zip(xresults, that.props.infographicDefinitions.fields.categories)

        const total = res.map((item) => {
          return item[0].count
        }).reduce((a, b) => a + b, 0)

        return res.map((item) => {
          const data = dataLocal
          const id = item[1]
          const terms: Record<string, number> = {}
          item[0].results.map((val: any) => {
            terms[val.term as string] = val.count
          })
          const count = terms[that.props.infographicDefinitions.fields.subsetValue as string]

          return {
            "id": id,
            "name": that.props.infographicDefinitions.defs[id as string],
            "value": count,
            "pct": ((count / data['fieldTotal']) * 100).toFixed(0) + '%'
          }
        })
      })
    })
  }

  _getAllData () {
    const that = this
    const urls = [`${that.state.API_LINK}${that.props.api}.json?count=${that.props.infographicDefinitions.countBy}`]

    return Promise.all(urls.map(this.fetchJSON)).then(function (results) {

      // / Order, get total, and filter

      // / ordering
      let res
      if (that.props.infographicDefinitions.pieChartConfig.sort === undefined) {
        res = results[0].results
      }
      else if (that.props.infographicDefinitions.pieChartConfig.sort === "descending") {
        res = results[0].results.sort((a, b) => b.count - a.count)
      }
      else if (that.props.infographicDefinitions.pieChartConfig.sort === "ascending") {
        res = results[0].results.sort((a, b) => a.count - b.count)
      }
      // /

      const total = (res ?? []).map((item) => {
        return item.count
      }).reduce((a, b) => a + b, 0)

      // / filtering
      if (that.props.infographicDefinitions.excludeFields !== undefined) {
        res = (res ?? []).filter(value => {
          return (that.props.infographicDefinitions.excludeFields.indexOf(value.term) === -1)
        })
      }
      // /

      return (res ?? []).map((item) => {
        return {
          "id": item.term,
          "name": that.props.infographicDefinitions.defs[item.term],
          "value": item.count,
          "pct": ((item.count / total) * 100).toFixed(0) + '%'
        }
      })
    })
  }

  onClick (data: any, index: number) {
    if (this.state.activeIndex === index && this.state.lineChartLoaded > 0) {
      return
    }
    this.setState({
      sparklineData: null
    })

    const that = this

    let searchField: string = "";
    if (this.props.infographicDefinitions.dataFunction === "_getAllDataByFields") {
      searchField = `${data.id}:${this.props.infographicDefinitions.fields.subsetValue}`
    }
    else if (this.props.infographicDefinitions.dataFunction === "_getAllData") {
      searchField = `${that.props.infographicDefinitions.countBy}:"${data.id}"`

      if (this.props.infographicDefinitions.existsField) {
        searchField += `+AND+_exists_:${this.props.infographicDefinitions.subfield}`
      }
    }

    const subfields_url = `${that.state.API_LINK}${that.props.api}.json?search=${searchField}&count=${that.props.infographicDefinitions.subfield}`

    fetch(subfields_url)
      .then((result) => {
        return result.json()
      }).then((res) => {
        // clean to original
        const terms: Record<string, string> = {}

        const localSearchField = searchField

        let columns = res.results.filter((value: any) => {
          const hasInvalidChar = value.term.indexOf("^") === -1 &&
                                 value.term.indexOf(",") === -1 &&
                                 value.term.indexOf("/") === -1 &&
                                 value.term.indexOf("'") === -1 &&
                                 value.term.indexOf("&") === -1 &&
                                 value.term.indexOf("®") === -1

          const isAnAcceptedTerm = that.props.infographicDefinitions.acceptedTerms !== undefined ?
            that.props.infographicDefinitions.acceptedTerms[value.term.toUpperCase()] !== undefined :
            true

          let excludedField = false
          if (that.props.infographicDefinitions.excludedTerms !== undefined) {
            if (that.props.infographicDefinitions.excludedTerms.includes(value.term.toUpperCase())) {
              excludedField = true
            }
          }

          return hasInvalidChar && isAnAcceptedTerm && !excludedField
        }).map((value: any) => {
          let term = ""
          let value_term = value.term.replace('.', '')

          // /  filter out characters for linechart items that are not useful for frontend users //
          if (that.props.infographicDefinitions.subfield_filter) {
            value_term = value_term.replace(that.props.infographicDefinitions.subfield_filter, '')
          }
          // /

          // / split by space and uppercase first letter, lowercase [0:]
          value_term.split(" ").forEach((word: string, idx: number) => {
            if (idx > 0) {
              term += " "
            }
            if (word && word.length) {
              term += word[0].toUpperCase() + word.slice(1, word.length).toLowerCase().replace('.', '')
            }
          })
          //

          terms[term] = value.term

          return term
        })

        that.setState({
          terms
        })

        const timeseries_urls = columns.map((value: string) => {
          const dirtyValue = that.state.terms[value]
          return `${that.state.API_LINK}${that.props.api}.json?search=${searchField}+AND+${that.props.infographicDefinitions.subfield}:"${dirtyValue}"&count=${that.props.infographicDefinitions.dateField}`
        }).slice(0, that.props.infographicDefinitions.lineLimiter)

        Promise.all(timeseries_urls.map(that.fetchJSON).map((r: any) => r.catch((e: any) => e))).then(results => {


          // // ERROR handing //////
          const errors = results.map((r, index) => {
            if (typeof (r) !== "object") {
              return index
            }
          }).filter(r => r !== undefined)

          results = results.filter((r, index) => errors.indexOf(index) === -1)

          columns = columns.filter((column: string, index: number) => errors.indexOf(index) === -1)

          // columns =

          // // End ERROR handing //////

          // / we only want to graph specific terms defined in acceptedTerms object
          if (that.props.infographicDefinitions.acceptedTerms !== undefined) {
            columns = columns.filter((val: string) => {
              return that.props.infographicDefinitions.acceptedTerms[val.toUpperCase()] !== undefined
            }).map((val: string) => {
              return that.props.infographicDefinitions.acceptedTerms[val.toUpperCase()]
            })
          }
          // ////
          const useProductCodes = (that.props.globalDefs.productCodes !== undefined && that.props.infographicDefinitions.useProductCodes)
          const useStatesNames = (that.props.infographicDefinitions.subfield === "state.exact")
          columns = columns.slice(0, that.props.infographicDefinitions.lineLimiter).map((column: string) => {
            let cleanedColumnName = ""
            if (useProductCodes) {
              const fullProductCode = that.props.globalDefs.productCodes[column.toUpperCase()]
              cleanedColumnName = fullProductCode === undefined ? column : fullProductCode
            }
            else if (useStatesNames) {
              cleanedColumnName = states.states[column.toUpperCase() as keyof typeof states.states]
            }
            cleanedColumnName = !cleanedColumnName ? column : cleanedColumnName
            return cleanedColumnName.slice(0, 55)
          })

          const listOfSeries = []

          for (let i = 0, len = results.length; i < len; i++) {
            const series = new TimeSeries({
              name: "timeseries",
              columns: ["time", "value"],
              points: results[i].results.filter((v: any) => {
                return parseInt(v.time.slice(0, 4)) >= that.props.globalDefs.startYear
              }).map(function (i: any) {
                const x = i.time.slice(0, 4) + '-' + i.time.slice(4, 6) + '-' + i.time.slice(6, 8)
                const xDate = new Date(x)
                return [new Date(xDate.getTime() - xDate.getTimezoneOffset() * -60000), i.count]
              })
            }).monthlyRollup({
              aggregation: {
                value: { value: sum() }
              },
              toTimeEvents: true
            }).toJSON()

            if (series !== undefined) {
              listOfSeries.push(series.points)
            }
          }

          // get all timestamps
          // use obj to avoid duplicates
          let timestampsObj: { [key: string]: number } = {}
          // for each column of aggregated points
          listOfSeries.forEach(arr => {
            arr.forEach((val: [string, number]) => {
              // add timestamp for each series to timestamps with default 0
              timestampsObj[val[0]] = 0
            })
          })
          const timestamps = Object.keys(timestampsObj).sort()
          const timestampsPosition: { [key: string]: number } = {}
          timestamps.forEach((key: string, i: number) => timestampsPosition[key] = i)
          // /

          // normalize
          const normalizedSeries: any[][] = []
          listOfSeries.forEach(arr => {
            const normalizedSerie = new Array(timestamps.length).fill(null)

            arr.forEach((val: [string, number]) => {
              const timestamp = val[0]
              const value = val[1]
              const index = timestampsPosition[timestamp]

              // add the value for the timestamp in item array
              normalizedSerie[index] = value
            })
            normalizedSeries.push(normalizedSerie)
          })

          // transpose..... from list of points per series, to a list of points per timestamp
          const res = this.transpose(timestamps, normalizedSeries)

          const final = res.final
          const findMax = res.findMax
          const rows = res.rows

          const series = new TimeSeries({
            name: "timeseries",
            columns: ["time"].concat(columns),
            points: final.sort((a, b) => a[0] - b[0])
          })

          // set style according to categories
          const legendStyle = styler(columns.map((column: string, idx: number) => {
            return {
              key: column,
              color: that.props.globalDefs.lineChartConfig.colors[idx],
              width: 2
            }
          }))
          const legendStyle1 = legendStyle.lineChartStyle()
          Object.keys(legendStyle1).forEach(value => {
            legendStyle1[value].selected.opacity = 0
            legendStyle1[value].normal.opacity = 0
            legendStyle1[value].highlighted.opacity = 0
            legendStyle1[value].muted.opacity = 0
          })

          const columnStyles = Object.keys(legendStyle1).map(column => {
            let formattedColumn = ""
            if (column.length) {
              formattedColumn = column[0].toUpperCase() + column.slice(1, column.length)
            }
            return {
              label: formattedColumn,
              color: legendStyle1[column].normal.stroke,
              isSelected: false
            }
          })

          const allMaxes: { [key: string]: number } = {}
          _.zip(columnStyles.map(s => s.label), normalizedSeries).forEach(value => {
            if (value[0] !== undefined) {
              allMaxes[value[0]] = value[1] ? Math.max(...value[1]) : 0
            }
          })

          this.setState({
            allMaxes,
            columnStyles,
            legendStyle: legendStyle1,
            timerange: new TimeRange(new Date(series.toJSON().points[0][0]), that.state.maxTime),
            selectedClassName: that.props.infographicDefinitions.defs[data.id],
            sparklineData: series,
            sparklineDataMax: Math.max(...findMax),
            lineChartColumns: ["time"].concat(columns),
            lineChartLoaded: that.state.lineChartLoaded + 1
          }, () => {
            this.setState({isOpen: true})
          })

          columnStyles.slice(0, 3).forEach(styl => {
            this.onSelectionChange(styl)
          })

          if (this.refs) {
            this.refs.child.setState({
              activeIndex: index
            })
          }

          this.setPieChartText()
          const vals = $("text").filter(function () {
            return $(this).attr("transform") == "rotate(-90)"
          })
          if (vals.length) {
            $(vals[0]).attr("x", that.props.infographicDefinitions.xLegendCoordinate)
          }
        })
      })
  }

  transpose(this: PieChartInfographic, timestamps: string[], normalizedSeries: any[][]) {
    // transpose..... from list of points per series, to a list of points per timestamp
    const findMax: number[] = []
    const final: any[][] = []
    const rows: number[][] = []
    for (let i = 0, len_i = normalizedSeries[0].length; i < len_i; i++) {
      const row = []
      for (let j = 0, len_j = normalizedSeries.length; j < len_j; j++) {
        const val = normalizedSeries[j][i] || 0
        row.push(val)
        findMax.push(val)
      }
      rows.push(row)
    }
    timestamps.forEach((key, i) => {
      const int = parseInt(key)
      if (int > 0) {
        final.push([int].concat(rows[i]))
      }
    })
    return {
      findMax: findMax,
      final: final,
      rows: rows
    }
  }

  onSelectionChange (selectionObj: any) {
    const selection = selectionObj.label
    const selectionName = this.props.infographicDefinitions.selectionPostFix !== undefined ?
      selection + this.props.infographicDefinitions.selectionPostFix :
      selection

    let toggle: number | null = null
    const selected: any[] = []
    const maxes: any[] = []
    const columnStyles = this.state.columnStyles.map((obj: { label: string | number; isSelected: boolean }) => {
      if (obj.label === selection) {
        obj.isSelected = !obj.isSelected
        toggle = obj.isSelected ? 1 : 0
      }
      if (obj.isSelected) {
        selected.push(obj.label)
        maxes.push(this.state.allMaxes[obj.label])
      }
      return obj
    })

    const legendStyle: { [key: string]: any } = {}
    Object.keys(this.state.legendStyle).map(columnName => {
      const obj = this.state.legendStyle[columnName]
      if (selection === columnName) {
        if (toggle) {
          obj.normal.opacity = toggle
          obj.selected.opacity = toggle
          obj.highlighted.opacity = toggle
        }
        else {
          obj.normal.opacity = 0.005
          obj.selected.opacity = 0.005
          obj.highlighted.opacity = 0.005
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
    }, function (this: PieChartInfographic) {
      this.setTextStyle()
      this.setPieChartText()
    })
  }

  setTextStyle () {
    $("text").css("font-family", this.props.globalDefs.font.fontFamily)
    $('text').css('fill', this.props.globalDefs.font.color)
  }

  handleTrackerChanged (t: any) {
    if (t) {
      const e = this.state.sparklineData.atTime(t)
      const eventTime = new Date(
        e.begin().getTime()
      )

      const eventData = e.toJSON().data

      let infoValues = this.state.selected.map((label: string) => {
        return {
          label: label.length < 20 ? label : label.slice(0, 20) + " ... ",
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
      infoValues = infoValues.length > 5 ? defaultInfoValues : infoValues
      const infoHeight = infoValues.length <= 5 ? (infoValues.length * 10 + 30) : 0

      // const eventValue = e.toJSON().data[this.state.selection]
      // const v = `${eventValue}`;

      this.setState({
        tracker: eventTime,
        trackerEvent: e,
        trackerInfoValues: infoValues,
        infoHeight: infoHeight
      }, () => this.setTextStyle())

    }
    else {
      this.setState({ tracker: null, trackerValue: null, trackerEvent: null })
    }
  }

  renderOption (option: { color: any; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) {
    return (
      <div>
        <input type='checkbox' checked={this.props.isSelected} onChange={() => {} }/>
        <div style={{
          width: 20,
          height: 20,
          backgroundColor: option.color,
          display: 'inline-block',
          paddingTop: 5
        }} />
        {"  "}{option.label}
      </div>
    )
  }

  handleChartResize (width: any) {
    this.setState({width})
  }

  onClose () {
    this.setState({isOpen: true})
  }

  createCheckbox = (column: { label: any; isSelected?: boolean; color?: string }) => {
    // Ensure all required props are present and have correct types
    const safeColumn = {
      label: typeof column.label === 'string' ? column.label : String(column.label),
      isSelected: typeof column.isSelected === 'boolean' ? column.isSelected : false,
      color: typeof column.color === 'string' ? column.color : '#000'
    };
    return (
      <Checkbox
        column={safeColumn}
        handleCheckboxChange={this.onSelectionChange}
        key={safeColumn.label}
      />
    )
  }


  render (): any {
    if (!this.state.data) return <span />
    const viewBox = this.props.infographicDefinitions.pieChartConfig.viewBox
    $('.recharts-surface').removeAttr('viewBox')
    $('.recharts-surface').each(function () { $(this)[0].setAttribute('viewBox', viewBox) })
    $('.recharts-wrapper').width(this.props.infographicDefinitions.pieChartConfig.widthReset)
    this.setPieChartText()

    return (
      <section className='infographic-container'>
        <div>
          <p className='datamap-infographic-header'>
            {Parser(this.props.infographicDefinitions.title)}
            <i className='infographic-dropdown'>{' '}View by:{' '}</i>
          </p>
          <hr className='datamap-hr'/>
        </div>


        <div className='pie-infographic-headers'>
          <p className='piechart-title'>
            Each <i className='bold-font'>{this.props.infographicDefinitions.pieChartCategoryName}</i> <br/>
            as % of all <i className='bold-font'>{this.props.infographicDefinitions.pieChartApiName}</i>
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

        <div className='flex-box piechart-container'>
          <TwoLevelPieChart
            onClick={this.onClick}
            data={this.state.data}
            ref='child'
            parent={this}
            {...this.props.globalDefs.pieChartConfig}
            {...this.props.infographicDefinitions.pieChartConfig}
          />
          { !this.state.sparklineData ?
            <div className='infographic-loading-div'>
              <img src='/img/loading.gif' className='infographic-loading-img'/>
            </div>
            :
            <ChartContainer
              timeRange={this.state.timerange}
              enablePanZoom={this.state.enablePanZoom}
              onTimeRangeChanged={(timerange: any) => { this.setState({ timerange }) }}
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
                  id='axis1'
                  max={this.state.sparklineDataMax}
                  {...this.props.globalDefs.lineChartConfig.yAxis}
                />
                <Charts>
                  <LineChart
                    style={this.state.legendStyle}
                    axis='axis1'
                    series={this.state.sparklineData}
                    columns={this.state.lineChartColumns}
                    onSelectionChange={this.onSelectionChange}
                    smooth
                    {...this.props.globalDefs.lineChartConfig.lineChart}
                  />
                  <EventMarker
                    type='flag'
                    axis='axis1'
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
          <div className='infographic-bottom'>
            <div className='piechart-legend-div'>
              <div className='piechart-header'>Select <i className='select-placeholder'>{this.props.parent.state.choice.subfieldLabel}</i> to Compare</div>
              <div className='piechart-legend'>
                {this.state.columnStyles && this.state.columnStyles.map(this.createCheckbox)}
              </div>
            </div>
          </div>
        }
      </section>
    )
  }
}


export default PieChartInfographic


