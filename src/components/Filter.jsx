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
import Datetime from 'react-datetime'

require('react-datetime');

import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'react-day-picker/lib/style.css'
import 'rc-checkbox/assets/index.css'
import 'react-select/dist/react-select.css';


class SelectFilterComponent extends React.Component {
    constructor (props: Object) {
        super(props)

        this.state = {
            currentValue: "",
            options:this.props.options
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

    onChange(selectionObj) {

        let choice = null
        this.state.options.forEach(option => {
            if (option.value === selectionObj.label) {
                choice = option
            }
        })

        this.setState({
            currentValue: choice
        })

        if(this.props.onChange){
            this.props.onChange(selectionObj, {
                field: this.props.option.field,
                idx: this.props.option.idx
            })
        }
        //  this.setState({
        //     currentValue: event.target.value
        // })
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

    /* render(): ?React.Element {
         const elements = this.formatValues(this.props.parent.state.filters[this.props.option.idx].value)

         return (
             <div className='filter-input'>
                 <input
                     type='text'
                     placeholder={this.props.option.placeholder}
                     value={this.state.currentValue}
                     onKeyPress={this.handleKeyPress}
                     onChange={this.onChange}
                     id={this.props.option.idx}
                 />
                 {elements}
             </div>
         )
     } */

  render (): ?React.Element {
    const elements = this.formatValues(this.props.parent.state.filters[this.props.option.idx].value)
    return (
      <div className='filter-item-container' key={"div" + parseInt(Math.random()*100)}>
        <Select
          value={this.state.currentValue}
          className='filter-select'
          placeholder={this.props.placeholder}
          onKeyPress={this.handleKeyPress}
          onChange={this.onChange}
          options={this.props.options}
          id={this.props.option.idx.toString()}
          clearable={false}
        />
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
      autocomplete_field: null,
      field: null,
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
    if(!this.props.parent.state.filters.length){
      return
    }
  }

  componentWillReceiveProps(){
    const field = this.props.option.field
    const autocomplete_field = this.props.option.autocomplete_field

    if(
        field === this.state.field 
        && autocomplete_field === this.state.autocomplete_field
        && this.props.parent.state.dataset.endpoint === this.state.endpoint
      ){
      return
    }

    if(this.props.option.can_query){
      this.setState({
        autocomplete_field,
        field,
        endpoint: this.props.parent.state.dataset.endpoint
      }, () => {
        this.props.parent.state.drs.getTopValues(field).then(options => {
          this.setState({
            options
          })
        })
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
        withQuery(`${this.props.parent.state.dataset.url}/${this.props.parent.state.dataset.endpoint}`,{
          searchField: this.props.option.autocomplete_field,
          searchText: value,
          searchType: 'autocomplete',
          limit: this.props.option.limit
        })
      ).then(res => res.json())
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
      if (!results){
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

    if (this.props.onChange){
      this.props.onChange(selectionObj, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    if(!this.props.parent.state.filters.length){
      return (<span/>)
    }
    const elements = this.formatValues(this.props.parent.state.filters[this.props.option.idx].value)

    return (
      <div className='filter-item-container' key={"div" + parseInt(Math.random()*100)}>
        <h3>{this.props.option.label}</h3>
        <Select.Async
          value={this.state.value}
          className='filter-select'
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
    if (style === "year"){
      formatStr = "YYYY"
    } else if (style === "full") {
      formatStr = 'MM/DD/YYYY'
    } else if (style === "value") {
      formatStr = 'YYYYMMDD'
    }
    return d.format(formatStr)
  }

  getTimeValue(range) {

  }
  // [${year}0101+TO+${year}1231]
  getDateLabels() {
    const options = this.props.option.options.map(option => {
      let label = ""
      let value = []
      if (!true) {}
      else if (option === "Last 7 Days") {
        const startdate = Moment().subtract(7, "days")
        const enddate = Moment()
        const startdateLabel = this.getFormattedDate(startdate, "full")
        const enddateLabel = this.getFormattedDate(enddate, "full")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if (option === "Last 30 Days") {
        const enddate = Moment()
        const startdate = Moment().subtract(30, "days")
        const enddateLabel = this.getFormattedDate(enddate, "full")
        const startdateLabel = this.getFormattedDate(startdate, "full")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if (option === "YTD") {
        const startdate = Moment().startOf('year')
        const enddate = Moment()

        const year = this.getFormattedDate(startdate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${year})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if (option === "Last Year") {
        const startdate = Moment().startOf('year').subtract(1, "years")
        const enddate = Moment().endOf('year').subtract(1, "years")

        const year = this.getFormattedDate(startdate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")

        label = `${option} (${year})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if (option === "Last 5 Years") {
        const enddate = Moment().endOf('year')
        const startdate = Moment().startOf('year').subtract(5, "years")
        const startdateLabel = this.getFormattedDate(startdate, "year")
        const enddateLabel = this.getFormattedDate(enddate, "year")
        const startdateValue = this.getFormattedDate(startdate, "value")
        const enddateValue = this.getFormattedDate(enddate, "value")


        label = `${option} (${startdateLabel} - ${enddateLabel})`
        value = [`${startdateValue}`, `${enddateValue}`]
      } else if (option === "All Available") {
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

  onChange(selectionObj) {
    this.setState({
      value: selectionObj
    })

    if (selectionObj === null) {
      selectionObj = this.state.defaultOption
    }

    if (this.props.onChange) {
      this.props.onChange(selectionObj, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    return (
      <div className='filter-item-container' key={"div" + parseInt(Math.random() * 100)}>
        <h3>{this.props.option.label}</h3>
        <Select
          value={this.state.value}
          className='filter-select'
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
    this.state = {
      startDay: Moment().subtract(10, "years").toDate(),
      endDay: new Date(),
      isDisabled: false,
      field: null,
      endpoint: null,
      viewName: null
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps(){

    if(
      this.props.option.field === this.state.field
        && this.props.parent.state.dataset.endpoint === this.state.endpoint
        && this.props.parent.state.view.label === this.state.viewName
    ){
      return
    }

    this.setState({
      field: this.props.option.field,
      endpoint: this.props.parent.state.dataset.endpoint,
      startDay: Moment().subtract(10, "years").toDate(),
      endDay: new Date(),
      viewName: this.props.parent.state.view.label
    }, () => {
      if (this.props.onChangeStart) {
        this.props.onChangeStart(this.state.startDay, {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
      if (this.props.onChangeEnd) {
        this.props.onChangeEnd(this.state.endDay, {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
    })
  }

  onChangeStart(startDay, modifiers) {
    this.setState({
      startDay,
      isDisabled: modifiers.disabled === true,
    })
    if (this.props.onChangeStart) {
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
    if (this.props.onChangeEnd) {
      this.props.onChangeEnd(endDay, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  render (): ?React.Element {
    return (
      <div className='day-picker' key={"div" + parseInt(Math.random()*100)}>
        <p>Start Day:</p>
        <DayPickerInput
          classNames={{
            container: 'day-picker-container',
            overlay: 'day-picker-overlay',
            overlayWrapper: 'day-picker-overlay-wrapper'
          }}
          value={this.state.startDay}
          onDayChange={this.onChangeStart}
          format={"LL"}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: this.state.startDay
          }}
        />
        <p>End Day:</p>
        <DayPickerInput
          classNames={{
            container: 'day-picker-container',
            overlay: 'day-picker-overlay',
            overlayWrapper: 'day-picker-overlay-wrapper'
          }}
          value={this.state.endDay}
          onDayChange={this.onChangeEnd}
          format={"LL"}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: this.state.endDay
          }}
        />
      </div>
    )
  }
}

class YearPickerFilterComponent extends React.Component {

  constructor(props: Object) {
    super(props)

    const startYear = Moment().subtract(10, "years").toDate()
    const endYear = Moment().toDate()

    this.state = {
      startYear: startYear,
      endYear: endYear
    }

    this.onChangeStart = this.onChangeStart.bind(this)
    this.onChangeEnd = this.onChangeEnd.bind(this)
  }

  componentDidMount () {
  }

  componentWillReceiveProps () {

    if (
      this.props.option.field === this.state.field
      && this.props.parent.state.dataset.endpoint === this.state.endpoint
      && this.props.parent.state.view.label === this.state.viewName
    ) {
      return
    }

    this.setState({
      field: this.props.option.field,
      endpoint: this.props.parent.state.dataset.endpoint,
      startDay: Moment().subtract(10, "years").toDate(),
      endDay: new Date(),
      viewName: this.props.parent.state.view.label
    }, () => {
      if (this.props.onChangeYear) {
        this.props.onChangeYear(Moment(this.state.startYear).format('YYYY'), Moment(this.state.endYear).format('YYYY'), {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
    })
  }

  onChangeStart (startYear) {
    this.setState({
      startYear
    })
    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(startYear).format('YYYY'), Moment(this.state.endYear).format('YYYY'), {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  onChangeEnd (endYear) {
    this.setState({
      endYear
    })
    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(endYear).format('YYYY'), Moment(this.state.startYear).format('YYYY'), {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }


  render (): ?React.Element {
    return (
      <div className='year-picker' key={"div" + parseInt(Math.random()*100)}>
        <p>Start Year:</p>
        <Datetime
          className='year-picker-container'
          dateFormat='YYYY'
          timeFormat={false}
          onChange={this.onChangeStart}
          value={this.state.startYear}
        />
        <p>End Year:</p>
        <Datetime
          className='year-picker-container'
          dateFormat='YYYY'
          timeFormat={false}
          onChange={this.onChangeEnd}
          value={this.state.endYear}
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

    if (this.props.onChange) {
      this.props.onChange(e, this.props.option)
    }
  }

  render (): ?React.Element {
    if(!this.props.parent.state.filters.length){
      return (<span/>)
    }
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
    });
    return (
      <div>
        { output }
      </div>
    )
  }
}

class BooleanFilterComponent extends React.Component {

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

    if (this.props.onChange) {
      this.props.onChange(e, this.props.option)
    }
  }

  render (): ?React.Element {
    if(!this.props.parent.state.filters.length){
      return (<span/>)
    }
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
    });
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
    if (e.key === "Enter") {
      const value = e.target.value

      this.setState({
        currentValue: ""
      })

      if (this.props.onChange) {
        this.props.onChange(value, {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
    }
  }

  render(): ?React.Element {
    if(!this.props.parent.state.filters.length){
      return (<span/>)
    }
    const elements = this.formatValues(this.props.parent.state.filters[this.props.option.idx].value)

    return (
      <div className='filter-input'>
        <input
          type='text'
          placeholder={this.props.option.placeholder}
          value={this.state.currentValue}
          onKeyPress={this.handleKeyPress}
          onChange={this.onChange}
          id={this.props.option.idx}
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
      displayFilters: true
    }

    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
    this.onChangeBoolean = this.onChangeBoolean.bind(this)
    this.onChangeDatePickerEnd = this.onChangeDatePickerEnd.bind(this)
    this.onChangeDatePickerStart = this.onChangeDatePickerStart.bind(this)
    this.onChangeYearPicker = this.onChangeYearPicker.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeDropDown = this.onChangeDropDown.bind(this)
  }

  componentDidMount () {
  }

  onChangeCheckbox(e, options) {
    const value = options.options.filter(v => e.target.value === v.label)[0].value

    const currentValues = this.props.parent.state.filters[e.target.filterIdx].value

    let valueToSet = null
    const currentIndex = currentValues.indexOf(value)
    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[e.target.filterIdx].value = currentValues

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeBoolean(e, options) {
    const value = options.options.filter(v => e.target.value === v.label)[0].value

    let currentValue = this.props.parent.state.filters[e.target.filterIdx].value

    if (value === currentValue) {
      this.props.parent.state.filters[e.target.filterIdx].value = []
    } else {
      this.props.parent.state.filters[e.target.filterIdx].value = [value]
    }

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeAutoComplete(value, meta){
    const currentValues = this.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.parent.state.filters[meta.idx].value = currentValues

    this.parent.setState({
      filters: this.parent.state.filters
    })
  }

  onChangeSelect(selectionObj, meta, cb) {
    const value = selectionObj.value
    const currentValues = this.props.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[meta.idx].value = currentValues

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeTimeSelect(selectionObj, meta) {
    if(!this.props.parent.state.filters.length){
      return
    }
    this.parent.state.filters[meta.idx].value = selectionObj.value

    this.parent.setState({
      filters: this.parent.state.filters
    })
  }

  onChangeDatePickerEnd(date, meta) {
    if(!this.props.parent.state.filters.length){
      return
    }
    const currentValue = this.props.parent.state.filters[meta.idx].value

    this.props.parent.state.filters[meta.idx].value = [currentValue[0], date]

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeDatePickerStart(date, meta) {
    if(!this.props.parent.state.filters.length){
      return
    }
    const currentValue = this.props.parent.state.filters[meta.idx].value

    this.props.parent.state.filters[meta.idx].value = [date, currentValue[1]]

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeYearPicker(start_date, end_date, meta) {
    if(!this.props.parent.state.filters.length){
      return
    }
    const currentValue = this.props.parent.state.filters[meta.idx].value
    let newValue = []
    for (var i = start_date; i <= end_date; i++) {
      newValue.push(i.toString());
    }

    this.props.parent.state.filters[meta.idx].value = newValue

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeText(value, meta) {
    if(!this.props.parent.state.filters.length){
      return
    }
    value = value.toLowerCase()
    const currentValues = this.props.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[meta.idx].value = currentValues

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  onChangeDropDown(selectionObj, meta){
    const value = selectionObj.value
    const currentValues = this.props.parent.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.props.parent.state.filters[meta.idx].value = currentValues

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  toggleFilters () {
    if (this.state.displayFilters === false) {
      document.getElementById("filter-sidebar").style.width = "23%"
      document.getElementById("dataset-explorer-content").style.width = "75%"
      document.getElementById("fa-angle-double-left").style.transform = "scale(1, 1)"
    } else {
      document.getElementById("filter-sidebar").style.width = "0%"
      document.getElementById("dataset-explorer-content").style.width = "97%"
      document.getElementById("fa-angle-double-left").style.transform = "scale(-1, 1)"
    }
    this.setState({
      displayFilters: !this.state.displayFilters
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
      if (option.type === "time_select") {
        return (
          <TimeSelectFilterComponent
            key={`filter${idx}`}
            option={option}
            parent={this.props.parent}
            onChange={this.onChangeTimeSelect}
          />
        )
      } else if (option.type === "select") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <SelectFilterComponent
              key={`filter${idx}`}
              option={option}
              placeholder={option.placeholder}
              options={option.options}
              parent={this.props.parent}
              onChange={this.onChangeDropDown}
            />
          </div>
        )
      } else if (option.type === "select_autocomplete") {
        return (
          <SelectAutoCompleteFilterComponent
            key={`filter${idx}`}
            option={option}
            options={option.options}
            parent={this.props.parent}
            onChange={this.onChangeSelect}
          />
        )
      } else if (option.type === "autocomplete") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <AutoCompleteComponent
              key={"filter" + idx}
              parent={this.props.parent}
              onChange={this.onChangeAutoComplete}
              option={option}
            />
          </div>
        )
      } else if (option.type === "checkbox") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <CheckboxFilterComponent
              key={`filter${idx}`}
              option={option}
              onChange={this.onChangeCheckbox}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "boolean") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <BooleanFilterComponent
              key={`filter${idx}`}
              option={option}
              onChange={this.onChangeBoolean}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "datepicker") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <DatePickerFilterComponent
              key={`filter${idx}`}
              option={option}
              parent={this.props.parent}
              onChangeStart={this.onChangeDatePickerStart}
              onChangeEnd={this.onChangeDatePickerEnd}
            />
          </div>
        )
      } else if (option.type === "yearpicker") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <YearPickerFilterComponent
              key={`filter${idx}`}
              option={option}
              parent={this.props.parent}
              onChangeYear={this.onChangeYearPicker}
            />
          </div>
        )
      } else if (option.type === "free_text") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <FreeTextFilterComponent
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
      <div className='filter-sidebar' id='filter-sidebar'>
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