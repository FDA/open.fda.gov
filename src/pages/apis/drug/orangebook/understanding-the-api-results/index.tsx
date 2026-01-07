import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/drug/orangebook.json?search=therapeutic_equivalence_codes:"AP"&limit=1'>https://api.fda.gov/drug/orangebook.json?search=therapeutic_equivalence_codes:"AP"&limit=1</a>), the <code>results</code> section includes matching records returned by the API.</p>
        <p>Each record consists of these major sections:</p>
        <ul>
          <li>Standard orange book fields.</li>
          <li><strong>An openfda section:</strong> An annotation with additional product identifiers, such as UPC and brand name, of the drug products listed in the labeling.</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href='https://api.fda.gov/drug/orangebook.json?count=product_type.exact'>https://api.fda.gov/drug/orangebook.json?count=product_type.exact</a>), the results section will look something like the following:</p>
        <Highlight
            className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
