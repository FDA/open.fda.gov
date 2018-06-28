import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const countDeadlyProducts = explorers['countDeadlyProducts']
    const femaleChihuahuas = explorers['femaleChihuahuas']

    return (
      <section className="doc-content">
        <h2>Example animal & veterinary labeling API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneRecord.description}
          originalQuery={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
        />
        <QueryExplorer
          desc={countDeadlyProducts.description}
          originalQuery={countDeadlyProducts.query}
          params={countDeadlyProducts.params}
          title={countDeadlyProducts.title}
        />
        <QueryExplorer
          desc={femaleChihuahuas.description}
          originalQuery={femaleChihuahuas.query}
          params={femaleChihuahuas.params}
          title={femaleChihuahuas.title}
        />
      </section>
    )
  }
}

export default IndexRoute
