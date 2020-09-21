import React from 'react'
import marked from 'marked'
import { default as ReactTable } from "react-table"
import { Tooltip } from 'react-tippy'

import dictionary from '../constants/fields/master_fields.yaml'

class DataDictionary extends React.Component {

  constructor (props: Object) {
    super(props)


    let nouns = []
    let endpoints = {}
    Object.keys(dictionary).forEach(function (noun) {
      nouns.push(noun)
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
      selected_noun: nouns[0]
    }

    //this.onChangeEndpoint = this.onChangeEndpoint.bind(this)
    }

    componentDidMount () {
      //this.getData()
    }

    componentDidUpdate (prevProps, prevState) {
      if (prevState.selected_noun !== this.state.selected_noun) {
        this.getData()
      }
    }

    render (): ?React.Element {

      // if (Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object) {
      //   return <span/>
      // }

        let nouns_buttons = this.state.nouns.map(noun => {
          return (
            <div
              className={this.state.selected_noun === noun ? 'selected': 'unselected'}
              id={'noun-button-' + noun}
              key={noun}
              onClick={this.onChangeNoun}
              title={noun}>
              {noun.charAt(0).toUpperCase() + noun.slice(1)}
            </div>
          )
        })

        return (
          <section id='data-dictionary'>
            <div className='endpoint-buttons' id='endpoint-buttons'>
              {
                nouns_buttons
              }
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
