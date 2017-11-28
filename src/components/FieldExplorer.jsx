import React from 'react'
import marked from 'marked'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Values from './RenderContentObject/Values'
import yamlGet from '../utils/yamlGet'
import FieldExplorerContainer from '../containers/FieldExplorerContainer'

const _renderLi = (props: tLiProps) => {
  const {
    field,
    updateSelected,
    key,
    i,
    isFDA
  } = props

  // array
  let type: string = ''
  // one_of, etc
  let values: ?Object = null
  // of strings
  let type2: string = ''
  // description text, can have markdown
  let desc: string = ''
  // query syntax pattern
  let pattern: string = ''
  // whether field has .exact
  let isExact: bool = false
  // keys in the selected field
  let field_keys: Array = Object.keys(field)

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

  if (field_keys.indexOf("type") === -1) {
    return (
      render_object({
        fields: field_keys,
        updateSelected,
        selectedField: key,
        i: i
      })
    )
  }

  const divCx: string = 'col t-range-marg-t-2 marg-b-2 t-range-6'

  return (
    <div
      className='flex-box flex-wrap dir-column pad-t-2 pad-l-2 pad-b-2 b-t-light-1'
      key={i}>
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
                <p><code className='hljs-string inline-block'>search={key}:"FOO+BAR"</code><br />
                  Searches for records where either <code className='inline-block'>FOO</code> or <code className='inline-block'>BAR</code> appear anywhere in this field.</p>
              </li>
              <li className='bullet'>
                <p><code className='hljs-string inline-block'>search={key}.exact:"FOO+BAR"</code><br />
                  Searches for records where exactly and only <code className='inline-block'>FOO BAR</code> appears in this field.</p>
              </li>
              <li className='bullet'>
                <p><code className='hljs-string inline-block'>count={key}</code><br />
                  Counts the tokenized values of this field. Instances of <code className='inline-block'>FOO</code> and <code className='inline-block'>BAR</code> are counted separately.</p>
              </li>
              <li className='bullet'>
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
          <div>
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
    </div>
  )
}

function render_object(props) {
  const {
    fields,
    selectedField,
    updateSelected,
    i
  } = props
  const labelCx: string = 'bg-primary-alt-lightest clr-gray inline-block sans weight-600 small marg-l-2 marg-b-1'
  const labelStyl: Object = {
    borderRadius: '3px',
    padding: '2px 5px'
  }
  const colCx = 'col marg-b-1 sub-menu-item'

  return (
    <div className='row marg-t-2' key={i}>
      <div
        className={labelCx}
        style={labelStyl}>
        Navigate the fields:
      </div>
      <ul className='flex-box dir-column flex-wrap marg-l-2'>
        {
          fields.map((v: string, k) => (
            <li
              key={k}>
              <button
                className={colCx}
                title={selectedField === "fields" ? v: selectedField.concat(".", v)}
                onClick={updateSelected}>
                {v}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

function get_fields(fields, prefix) {
  return Object.keys(fields).reduce(function(acc, key){
    let value = fields[key];
    if (typeof value === 'object' && value !== null && key !== 'possible_values') {
      if (['properties', 'items'].indexOf(key) === -1) {
        acc.push((typeof prefix === 'undefined') ? {label: key, value: key}: {label: prefix + '.' + key, value: prefix + '.' + key})
        acc.push.apply(acc, get_fields(value, (typeof prefix === 'undefined') ? key : prefix + '.' + key))
      }
      else {
        acc.push.apply(acc, get_fields(value, prefix))
      }
    }
    return acc;
  }, []);
}

type tPROPS = {
  k: number;
  fields: Object;
  selectedField: string;
  updateField: Function;
  updateSelected: Function;
};

// called by Content
// normally _content.yaml contains string content that
// we either render out directly, or use as a flag
// to know when to render other components
//
// sometimes though we have object in _content, usually
// for api examples or for rendering out fields for an
// endpoint. this component handles rendering the objects
const FieldExplorer = (props: tPROPS) => {
  const {
    // key basically. can't pass key as prop
    k,
    // big pre blocks (code examples) on some pages
    fields,
    selectedField,
    updateField,
    updateSelected
  } = props

  let field_names = get_fields(fields.properties)

  return (
    <section key={k} className="explorer">
      <Select
        name="form-field-name"
        value={selectedField}
        options={field_names}
        onChange={updateField}
        resetValue="fields"
      />
      {
        selectedField === 'fields' ?
          render_object({
            fields: Object.keys(fields.properties),
            updateSelected,
            selectedField,
            i: k
          }):
          _renderLi({
            field: yamlGet(selectedField, fields),
            updateSelected,
            key: selectedField,
            i: k,
            isFDA: false
          })
      }
    </section>
  )
}

FieldExplorer.displayName = 'components/RenderContentObject'
export default FieldExplorerContainer(FieldExplorer)