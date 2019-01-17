import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneProduct = explorers['oneProduct']
    const lotion = explorers['lotion']
    const countByType = explorers['countByType']

    return (
      <section className="doc-content">
        <h2>Example drug labeling API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneProduct.description}
          originalQuery={oneProduct.query}
          params={oneProduct.params}
          title={oneProduct.title}
        />
        <QueryExplorer
          desc={lotion.description}
          originalQuery={lotion.query}
          params={lotion.params}
          title={lotion.title}
        />
        <QueryExplorer
          desc={countByType.description}
          originalQuery={countByType.query}
          params={countByType.params}
          title={countByType.title}
        />
      </section>
    )
  }
}

export default IndexRoute
