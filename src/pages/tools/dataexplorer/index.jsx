/* @flow */

import React from 'react'
import Hero from '../../../components/Hero/index'
import FilterComponent from '../../../components/Filter'
import DatasetExplorerContentComponent from '../../../components/DatasetExplorerContent'
import DataRetrievalService from '../../../components/DataRetrieval'
import meta from './_meta.yaml'
import datasets from './_datasets.yaml'
import Select from 'react-select'

class DataExplorer extends React.Component {

  constructor (props: Object) {
    super(props)

    const options = Object.keys(datasets.names).map(name => {
      const viewsArray = Object.assign({}, datasets.names[name].views)
      datasets.names[name].views = []
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
      filters: dataset.filters.options.map(option => {
        option.value = []
        return option
      }),
      drs: new DataRetrievalService(dataset.url, dataset.endpoint),
      sampleDocs: [],
      _rows: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.updateResults = this.updateResults.bind(this)
    this.getData = this.getData.bind(this)
  }
  componentWillReceiveProps () {

  }
  componentDidMount () {
    this.handleChange(this.state.dataset)
    this.handleViewChange(this.state.view)

    this.state.drs.getTopValuesByIterating().then(results => {
      // this.setState({
      //   sampleDocs: results
      // })
    })

  }

  updateResults(){
    // this.state.drs.getData(this.state.filters).then(results => {
    //   console.log(results)
    // })

    const minimum = 0
    const maximum = 150
    const randomStart = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    this.setState({
      _rows : this.state.sampleDocs.slice(randomStart)
    })

  }

  getData(){
    this.state.drs.getData(this.state.filters).then(results => {
      let _rows = []
      if(results && !results.error){
        _rows = results.results
      }

      this.setState({
        _rows: _rows
      })
    })
  }

  updateState(params){
    this.setState(params)
  }

  handleChange (value) {
    let choice = null
    this.state.options.forEach(obj => {
      if (obj.label === value.label) {
        choice = obj
      }
    })

    this.setState({
      dataset: choice,
      view: choice.views[0]
    })
  }

  handleViewChange (value) {
    let choice = null
    this.state.dataset.views.forEach(obj => {
      if (obj.label === value.label) {
        choice = obj
      }
    })

    this.setState({
      view: choice
    })
  }


  render (): ?React.Element {

    return (
      <section>
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


