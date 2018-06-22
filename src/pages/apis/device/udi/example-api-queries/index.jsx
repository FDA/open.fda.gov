import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneCompanyMed = explorers['oneCompanyMed']
    const updated = explorers['updated']

    return (
      <section className="doc-content">
        <h2>Example Device Unique Device Identifier API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneCompanyMed.description}
          originalQuery={oneCompanyMed.query}
          params={oneCompanyMed.params}
          title={oneCompanyMed.title}
        />
        <QueryExplorer
          desc={updated.description}
          originalQuery={updated.query}
          params={updated.params}
          title={updated.title}
        />
      </section>
    )
  }
}

export default IndexRoute
