import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/food/enforcement.json?search=classification:"Class+III"'>https://api.fda.gov/food/enforcement.json?search=classification:"Class+III"</a>), the <code>results</code> section includes matching enforcement reports returned by the API.</p>
        <p>Each enforcement report consists of two major sections:</p>
        <ul>
          <li><b>Enforcement report data:</b> General information about the enforcement report.</li>
          <li><b>An openfda section:</b> Details on the patient who experienced the event, such as age, weight, sex, etc.</li>
        </ul>
        <p>The data format of RES enforcement reports changed in June 2012. In openFDA API results, reports from before that time do not contain the following fields:</p>
        <ul>
          <li><code>event_id</code></li>
          <li><code>status</code></li>
          <li><code>city</code></li>
          <li><code>state</code></li>
          <li><code>country</code></li>
          <li><code>voluntary_mandated</code></li>
          <li><code>initial_firm_notification</code></li>
          <li><code>recall_initiation_date</code></li>
        </ul>
        <p>For count queries (such as: <a href="https://api.fda.gov/food/enforcement.json?count=voluntary_mandated.exact">https://api.fda.gov/food/enforcement.json?count=voluntary_mandated.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute