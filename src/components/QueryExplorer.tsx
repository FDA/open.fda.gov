/* @flow */

import React from 'react'
import {marked} from 'marked'
import Highlight from 'react-highlight.js'
import cx from 'classnames'

import QueryExplorerContainer from '../containers/QueryExplorerContainer'

import '../css/components/QueryExplorer.scss'

type tPROPS = {
  desc: Array<string>;
  fetchQuery: Function;
  k: number;
  level: number;
  name: string;
  params: Array<string>;
  queryToRun: string;
  result: string;
  showResult: boolean;
  title: string;
  toggleQuery: Function;
  updateQuery: Function;
  tourStart: Function;
};

const btnCx = cx({
  'bg-primary hvr-bg-primary-darker': true,
  'clr-white marg-t-2 marg-b-2': true,
})

const QueryExplorer = (props: tPROPS) => {
  const {
    desc,
    fetchQuery,
    k,
    name,
    params,
    queryToRun,
    result,
    showResult,
    title,
    toggleQuery,
    updateQuery,
    tourStart
  } = props

  return (
    <section
      key={k}
      className='bg-gray-lightest marg-t-2 pad-2 relative'
      id={'explorer' + (name ? ('-' + name) : '')}>
      <i className="fa fa-lg fa-question-circle clr-primary-alt-dark tourStart" onClick={() => tourStart()}/>
      <p><strong>Example query</strong></p>
      <h3 className='font-size-2 marg-b-2'
          id={'title' + (name ? ('-' + name) : '')}>
        {title}
      </h3>
      {
        desc &&
        desc.map((d: string, i) => {
          const html = marked(d)

          return (
            <div
              key={i}
              id={'desc' + (name ? ('-' + name) : '')}
              tabIndex={0}
              className='reverse-pre'
              dangerouslySetInnerHTML={{__html: html}}
            />
          )
        })
      }
      {params && params.toString() &&
        <ol className='b-t-1 marg-t-3 marg-b-2'
            id={'params' + (name ? ('-' + name) : '')}>
          {
            params.map((param: string, i) => {
              const html = marked(param)

              return (
                <li
                  key={i}
                  className='marg-t-1 pad-t-1 pad-l-2 pad-r-2 b-b-1 qe-li reverse-pre relative'
                  tabIndex={0}
                  dangerouslySetInnerHTML={{__html: html}}>
                </li>
              )
            })
          }
        </ol>
      }
      <textarea
        aria-label='Current Query'
        className='bg-gray-dark clr-gray-lightest block row pad-1 small mono'
        id={'query' + (name ? ('-' + name) : '')}
        value={queryToRun}
        onChange={() => {updateQuery()}}
      />
      <button
        className={btnCx}
        id={'run-query' + (name ? ('-' + name) : '')}
        onClick={fetchQuery.bind(null, queryToRun)}>
        Run query
      </button>
      {
        showResult &&
        <button
          aria-label='Close result of query'
          className='bg-secondary-dark hvr-bg-secondary-darkest clr-white marg-t-2 marg-b-2'
          id={'close-query' + (name ? ('-' + name) : '')}
          onClick={() => {toggleQuery()}}
          style={{
            marginLeft: '10px',
          }}>
          Close
        </button>
      }
      {
        showResult &&
        <div
          className='overflow-scroll always-show-scroll'
          id={'query-result' + (name ? ('-' + name) : '')}
          style={{
            maxHeight: '500px',
          }}>
          <Highlight language='javascript bg-white'
            aria-label='Query result.'
            className='javascript bg-white'>
            {result}
          </Highlight>
        </div>
      }
    </section>
  )
}

QueryExplorer.displayName = 'components/QueryExplorer'
export default QueryExplorerContainer(QueryExplorer)
