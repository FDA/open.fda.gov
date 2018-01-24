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
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/device/udi.json?search=is_rx:true">https://api.fda.gov/device/udi.json?search=is_rx:true</a>), the <code>results</code> section includes matching Device Unique Device Identifier reports returned by the API.</p>
        <Highlight
          className='javascript'>
          {anatomy}
        </Highlight>
        <p>For count queries (such as: <a href="https://api.fda.gov/device/udi.json?count=device_class)">https://api.fda.gov/device/udi.json?count=device_class)</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {count}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
