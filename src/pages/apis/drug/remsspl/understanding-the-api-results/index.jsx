import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the Query Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/drug/remsspl.json?limit=1">https://api.fda.gov/drug/remsspl.json?limit=1</a>), the <code>results</code> section includes matching ndc results returned by the API.</p>
        <p>Each REMS SPL entry consists of two major sections:</p>
        {
          //TODO: Figure out sections from backend.
        }
        <ul>
          <li><strong>Product data:</strong>General information about the product.</li>
          <li><strong>REMS Elements:</strong>An expansive but optional section with fine details about the REMS documentation.</li>
          <li><strong>An openFDA section:</strong>An annotation with additional product identifiers, such as UNII and UPC, of the drug product, if available.</li>
        </ul>
        {
          //TODO: Develop _examples.json
        }
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/drug/remsspl.json?count=products.manufactured_product.package_type">https://api.fda.gov/drug/remsspl.json?count=products.manufactured_product.package_type</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
