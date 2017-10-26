/* @flow */

import React from 'react'
import marked from 'marked'
import Highlight from 'react-highlight'
import cx from 'classnames'

import QueryExplorerContainer from '../containers/QueryExplorerContainer'

type tPROPS = {
  desc: Array<string>;
  fetchQuery: Function;
  k: number;
  level: number;
  params: Array<string>;
  queryToRun: string;
  result: string;
  showResult: boolean;
  title: string;
  toggleQuery: Function;
  updateQuery: Function;
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
    params,
    queryToRun,
    result,
    showResult,
    title,
    toggleQuery,
    updateQuery,
  } = props

  return (
    <section
      key={k}
      className='bg-gray-lightest marg-t-2 pad-2'>
      <p><strong>Example API query</strong></p>
      <h3 className='font-size-2 marg-b-2'>{title}</h3>
      {
        desc &&
        desc.map((d: string, i) => {
          const html: string = marked(d)

          return (
            <div
              key={i}
              tabIndex={0}
              className='reverse-pre'
              dangerouslySetInnerHTML={{__html: html}}
            />
          )
        })
      }
      {params &&
        <ol className='b-t-1 marg-t-3 marg-b-2'>
          {
            params.map((param: string, i) => {
              const html: string = marked(param)

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
        value={queryToRun}
        onChange={updateQuery}
      />
      <button
        className={btnCx}
        onClick={fetchQuery.bind(null, queryToRun)}>
        Run query
      </button>
      {
        showResult &&
        <button
          aria-label='Close result of query'
          className={btnCx}
          onClick={toggleQuery}
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
          style={{
            maxHeight: '500px',
          }}>
          <Highlight
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
