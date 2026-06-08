import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/cosmetic/productlisting.json?search=fragrance_or_flavor:"Fragrance"'>https://api.fda.gov/cosmetic/productlisting.json?search=fragrance_or_flavor:"Fragrance"</a>), the <code>results</code> section includes matching records returned by the API.</p>

        <p>For <code>count</code> queries (such as: <a href='https://api.fda.gov/cosmetic/productlisting.json?count=category_names.exact'>https://api.fda.gov/cosmetic/productlisting.json?count=category_names.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'
          language='english'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
