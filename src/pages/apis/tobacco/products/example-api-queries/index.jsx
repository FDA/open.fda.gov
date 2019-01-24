import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const searchOneProduct = explorers['searchOneProduct']
    const countOfProducts = explorers['countOfProducts']
    const industry = explorers['industry']

    return (
      <section className="doc-content">
        <h2>Example tobacco product listings API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={searchOneProduct.description}
          originalQuery={searchOneProduct.query}
          params={searchOneProduct.params}
          title={searchOneProduct.title}
        />

        <QueryExplorer
          desc={countOfProducts.description}
          originalQuery={countOfProducts.query}
          params={countOfProducts.params}
          title={countOfProducts.title}
        />
      </section>
    )
  }
}

export default IndexRoute
