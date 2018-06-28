import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/animalandveterinary/petfood_reports.json?search=report_year:2015&limit=1">https://api.fda.gov/animalandveterinary/petfood_reports.json?search=report_year:2015&limit=1</a>), the <code>results</code> section includes matching pet food reports returned by the API.</p>
        <p>Each pet food report consists of these major sections:</p>
        <ul>
          <li>Product Information, detailing the product referred to in the pet food record.</li>
          <li>Animal Information, identifying the animals affected and their traits.</li>
          <li>Adverse effect information.</li>
        </ul>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/animalandveterinary/petfood_reports.json?count=product.formulation">https://api.fda.gov/animalandveterinary/petfood_reports.json?count=product.formulation</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
