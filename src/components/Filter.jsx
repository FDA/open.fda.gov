/* @flow */

import React from 'react'

import Checkbox from 'rc-checkbox'
import Select from 'react-select'
import Async from 'react-select'
import _ from 'lodash'
import Moment from 'moment'
import AutoCompleteComponent from './AutoComplete'
import withQuery from 'with-query'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import 'rc-checkbox/assets/index.css'


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
      values: [],
      elements:  null,
      url: this.props.parent.state.dataset.url,
      endpoint: this.props.parent.state.dataset.endpoint
    }
    this.onChange = this.onChange.bind(this)
    this.removeValue = this.removeValue.bind(this)
    this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this)
    this.onInputKeyDown = this.onInputKeyDown.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.formatValues = this.formatValues.bind(this)
  }

  componentDidMount () {
    this.setState({
      options: []
    })

    const field = this.props.option.field
    const autocomplete_field = this.props.option.autocomplete_field
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

  removeValue(idx){
    const value = this.props.parent.state.filters[this.props.option.idx].value[idx]

    this.props.onChange({
      label: value,
      value: value
    }, {
      field: this.props.option.field,
      idx: this.props.option.idx
    })
  }

  getOptions(value, callback) {
    if(value){
      return fetch(
          withQuery(`${this.state.url}/${this.state.endpoint}`,{
              searchField: this.props.option.autocomplete_field,
              searchText: value,
              searchType: 'autocomplete',
              limit: this.props.option.limit
          })
      )
      .then(res => res.json())
      .then((json) => {
        var r = json.results.map(value => {
          return {
            value: value,
            label: value
          }
        })
        return {
          'options': r
        }
      })
      .catch((err) => {
        return {
          options: []
        }
      })
    } else {
      callback(null, {
          options: this.state.options,
          complete: true,
      })
    }
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  onInputKeyDown(value){
    const escapedValue = this.escapeRegexCharacters(value.trim())
    this.getSuggestions(escapedValue).then(results => {
      if(!results){
          return
      }
      this.setState({
        options: results.map(result => {
          return {
            value: result,
            label: result
          }
        }),
        value: escapedValue
      })
    })

  }

  formatValues(values){
    return values.map((value,idx) => {
      return (
        <div 
          key={`value-${idx}`}
          style={{
            display: "flex",
            paddingTop: 10
          }}
        >
          <button onClick={() => this.removeValue(idx)}
            style={{
              padding: 0
            }}
          >
            <i style={{
              paddingRight: 10
            }}>{value}</i>
            <img src="/img/cancel_icon.png" style={{
              height:20,
              display: 'inline'
            }}/>
          </button>
        </div>
      )
    })
  }

  onChange(selectionObj){
    this.setState({
      value: this.props.option.placeholder
    })

    if(this.props.onChange){
      this.props.onChange(selectionObj, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    const elements = this.formatValues(this.props.parent.state.filters[this.props.option.idx].value)

    return (
      <div key={"div" + parseInt(Math.random()*100)}>
        <br/>
        <h3>{this.props.option.label}</h3>
        <br/>
         <Select.Async
            value={this.state.value}
            style={{
              width:250
            }}
            placeholder={this.props.option.placeholder}
            onChange={this.onChange}
            loadOptions={this.getOptions}
            clearable={false}
          />
        {elements}
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
      let value = []
      if(!true){}
      else if(option === "Last 7 Days"){
        const startdate = Moment().subtract(7, "days")
        const enddate = Moment()
        const startdateLabel = this.getFormattedDate(startdate, "full")
        const enddateLabel = this.getFormattedDate(enddate, "full")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if(option === "Last 30 Days"){
        const enddate = Moment()
        const startdate = Moment().subtract(30, "days")
        const enddateLabel = this.getFormattedDate(enddate, "full")
        const startdateLabel = this.getFormattedDate(startdate, "full")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if(option === "YTD"){
        const startdate = Moment().startOf('year')
        const enddate = Moment()

        const year = this.getFormattedDate(startdate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")
        
        label = `${option} (${year})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if(option === "Last Year"){
        const startdate = Moment().startOf('year').subtract(1, "years")
        const enddate = Moment().endOf('year').subtract(1, "years")

        const year = this.getFormattedDate(startdate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")
        
        label = `${option} (${year})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if(option === "Last 5 Years"){
        const enddate = Moment().endOf('year')
        const startdate = Moment().startOf('year').subtract(5, "years")
        const startdateLabel = this.getFormattedDate(startdate, "year")
        const enddateLabel = this.getFormattedDate(enddate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")


        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if(option === "All Available"){
        const enddate = Moment().endOf('year')
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option}`
        value = ["19800101", `${enddateValue}`]
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

class DatePickerFilterComponent extends React.Component {

  constructor (props: Object) {
    super(props)
    
    const startDay = Moment().subtract(10, "years").toDate()
    const endDay = new Date()

    this.state = {
      startDay: startDay,
      endDay: endDay,
      isDisabled: false,
    }

    this.onChangeStart = this.onChangeStart.bind(this)
    this.onChangeEnd = this.onChangeEnd.bind(this)
  }

  componentDidMount () {
    if(this.props.onChangeStart){
      this.props.onChangeStart(this.state.startDay, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
    if(this.props.onChangeEnd){
      this.props.onChangeEnd(this.state.endDay, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }

  }

  onChangeStart(startDay, modifiers){
    this.setState({
      startDay,
      isDisabled: modifiers.disabled === true,
    })
    if(this.props.onChangeStart){
      this.props.onChangeStart(startDay, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  onChangeEnd(endDay, modifiers){
    this.setState({
      endDay,
      isDisabled: modifiers.disabled === true,
    });
    if(this.props.onChangeEnd){
      this.props.onChangeEnd(endDay, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    return (
      <div key={"div" + parseInt(Math.random()*100)}>
        <p>Start Day:</p>
        <DayPickerInput
          value={this.state.startDay}
          onDayChange={this.onChangeStart}
          format={"M-D-YYYY"}
          dayPickerProps={{
            selectedDays: this.state.startDay
          }}
        />
        <br/><br/>
        <p>End Day:</p>
        <DayPickerInput
          value={this.state.endDay}
          onDayChange={this.onChangeEnd}
          format={"M-D-YYYY"}
          dayPickerProps={{
            selectedDays: this.state.endDay
          }}
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
    // const field = this.props.option.field
    // const states = {}
    // this.props.option.options.forEach(option => {
    //   states[option.label] = 0
    // })
    // this.setState({
    //   states
    // })
  }

  onChange(e){
    // const value = e.target.value
    // this.state.states[value] = (!this.state.states[value] ? 1 : 0)


    // Object.keys(this.state.states).forEach(option => {
    //   const label = option.label
    //   if(value === label){
    //     this.state.states[label] = (!this.state.states[label] ? 1 : 0)
    //   }
    // })

    this.setState({
      states: this.state.states
    })

    if(this.props.onChange){
      this.props.onChange(e, this.props.option)
    }
  }

  render (): ?React.Element {

    const field = this.props.option.field
    const output = this.props.option.options.map((option, idx) => {
      const currentValue = this.props.parent.state.filters[this.props.option.idx].value
      const checked = (currentValue.indexOf(option.value) > -1)
      return (
        <div key={`div${idx}`}>
          <p>
            <label>
              <Checkbox
                key={`box${idx}`}
                field={field}
                onChange={this.onChange}
                checked={ checked }
                filterIdx={this.props.option.idx}
                value={option.label}
                idx={idx}
              />
              { String.fromCharCode(160) + option.label}
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

class FreeTextFilterComponent extends React.Component {
    constructor (props: Object) {
      super(props)

      this.state = {
        currentValue: ""
      }
      this.onChange = this.onChange.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.formatValues = this.formatValues.bind(this)
      this.removeValue = this.removeValue.bind(this)
    }

    componentDidMount () {
    }

    removeValue(idx){
      const value = this.props.parent.state.filters[this.props.option.idx].value[idx]

      this.props.onChange(value, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }

    onChange(event) {
      this.setState({
        currentValue: event.target.value
      })
    }

    formatValues(values){
      return values.map((value,idx) => {
        return (
          <div 
            key={`value-${idx}`}
            style={{
              display: "flex",
              paddingTop: 10
            }}
          >
            <button onClick={() => this.removeValue(idx)}
              style={{
                padding: 0
              }}
            >
              <i style={{
                paddingRight: 10
              }}>{value}</i>
              <img src="/img/cancel_icon.png" style={{
                height:20,
                display: 'inline'
              }}/>
            </button>
          </div>
        )
      })
    }

    handleKeyPress(e) {
      if(e.key === "Enter"){
        const value = e.target.value

        this.setState({
          currentValue: ""
        })

        if(this.props.onChange){
          this.props.onChange(value, {
            field: this.props.option.field,
            idx: this.props.option.idx
          })
        }
      }
    }

    render(): ?React.Element {
      const elements = this.formatValues(this.props.parent.state.filters[this.props.option.idx].value)

      return (
        <div>
          <input 
            type="text"
            placeholder={this.props.option.placeholder}
            value={this.state.currentValue}
            onKeyPress={this.handleKeyPress}
            onChange={this.onChange}
            id={this.props.option.idx}
            style={{
              fontSize:10, 
              height:30, 
              width:250
            }}
          />
          {elements}
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
    this.onChangeDatePickerEnd = this.onChangeDatePickerEnd.bind(this)
    this.onChangeDatePickerStart = this.onChangeDatePickerStart.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  componentDidMount () {
    this.props.parent.getData()
  }

  onChangeCheckbox(e, options) {
    const value = options.options.filter(v => e.target.value === v.label)[0].value

    const currentValues = this.props.parent.state.filters[e.target.filterIdx].value

    let valueToSet = null
    const currentIndex = currentValues.indexOf(value)
    // contains value already
    if( currentIndex > -1 ){
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[e.target.filterIdx].value = currentValues

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeAutoComplete(value, meta){
    const currentValues = this.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if( currentIndex > -1 ){
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.parent.state.filters[meta.idx].value = currentValues

    this.parent.setState({
      filters: this.parent.state.filters
    })
  }

  onChangeSelect(selectionObj, meta, cb){
    const value = selectionObj.value
    const currentValues = this.props.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if( currentIndex > -1 ){
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[meta.idx].value = currentValues

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeTimeSelect(selectionObj, meta){
    this.parent.state.filters[meta.idx].value = selectionObj.value

    this.parent.setState({
      filters: this.parent.state.filters
    })
  }

  onChangeDatePickerEnd(date, meta){
    const currentValue = this.props.parent.state.filters[meta.idx].value

    this.props.parent.state.filters[meta.idx].value = [currentValue[0], date]

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeDatePickerStart(date, meta){
    const currentValue = this.props.parent.state.filters[meta.idx].value

    this.props.parent.state.filters[meta.idx].value = [date, currentValue[1]]

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeText(value, meta){
    const currentValues = this.props.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if( currentIndex > -1 ){
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[meta.idx].value = currentValues

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
            parent={this.props.parent}
            onChange={this.onChangeTimeSelect}
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
              parent={this.props.parent}
              onChange={this.onChangeAutoComplete}
              option={option}
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
              parent={this.props.parent}
            />
          </div>
        )
      } else if(option.type === "datepicker") {
        return (
          <div key={`div${idx}`}>
            <br/>
            <h3>{option.label}</h3>
            <br/>
            <DatePickerFilterComponent
              key={`filter${idx}`}
              option={option}
              parent={this.props.parent}
              onChangeStart={this.onChangeDatePickerStart}
              onChangeEnd={this.onChangeDatePickerEnd}
            />
          </div>
        )
      } else if(option.type === "free_text") {
          return (
            <div key={`div${idx}`}>
              <br/>
              <h3>{option.label}</h3>
              <br/>
              <FreeTextFilterComponent
                style={{
                    height:200,
                    fontSize:14
                }}
                key={`filter${idx}`}
                option={option}
                onChange={this.onChangeText}
                parent={this.props.parent}
              />
            </div>
          )
      }

    })

    return (
      <div style={{
        height: "100%",
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
          onClick={() => this.props.parent.getData()}
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