import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/food/event.json?search=outcomes:"serious+injuries"'>https://api.fda.gov/food/event.json?search=outcomes:"serious+injuries"</a>), the <code>results</code> section includes matching adverse event reports returned by the API.</p>
        <p>Each adverse event report consists of these major sections:</p>
        <ul>
          <li><code>Header:</code>General information about the adverse event</li>
          <li><code>Consumer:</code>Information about the individual who experienced the adverse event</li>
          <li><code>Products:</code>Information about the products involved in the adverse event report</li>
          <li><code>Reactions:</code>Information on the reactions or symptoms experienced by the individual involved</li>
          <li><code>Outcomes:</code>Information on known outcomes or consequences of the adverse event</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/food/event.json?count=reactions.exact">https://api.fda.gov/food/event.json?count=reactions.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
