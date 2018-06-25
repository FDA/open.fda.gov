import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneReport = explorers['oneReport']
    const hazard = explorers['hazard']
    const voluntaryVsMandated = explorers['voluntaryVsMandated']

    return (
      <section className="doc-content">
        <h2>Example food enforcement API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneReport.description}
          originalQuery={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
        />
        <QueryExplorer
          desc={hazard.description}
          originalQuery={hazard.query}
          params={hazard.params}
          title={hazard.title}
        />
        <QueryExplorer
          desc={voluntaryVsMandated.description}
          originalQuery={voluntaryVsMandated.query}
          params={voluntaryVsMandated.params}
          title={voluntaryVsMandated.title}
        />
      </section>
    )
  }
}

export default IndexRoute
