/* @flow */

import React from 'react'
import Hero from '../../../components/Hero/index'
import meta from './_meta.yaml'
import datasets from './_datasets.yaml'
import Select from 'react-select'

class DataExplorer extends React.Component {

   constructor (props: Object) {
    super(props)

    const options = Object.keys(datasets.names).map(name => {
      return datasets.names[name]
    })

    this.state = {
      options: options,
      choosenDataset: options[0]
    }
  }
  componentWillReceiveProps(){
    
  }
  componentDidMount () {
    
  }

  render (): ?React.Element {

    return (
      <section>
        <Hero
          {...meta}
        />
        <section className='body-bg-offwhite'>
          <div className='container blog-bg'>
            <div className='blog-container'>
              <div style={{
                height: 100,
                width: 1000,
                display:"flex",
                paddingTop: 20
              }}>
              <i style={{
                fontSize: 22,
                paddingTop: 6,
                paddingRight: 5
              }}>I'm Interested In:</i>
              <Select
                style={{
                  height: 30,
                  width: 500
                }}
                clearable={false}
                resetValue="label"
                value={this.state.choosenDataset}
                name="toggle"
                options={this.state.options}
                placeholder="Search the fields"
              />
              </div>
              <div>
                

              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}


export default DataExplorer