import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const anatomy: string = JSON.stringify(examples.anatomy, null, '  ') || ''
    const count: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/device/registrationlisting.json'>https://api.fda.gov/device/registrationlisting.json</a>), the <code>results</code> section includes matching Device Registration & Listings reports returned by the API.</p>
        <Highlight
          className='javascript'>
          {anatomy}
        </Highlight>
        <p>For <code>count</code> queries (such as: <a href='https://api.fda.gov/device/registrationlisting.json?count=establishment_type.exact'>https://api.fda.gov/device/registrationlisting.json?count=establishment_type.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {count}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
