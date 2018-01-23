import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/drug/label.json?search=effective_date:[20040101+TO+20081231]&limit=1">https://api.fda.gov/drug/label.json?search=effective_date:[20040101+TO+20081231]&limit=1</a>), the <code>results</code> section includes matching SPL reports returned by the API.</p>
        <p>Each SPL report consists of these major sections:</p>
        <ul>
          <li>Standard SPL fields, including unique identifiers.</li>
          <li>Product-specific fields, the order and contents of which are unique to each product.</li>
          <li><strong>An openfda section:</strong> An annotation with additional product identifiers, such as UPC and brand name, of the drug products listed in the labeling.</li>
        </ul>
        <p>For count queries (such as: <a href="https://api.fda.gov/drug/label.json?count=openfda.product_type.exact">https://api.fda.gov/drug/label.json?count=openfda.product_type.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
