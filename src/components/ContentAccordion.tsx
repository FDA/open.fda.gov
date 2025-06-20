import React from 'react'
import cx from 'classnames'
import {marked} from 'marked'
import Datasets from './Datasets'
import Downloads from './Downloads'
import MultipleProductTable from './MultipleProductTable'
import RenderContentObject from './RenderContentObject'
import FieldExplorer from './FieldExplorer'
import KeyFacts from './RenderContentObject/KeyFacts'
import InteractiveInfographic from './InteractiveInfographic'
import InfographicContainer from '../containers/InfographicContainer'

type tPROPS = {
  obj: Record<string, any>;
  k: number;
  examples: Record<string, any>;
  explorers: Record<string, any>;
  infographicDefinitions: Record<string, any>;
  infographics: Record<string, any>;
  fieldsMapped: Record<string, any>;
  fieldsFlattened: Record<string, any>;
  fields: Record<string, any>;
  meta: any;
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
  // stringified docs -> html
  const [key_html, setKeyHtml] = React.useState<string>('');
  React.useEffect(() => {
    const result = marked(key);
    if (result instanceof Promise) {
      result.then(setKeyHtml);
    } else {
      setKeyHtml(result);
    }
  }, [key]);
  const wrapperCx: string = 'font-size-2 weight-700 marg-b-2 marg-t-3'
  const sectionCx: string = cx({
    'bg-secondary-lightest marg-t-2 marg-b-2 pad-2 pad-b-1': key === 'disclaimer',
  })

  return (
    <section
      key={`${lowerKey}-${k}`}
      id={`${lowerKey}-${k}`}
      className={sectionCx}>
      <div className='flex-row align-center'>
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
          obj[key].map((content: string|Object, j: number) => {
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
            }
            // stringified docs -> html
            const [html, setHtml] = React.useState<string>('');
            React.useEffect(() => {
              const result = marked(content as string);
              if (result instanceof Promise) {
                result.then(setHtml);
              } else {
                setHtml(result);
              }
            }, [content]);

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
              // Convert infographics object to array if necessary
              const infographicsArray = Array.isArray(infographics)
                ? infographics
                : Object.values(infographics);
              return (
                <InfographicContainer
                  { ...props }
                  infographics={infographicsArray}
                  meta={{
                    start: meta.start,
                    api_path: meta.api_path,
                    ...meta
                  }}
                  key={j}
                />
              )
            }

            if (content === 'visualization') {
              // Ensure infographicDefinitions has the required properties
              const infographicDefs = {
                choices: infographicDefinitions.choices,
                globalDefs: infographicDefinitions.globalDefs,
                api_path: meta.api_path,
              };
              return (
                <InteractiveInfographic
                  infographicDefinitions={infographicDefs}
                  meta={{ api_path: meta.api_path }}
                  key={j}
                />
              )
            }

            if (content.includes("image=")) {
              return (
                <img
                  src={content.split("=")[1]}
                  key={j}
                />
              )
            }

            if (content.includes('key_facts')) {
              return (
                <KeyFacts
                  noun_name={meta.api_path.split("/")[1]}
                  endpoint_name={meta.api_path.split("/")[2]}
                  key={j} status={''} harmonized={false}                />
              )
            }

            return (
              <div
                key={j}
                dangerouslySetInnerHTML={{__html: html}}
              />
            )

          })
        }
      </div>
    </section>
  )
}

ContentAccordion.displayName = 'components/RenderContentObject'
export default ContentAccordion
