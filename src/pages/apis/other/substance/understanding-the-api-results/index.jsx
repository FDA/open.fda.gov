import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='http://54.196.38.238:8000/other/substance.json?search=definition_type:"PRIMARY"'>http://54.196.38.238:8000/other/substance.json?search=definition_type:"PRIMARY"</a>), the <code>results</code> section includes matching adverse event reports returned by the API.</p>
        <p>Each nsde result consists of these major sections:</p>
        <ul>
          <li><code>References:</code>These fields relate to the product itself.</li>
          <li><code>Relationships:</code>Information about the marketing of the product.</li>
          <li><code>Names:</code>Information about the marketing of the product.</li>
        </ul>
        <p>For count queries (such as: <a href="http://54.196.38.238:8000/other/substance.json?count=status">http://54.196.38.238:8000/other/substance.json?count=status</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
