import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/drug/event.json?search=receivedate:[20040101+TO+20081231]&limit=1">https://api.fda.gov/drug/event.json?search=receivedate:[20040101+TO+20081231]&limit=1</a>), the <code>results</code> section includes matching adverse event reports returned by the API.</p>
        <p>Each adverse event report consists of these major sections:</p>
        <ul>
          <li><strong>Header:</strong> General information about the adverse event.</li>
          <li><strong>Patient Information:</strong> Details on the patient who experienced the event, such as age, weight, sex, etc.</li>
          <li><strong>Drugs:</strong> Information on the drugs taken while the event was experienced.</li>
          <li><strong>Reactions:</strong> Information on the reactions experienced by the patient.</li>
        </ul>
        <p>The order of these fields in the results can and will vary...</p>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/drug/event.json?count=patient.reaction.reactionmeddrapt.exact">https://api.fda.gov/drug/event.json?count=patient.reaction.reactionmeddrapt.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
