import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/tobacco/establishments.json?search=owner_name:LLC&limit=3'>https://api.fda.gov/tobacco/establishments.json?search=owner_name:"LLC"</a>), the <code>results</code> section includes matching establishments registrations returned by the API.</p>
        <ul>
          <li><b>Establishments registration data:</b> General information about the establishment registration.</li>
        </ul>

        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/tobacco/establishments.json?count=operation_type">https://api.fda.gov/tobacco/establishments.json?count=operation_type</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute