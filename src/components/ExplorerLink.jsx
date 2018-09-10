/* @flow */

import React from 'react'
import Link from 'gatsby-link'

type tPROPS = {
  endpoint_name: string
};

const ExplorerLink = (props: tPROPS) => {
  const {
    endpoint_name
  } = props

  return (
    <section>
      <h2>Ways to Explore the Data</h2>
      <div className="explorer-link">
        <div className="explorer-link-partition">
          <span className="explorer-link-number clr-primary">1.</span>
          <div className="explorer-link-body">
            <span className="explorer-link-header">Try the API</span>
            <span>We provide detailed instructions and plenty of example API queries in this documentation.</span>
          </div>
        </div>
        <div className="explorer-link-or-wrapper">
          <div className="explorer-link-or-line"/>
          <div className="explorer-link-or-wordwrapper">
            <div className="explorer-link-or-word">or</div>
          </div>
        </div>​
        <div className="explorer-link-partition">
          <span className="explorer-link-number clr-primary">2.</span>
          <div className="explorer-link-body">
            <span className="explorer-link-header">Try our easy-to-use querying tool</span>
            <span>If you want to run queries on the {endpoint_name} data but don't want to use the API, go <Link to='/tools/dataexplorer/'>here</Link>.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

ExplorerLink.displayName = 'components/ExplorerLink'
export default ExplorerLink