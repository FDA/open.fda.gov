import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/other/nsde.json?search=package_ndc:"55700-019-60"'>https://api.fda.gov/other/nsde.json?search=package_ndc:"55700-019-60"</a>), the <code>results</code> section includes matching adverse event reports returned by the API.</p>
        <p>Each nsde result consists of these major sections:</p>
        <ul>
          <li><code>Product Information:</code>These fields relate to the product itself.</li>
          <li><code>Marketing Information:</code>Information about the marketing of the product.</li>
        </ul>
        <p>For count queries (such as: <a href="https://api.fda.gov/other/nsde.json?count=product_type">https://api.fda.gov/other/nsde.json?count=product_type</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
