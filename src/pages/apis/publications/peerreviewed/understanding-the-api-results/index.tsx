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
        <p>For <code>search</code> queries (such as:
          <a href= {'https://api.fda.gov/publications/peerreviewed.json?search=pubmed_id:39386161'}>
            {'https://api.fda.gov/publications/peerreviewed.json?search=pubmed_id:39386161'}</a>
            ), the <code>results</code> section includes matching Peer Reviewed Journals returned by the API.</p>
        <Highlight
          className='javascript'>
          {resultsExample}
        </Highlight>
        <p>For count queries (such as: <a
          href={'https://api.fda.gov/publications/peerreviewed.json?count=journal_type'}>{'https://api.fda.gov/publications/peerreviewed.json?count=journal_type'}</a>),
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
