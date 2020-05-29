import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/device/covid19serology.json?search=product_code:KTN&limit=1">https://api.fda.gov/device/covid19serology.json?search=group:Negatives&limit=1</a>), the <code>results</code> section includes matching Serological Test Evaluations reports returned by the API.</p>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/device/covid19serology.json?count=openfda.fei_number">https://api.fda.gov/device/covid19serology.json?count=antibody_agree</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
