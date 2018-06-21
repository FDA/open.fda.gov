import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const advisoryCommittee = explorers['advisoryCommittee']
    const regulationNumber = explorers['regulationNumber']
    const topCountryCodes = explorers['topCountryCodes']

    return (
      <section className="doc-content">
        <h2>Example 510(k) API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={advisoryCommittee.description}
          originalQuery={advisoryCommittee.query}
          params={advisoryCommittee.params}
          title={advisoryCommittee.title}
        />
        <QueryExplorer
          desc={regulationNumber.description}
          originalQuery={regulationNumber.query}
          params={regulationNumber.params}
          title={regulationNumber.title}
        />
        <QueryExplorer
          desc={topCountryCodes.description}
          originalQuery={topCountryCodes.query}
          params={topCountryCodes.params}
          title={topCountryCodes.title}
        />
      </section>
    )
  }
}

export default IndexRoute
