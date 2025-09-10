import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const results: string = JSON.stringify(examples.results, null, '  ') || ''
    const count: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/other/pubmed.json?search=pmid:"39096568"'>https://api.fda.gov/other/pmid.json?search=pmid:"39096568"</a>), the <code>results</code> section includes matching publications returned by the API.</p>
        <Highlight
          className='javascript'>
          {results}
        </Highlight>
        <p>For count queries (such as: <a href='https://api.fda.gov/other/pubmed.json?count=pub_status'>https://api.fda.gov/other/pubmed.json?count=pub_status</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {count}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
