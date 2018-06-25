import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneAPPR = explorers['oneAPPR']
    const oneLWP = explorers['oneLWP']
    const topAdvisory = explorers['topAdvisory']

    return (
      <section className="doc-content">
        <h2>Example Device Pre-Market Approval API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneAPPR.description}
          originalQuery={oneAPPR.query}
          params={oneAPPR.params}
          title={oneAPPR.title}
        />
        <QueryExplorer
          desc={oneLWP.description}
          originalQuery={oneLWP.query}
          params={oneLWP.params}
          title={oneLWP.title}
        />
        <QueryExplorer
          desc={topAdvisory.description}
          originalQuery={topAdvisory.query}
          params={topAdvisory.params}
          title={topAdvisory.title}
        />
      </section>
    )
  }
}

export default IndexRoute
