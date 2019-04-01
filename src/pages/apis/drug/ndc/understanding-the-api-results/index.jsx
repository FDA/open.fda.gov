import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the Query Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/drug/ndc.json?limit=1">https://api.fda.gov/drug/ndc.json?limit=1</a>), the <code>results</code> section includes matching ndc results returned by the API.</p>
        <p>Each NDC Directory entry consists of two major sections:</p>
        <ul>
          <li><strong>Product data:</strong> General information about the product.</li>
          <li><strong>Packaging information:</strong> The specific details of the product packaging.</li>
          <li><strong>An openfda section:</strong> An annotation with additional product identifiers, such as NUII and UPC, of the drug product, if available.</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/drug/ndc.json?count=dea_schedule">https://api.fda.gov/drug/ndc.json?count=dea_schedule</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
