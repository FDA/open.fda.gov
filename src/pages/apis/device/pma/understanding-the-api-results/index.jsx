import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/device/pma.json?search=decision_code:APPR&limit=1">https://api.fda.gov/device/pma.json?search=decision_code:APPR&limit=1</a>), the <code>results</code> section includes matching Device Pre-Market Approval reports returned by the API.</p>
        <p>For count queries (such as: <a href="https://api.fda.gov/device/pma.json?count=advisory_committee">https://api.fda.gov/device/pma.json?count=advisory_committee</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
