/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import createClass from 'create-react-class'
import Select from 'react-select'
import FileSaver from 'file-saver'
import Json2csvParser from 'json2csv'
import PropTypes from 'prop-types'
import Moment from 'moment'
import Collapsible from 'react-collapsible'
import {default as $} from 'jquery'
import TwoLevelPieChart from './InteractivePie'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts'
import _ from 'lodash'
import withQuery from 'with-query'


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
        <input type="checkbox" checked={this.props.option.show}/>
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
      parser: new Json2csvParser.Parser()
    }
    this.onColumnToggle = this.onColumnToggle.bind(this)
    this.onExportChoosen = this.onExportChoosen.bind(this)
    this.toTitleCase = this.toTitleCase.bind(this)
    this.getFormattedColumns = this.getFormattedColumns.bind(this)
  }

  toTitleCase(str) {
    if(!str){
      return str
    }else if(typeof(str) === "object" && str.constructor === Array){
       str = str.join()
    }else if(typeof(str) === "object"){
       str = str[0]
    } else if(typeof(str) === "number"){
      str += String("")
    }
    if(str.replace){
      str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
      const fields = this.state.columns.filter(c => c.show).map(c => {
        return {
          label: c['Header'],
          value: c.accessor
        }
      })
      const opts = {
        fields,
        doubleQuote: ""
      };

      try {
        const csv = this.state.parser.parse(this.props.parent.state._rows);
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
    this.setState({
      columns: columnsData.columns,
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
          <p >{this.props.parent.state._rows.length} matches out of {this.props.parent.state.totalRecords}</p>
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
          pageSize={100}
          columns={this.state.columns}
          defaultPageSize={this.props.parent.state._rows.length}
          showPagination={false}
          minRows={10}
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

class BarChartComponent extends React.Component {

 constructor (props: Object) {
    super(props)

    this.state = {
      data: []
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
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Bar dataKey="substance_name" fill="#8884d8" />
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

class ResultsInfographicComponent extends React.Component {

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
  componentDidUpdate(){
    if(!Object.keys(this.props.parent.state.infographicsConfig).length){
      return
    }
  }

  getBarChartData(obj, index){
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

    if(this.state.yearSelection.value !== "All"){
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

  onYearToggle(selection){
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
        },function(){
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
              columns={this.props.parent.state.dataset.columns}
              infographics={this}
            />
          </div>
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

    if(filter.value.length){
      filter.value.splice(valueIdx, 1)
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
          style={{
            padding: 5,
            borderRadius: 35,
            border: "2px solid black",
            boxShadow: "0 0 3px gray",
            backgroundColor: "white",
            marginLeft: 7,
            marginTop: 10
          }}
        >
          <i style={{
            paddingRight: 10
          }}>
            {`${filter.label}: ${filter.value}`}
          </i>
          { filter.query_type === "range" ? null :
            <img
              src='/img/cancel_icon.png'
              style={{
                height:20,
                display: 'inline',
                paddingTop: 2
              }}
            />
          }
        </button>
      )
    })
  }

  render (): ?React.Element {
    const filters = this.formatValues()
    return (
      <div style={{height: "100%"}}>
        <h3>Selected Filters:</h3>
        <div
          style={{
            paddingTop: 10
          }}
        >
          {filters}
          <a
            onClick={ () => this.clearAll() }
            style={{
              paddingLeft:10,
              textDecoration: "underline",
              fontWeight: "bold"
            }}
          >
          Clear All
          </a>
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
    return (
      <div className={'dataset-explorer-content '} id='dataset-explorer-content'>
        <div>
          <ResultsInfographicComponent
            parent={this.props.parent}
          />
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

export default DatasetExplorerContentComponent



