import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://openfda-api.preprod.fda.gov/other/substance.json?search=definition_type:"PRIMARY"'>https://openfda-api.preprod.fda.gov/other/substance.json?search=definition_type:"PRIMARY"</a>), the <code>results</code> section includes matching adverse event reports returned by the API.</p>
        <p>Each substance result consists of these major sections:</p>
        <ul>
          <li><code>References:</code>Reference material and documentation.</li>
          <li><code>Relationships:</code>Information about related substances.</li>
          <li><code>Names:</code>Information about the names attributed to the substance.</li>
          <li><code>Codes:</code>Details about substance codes.</li>
          <li><code>Structure:</code>Information about the scientific structure of the substance.</li>
          <li><code>Moieties:</code>Information about the moieties included in the substance.</li>
        </ul>
        <p>For count queries (such as: <a href="https://openfda-api.preprod.fda.gov/other/substance.json?count=status">https://openfda-api.preprod.fda.gov/other/substance.json?count=status</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
