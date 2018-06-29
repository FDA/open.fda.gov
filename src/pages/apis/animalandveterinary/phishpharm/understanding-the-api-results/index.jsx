import React from "react"
import Highlight from 'react-highlight'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["count"], null, '  ') || ''

    return (
      <section className="doc-content">
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href="https://api.fda.gov/animalandveterinary/phishpharm.json?search=pub_date:1997&limit=1">https://api.fda.gov/animalandveterinary/phishpharm.json?search=pub_date:1997&limit=1</a>), the <code>results</code> section includes matching SPL reports returned by the API.</p>
        <p>For <code>count</code> queries (such as: <a href="https://api.fda.gov/animalandveterinary/phishpharm.json?count=genus_species.exact">https://api.fda.gov/animalandveterinary/phishpharm.json?count=genus_species.exact</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
