/* @flow */

import React from 'react'

import Link from 'gatsby-link'

type tPROPS = {
  endpoint_name: string,
  endpoint_path: string
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
const APIUseSteps = (props: tPROPS) => {
  const {
    endpoint_name,
    endpoint_path
  } = props

  return (
    <section id='api_usage_steps'>
      <ul className='steps'>
        <li>
          <div className='step-num'>1</div>
          <div className='step-desc'>If you haven’t already, read the <Link to='/apis/'>API Basics</Link> documentation.</div>
        </li>
        <li>
          <div className='step-num'>2</div>
          <div className='step-desc'>Review the <Link to={String(endpoint_path) + 'searchable-fields/'}>list of searchable fields</Link> available in the {endpoint_name} dataset.</div>
        </li>
        <li>
          <div className='step-num'>3</div>
          <div className='step-desc'>Try out the {endpoint_name} API using the <Link to={String(endpoint_path) + 'explore-the-api-with-an-interactive-chart/'}>interactive examples</Link> and tools below.</div>
        </li>
      </ul>
    </section>
  )
}

APIUseSteps.displayName = 'components/APIUseSteps'
export default APIUseSteps
