import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneApplication = explorers['oneApplication']
    const lotion = explorers['lotion']
    const sponsorNameCount = explorers['sponsorNameCount']

    return (
      <section className="doc-content">
        <h2>Example drug NDC queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the Application Programming Interface and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneApplication.description}
          originalQuery={oneApplication.query}
          params={oneApplication.params}
          title={oneApplication.title}
        />
        <QueryExplorer
          desc={lotion.description}
          originalQuery={lotion.query}
          params={lotion.params}
          title={lotion.title}
        />
        <QueryExplorer
          desc={sponsorNameCount.description}
          originalQuery={sponsorNameCount.query}
          params={sponsorNameCount.params}
          title={sponsorNameCount.title}
        />
      </section>
    )
  }
}

export default IndexRoute
