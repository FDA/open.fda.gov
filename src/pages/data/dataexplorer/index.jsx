/* @flow */

import React from 'react'
import Hero from '../../../components/Hero/index'
import FilterComponent from '../../../components/Filter'
import DatasetExplorerContentComponent from '../../../components/DatasetExplorerContent'
import DataRetrievalService from '../../../components/DataRetrieval'
import meta from './_meta.yaml'
import datasets from './_datasets.yaml'
import Select from 'react-select'
import _ from 'lodash'

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
      filters: [],
      drs: null,
      _rows: [],
      infographicsConfig: null
    }

    this.state = _.extend(defaultState, this.getDatasetState(dataset))


    this.handleChange = this.handleChange.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.getData = this.getData.bind(this)
    this.getFilters = this.getFilters.bind(this)
    this.getDatasetState = this.getDatasetState.bind(this)
    this.massageLLTData = this.massageLLTData.bind(this)
  }
  componentWillReceiveProps () {

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

  getData(){
    if(!this.state.filters.length){
      return
    }

    this.state.drs.getData(this.state.filters, {
      drugtype: this.state.dataset.drugtype,
      searchType: this.state.view.searchType
    }).then(results => {
      let _rows = []
      if(results && !results.error){
        _rows = results.results

        if(this.state.view.searchType === "LLT") {
          _rows = this.massageLLTData(_rows)
        }

      }

      this.setState({
        _rows: _rows
      })
    })
  }

  getDatasetState(dataset, viewIdx){
    viewIdx = (viewIdx === undefined) ? 0 : viewIdx
    return {
      dataset: dataset,
      filters: this.getFilters(dataset),
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
                  resetValue='label'
                  value={this.state.dataset}
                  name='toggle'
                  options={this.state.options}
                  onChange={this.handleChange}
                  placeholder='Search the fields'
                />
                <em>Particularly:</em>
                <Select
                  clearable={false}
                  resetValue='label'
                  value={this.state.view}
                  name='toggle'
                  options={this.state.dataset.views}
                  onChange={this.handleViewChange}
                  placeholder='Select view'
                />
              </div>

              <FilterComponent
                parent={this}
                ref={instance => { this.child = instance }}
              />
              <DatasetExplorerContentComponent
                parent={this}
              />
            </div>
          </div>
        </section>
      </section>
    )
  }
}


export default DataExplorer


