/* @flow */

import React from 'react'
import Hero from '../../../components/Hero/index'
import FilterComponent from '../../../components/Filter'
import DatasetExplorerContentComponent from '../../../components/DatasetExplorerContent'
import DataRetrievalService from '../../../components/DataRetrieval'
import meta from './_meta.yaml'
import datasets from './_datasets.yaml'
import Select from 'react-select'

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

    this.state = {
      options: options,
      dataset: dataset,
      view: dataset.views[0],
      filters: [],
      drs: null,
      _rows: [],
      infographicsConfig: infographicsConfig[dataset.name]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.getData = this.getData.bind(this)
    this.getFilters = this.getFilters.bind(this)
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

  getData(){
    if(!this.state.filters.length){
      return
    }

    this.state.drs.getData(this.state.filters, {
      drugtype: this.state.dataset.drugtype,
      searchType: this.state.view.searchType
    }).then(results => {
      let _rows = []
      if (results && !results.error) {
        _rows = results.results
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

  updateState(params){
    this.setState(params)
  }

  handleChange (value) {
    let dataset = null
    this.state.options.forEach(obj => {
      if (obj.label === value.label) {
        dataset = obj
      }
    })

    this.setState({
      dataset: dataset,
      filters: this.getFilters(dataset),
      drs: new DataRetrievalService(dataset.url, dataset.endpoint),
      view: dataset.views[0],
      infographicsConfig: infographicsConfig[dataset.name],
      _rows: [],
      totalRecords: 0
    }, () => {
      this.getData()
    })
  }

  handleViewChange (value) {
    let view = null
    this.state.dataset.views.forEach(obj => {
      if (obj.label === value.label) {
        view = obj
      }
    })

    this.setState({
      view: view
    })
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


