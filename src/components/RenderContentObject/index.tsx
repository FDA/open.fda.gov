/* @flow */

import React from 'react'
import cx from 'classnames'
import marked from 'marked'
import Highlight from 'react-highlight.js'

import Fields from './Fields'
import QueryExplorer from '../QueryExplorer'
import ContentAccordion from '../ContentAccordion'

const linkCx: string = 'b-b-1 clr-primary-alt-dark block font-size-5 pad-1 pad-l-2 txt-l row'

type FieldsProps = {
  k: number;
  id: string;
  data: any;
  fields: Object;
};

interface FieldsComponentProps extends FieldsProps {}

type tPROPS = {
  obj?: { [key: string]: any };
  k?: number;
  examples?: Object;
  explorers?: Object;
  infographics?: Object;
  infographicDefinitions?: Object;
  fieldsMapped?: Object;
  fieldsFlattened?: Object;
  fields?: Object;
  isMenu?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  meta?: Object;
  toggleSection?: Function;
  activeHeader?: Array<string>;
  i?: number;
  id?: string; // Ensures 'id' is part of the tPROPS type
  data?: any; // Ensures 'data' is also part of the tPROPS type
};

// called by Content
// normally _content.yaml contains string content that
// we either render out directly, or use as a flag
// to know when to render other components
//
// sometimes though we have object in _content, usually
// for api examples or for rendering out fields for an
// endpoint. this component handles rendering the objects
const RenderContentObject = (props: tPROPS) => {
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
    meta,
    toggleSection,
    activeHeader,
    // these 2 only used by ReferenceMenu
    // isMenu is used to parse content for the sidebarMenu
    // onClick just scrolls the page without messing up the url
    isMenu,
    onClick,
    infographics,
    infographicDefinitions,
    fieldsMapped,
    fieldsFlattened
  } = props

  // there should only be one key
  // in the YAML, the objects are structured like
  // queryExplorer: 'keyOfWhichExplorerToUse'
  // or like
  // ul:
  //  - list stuff
  const key: string = obj ? Object.keys(obj)[0] : ''
  // normalize the key
  const lowerKey: string = key.toLowerCase()
  // if not just a straight string, but an array of strings
  const isList: boolean = !!obj && Array.isArray(obj[key as keyof typeof obj]) && key !== 'fields'

  // if generating nav for reference fields
  // if isMenu, we're being called from ReferenceMenu in SideBar
  // we loop over content the same way, but we pull out
  // headers and turn those into menu buttons
  if (isMenu) {

    // some things are generic, or
    // they can appear multiple times
    if (key === 'example') return null
    if (key === 'fields') return null
    if (key === 'disclaimer') return null
    if (key === 'queryExplorer') return null

    // if not just a straight string
    // loop over array and pull out headers
    if (isList) {
      const key_text = key.replace(/(#+ )/, '')

      // get header level from counting '#'
      const level: number = (key.match(/#/g) || []).length

      const btnCx = cx({
        'menu-item row': true,
        'weight-600': level < 3,
        'depth-2': level === 3,
        'depth-3 display-none': level > 3
      })

      return (
        <div key={`menu-${k}`}>
          {key.startsWith('#') &&
            <button
              className={btnCx}
              style={{
                background: 'transparent'
              }}
              key={`header-${k}`}
              // called by ReferenceMenu
              onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>
              {key_text}
            </button>
          }
          {
            (obj && obj[key as keyof typeof obj] instanceof Array ? obj[key as keyof typeof obj] : []).map((content: string, i: number) => {
              if (typeof content === 'object') {
                return (
                  <RenderContentObject
                    k={i}
                    obj={content}
                    key={i}
                    onClick={onClick}
                    isMenu
                  />
                )
              }
              if (content.indexOf('##') === -1) return

              const html: string = content.replace(/(#+ )/, '')

              return (
                <button
                  className={btnCx}
                  style={{
                    background: 'transparent',
                  }}
                  key={i}
                  // called by ReferenceMenu
                  onClick={onClick}>
                  {html}
                </button>
              )

            })
          }
        </div>
      )
    }
  }


  // if example render PRE
  // examples are the big, hardcoded code blocks
  // we use for demonstrating the api returns
  if (key === 'example') {
    if (!obj || typeof obj[key as string] !== 'string') {
      return null;
    }
    const value: string = obj[key] as string;
    const example: string = JSON.stringify(examples?.[value as keyof typeof examples] ?? {}, null, '  ') || ''

    return (
      <Highlight
        key={k}
        className='javascript'
        language='javascript'>
        {example}
      </Highlight>
    )
  }

  // if fields use fields object and Fields Component to render
  if (key === 'fields') {
    return (
      <Fields
        k={k ?? 0}
        data={obj?.[key]}
        fields={fields ?? []}
      />
    )
  }

  if (key === 'queryExplorer') {
    // for examples
    // explorers = {
    //   oneReport: {},
    //   pharmalogical: {},
    //   whatever: {},
    // }
    // explorerData = explorers.oneReport or whatever
    interface ExplorerData {
      description?: string;
      query?: string;
      params?: any;
      title?: string;
    }

    const explorerValue = obj ? explorers?.[obj[key] as keyof typeof explorers] : {};
    const data: ExplorerData = typeof explorerValue === 'object' && !Array.isArray(explorerValue) ? explorerValue : {};

    return (
      <QueryExplorer
        desc={data.description}
        k={k ?? 0}
        originalQuery={data.query}
        params={data.params}
        title={data.title}
      />
    )
  }

  // list is maybe a bad term
  // we just mean a non-field Array
  // but sometimes we have literal lists
  if (isList) {

    // like so. if marked as an actual list
    // render a unordered list
    if (key === 'ul') {
      return (
        <ul key={k}>
          {
            obj?.[key]?.map(async (content: string, j: any) => {
              // stringified markdown -> html
              const html: string = await Promise.resolve(marked.parse(content))

              return (
                <li
                  key={j}
                  className='bullet pad-1 pad-r-2 pad-l-2 relative'
                  dangerouslySetInnerHTML={{__html: html}}
                />
              )
            })
          }
        </ul>
      )
    }

    // else we have a section
    // that will have an array of content
    // related to that section
    return (
      <ContentAccordion
        k={k ?? 0}
        obj={obj ?? {}}
        examples={examples ?? {}}
        fields={fields ?? []}
        infographics={infographics ?? {}}
        fieldsMapped={fieldsMapped ?? {}}
        fieldsFlattened={fieldsFlattened ?? {}}
        infographicDefinitions={infographicDefinitions ?? {}}
        explorers={explorers ?? {}}
        meta={meta ?? {}}
        key={k}
      />
    )
  }

  // if nothing renderable
  return <span />
}

RenderContentObject.displayName = 'components/RenderContentObject'
export default RenderContentObject
