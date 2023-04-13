import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const countExample: string = JSON.stringify(examples.count, null, '  ') || ''
    const resultsExample: string = JSON.stringify(examples.results, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a
          href='https://api.fda.gov/other/historicaldocument.json?search=doc_type:talk+AND+text:"poison prevention packaging"'>https://api.fda.gov/other/historicaldocument.json?search=doc_type:talk+AND+text:"poison
                    prevention packaging"</a>), the <code>results</code> section includes matching FDA talk papers
                    returned by the API.</p>
        <Highlight
          className='javascript'>
          {resultsExample}
        </Highlight>
        <p>For count queries (such as: <a
          href='https://api.fda.gov/other/historicaldocument.json?count=year'>https://api.fda.gov/other/historicaldocument.json?count=year</a>),
                    the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {countExample}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
