import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/drug/enforcement.json?limit=1">https://api.fda.gov/drug/enforcement.json?limit=1</a>), the <code>results</code> section includes matching enforcement reports returned by the API.</p>
        <p>Each enforcement report consists of two major sections:</p>
        <ul>
          <li><strong>Enforcement report data:</strong> General information about the enforcement report.</li>
          <li><strong>An openfda section:</strong> An annotation with additional product identifiers, such as UPC and brand name, of the drug products listed in the enforcement report, if available.</li>
        </ul>
        <p>The data format of RES enforcement reports changed in June 2012. In openFDA API results, reports from before that time do not contain the following fields:</p>
        <ul>
          <li><code>event_id</code></li>
          <li><code>status</code></li>
          <li><code>city</code></li>
          <li><code>state</code></li>
          <li><code>country</code></li>
          <li><code>voluntary_mandated</code></li>
          <li><code>initial_firm_notification</code></li>
          <li><code>recall_initiation_date</code></li>
        </ul>
        <p>For count queries (such as: <a href="https://api.fda.gov/drug/enforcement.json?count=voluntary_mandated.exact">https://api.fda.gov/drug/enforcement.json?count=voluntary_mandated.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
