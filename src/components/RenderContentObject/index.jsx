/* @flow */

import React from 'react'
import cx from 'classnames'
import marked from 'marked'
import Highlight from 'react-highlight'

import Fields from './Fields'
import QueryExplorer from '../QueryExplorer'
import Datasets from '../Datasets'
import Downloads from '../Downloads'
import MultipleProductTable from '../MultipleProductTable'

const linkCx: string = 'b-b-1 clr-primary-alt-dark block font-size-5 pad-1 pad-l-2 txt-l row'

type tPROPS = {
  obj: Object;
  k: number;
  examples: Object;
  explorers: Object;
  fields: Object;
  isMenu: boolean;
  onClick: Function;
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
    // these 2 only used by ReferenceMenu
    // isMenu is used to parse content for the sidebarMenu
    // onClick just scrolls the page without messing up the url
    isMenu,
    onClick,
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
  // if not just a straight string, but an array of strings
  const isList: boolean = obj[key] instanceof Array && key !== 'fields'

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
      //console.log("isMenu, isList: key, then obj: ", key, obj)
      let key_text = key.replace(/(#+ )/, '')

      // get header level from counting '#'
      let level: number = (key.match(/#/g)||[]).length

      const btnCx = cx({
        'menu-item row': true,
        'weight-600': level < 2,
        'depth-2': level === 2,
        'depth-3 display-none': level > 2
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
              onClick={onClick}>
              {key_text}
            </button>
          }
          {
            obj[key].map((content: string, i) => {
              if (typeof content === 'object') {
                return (
                  <RenderContentObject
                    k={i}
                    obj={content}
                    key={i}
                    isMenu
                  />
                )
              } else {
                if (content.indexOf('##') === -1) return
                let level = (content.match(/#/g)||[]).length

                //console.log("isList content: ", content)
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
              }
            })
          }
        </div>
      )
    }

    // else just return title cased header
    // onClick === _scrollIntoView in ReferenceMenu
    return (
      <button
        className={linkCx}
        key={`menu-${k}`}
        style={{
          background: 'transparent',
        }}
        onClick={onClick}>
        {key}
      </button>
    )
  }

  const sectionCx: string = cx({
    'bg-secondary-lightest marg-t-2 marg-b-2 pad-2 pad-b-1': key === 'disclaimer',
  })

  // if example render PRE
  // examples are the big, hardcoded code blocks
  // we use for demonstrating the api returns
  if (key === 'example') {
    const value: string = obj[key]
    const example: string = JSON.stringify(examples[value], null, '  ') || ''

    return (
      <Highlight
        key={k}
        id={lowerKey}
        className='javascript'>
        {example}
      </Highlight>
    )
  }

  // if fields use fields object and Fields Component to render
  if (key === 'fields') {
    return (
      <Fields
        k={k}
        id={lowerKey}
        data={obj[key]}
        fields={fields}
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
    const data: Object = explorers[obj[key]]

    return (
      <QueryExplorer
        desc={data.description}
        k={k}
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
            obj[key].map((content: string, j) => {
              // stringified markdown -> html
              const html: string = marked(content)

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

    // stringified markdown -> html
    const key_html: string = marked(key)

    const wrapperCx: string = cx({
      'font-size-2 weight-700 marg-b-2 marg-t-3': key_html.indexOf('<h') !== -1
    })

    // else we have a section
    // that will have an array of content
    // related to that section
    return (
      <section
        key={`${lowerKey}-${k}`}
        id={`${lowerKey}-${k}`}
        className={sectionCx}>
        <div
          key={k}
          className={wrapperCx}
          dangerouslySetInnerHTML={{__html: key_html}}
        />
        {
          // the actual p tags and such
          obj[key].map((content: string|Object, j) => {
            if (typeof content === 'object') {
              //console.log("content in RCO section: ", content)
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

              if (content.includes("image=")){
                return (
                  <img
                    src={content.split("=")[0]}
                    key={j}
                    className='fda-logo'
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
      </section>
    )
  }

  // if nothing renderable
  return <span />
}

RenderContentObject.displayName = 'components/RenderContentObject'
export default RenderContentObject
