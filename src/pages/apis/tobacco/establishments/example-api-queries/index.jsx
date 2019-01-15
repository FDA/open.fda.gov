import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneEstablishment = explorers['oneEstablishment']
    const establishmentInAddress = explorers['establishmentInAddress']

    return (
      <section className="doc-content">
        <h2>Example tobacco establishments API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneEstablishment.description}
          originalQuery={oneEstablishment.query}
          params={oneEstablishment.params}
          title={oneEstablishment.title}
        />
        <QueryExplorer
          desc={establishmentInAddress.description}
          originalQuery={establishmentInAddress.query}
          params={establishmentInAddress.params}
          title={establishmentInAddress.title}
        />
      </section>
    )
  }
}

export default IndexRoute
