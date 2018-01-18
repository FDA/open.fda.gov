import React from 'react'
import cx from 'classnames'
import marked from 'marked'
import Datasets from './Datasets'
import Downloads from './Downloads'
import MultipleProductTable from './MultipleProductTable'
import RenderContentObject from './RenderContentObject'
import FieldExplorer from './FieldExplorer'
import KeyFacts from './RenderContentObject/KeyFacts'
import InteractiveInfographic from './InteractiveInfographic'
import InfographicContainer from '../containers/InfographicContainer'

type tPROPS = {
  obj: Object;
  k: number;
  examples: Object;
  explorers: Object;
  infographicDefinitions: Object;
  infographics: Object;
  fieldsMapped: Object;
  fieldsFlattened: Object;
  fields: Object;
  meta: Object;
};
  
// called by Content
// normally _content.yaml contains string content that
// we either render out directly, or use as a flag
// to know when to render other components
//
// sometimes though we have object in _content, usually
// for api examples or for rendering out fields for an
// endpoint. this component handles rendering the objects
const ContentAccordion = (props: tPROPS) => {
  const {
    // obj passed in via Content from a _fields.yaml
    obj,
    // key basically. can't pass key as prop
    k,
    // big pre blocks (code examples) on some pages
    examples,
    // data for rendering an interactive query explorer
    explorers,
    // fields from content.yaml, for rendering a reference
    fields,
    // json data from _infographic_definitions, json configuration 
    // for interactive infographics
    infographicDefinitions,
    fieldsMapped,
    fieldsFlattened,
    infographics,
    meta
  } = props

  // there should only be one key
  // in the YAML, the objects are structured like
  // queryExplorer: 'keyOfWhichExplorerToUse'
  // or like
  // ul:
  //  - list stuff
  const key: string = Object.keys(obj)[0]
  // normalize the key
  const lowerKey: string = key.toLowerCase()
  // stringified markdown -> html
  const key_html: string = marked(key)
  const wrapperCx: string = 'font-size-2 weight-700 marg-b-2 marg-t-3'
  const sectionCx: string = cx({
    'bg-secondary-lightest marg-t-2 marg-b-2 pad-2 pad-b-1': key === 'disclaimer',
  })

  return (
    <section
      key={`${lowerKey}-${k}`}
      id={`${lowerKey}-${k}`}
      className={sectionCx}>
      <div className="flex-row align-center">
        <span
          key={k}
          className={wrapperCx}
          id={lowerKey}
          dangerouslySetInnerHTML={{__html: key_html}}
        />
      </div>
      <div>
        {
          // the actual p tags and such
          obj[key].map((content: string|Object, j) => {
            if (typeof content === 'object') {
              return (
                <RenderContentObject
                  k={j}
                  obj={content}
                  examples={examples}
                  fields={fields}
                  explorers={explorers}
                  meta={meta}
                  key={j}
                />
              )
            } else {
              // stringified markdown -> html
              const html: string = marked(content)

              // kind of a weird way to do this
              // but, it might be easier for non-technical
              // people to understand that they just type
              // 'downloads' to render that section
              if (content === 'downloads') {
                return (
                  <Downloads
                    k={j}
                    meta={meta}
                    key={j}
                  />
                )
              }

              // as far as i can tell we just
              // have the one 'image' for drug/event
              if (content === 'datasets') {
                return (
                  <Datasets
                    k={j}
                    meta={meta}
                    key={j}
                  />
                )
              }

              // as far as i can tell we just
              // have the one 'image' for drug/event
              if (content === 'multipleProductTable') {
                return (
                  <MultipleProductTable
                    k={j}
                    key={j}
                  />
                )
              }

              if (content === 'FieldExplorer') {
                return (
                  <FieldExplorer
                    k={j}
                    fields={fields}
                    meta={meta}
                    key={j}
                  />
                )
              }

              if (content === 'infographic' && infographics) {
                return (
                  <InfographicContainer
                    { ...props }
                    infographics={infographics}
                    k={j}
                    meta={meta}
                    key={j}
                  />
                )
              }

              if (content === 'visualization') {
                return (
                  <InteractiveInfographic
                    infographicDefinitions={infographicDefinitions}
                    k={j}
                    meta={meta}
                    key={j}
                  />
                )
              }

              if (content.includes("image=")){
                return (
                  <img
                    src={content.split("=")[1]}
                    key={j}
                  />
                )
              }

              if (content.includes('key_facts')){
                return (
                  <KeyFacts
                    noun_name={meta.api_path.split("/")[1]}
                    endpoint_name={meta.api_path.split("/")[2]}
                    key={j}
                  />
                )
              }

              return (
                <div
                  key={j}
                  dangerouslySetInnerHTML={{__html: html}}
                />
              )
            }
          })
        }
      </div>
    </section>
  )
}

ContentAccordion.displayName = 'components/RenderContentObject'
export default ContentAccordion