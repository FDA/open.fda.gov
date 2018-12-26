import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneReport = explorers['oneReport']
    const regulationNumber = explorers['regulationNumber']
    const topClasses = explorers['topClasses']

    return (
      <section className="doc-content">
        <h2>Example device registrations & listings API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneReport.description}
          query={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
          name={'oneReport'}
        />
        <QueryTour
          desc={regulationNumber.description}
          query={regulationNumber.query}
          params={regulationNumber.params}
          title={regulationNumber.title}
          name={'regulationNumber'}
        />
        <QueryTour
          desc={topClasses.description}
          query={topClasses.query}
          params={topClasses.params}
          title={topClasses.title}
          name={'topClasses'}
        />
      </section>
    )
  }
}

export default IndexRoute
