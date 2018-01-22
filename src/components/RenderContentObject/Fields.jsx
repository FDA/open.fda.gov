/* @flow */

import React from 'react'
import marked from 'marked'

import get from 'lodash/get'
import Values from './Values'
import yamlGet from '../../utils/yamlGet'

const labelCx: string = 'bg-primary-alt-lightest clr-gray inline-block sans weight-600 small marg-b-1'
const labelStyl: Object = {
  borderRadius: '3px',
  padding: '2px 5px'
}
const typeCx: string = 'clr-gray sans small'
const typeStyl: Object = {
  fontStyle: 'italic',
  marginLeft: '10px',
}

type tLiProps = {
  field: void|Object;
  key: string;
  i: number;
  isFDA: void|boolean;
};

/**
 * @description [renders an individual field]
 *              [openfda fields are a little different]
 * @param  {Object} props [the field to render, fieldname(key)]
 *                        [the key(i) and if this is an openfda field]
 * @return {React.Element} [always render an element]
 */
const _renderLi = (props: tLiProps) => {
  const {
    field,
    key,
    i,
    isFDA,
  } = props

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

  if (field) {
    desc = field.description
    pattern = field.pattern
    type = field.type
    values = field.possible_values
    isExact = field.is_exact && field.is_exact
  }

  // field is an array (will have subkey of items)
  if (field && field.items) {
    desc = field.items.description
    pattern = field.items.pattern
    type2 = field.items.type
  }

  const divCx: string = 'col t-range-marg-t-2 t-range-6 d-3'

  return (
    <li
      className='flex-row flex-wrap pad-t-2 pad-b-2 b-t-light-1'
      key={i}>
      <div className={divCx}>
        <div>
          <pre
            className='pad-1 hljs-string inline-block'
            style={{
              maxWidth: '75%',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}>
            {key.replace('.properties', '')}
          </pre>
          <em
            className={typeCx}
            style={typeStyl}>{type}{type2 && ` of ${type2}s`}
          </em>
        </div>
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
              <li>
                <p><code className='hljs-string inline-block'>search={key}:"FOO+BAR"</code><br />
                Searches for records where either <code className='inline-block'>FOO</code> or <code className='inline-block'>BAR</code> appear anywhere in this field.</p>
              </li>
              <li>
                <p><code className='hljs-string inline-block'>search={key}.exact:"FOO+BAR"</code><br />
                Searches for records where exactly and only <code className='inline-block'>FOO BAR</code> appears in this field.</p>
              </li>
              <li>
                <p><code className='hljs-string inline-block'>count={key}</code><br />
                Counts the tokenized values of this field. Instances of <code className='inline-block'>FOO</code> and <code className='inline-block'>BAR</code> are counted separately.</p>
              </li>
              <li>
                <p><code className='hljs-string inline-block'>count={key}.exact</code><br />
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
          isFDA &&
          pattern &&
          <div
            className={labelCx}
            style={labelStyl}>
            Values follow this pattern
          </div>
        }
        {
          isFDA &&
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
    </li>
  )
}

// @TODO we can probably do away
//       with this intermediate step
const _renderFDA = (key: string, data) => {
  const fieldKeys: Array<string> = data ? Object.keys(data) : ['']

  const fieldData: Array<?React.Element> = fieldKeys.map((key: string, i) => {
    const field: void|Object = data && data[key]

    if (!field) return null

    return _renderLi({
      field,
      i,
      isFDA: true,
      key,
    })
  })

  return (
    <ul key={key}>
      {fieldData}
    </ul>
  )
}

type tPROPS = {
  // which fields to render
  data: Array<string>;
  // fields obj
  fields: Object;
  k: number;
};

/**
 * @description [fields refers to the api field property documentation]
 *              [that gets rendered out on reference pages]
 * @param {Array<Object>} data [the fields for the specific section we want to render]
 * @param {Object} [fields] [all fields possible for this endpoint]
 * @return {React.Element} [always return an element]
 */
const Fields = ({ data, fields, k }: tPROPS) => {
  const fieldData: Array<?React.Element> = data.map((key: string, i) => {
    const field = yamlGet(key, fields)

    if (!field) {
      console.log('could not find in _fields.yaml:', key)
      return
    }

    // openfda key is a special case
    if (key.indexOf('openfda') !== -1) {
      return _renderFDA(
        key,
        field
      )
    }

    return _renderLi({
      field,
      i,
      isFDA: false,
      key,
    })
  })

  return (
    <section>
      <ul
        key={k}
        className='marg-t-2'
        style={{marginLeft:"0"}}>
        {fieldData}
      </ul>
    </section>
  )
}

Fields.displayName = 'component/Reference/Fields'
export default Fields
