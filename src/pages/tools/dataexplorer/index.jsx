/* @flow */

import React from 'react'
import Select from 'react-select'
import _ from 'lodash'
import update from 'immutability-helper'

import Hero from '../../../components/Hero/index'
import FilterComponent from '../../../components/Filter'
import DatasetExplorerContentComponent from '../../../components/DatasetExplorerContent'
import DataRetrievalService from '../../../components/DataRetrieval'
import HelpWindow from '../../../components/HelpWindow'
import DataViewToggle from '../../../components/DataViewToggle'

import meta from './_meta.yaml'
import datasets from './_datasets.yaml'
import help_config from './help_config.yaml'
import infographicsConfig from './_infographics.json'

class DataExplorer extends React.Component {

  constructor (props: Object) {
    super(props)

    const options = Object.keys(datasets.names).map(name => {
      const viewsArray = Object.assign({}, datasets.names[name].views)
      datasets.names[name].views = []
      datasets.names[name].name = name
      Object.keys(viewsArray).map(function (k) {
        datasets.names[name].views.push(viewsArray[k])
      })

      return datasets.names[name]
    })

    const dataset = options[0]

    const defaultState = {
      options: options,
      dataset: null,
      view: null,
      applied_filters: [],
      drs: null,
      _rows: [],
      infographicsConfig: null,
      hideContent: false,
      visualization: false
    }

    this.state = _.extend(defaultState, this.getDatasetState(dataset))


    this.clearAllFilters = this.clearAllFilters.bind(this)
    this.getData = this.getData.bind(this)
    this.getFilters = this.getFilters.bind(this)
    this.getDatasetState = this.getDatasetState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.massageLLTData = this.massageLLTData.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
    this.toggleTable = this.toggleTable.bind(this)
    this.toggleChart = this.toggleChart.bind(this)
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this)
  }

  componentDidMount () {
    this.handleChange(this.state.dataset)
    this.handleViewChange(this.state.view)
  }

  getFilters(dataset){
    return dataset.filters.options.map(option => {
      option.value = []
      return option
    })
  }

  massageLLTData(actualdata) {
    let massagedData = []
    if( !actualdata ||!actualdata.length){
      return massagedData
    }
    actualdata.forEach(function (product) {
      product.flavors = !product.flavors ? [] : product.flavors
      product.flavors.forEach(function(flavor){
        flavor.formulations = !flavor.formulations ? [] : flavor.formulations
        flavor.formulations.forEach(function(formulation){
          formulation = !formulation ? [] : formulation
          formulation.reactions.forEach(function(reaction){
            let productData = {}
            productData.product = product.name
            productData.flavor = flavor.flavor_name
            productData.formulation = formulation.formulation_name
            productData.reaction = reaction.LLT
            productData.frequency  = reaction['LLT Freq']
            massagedData.push(productData)
          })
        })
      })
    });

    return massagedData
  }

  updateSelectedFilters(updated_filters) {
    this.setState({
      applied_filters: updated_filters,
      hideContent: false
    })

    this.getData()
  }

  getData(){
    if(!this.state.applied_filters.length){
      return
    }

    this.state.drs.getData(this.state.applied_filters, {
      drugtype: this.state.dataset.drugtype,
      searchType: this.state.view.searchType
    }).then(results => {
      let _rows = []
      if (results && !results.error) {
        _rows = results.results

        if(this.state.view.searchType === "LLT") {
          _rows = this.massageLLTData(_rows)
        }

      }

      this.setState({
        _rows: _rows
      })
    })
    this.state.drs.getTotal().then(results => {
      let totalRecords = 0
      if (results && !results.error) {
        totalRecords = results.meta.results.total
      }

      this.setState({
        totalRecords: totalRecords
      })
    })
  }

  getDatasetState(dataset, viewIdx){
    viewIdx = (viewIdx === undefined) ? 0 : viewIdx
    return {
      dataset: dataset,
      applied_filters: this.getFilters(dataset),
      drs: new DataRetrievalService(dataset.url, dataset.endpoint),
      view: dataset.views[viewIdx],
      infographicsConfig: infographicsConfig[dataset.name],
      _rows: [],
      totalRecords: 0
    }
  }

  handleChange (value) {
    let dataset = null
    this.state.options.forEach(obj => {
      if (obj.label === value.label) {
        dataset = obj
      }
    })

    if(dataset.name === this.state.dataset.name){
      this.getData()
    } else {
      this.setState(this.getDatasetState(dataset), () => {
        this.getData()
      })
    }
  }

  handleFilterChange = () => {
    this.setState({
      hideContent: true
    })
  }

  handleViewChange (value) {
    let view = null
    this.state.dataset.views.forEach( (obj, idx) => {
      if (obj.label === value.label) {
        view = obj
        view.idx = idx
      }
    })

    // already choosen label, update data
    if(view.label === this.state.view.label){
      this.getData()
    } else {
    //  update to view, use current dataset and toggle view
      this.setState(this.getDatasetState(this.state.dataset, view.idx), () => {
        this.getData()
      })
    }
  }

  removeFilter(idx, valueIdx){
    const filter = this.state.applied_filters[idx]
    if(!filter){ return }


    if(filter.value.length){
      let removed = filter.value.splice(valueIdx, 1)
    } else {
      filter.value.splice(0, filter.value.length)
    }

    this.setState({
      applied_filters: update(this.state.applied_filters, {[idx]: {value: {$set: filter.value}}})
    })

    this.getData()
  }

  clearAllFilters(){
    let applied_filters = this.state.applied_filters
    applied_filters.map(filter => {
      if(filter.query_type !== "range") {
        console.log("idx: ", filter.idx)
        filter.value = []
      }
      return filter
    })

    this.setState(update(this.state, {applied_filters: {$set: applied_filters}, hideContent: {$set: false}}))

    this.getData()
  }

  toggleTable () {
    if (this.state.visualization === true) {
      this.setState({
        visualization: false
      })
      this.getData()
    }
  }

  toggleChart () {
    if (this.state.visualization === false) {
      this.setState({
        visualization: true
      })
    }
  }


  render (): ?React.Element {
    return (
      <section>
        <Hero
          {...meta}
        />
        <section className='body-bg-offwhite'>
          <div className='blog-bg' >
            <div className='dataset-explorer'>
              <div className='dataset-explorer-menubar'>
                <div className='filter-toggle-button' onClick={() => { this.child.toggleFilters() }}>
                  <i className='fa fa-lg fa-angle-double-left' id='fa-angle-double-left'/>
                  <i className='fa fa-lg fa-filter'/>
                </div>
                <em>I'm interested in:</em>
                <Select
                  clearable={false}
                  name='toggle'
                  options={this.state.options}
                  onChange={this.handleChange}
                  placeholder='Search the fields'
                  resetValue='label'
                  value={this.state.dataset}
                />
                <em>Particularly:</em>
                <Select
                  clearable={false}
                  name='toggle'
                  options={this.state.dataset.views}
                  onChange={this.handleViewChange}
                  placeholder='Select view'
                  resetValue='label'
                  value={this.state.view}
                />
                <HelpWindow
                  help_header={this.state.dataset.label + ' ' + this.state.view.label}
                  help_text={this.state.view.help_text}
                />
                <DataViewToggle
                  toggleTable={this.toggleTable}
                  toggleChart={this.toggleChart}
                  visualization={this.state.visualization}
                />
              </div>

              <FilterComponent
                clearAllFilters={this.clearAllFilters}
                dataset={this.state.dataset}
                drs={this.state.drs}
                filters={this.state.applied_filters}
                handleFilterChange={this.handleFilterChange}
                help_config={help_config}
                hideContent={this.state.hideContent}
                parent={this}
                ref={instance => { this.child = instance }}
                updateSelectedFilters={this.updateSelectedFilters}
              />
              <DatasetExplorerContentComponent
                clearAllFilters={this.clearAllFilters}
                hideContent={this.state.hideContent}
                removeFilter={this.removeFilter}
                parent={this}
                applied_filters={this.state.applied_filters}
                visualization={this.state.visualization}
              />
            </div>
          </div>
        </section>
      </section>
    )
  }
}


export default DataExplorer


