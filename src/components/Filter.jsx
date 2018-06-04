/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import Checkbox from 'rc-checkbox'
import Select from 'react-select'
import Moment from 'moment'
import withQuery from 'with-query'
import ReactModal from 'react-modal'
import update from 'immutability-helper'

require('react-datetime');


import 'react-day-picker/lib/style.css'
import 'rc-checkbox/assets/index.css'


class SelectAutoCompleteFilterComponent extends React.Component {

 constructor (props: Object) {
    super(props)

    this.state = {
      values: [],
      elements:  null,
      autocomplete_field: null,
      field: null
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

    if(
      field === this.state.field
      && autocomplete_field === this.state.autocomplete_field
        && nextProps.endpoint === this.state.endpoint
    ){
      return
    }

    if(nextProps.option.can_query){
      this.setState({
        autocomplete_field,
        field
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
        withQuery(`${this.props.dataset.url}/${this.props.dataset.endpoint}`,{
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
          <h3 className='filter-header'>{this.props.option.label}
          {
            this.props.option.help_id &&
              <HelpWindow help_obj={this.props.help_config[this.props.option.help_id]} />
          }
          </h3>
        </div>
        <Select.Async
          value={this.state.value}
          className='filter-select'
          placeholder={this.props.option.placeholder}
          onChange={this.onChange}
          loadOptions={this.getOptions}
          clearable={false}
          aria-label={this.props.option.label}
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
          <h3 className='filter-header'>{this.props.help_obj.label}</h3>
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


class YearPickerFilterComponent extends React.Component {

  constructor(props: Object) {
    super(props)

    const startYear = this.props.option.start_year
    const endYear = Moment().format('YYYY')
    let years = this.getOptions()

    this.state = {
      years: years
    }

    this.onChangeStart = this.onChangeStart.bind(this)
    this.onChangeEnd = this.onChangeEnd.bind(this)
    this.getOptions = this.getOptions.bind(this)
  }

  /*componentDidMount () {
    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(this.state.startYear + '0101').format('YYYYMMDD'), Moment(this.state.endYear + '1231').format('YYYYMMDD'), {
        field: this.props.option.field,
        idx: this.props.option.idx,
      })
    }
  }*/

  componentWillReceiveProps (nextProps) {
    if (!nextProps.filters[nextProps.option.idx].value.length) {
      this.setState({
        startYear: 'Select start date',
        endYear: 'Select end date'
      })
    }
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

    let endYear = this.state.endYear + '0101'

    if (!Moment(endYear).isValid()) {
      endYear = Moment().format('YYYYMMDD')
    }

    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(startYear.value + '0101').format('YYYYMMDD'), Moment(endYear).format('YYYYMMDD'), {
        field: this.props.option.field,
        idx: this.props.option.idx
      })
    }
  }

  onChangeEnd (endYear) {
    this.setState({
      endYear: endYear.value
    })

    let startYear = this.state.startYear + '0101'

    if (!Moment(startYear).isValid()) {
      startYear = this.props.option.start_year + '0101'
    }

    if (this.props.onChangeYear) {
      this.props.onChangeYear(Moment(startYear).format('YYYYMMDD'), Moment(endYear.value + '1231').format('YYYYMMDD'), {
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
          <p className='checkbox'>
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
    const cols = []
    output.forEach(function(item, idx){
        cols.push(<div className="column" key={`column${idx}`}>{item}</div>)
    })

    return (
        <div className="row">
            {cols}
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
    if(!this.props.filters.length) {
      return (<span/>)
    }
    const field = this.props.option.field
    const output = this.props.option.options.map((option, idx) => {
      const currentValue = this.props.filters[this.props.option.idx].value
      const checked = (currentValue.indexOf(option.value) > -1)
      return (
        <div key={`div${idx}`}>
          <p className='checkbox'>
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

    const cols = []
    output.forEach(function(item, idx){
        cols.push(<div className="column" key={`column${idx}`}>{item}</div>)
    })

    return (
        <div className="row">
            {cols}
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
          aria-label={this.props.option.label}
        />
        {elements}
      </div>
    )
  }
}


class RangeQueryFilterComponent extends React.Component {

    constructor(props: Object) {
        super(props)

        const startValue = this.props.option.start_value
        const endValue = this.props.option.end_value
        let options = this.getOptions()

        this.state = {
            options: options
        }

        this.onChangeStart = this.onChangeStart.bind(this)
        this.onChangeEnd = this.onChangeEnd.bind(this)
        this.getOptions = this.getOptions.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        if (!nextProps.filters[nextProps.option.idx].value.length) {
            this.setState({
                startValue: 'Select start Year',
                endValue: 'Select end Year'
            })
        }
    }

    getOptions () {
        let list = [];
        for (let i = this.props.option.start_value; i <= this.props.option.end_value; i++) {
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

    onChangeStart (startValue) {
        this.setState({
            startValue: startValue.value
        })

        let endValue = this.state.endValue

        if (!Moment(endValue).isValid()) {
            endValue = Moment().format('YYYY')
        }

        if (this.props.onChangeYear) {
            this.props.onChangeYear(startValue.value, endValue, {
                field: this.props.option.field,
                idx: this.props.option.idx
            })
        }
    }

    onChangeEnd (endValue) {
        this.setState({
            endValue: endValue.value
        })

        let startValue = this.state.startValue

        if (!Moment(startValue).isValid()) {
            startValue = this.props.option.start_value
        }

        if (this.props.onChangeYear) {
            this.props.onChangeYear(startValue, endValue.value, {
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
                    value={this.state.startValue}
                    className='filter-select'
                    placeholder='Select Start Year'
                    onChange={this.onChangeStart}
                    options={this.state.options}
                    id={this.props.option.idx.toString()}
                    clearable={false}
                />
                <p>End Year:</p>
                <Select
                    value={this.state.endValue}
                    className='filter-select'
                    placeholder='Select End Year'
                    onChange={this.onChangeEnd}
                    options={this.state.options}
                    id={this.props.option.idx.toString()}
                    clearable={false}
                />
            </div>
        )
    }
}


class FilterComponent extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
      selected_filters: this.props.filters
    }

    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
    this.onChangeBoolean = this.onChangeBoolean.bind(this)
    this.onChangeYearPicker = this.onChangeYearPicker.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hideContent === false) {
      this.setState({
        selected_filters: nextProps.filters
      })
    }
  }

  onChangeCheckbox(e, options) {
    const value = options.options.filter(v => e.target.value === v.label)[0].value

    // contains value already
    if ( this.state.selected_filters[e.target.filterIdx].value.indexOf(value) > -1 ) {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[e.target.filterIdx]: {value: {$splice: [[0, 1]]}}})
      })
    } else {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[e.target.filterIdx]: {value: {$push: [value]}}})
      })
    }

    this.props.handleFilterChange()
  }

  onChangeBoolean(e, options) {
    const value = options.options.filter(v => e.target.value === v.label)[0].value

    if (value !== this.state.selected_filters[e.target.filterIdx].value[0]) {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[e.target.filterIdx]: {value: {$set: [value]}}})
      })
    } else {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[e.target.filterIdx]: {value: {$set: []}}})
      })
    }

    this.props.handleFilterChange()
  }

  onChangeSelect(selectionObj, meta) {
    const value = selectionObj.value

    // contains value already
    if ( this.state.selected_filters[meta.idx].value.indexOf(value) > -1 ) {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[meta.idx]: {value: {$splice: [[0, 1]]}}})
      })
    } else {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[meta.idx]: {value: {$push: [value]}}})
      })
    }

    this.props.handleFilterChange()
  }

  onChangeYearPicker(start_date, end_date, meta) {
    this.setState({
      selected_filters: update(this.state.selected_filters, {[meta.idx]: {value: {$set: [start_date, end_date]}}})
    })

    this.props.handleFilterChange()
  }

  onChangeText(value, meta) {
    value = value.toLowerCase()

    // contains value already
    if ( this.state.selected_filters[meta.idx].value.indexOf(value) > -1 ) {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[meta.idx]: {value: {$splice: [[0, 1]]}}})
      })
    } else {
      this.setState({
        selected_filters: update(this.state.selected_filters, {[meta.idx]: {value: {$push: [value]}}})
      })
    }

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
  }


  render (): ?React.Element {

    if(!this.props.dataset.filters.options || !this.props.dataset.filters.options.length) {
      return <span/>
    }
    const components = this.props.dataset.filters.options.map((option,idx) => {
      option.idx = idx
      if (option.type === "select_autocomplete") {
        return (
          <SelectAutoCompleteFilterComponent
            dataset={this.props.dataset}
            filters={this.state.selected_filters}
            help_config={this.props.help_config}
            key={`filter${idx}`}
            onChange={this.onChangeSelect}
            option={option}
            options={option.options}
            parent={this.props.parent}
          />
        )
      } else if (option.type === "checkbox") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3 className='filter-header'>{option.label}</h3>
            <CheckboxFilterComponent
              filters={this.state.selected_filters}
              key={`filter${idx}`}
              onChange={this.onChangeCheckbox}
              option={option}
            />
          </div>
        )
      } else if (option.type === "boolean") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3 className='filter-header'>{option.label}</h3>
            <BooleanFilterComponent
              filters={this.state.selected_filters}
              key={`filter${idx}`}
              onChange={this.onChangeBoolean}
              option={option}
            />
          </div>
        )
      } else if (option.type === "yearpicker") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3 className='filter-header'>{option.label}</h3>
            <YearPickerFilterComponent
              filters={this.state.selected_filters}
              key={`filter${idx}`}
              onChangeYear={this.onChangeYearPicker}
              option={option}
            />
          </div>
        )
      } else if (option.type === "free_text") {
        return (
          <div className='filter-item-container' key={`div${idx}`}>
            <h3 className='filter-header'>{option.label}</h3>
            <FreeTextFilterComponent
              filters={this.state.selected_filters}
              key={`filter${idx}`}
              onChange={this.onChangeText}
              option={option}
            />
          </div>
        )
      } else if (option.type === "numeric_range") {
          return (
              <div className='filter-item-container' key={`div${idx}`}>
                  <h3 className='filter-header'>{option.label}</h3>
                  <RangeQueryFilterComponent
                      filters={this.state.selected_filters}
                      key={`filter${idx}`}
                      onChangeYear={this.onChangeYearPicker}
                      option={option}
                  />
              </div>
          )
      }

    })

    return (
      <div className={'filter-sidebar ' + (this.props.displayFilters ? ' ': 'display-none')} id='filter-sidebar'>
        <div className='filter-components'>
        {
          components
        }
        </div>
        <div className={'sidebar-buttons ' + (this.props.displayFilters ? ' ': 'display-none')}>
          <button className={this.props.hideContent ? 'filter-bg-darker-blue': 'filter-bg-light-blue'} onClick={() => this.props.updateSelectedFilters(this.state.selected_filters)}>
            APPLY FILTERS
          </button>
          <span onClick={this.props.clearAllFilters}>Clear All</span>
        </div>
      </div>
    )
  }
}


export default FilterComponent