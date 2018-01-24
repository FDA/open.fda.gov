import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/device/classification.json?search=regulation_number:872.6855&limit=1">https://api.fda.gov/device/classification.json?search=regulation_number:872.6855&limit=1</a>), the <code>results</code> section includes matching Device Classification reports returned by the API.</p>
        <p>For count queries (such as: <a href="https://api.fda.gov/device/classification.json?count=openfda.fei_number">https://api.fda.gov/device/510k.json?count=openfda.fei_number</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
