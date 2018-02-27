/* @flow */

import React from 'react'

import Checkbox from 'rc-checkbox'
import Select from 'react-select'
import 'rc-checkbox/assets/index.css'
import _ from 'lodash'
import Moment from 'moment'
import AutoCompleteComponent from './AutoComplete'


class SelectFilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div>
      </div>
    )
  }
}

class SelectAutoCompleteFilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    const field = this.props.option.field
    if(this.props.option.can_query){
      this.props.parent.state.drs.getTopValues(field).then(options => {
        this.setState({
          options
        })
      })
    } else {
      let options = new Set()
      this.props.parent.state.sampleDocs.forEach(doc => {
        let value = doc[field]

        if(value === undefined){
          value = ""
        }
        if(value instanceof Array){
          value = value[0]
        }
        if(this.props.option.remove_chars !== undefined){
          value = value.toLowerCase().replace(this.props.option.remove_chars,"")
        }
        value.split(',').forEach(v =>{
          options.add(v.trim())
        })
      })

      const finalOptions = Array.from(options).map(v => {
        return { 
          label : v,
          value: v
        }
      })

      this.setState({
        options: finalOptions
      })
    }
  }

  onChange(selectionObj){
    this.setState({
      value: selectionObj
    })

    if(this.props.onChange){
      this.props.onChange(selectionObj, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    return (
      <div key={"div" + parseInt(Math.random()*100)}>
        <br/>
        <h3>{this.props.option.label}</h3>
        <br/>
         <Select
            value={this.state.value}
            style={{
              width:250
            }}
            placeholder={this.props.option.placeholder}
            onChange={this.onChange}
            options={this.state.options || []}
            clearable={false}
          />
      </div>
    )
  }
}

class TimeSelectFilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
      options: []
    }
    this.getDateLabels = this.getDateLabels.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    this.getDateLabels()
  }

  getFormattedDate(d, style) {
    let formatStr = ""
    if(style === "year"){
      formatStr = "YYYY"
    } else if (style === "full"){
      formatStr = 'MM/DD/YYYY'
    } else if (style === "value"){
      formatStr = 'YYYYMMDD'
    }
    return d.format(formatStr)
  }

  getTimeValue(range){

  }
  // [${year}0101+TO+${year}1231]
  getDateLabels() {
    const options = this.props.option.options.map(option => {
      let label = ""
      let value = ""
      if(!true){}
      else if(option === "Last 7 Days"){
        const startdate = Moment().subtract(7, "days")
        const enddate = Moment()
        const startdateLabel = this.getFormattedDate(startdate, "full")
        const enddateLabel = this.getFormattedDate(enddate, "full")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        value = `[${startdateValue}+TO+${enddateValue}]`
        label = `${option} (${startdateLabel} - ${enddateLabel})`
      } else if(option === "Last 30 Days"){
        const enddate = Moment()
        const startdate = Moment().subtract(30, "days")
        const enddateLabel = this.getFormattedDate(enddate, "full")
        const startdateLabel = this.getFormattedDate(startdate, "full")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = `[${startdateValue}+TO+${enddateValue}]`
      } else if(option === "YTD"){
        const startdate = Moment().startOf('year')
        const enddate = Moment()

        const year = this.getFormattedDate(startdate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")
        
        value = `[${startdateValue}+TO+${enddateValue}]`
        label = `${option} (${year})`
      } else if(option === "Last Year"){
        const startdate = Moment().startOf('year').subtract(1, "years")
        const enddate = Moment().endOf('year').subtract(1, "years")

        const year = this.getFormattedDate(startdate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")
        
        value = `[${startdateValue}+TO+${enddateValue}]`
        label = `${option} (${year})`
      } else if(option === "Last 5 Years"){
        const enddate = Moment().endOf('year')
        const startdate = Moment().startOf('year').subtract(5, "years")
        const startdateLabel = this.getFormattedDate(startdate, "year")
        const enddateLabel = this.getFormattedDate(enddate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")


        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = `[${startdateValue}+TO+${enddateValue}]`
      } else if(option === "All Available"){
        const enddate = Moment().endOf('year')
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option}`
        value = `[19800101+TO+${enddateValue}]`
      }
      return {
        label: label,
        value: value,
        field: this.props.option.field,
        idx: this.props.option.idx,
      }
    })
    const defaultOption = options[options.length - 1]

    this.setState({
      options: options,
      defaultOption: defaultOption
    }, this.onChange(defaultOption))

  }

  onChange(selectionObj){
    this.setState({
      value: selectionObj
    })

    if(selectionObj === null){
      selectionObj = this.state.defaultOption
    }

    if(this.props.onChange){
      this.props.onChange(selectionObj, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    return (
      <div key={"div" + parseInt(Math.random()*100)}>
        <br/>
        <h3>{this.props.option.label}</h3>
        <br/>
         <Select
            value={this.state.value}
            style={{
              width:250
            }}
            placeholder={this.props.option.placeholder}
            onChange={this.onChange}
            options={this.state.options || []}
            clearable={false}
          />
      </div>
    )
  }
}

class CheckboxFilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {}
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    const field = this.props.option.field
    const states = {}
    this.props.option.options.forEach(label => {
      states[label] = 0
    })
    this.setState({
      states
    })
  }

  onChange(e){
    const value = e.target.value
    const states = {}
    this.props.option.options.forEach(label => {
      let choice = null
      if(value === label){
        const currentValue = this.state.states[label]
        choice = !currentValue ? 1 : 0
      }
      states[label] = choice
    })
    this.setState({
      states
    })

    if(this.props.onChange){
      this.props.onChange(e)
    }
  }

  render (): ?React.Element {
    if(!this.state.states){
      return (<span/>)
    }
    const field = this.props.option.field
    const output = this.props.option.options.map((label, idx) => {
        return (
          <div key={`div${idx}`}>
            <p>
              <label>
                <Checkbox
                  key={`box${idx}`}
                  field={field}
                  onChange={this.onChange}
                  checked={this.state.states[label]}
                  filterIdx={this.props.option.idx}
                  value={label}
                  idx={idx}
                />
                &nbsp; {label}
              </label>
            </p>
          </div>
        )
      })
    return (
      <div>
        { output }
      </div>
    )
  }
}

class FilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
    }

    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
  }

  componentDidMount () {
    
  }

  onChangeCheckbox(e) {
    const value = e.target.value.toLowerCase()
    const currentValue = this.props.parent.state.filters[e.target.filterIdx].value
    let valueToSet = null

    if(currentValue === value){
      valueToSet = null
    } else {
      valueToSet = value
    }
    this.props.parent.state.filters[e.target.filterIdx].value = valueToSet

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }
  onChangeAutoComplete(){

  }

  onChangeSelect(selectionObj, meta){
    this.props.parent.state.filters[meta.idx].value = selectionObj.value

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  render (): ?React.Element {

    if(!this.props.parent.state.dataset.filters.options || !this.props.parent.state.dataset.filters.options.length) {
      return <span/>
    }
    const endpoint = this.props.parent.state.dataset.endpoint
    const url = this.props.parent.state.dataset.url
    const components = this.props.parent.state.dataset.filters.options.map((option,idx) => {
      option.idx = idx
      if(option.type === "time_select"){
        return (
          <TimeSelectFilterComponent
            key={`filter${idx}`}
            option={option}
            onChange={this.onChangeSelect}
          />
        )
      } else if(option.type === "select") {
        return (
          <SelectFilterComponent
            key={`filter${idx}`}
            option={option}
            onChange={this.onChangeSelect}
          />
        )
      } else if(option.type === "select_autocomplete") {
        return (
          <SelectAutoCompleteFilterComponent
            key={`filter${idx}`}
            option={option}
            parent={this.props.parent}
            onChange={this.onChangeSelect}
          />
        )
      } else if(option.type === "autocomplete") {
        return (
          <div key={`div${idx}`}>
            <br/>
            <h3>{option.label}</h3>
            <br/>
            <AutoCompleteComponent
              key={"filter" + idx}
              url={url}
              endpoint={endpoint}
              {...option}
            />
          </div>
        )
      } else if(option.type === "checkbox") {
        return (
          <div key={`div${idx}`}>
            <br/>
            <h3>{option.label}</h3>
            <br/>
            <CheckboxFilterComponent
              key={`filter${idx}`}
              option={option}
              onChange={this.onChangeCheckbox}
            />
          </div>
        )
      }
    })

    return (
      <div style={{
        height: "1000px",
        width: 300,
        float: "left",
        borderRight: 1,
        borderRightStyle: "solid",
        backgroundColor: "white",
        paddingLeft: 20
      }}>
        {
          components
        }
        <button 
          onClick={this.props.parent.updateResults}
          style={{
            backgroundColor: "lightgrey"
          }}
        >Update Data
        </button>
      </div>
    )
  }
}


export default FilterComponent