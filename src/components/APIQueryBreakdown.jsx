/* @flow */

import React from 'react'

import Link from 'gatsby-link'

type tPROPS = {
  endpoint_path: string,
  query: string
};

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} label [small text right above the title]
 * @param {string} path [the page route, for endpoint pages]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @param {string} type [endpoint or not, used for styling and tabs]
 * @return {React.Element}
 */
const APIQueryBreakdown = (props: tPROPS) => {
  const {
    endpoint_path,
    query
  } = props

  return (
    <section id='api_usage_steps' className='event-query-breakdown'>
      <div className='base-endpoint'>
        <div className='value blue-bg'>https://api.fda.gov{endpoint_path}</div>
        <div className='label'>base endpoint</div>
      </div>
      <div className='punctuation'>
        <div className='value yellow-bg'>?</div>
        <div className='label'>?</div>
      </div>
      <div className='search'>
        <div className='value orange-bg'>search=</div>
        <div className='label'>search=</div>
      </div>
      <div className='field-term'>
        <div className='value green-bg'>{query}</div>
        <div className='label'>field:term</div>
      </div>
      <div className='punctuation'>
        <div className='value yellow-bg'>&</div>
        <div className='label'>&</div>
      </div>
      <div className='limit'>
        <div className='value pink-bg'>limit=5</div>
        <div className='label'>limit</div>
      </div>
    </section>
  )
}

APIQueryBreakdown.displayName = 'components/APIQueryBreakdown'
export default APIQueryBreakdown
