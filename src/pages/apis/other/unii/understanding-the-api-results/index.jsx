import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://api.fda.gov/other/unii.json?search=unii:"L7V4I673D2"'>https://api.fda.gov/other/unii.json?search=unii:"L7V4I673D2"</a>), the <code>results</code> section includes matching UNII records returned by the API.</p>
        <p>For count queries (such as: <a href='https://api.fda.gov/other/unii.json?count=unii'>https://api.fda.gov/other/unii.json?count=unii</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
