import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://openfda-api.preprod.fda.gov/animalandveterinary/event.json?search=original_receive_date:20131218&limit=1">https://openfda-api.preprod.fda.gov/animalandveterinary/event.json?search=original_receive_date:20131218&limit=1</a>), the <code>results</code> section includes matching adverse events reports returned by the API.</p>
        <p>Each adverse events report consists of these major sections:</p>
        <ul>
          <li><strong>Header:</strong> General information about the adverse event.</li>
          <li><strong>Animal Information:</strong> Details on the animal that experienced the event, such as breed, weight, sex, etc.</li>
          <li><strong>Drugs:</strong> Information on the drugs taken while the event was experienced.</li>
          <li><strong>Reactions:</strong> Information on the reactions experienced by the patient.</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href="https://openfda-api.preprod.fda.gov/animalandveterinary/event.json?count=primary_reporter">https://openfda-api.preprod.fda.gov/animalandveterinary/event.json?count=primary_reporter</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
