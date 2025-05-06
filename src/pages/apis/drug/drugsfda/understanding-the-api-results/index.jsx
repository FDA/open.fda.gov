import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/drug/drugsfda.json?limit=1'>https://api.fda.gov/drug/drugsfda.json?limit=1</a>), the <code>results</code> section includes matching Drugs@FDA results returned by the API.</p>
        <p>Each Drugs@FDA entry consists of four major sections:</p>
        <ul>
          <li><strong>Application data:</strong> The top level information which contains the details of the application.</li>
          <li><strong>Product data:</strong> A list of all products included in the application with details on each.</li>
          <li><strong>Submissions data:</strong> A list of all submissions associated with the application with details of each.</li>
          <li><strong>An openfda section:</strong> An annotation with additional identifiers associate with the application number, if available.</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href='https://api.fda.gov/drug/drugsfda.json?count=products.route.exact&limit=10'>https://api.fda.gov/drug/drugsfda.json?count=products.route.exact&limit=10</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
