import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/tobacco/researchdigitalads.json?search=ad_number:"Ad 1"&limit=1'>https://api.fda.gov/tobacco/researchdigitalads.json?ad_number:"Ad 1"&limit=1</a>), the <code>results</code> section includes matching records returned by the API.</p>

        <p>For <code>count</code> queries (such as: <a href='https://api.fda.gov/tobacco/researchdigitalads.json?count=channel_or_format.exact'>https://api.fda.gov/tobacco/researchdigitalads.json?count=channel_or_format.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'
          language='english'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
