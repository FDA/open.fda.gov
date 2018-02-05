import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneReport = explorers['oneReport']
    const regulationNumber = explorers['regulationNumber']
    const topClasses = explorers['topClasses']

    return (
      <section className="doc-content">
        <h2>Example Device Recall API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneReport.description}
          originalQuery={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
        />
        <QueryExplorer
          desc={regulationNumber.description}
          originalQuery={regulationNumber.query}
          params={regulationNumber.params}
          title={regulationNumber.title}
        />
        <QueryExplorer
          desc={topClasses.description}
          originalQuery={topClasses.query}
          params={topClasses.params}
          title={topClasses.title}
        />
      </section>
    )
  }
}

export default IndexRoute
