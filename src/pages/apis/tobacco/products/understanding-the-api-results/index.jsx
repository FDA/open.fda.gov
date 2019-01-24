import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example1: string = JSON.stringify(examples["search"], null, '  ') || ''
    const example2: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/tobacco/products.json?search=product_name:Strawberry&limit=10'>https://api.fda.gov/tobacco/products.json?search=product_name:Strawberry&limit=10</a>), the <code>results</code> section includes matching tobacco products list returned by the API.</p>
        <Highlight
          className='javascript'>
          {example1}
        </Highlight>

          <p></p>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/tobacco/products.json?count=product_category">https://api.fda.gov/tobacco/products.json?count=product_category</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example2}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
