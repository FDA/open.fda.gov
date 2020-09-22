import React from 'react'
import marked from 'marked'
import Select from 'react-select'
import { default as ReactTable } from "react-table"
import { Tooltip } from 'react-tippy'

import dictionary from '../constants/fields/master_fields.yaml'

class DataDictionary extends React.Component {

  constructor (props: Object) {
    super(props)

    const nounList = {
      'animal': 'Animal & Veterinary',
      'drug': 'Human Drug',
      'device': 'Device',
      'food': 'Food',
      'other': 'Other',
      'tobacco': 'Tobacco'
    }



    let nouns = []
    let endpoints = {}
    Object.keys(dictionary).forEach(function (noun) {
      nouns.push({'label': nounList[noun],'value': noun})
      endpoints[noun] = []
      Object.keys(dictionary[noun]).forEach(function (endpoint) {
        endpoints[noun].push(endpoint)
      })
    })

    this.state = {
      columns: [],
      data: {},
      endpoints: endpoints,
      nouns: nouns,
      selectedNoun: nouns[0]['label']
    }

    this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount () {
      //this.getData()
    }

    componentDidUpdate (prevProps, prevState) {
      if (prevState.selected_noun !== this.state.selected_noun) {
        this.getData()
      }
    }

    handleChange (val) {
      console.log("valL :", val)
      if ( val !== 'fields' ) {
        this.setState({
          selectedNoun: val.value,
        })
      } else (
        this.setState({
          selectedNoun: val
        })
      )
    }

    render (): ?React.Element {

      // if (Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object) {
      //   return <span/>
      // }

      console.log("selected: ", this.state.selectedNoun)

        return (
          <section id='data-dictionary'>
            <div className='endpoint-buttons' id='endpoint-buttons'>
              <Select
                name='toggle'
                options={this.state.nouns}
                onChange={this.handleChange}
                placeholder='Select Category'
                resetValue='label'
                defaultValue={this.state.selectedNoun}
                value={this.state.selectedNoun}
              />
            </div>
{/*            <ReactTable
              data={this.state.data}
              columns={this.state.columns}
              showPagination={false}
              minRows={0}
              className="-striped -highlight"
              resizable={false}
              style={{
                width: '100%',
                height: '494px',
                position: 'relative'
              }}
            />*/}
          </section>
        )
    }
}


export default DataDictionary
