import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/cosmetic/event.json?search=initial_received_date:20040106&limit=1'>https://api.fda.gov/cosmetic/event.json?search=initial_received_date:20040106&limit=1</a>), the <code>results</code> section includes matching adverse events reports returned by the API.</p>
        <p>Each adverse events report consists of these major sections:</p>
        <ul>
          <li><strong>General:</strong> General information about the adverse event.</li>
          <li><strong>Patient:</strong> Details on the patient that experienced the event, such as age, gender, etc.</li>
          <li><strong>Products:</strong> Information on the products used while the event was experienced.</li>
          <li><strong>Reactions:</strong> Information on the reactions experienced by the patient.</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href='https://api.fda.gov/cosmetic/event.json?count=outcomes.exact'>https://api.fda.gov/cosmetic/event.json?count=outcomes.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
