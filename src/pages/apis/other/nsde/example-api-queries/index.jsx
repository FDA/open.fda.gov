import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const byNDC = explorers['byNDC']
    const onTheMarket = explorers['onTheMarket']
    const discontinued = explorers['discontinued']

    return (
      <section className="doc-content">
        <h2>Example NSDE API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneRecord.description}
          originalQuery={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
        />
        <QueryExplorer
          desc={byNDC.description}
          originalQuery={byNDC.query}
          params={byNDC.params}
          title={byNDC.title}
        />
        <QueryExplorer
          desc={onTheMarket.description}
          originalQuery={onTheMarket.query}
          params={onTheMarket.params}
          title={onTheMarket.title}
        />
        <QueryExplorer
          desc={discontinued.description}
          originalQuery={discontinued.query}
          params={discontinued.params}
          title={discontinued.title}
        />
      </section>
    )
  }
}

export default IndexRoute
