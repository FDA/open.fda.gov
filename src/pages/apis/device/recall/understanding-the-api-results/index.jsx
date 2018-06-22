import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const anatomy: string = JSON.stringify(examples["anatomy"], null, '  ') || ''
    const count: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/device/recall.json?search=product_code:FOZ">https://api.fda.gov/device/recall.json?search=product_code:FOZ</a>), the <code>results</code> section includes matching Device Recall reports returned by the API.</p>
        <Highlight
          className='javascript'>
          {anatomy}
        </Highlight>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/device/recall.json?count=product_code">https://api.fda.gov/device/recall.json?count=product_code</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {count}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
