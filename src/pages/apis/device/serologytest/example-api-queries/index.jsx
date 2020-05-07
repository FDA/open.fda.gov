import React from "react"

import QueryTour from '../../../../../components/QueryTour'
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
        <QueryTour
          desc={advisoryCommittee.description}
          query={advisoryCommittee.query}
          params={advisoryCommittee.params}
          title={advisoryCommittee.title}
          name={'advisoryCommittee'}
        />
        <QueryTour
          desc={regulationNumber.description}
          query={regulationNumber.query}
          params={regulationNumber.params}
          title={regulationNumber.title}
          name={'regulationNumber'}
        />
        <QueryTour
          desc={topCountryCodes.description}
          query={topCountryCodes.query}
          params={topCountryCodes.params}
          title={topCountryCodes.title}
          name={'topCountryCodes'}
        />
      </section>
    )
  }
}

export default IndexRoute
