import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const countBySpecies = explorers['countBySpecies']

    return (
      <section className="doc-content">
        <h2>Example Phish-Pharm API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneRecord.description}
          originalQuery={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
        />
        <QueryExplorer
          desc={countBySpecies.description}
          originalQuery={countBySpecies.query}
          params={countBySpecies.params}
          title={countBySpecies.title}
        />
      </section>
    )
  }
}

export default IndexRoute
