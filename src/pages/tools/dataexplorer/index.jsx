/* @flow */

import React from 'react'
import Hero from '../../../components/Hero/index'
import FilterComponent from '../../../components/FilterComponent'
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

    this.state = {
      options: options,
      choosenDataset: options[0],
      view: options[0].views[0]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)

  }
  componentWillReceiveProps () {

  }
  componentDidMount () {
    this.handleChange(this.state.choosenDataset)
    this.handleViewChange(this.state.view)

  }

  handleChange (value) {
    let choice = null
    this.state.options.forEach(obj => {
      if (obj.label == value.label) {
        choice = obj
        console.log("choice is:" + choice.label)
      }
    })

    this.setState({
      choosenDataset: choice,
      view: choice.views[0]
    })
  }

  handleViewChange (value) {
    let choice = null
    this.state.choosenDataset.views.forEach(obj => {
      if (obj.label == value.label) {
        choice = obj
        console.log("choice is:" + choice.label)
      }
    })

    this.setState({
      view: choice
    })
  }


  render (): ?React.Element {

    return (
      <section>
        <Hero
          {...meta}
        />
        <section className='body-bg-offwhite'>
          <div className='container blog-bg'>
            <div style={{
              display: "flex",
              flexWrap: "wrap"
            }}>
              <div style={{
                height: 70,
                width: 1000,
                display: "flex",
                paddingTop: 20,
                width: "100%",
                borderBottom: 1,
                borderBottomStyle: "solid"
              }}>
                <i style={{
                  fontSize: 22,
                  paddingTop: 6,
                  paddingRight: 5
                }}>I'm Interested In:</i>
                <Select
                  style={{
                    height: 30,
                    width: 300
                  }}
                  clearable={false}
                  resetValue='label'
                  value={this.state.choosenDataset}
                  name='toggle'
                  options={this.state.options}
                  onChange={this.handleChange}
                  placeholder='Search the fields'
                />
                <i style={{
                  fontSize: 22,
                  paddingTop: 6,
                  paddingRight: 5,
                  marginLeft: 200,
                }}>Particularly:</i>
                <Select
                  style={{
                    height: 30,
                    width: 300
                  }}
                  clearable={false}
                  resetValue='label'
                  value={this.state.view}
                  name='toggle'
                  options={this.state.choosenDataset.views}
                  onChange={this.handleViewChange}
                  placeholder='Select view'
                />
              </div>
              <FilterComponent
                dataset={this.state.choosenDataset}
              />
            </div>
          </div>
        </section>
      </section>
    )
  }
}


export default DataExplorer


