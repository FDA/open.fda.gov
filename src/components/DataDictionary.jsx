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
      columns: [
        {
          'Header': 'Field Name',
          'accessor': 'field_name'
        },
        {
          'Header': 'Datatype',
          'accessor': 'datatype'
        },
        {
          'Header': 'Datasets',
          'accessor': 'dataset_number'
        },
        {
          'Header': 'Definition',
          'accessor': 'definition'
        },
      ],
      data: [],
      endpoints: endpoints,
      nouns: nouns,
      selectedNoun: nouns[0]['value'],
      resized: [],
      filtered: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
    this.getObject = this.getObject.bind(this)
  }

  componentDidMount () {
    this.handleChange(this.state.selectedNoun)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.selected_noun !== this.state.selected_noun) {
      this.getData()
    }
  }

  handleChange (val) {
    console.log("valL :", val)
    this.setState({
      selectedNoun: val
    })
    this.getData()
  }

  getObject(data, parent_name, parent_obj, endpoint) {
    Object.keys(parent_obj).forEach(function (val) {
      let val_name = parent_name + '.' + val
      console.log('val_name', val_name)
      console.log('val: ', val)
      if(!data.hasOwnProperty(val_name) && parent_obj[val].hasOwnProperty('items')) {
        data[val_name] = {
          'dataset': [endpoint],
          'definition': parent_obj[val]['items']['description'],
          'type': 'array of ' + parent_obj[val]['items']['type'] + 's'
        }
      } else if(!data.hasOwnProperty(val_name) && !parent_obj[val].hasOwnProperty('items')) {
        data[val_name] = {
          'dataset': [endpoint],
          'definition': parent_obj[val]['description'],
          'type': parent_obj[val]['type']
        }
      } else {
        data[val_name]['dataset'].push(endpoint)
      }
    })
  }

  getData () {
    let data = {}
    let noun = this.state.selectedNoun
    Object.keys(dictionary[noun]).forEach((endpoint) => {
      // console.log('endpoints: ', endpoint)
      Object.keys(dictionary[noun][endpoint]['properties']).forEach((val) => {
        console.log('val: ', val)
        if(dictionary[noun][endpoint]['properties'][val]['type'] === 'object') {
          this.getObject(data, val, dictionary[noun][endpoint]['properties'][val]['properties'], endpoint)
        }
        else if(!data.hasOwnProperty(val) && dictionary[noun][endpoint]['properties'][val].hasOwnProperty('items')) {
          data[val] = {
            'dataset': [endpoint],
            'definition': dictionary[noun][endpoint]['properties'][val]['items']['description'],
            'type': 'array of ' + dictionary[noun][endpoint]['properties'][val]['items']['type'] + 's'
          }
        } else if(!data.hasOwnProperty(val) && !dictionary[noun][endpoint]['properties'][val].hasOwnProperty('items')) {
          data[val] = {
            'dataset': [endpoint],
            'definition': dictionary[noun][endpoint]['properties'][val]['description'],
            'type': dictionary[noun][endpoint]['properties'][val]['type']
          }
        } else {
          data[val]['dataset'].push(endpoint)
        }
      })
    })
    console.log('data: ', data)
    let data_array = []
    Object.keys(data).forEach((field) => {
      data_array.push({
        'field_name': field,
        'datasets': data[field]['dataset'],
        'datatype': data[field]['type'],
        'dataset_number': data[field]['dataset'].length,
        'definition': data[field]['definition']
      })
    })
    console.log("data array: ", data_array)
    this.setState({
      'data': data_array
    })
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
            clearable={false}
            name='toggle'
            options={this.state.nouns}
            onChange={this.handleChange}
            placeholder='Select Category'
            aria-label='Select Category'
            resetValue='label'
            defaultValue={this.state.selectedNoun}
            value={this.state.selectedNoun}
          />
        </div>
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
          showPagination={false}
          minRows={0}
          className="-striped -highlight"
          filtered={this.state.filtered}
          resized={this.state.resized}
          onResizedChange={resized => this.setState({ resized })}
          onFilteredChange={filtered => this.setState({ filtered })}
          style={{
            width: '100%',
            height: '494px',
            position: 'relative'
          }}
        />
      </section>
    )
  }
}


export default DataDictionary
