import React from 'react'
import marked from 'marked'
import { default as ReactTable } from "react-table"
import { Tooltip } from 'react-tippy'

import device510k from '../constants/fields/deviceclearance.yaml'
import deviceclassification from '../constants/fields/deviceclass.yaml'
import devicepma from '../constants/fields/devicepma.yaml'
import devicerecall from '../constants/fields/devicerecall.yaml'
import drugenforcement from '../constants/fields/drugenforcement.yaml'
import druglabel from '../constants/fields/druglabel.yaml'
import drugndc from '../constants/fields/drugndc.yaml'
import drugsfda from '../constants/fields/drugsfda.yaml'
import remsspl from '../constants/fields/drugremsspl.yaml'
import Values from './RenderContentObject/Values'


class FieldsHarmonization extends React.Component {

  constructor (props: Object) {
    super(props)

    let master_harmonization = props.master_harmonization

    let nouns = []
    let selected_noun = ''
    Object.keys(master_harmonization).forEach(function (noun) {
      let empty = true
      Object.values(master_harmonization[noun]).forEach(function (endpoint_value) {
        if (Array.isArray(endpoint_value) && endpoint_value.length) {
          empty = false
        }
      })
      if (empty === false) {
        nouns.push(noun)
      }
    })

    if (this.props.selected_noun) {
      selected_noun = this.props.selected_noun
    } else {
      selected_noun = nouns[0]
    }

    this.state = {
      columns: [],
      data: {},
      nouns: nouns,
      selected_noun: selected_noun
    }

    this.onChangeNoun = this.onChangeNoun.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.selected_noun !== this.state.selected_noun) {
      this.getData()
    }
  }

  fieldDefinitionTooltip (dataTip) {
    if (dataTip == null) {
      return <span/>
    }

    const dictionary = {
      device510k: device510k,
      deviceclassification: deviceclassification,
      devicepma: devicepma,
      devicerecall: devicerecall,
      drugdrugsfda: drugsfda,
      drugenforcement: drugenforcement,
      druglabel: druglabel,
      drugndc: drugndc,
      remsspl: remsspl
    }

    let field_name = dataTip[0]
    let field = dictionary[dataTip[1]]['properties']['openfda']['properties'][field_name]
    // array
    let type: string = ''
    // one_of, etc
    let values: ?Object = null
    // of strings
    let type2: string = ''
    // description text, can have docs
    let desc: string = ''
    // query syntax pattern
    let pattern: string = ''
    // whether field has .exact
    let isExact: bool = false
    const divCx: string = 'col t-range-marg-t-2 marg-b-2 t-range-6'

    if (field) {
      desc = field.description
      pattern = field.pattern
      type = field.type
      values = field.possible_values
      isExact = field.is_exact && field.is_exact
    }

    if (field && field.items) {
      desc = field.items.description
      pattern = field.items.pattern
      type2 = field.items.type
      values = field.items.possible_values
    }

    return (
      <div className='fields-tooltip'>
        <h3 className='tooltip-header'>{field_name}</h3>
        <div className={divCx}>
          <pre className='pad-1 hljs-string inline-block'>
            {type}{type2 && ` of ${type2}s`}
          </pre>
        </div>
        <div className={divCx}>
          {
            desc &&
            <div
              dangerouslySetInnerHTML={{__html: marked(desc)}}
            />
          }
          {
            isExact &&
            <div>
              <p>This is an <code className='inline-block'>.exact</code> field. It has been indexed both as its exact string content, and also tokenized.</p>
              <ul>
                <li className='bullet'>
                  <p><code className='hljs-string inline-block'>search={field_name}:"FOO+BAR"</code><br />
                    Searches for records where either <code className='inline-block'>FOO</code> or <code className='inline-block'>BAR</code> appear anywhere in this field.</p>
                </li>
                <li className='bullet'>
                  <p><code className='hljs-string inline-block'>search={field_name}.exact:"FOO+BAR"</code><br />
                    Searches for records where exactly and only <code className='inline-block'>FOO BAR</code> appears in this field.</p>
                </li>
                <li className='bullet'>
                  <p><code className='hljs-string inline-block'>count={field_name}</code><br />
                    Counts the tokenized values of this field. Instances of <code className='inline-block'>FOO</code> and <code className='inline-block'>BAR</code> are counted separately.</p>
                </li>
                <li className='bullet'>
                  <p><code className='hljs-string inline-block'>count={field_name}.exact</code><br />
                    Counts the exact values of this field. <code className='inline-block'>FOO BAR</code>, <code className='inline-block'>BAR FOO</code>, <code className='inline-block'>FOO</code>, and <code className='inline-block'>BAR</code> would all be counted separately, along with other combinations that contain these terms.</p>
                </li>
              </ul>
            </div>
          }
          {
            values &&
            Object.keys(values.value).length <= 4 &&
            <Values
              values={values}
            />
          }
          {
            pattern &&
            <div>
              Values follow this pattern
            </div>
          }
          {
            pattern &&
            <div className='row'>
              <pre className='inline-block pad-1'>{pattern}</pre>
            </div>
          }
          {
            values &&
            Object.keys(values.value).length > 4 &&
            <div className='row'>
              <Values
                values={values}
              />
            </div>
          }
        </div>
      </div>
    )

  }

  getData() {
    let endpoint_headers = {
      '510k': '510k',
      'classification': 'Classification',
      'enforcement': 'Enforcement',
      'event': 'Event',
      'pma': 'PMA',
      'recall': 'Recall',
      'registrationlisting': 'Registration',
      'udi': 'UDI',
      'drugsfda': 'Drugs@FDA',
      'label': 'Label',
      'ndc': 'NDC',
      'nsde': 'NSDE',
      'remsspl': 'REMS SPL'
    }

    let col_list = []
    let columns = [{
      Header: 'Field',
      accessor: 'field',
      Cell: row => <Tooltip
          arrow={true}
          html={this.fieldDefinitionTooltip(row.value)}
          interactive
          position='right'
          theme='light'
          trigger='mouseenter'>
        <span>{row.value[0]}</span>
      </Tooltip>,
      width: 242
    }]

    let fields = {}
    let data = []
    let noun = this.state.selected_noun

    for (const [endpoint_name, endpoint_value] of Object.entries(this.props.master_harmonization[this.state.selected_noun])) {
      if (Array.isArray(endpoint_value) && endpoint_value.length) {
        endpoint_value.forEach(function (field, index) {
          if (Object.keys(fields).indexOf(field) === -1) {
            fields[field] = data.length
            data.push({
              field: [field, noun + endpoint_name],
              [endpoint_name]: true
            })
          } else {
            data[fields[field]][endpoint_name] = true
          }
          if (col_list.indexOf(endpoint_name) === -1) {
            columns.push({
              Header: endpoint_headers[endpoint_name],
              accessor: endpoint_name,
              Cell: row => (
                <div className='checkbox-cell'>{row.value ? <i className="fa fa-2x fa-check" style={{color: "green"}}/>: <span/>}</div>
              )
            })
            col_list.push(endpoint_name)
          }
        })
      }
    }
    this.setState({
      columns: columns,
      data: data
    })
  }

  onChangeNoun(e) {
    let title = e.target.getAttribute('title')
    if (this.state.selected_noun !== title) {
      this.setState({
        selected_noun: title
      })
    }
  }

  render (): ?React.Element {

    if (Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object) {
      return <span/>
    }

    let noun_buttons = this.state.nouns.map(noun => {
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
      <section id='fields-harmonization'>
        <div className='noun-buttons' id='noun-buttons'>
          {
            noun_buttons
          }
        </div>
        <ReactTable
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
        />
      </section>
    )
  }
}


export default FieldsHarmonization
