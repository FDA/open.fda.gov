/* @flow */

import React from 'react'

import Checkbox from 'rc-checkbox'
import Select from 'react-select'
import 'rc-checkbox/assets/index.css'
import _ from 'lodash'
import Moment from 'moment'

import AutoCompleteComponent from './AutoComplete'

// autocomplete
// select
// time_select
// checkbox


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

class TimeSelectFilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
      options: []
    }
    this.getDateLabels = this.getDateLabels.bind(this)
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
        label = `${option}`
      }
      return {
        label: label,
        value: value
      }
    })

    this.setState({
      options: options
    })

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
            options={this.state.options || []}
          />
      </div>
    )
  }
}

class CheckboxFilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
    }
  }

  componentDidMount () {
  }
  // - label: Drug Approval Status
  // type: checkbox
  // options:
  //     - Approved
  //     - Unapproved


  render (): ?React.Element {
    const field = this.props.option.field
    const output = this.props.option.options.map((label, idx) => {
        return (
          <div key={"div" + idx}>
            <p>
              <label>
                <Checkbox
                  key={"box" + idx}
                  name={field}
                  defaultChecked
                  onChange={this.props.onChange}
                  disabled={this.state.disabled}
                />
                &nbsp; {label}
              </label>
            </p>
          </div>
        )
      })
    return (
      <div>
        <br/>
        <h3>{this.props.option.label}</h3>
        <br/>
        {
          output
        }
      </div>
    )
  }
}

class FilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
    }
  }

  componentDidMount () {
  }

  onChange(e) {
    console.log('Checkbox checked:', (e.target.checked));
  }

  render (): ?React.Element {

    if(!this.props.dataset.filters.options || !this.props.dataset.filters.options.length) {
      return <span/>
    }
    const endpoint = this.props.dataset.endpoint
    const url = this.props.dataset.url
    const components = this.props.dataset.filters.options.map((option,idx) => {
      if(option.type === "time_select"){
        return (
          <TimeSelectFilterComponent
            key={`filter${idx}`}
            option={option}
          />
        )
      } else if(option.type === "select") {
        return (
          <SelectFilterComponent
            key={`filter${idx}`}
            option={option}
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
          <CheckboxFilterComponent
            key={`filter${idx}`}
            option={option}
            onChange={this.onChange}
          />
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
      </div>
    )
  }
}


export default FilterComponent