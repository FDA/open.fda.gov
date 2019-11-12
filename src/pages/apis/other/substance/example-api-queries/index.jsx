import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const byName = explorers['byName']
    const byCASRegistryNumber = explorers['byCASRegistryNumber']
    const byUNII = explorers['byUNII']

    return (
      <section className="doc-content">
        <h2>Example Substance Data API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneRecord.description}
          originalQuery={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
        />
        <QueryExplorer
          desc={byName.description}
          originalQuery={byName.query}
          params={byName.params}
          title={byName.title}
        />
        <QueryExplorer
          desc={byCASRegistryNumber.description}
          originalQuery={byCASRegistryNumber.query}
          params={byCASRegistryNumber.params}
          title={byCASRegistryNumber.title}
        />
        <QueryExplorer
          desc={byUNII.description}
          originalQuery={byUNII.query}
          params={byUNII.params}
          title={byUNII.title}
        />
      </section>
    )
  }
}

export default IndexRoute
