import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/tobacco/problem.json?search=submission_date:20131218&limit=1">https://api.fda.gov/tobacco/problem.json?search=submission_date:20200101&limit=1</a>), the <code>results</code> section includes matching adverse events reports returned by the API.</p>

        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/tobacco/problem.json?count=product_type.exact">https://api.fda.gov/tobacco/problem.json?count=product_type.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
