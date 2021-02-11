import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const dateRange = explorers['dateRange']
    const tobaccoProducts = explorers['tobaccoProducts']

    return (
      <section className="doc-content">
        <h2>Example tobacco problem reports API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>

        <QueryExplorer
          desc={oneRecord.description}
          originalQuery={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
        />
        <QueryExplorer
          desc={dateRange.description}
          originalQuery={dateRange.query}
          params={dateRange.params}
          title={dateRange.title}
        />
        <QueryExplorer
          desc={tobaccoProducts.description}
          originalQuery={tobaccoProducts.query}
          params={tobaccoProducts.params}
          title={tobaccoProducts.title}
        />
      </section>
    )
  }
}

export default IndexRoute
