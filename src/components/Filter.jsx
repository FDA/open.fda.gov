/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import Checkbox from 'rc-checkbox'
import Select from 'react-select'
import Moment from 'moment'
import AutoCompleteComponent from './AutoComplete'
import withQuery from 'with-query'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import ReactModal from 'react-modal'
import update from 'immutability-helper'

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
    const value = this.props.filters[this.props.option.idx].value[idx]

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

    if(this.props.onChange){
      this.props.onChange(selectionObj, {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  formatValues(values){
    return values.map((value, idx) => {
      return (
        <div key={`value-${idx}`} className='selected-filter'>
          <button onClick={() => this.removeValue(idx)}>
            <span>{value}</span>
            <i className='fa fa-times-circle' />
          </button>
        </div>
      )
    })
  }

  handleKeyPress(e) {
    if(e.key === "Enter"){
      const value = e.target.value

      if(this.props.onChange){
        this.props.onChange(value, {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
    }
  }

  render (): ?React.Element {
    const elements = this.formatValues(this.props.filters[this.props.option.idx].value)
    return (
      <div className='filter-item-container' key={"div" + parseInt(Math.random()*100)}>
        <Select
          value={""}
          className='filter-select'
          placeholder={this.props.placeholder}
          onKeyPress={this.handleKeyPress}
          onChange={this.onChange}
          options={this.props.options}
          id={this.props.option.idx.toString()}
          clearable={false}
        />
        {elements}
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
    if(!this.props.filters.length){
      return
    }
  }

  componentWillReceiveProps(nextProps){
    const field = nextProps.option.field
    const autocomplete_field = nextProps.option.autocomplete_field
    const endpoint = nextProps.parent.state.dataset.endpoint

    if(
      field === this.state.field
      && autocomplete_field === this.state.autocomplete_field
        && endpoint === this.state.endpoint
    ){
      return
    }

    if(nextProps.option.can_query){
      this.setState({
        autocomplete_field,
        field,
        endpoint: endpoint
      }, () => {
        nextProps.parent.state.drs.getTopValues(field).then(options => {
          this.setState({
            options
          })
        })
      })
    }
  }


  removeValue(idx){
    const value = this.props.filters[this.props.option.idx].value[idx]

    console.log("select auto remove value: ", value)
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
        <div key={`value-${idx}`} className='selected-filter'>
          <button onClick={() => this.removeValue(idx)}>
            <span>{value}</span>
            <i className='fa fa-times-circle' />
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
    if(!this.props.filters.length){
      return (<span/>)
    }
    const elements = this.formatValues(this.props.filters[this.props.option.idx].value)

    return (
      <div className='filter-item-container' key={"div" + parseInt(Math.random()*100)}>
        <div className='flex-row'>
          <h3>{this.props.option.label}</h3>
          {
            this.props.option.help_id &&
              <HelpWindow help_obj={this.props.help_config[this.props.option.help_id]} />
          }
        </div>
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


class HelpWindow extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
      showModal: false,
      sorted: [],
      page: 0,
      pageSize: 200,
      expanded: {},
      resized: [],
      filtered: []
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount () {
  }

  closeModal () {
    this.setState({
      showModal: false
    })
  }

  openModal () {
    this.setState({
      showModal: true
    })
  }

  render (): ?React.Element {
    return (
      <i className='fa fa-info-circle pad-l-1' onClick={this.openModal}>
        <ReactModal
          isOpen={this.state.showModal}
          className='help-window'
          overlayClassName='modal-overlay'
          contentLabel="Help Modal"
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <h3>{this.props.help_obj.label}</h3>
          <ReactTable
            data={this.props.help_obj.options}
            page={this.state.page}
            pageSize={this.state.pageSize}
            columns={this.props.help_obj.columns}
            defaultPageSize={this.props.help_obj.options.length}
            showPageSizeOptions={true}
            pageSizeOptions={[25, 50, 100, 200, 250, 500, 1000]}
            showPagination={true}
            resized={this.state.resized}
            onSortedChange={sorted => this.setState({ sorted })}
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
              this.setState({ page, pageSize })}
            onExpandedChange={expanded => this.setState({ expanded })}
            onResizedChange={resized => this.setState({ resized })}
            onFilteredChange={filtered => this.setState({ filtered })}
            minRows={10}
            filterable={true}
            style={{
              width: "100%"
            }}
            className="-striped -highlight"
          />
        </ReactModal>
      </i>
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

    const startYear = this.props.option.start_year
    const endYear = Moment().format('YYYY')

    this.state = {
      startYear: startYear,
      endYear: endYear
    }

    this.onChangeStart = this.onChangeStart.bind(this)
    this.onChangeEnd = this.onChangeEnd.bind(this)
    this.getOptions = this.getOptions.bind(this)
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
    let years = this.getOptions()

    this.setState({
      field: this.props.option.field,
      endpoint: this.props.parent.state.dataset.endpoint,
      viewName: this.props.parent.state.view.label,
      years: years
    }, () => {
      if (this.props.onChangeYear) {
        this.props.onChangeYear(Moment(this.state.startYear + '0101').format('YYYYMMDD'), Moment(this.state.endYear + '1231').format('YYYYMMDD'), {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
    })
  }

  getOptions () {
    let list = [];
    for (let i = this.props.option.start_year; i <= Moment().format('YYYY'); i++) {
      list.push({label: i, value: i});
    }
    return list
  }

  handleKeyPress(e) {
    if(e.key === "Enter"){
      const value = e.target.value

      if(this.props.onChange){
        this.props.onChange(value, {
          field: this.props.option.field,
          idx: this.props.option.idx
        })
      }
    }
  }

  onChangeStart (startYear) {
    this.setState({
      startYear: startYear.value
    })
    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(startYear.value + '0101').format('YYYYMMDD'), Moment(this.state.endYear + '1231').format('YYYYMMDD'), {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  onChangeEnd (endYear) {
    this.setState({
      endYear: endYear.value
    })
    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(this.state.startYear + '0101').format('YYYYMMDD'), Moment(endYear.value + '1231').format('YYYYMMDD'), {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }


  render (): ?React.Element {
    return (
      <div className='year-picker' key={"div" + parseInt(Math.random()*100)}>
        <p>Start Year:</p>
        <Select
          value={this.state.startYear}
          className='filter-select'
          placeholder='Select start date'
          onChange={this.onChangeStart}
          options={this.state.years}
          id={this.props.option.idx.toString()}
          clearable={false}
        />
        <p>End Year:</p>
        <Select
          value={this.state.endYear}
          className='filter-select'
          placeholder='Select end date'
          onChange={this.onChangeEnd}
          options={this.state.years}
          id={this.props.option.idx.toString()}
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
    if(!this.props.filters.length){
      return (<span/>)
    }
    const field = this.props.option.field
    const output = this.props.option.options.map((option, idx) => {
      const currentValue = this.props.filters[this.props.option.idx].value
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
    if(!this.props.parent.state.filters.length) {
      return (<span/>)
    }
    const field = this.props.option.field
    const output = this.props.option.options.map((option, idx) => {
      const currentValue = this.props.filters[this.props.option.idx].value
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

  removeValue(idx) {
    const value = this.props.filters[this.props.option.idx].value[idx]

    this.props.onChange(value, {
      field: this.props.option.field,
      idx: this.props.option.idx
    })
  }

  onChange(event) {
    console.log("event: ", event.target)
    this.setState({
      currentValue: event.target.value
    })
  }

  formatValues(values){
    return values.map((value,idx) => {
      return (
        <div key={`value-${idx}`} className='selected-filter'>
          <button onClick={() => this.removeValue(idx)}>
            <span>{value}</span>
            <i className='fa fa-times-circle' />
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
    if(!this.props.filters.length){
      return (<span/>)
    }
    const elements = this.formatValues(this.props.filters[this.props.option.idx].value)

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
      displayFilters: true,
      filters: this.props.filters
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

    const currentValues = this.state.filters[e.target.filterIdx].value

    const currentIndex = currentValues.indexOf(value)
    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.setState({
      filters: update(this.state.filters, {[e.target.filterIdx]: {value: currentValues}})
    })

    this.props.handleFilterChange()
  }

  onChangeBoolean(e, options) {
    const value = options.options.filter(v => e.target.value === v.label)[0].value

    let currentValue = this.state.filters[e.target.filterIdx].value
    if (value !== currentValue) {
      currentValue = [value]
    }

    this.setState({
      filters: update(this.state.filters, {[e.target.filterIdx]: {value: {$set: currentValue}}})
    })

    this.props.handleFilterChange()
  }

  onChangeAutoComplete(value, meta){
    console.log("in onchaaaaa")
    const currentValues = this.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)
    console.log("auto change filters: ", this.state.filters, currentValues)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    console.log("auto change filters: ", this.state.filters, currentValues)

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: currentValues}}})
    })

    this.props.handleFilterChange()
  }

  onChangeSelect(selectionObj, meta) {
    console.log("in onchaaaaa")
    const value = selectionObj.value
    const currentValues = this.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)
    console.log("auto change filters: ", this.state.filters, currentValues)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    console.log("auto change filters: ", this.state.filters, currentValues)
    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: currentValues}}})
    })

    this.props.handleFilterChange()
  }

  onChangeTimeSelect(selectionObj, meta) {
    if(!this.state.filters.length){
      return
    }

    this.state.filters[meta.idx].value = selectionObj.value

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: selectionObj.value}}})
    })

    this.props.handleFilterChange()
  }

  onChangeDatePickerEnd(date, meta) {
    if(!this.state.filters.length){
      return
    }
    const currentValue = this.state.filters[meta.idx].value

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: [currentValue[0], date]}}})
    })

    this.props.handleFilterChange()
  }

  onChangeDatePickerStart(date, meta) {
    if(!this.state.filters.length){
      return
    }
    const currentValue = this.state.filters[meta.idx].value

    this.state.filters[meta.idx].value = [date, currentValue[1]]

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: [date, currentValue[1]]}}})
    })

    this.props.handleFilterChange()
  }

  onChangeYearPicker(start_date, end_date, meta) {
    if(!this.state.filters.length){
      return
    }


    this.state.filters[meta.idx].value = [start_date, end_date]

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: [start_date, end_date]}}})
    })

    this.props.handleFilterChange()
  }

  onChangeText(value, meta) {
    if(!this.state.filters.length){
      return
    }
    value = value.toLowerCase()
    const currentValues = this.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: currentValues}}})
    })

    this.props.handleFilterChange()
  }

  onChangeDropDown(selectionObj, meta){
    const value = selectionObj.value
    const currentValues = this.state.filters[meta.idx].value
    const currentIndex = currentValues.indexOf(value)

    // contains value already
    if ( currentIndex > -1 ) {
      currentValues.splice(currentIndex, 1)
    } else {
      currentValues.push(value)
    }

    this.setState({
      filters: update(this.state.filters, {[meta.idx]: {value: {$set: currentValues}}})
    })

    this.props.handleFilterChange()
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
            filters={this.state.filters}
            key={`filter${idx}`}
            onChange={this.onChangeTimeSelect}
            option={option}
            parent={this.props.parent}
          />
        )
      } else if (option.type === "select") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <SelectFilterComponent
              filters={this.state.filters}
              key={`filter${idx}`}
              onChange={this.onChangeDropDown}
              option={option}
              options={option.options}
              parent={this.props.parent}
              placeholder={option.placeholder}
            />
          </div>
        )
      } else if (option.type === "select_autocomplete") {
        return (
          <SelectAutoCompleteFilterComponent
            filters={this.state.filters}
            help_config={this.props.help_config}
            key={`filter${idx}`}
            onChange={this.onChangeSelect}
            option={option}
            options={option.options}
            parent={this.props.parent}
          />
        )
      } else if (option.type === "autocomplete") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <AutoCompleteComponent
              filters={this.state.filters}
              key={"filter" + idx}
              onChange={this.onChangeAutoComplete}
              option={option}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "checkbox") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <CheckboxFilterComponent
              filters={this.state.filters}
              key={`filter${idx}`}
              onChange={this.onChangeCheckbox}
              option={option}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "boolean") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <BooleanFilterComponent
              filters={this.state.filters}
              key={`filter${idx}`}
              onChange={this.onChangeBoolean}
              option={option}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "datepicker") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <DatePickerFilterComponent
              filters={this.state.filters}
              key={`filter${idx}`}
              onChangeStart={this.onChangeDatePickerStart}
              onChangeEnd={this.onChangeDatePickerEnd}
              option={option}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "yearpicker") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <YearPickerFilterComponent
              filters={this.state.filters}
              key={`filter${idx}`}
              onChangeYear={this.onChangeYearPicker}
              option={option}
              parent={this.props.parent}
            />
          </div>
        )
      } else if (option.type === "free_text") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3>{option.label}</h3>
            <FreeTextFilterComponent
              filters={this.state.filters}
              key={`filter${idx}`}
              onChange={this.onChangeText}
              option={option}
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
        <div className='sidebar-buttons'>
          <button className={this.props.hideContent ? 'bg-darker-blue': 'bg-light-blue'} onClick={() => this.props.updateSelectedFilters(this.state.filters)}>
            APPLY FILTERS
          </button>
          <span onClick={this.props.clearAllFilters}>Clear All</span>
        </div>
      </div>
    )
  }
}


export default FilterComponent