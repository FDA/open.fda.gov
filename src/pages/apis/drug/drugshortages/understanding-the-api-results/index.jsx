import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://openfda-api.preprod.fda.gov/drug/shortages.json?limit=1'>https://openfda-api.preprod.fda.gov/drug/shortages.json?limit=1</a>), the <code>results</code> section includes matching drug shortages results returned by the API.</p>
        <p>For <code>count</code> queries (such as: <a href='https://openfda-api.preprod.fda.gov/drug/shortages.json?count=update_type'>https://openfda-api.preprod.fda.gov/drug/shortages.json?count=update_type</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
