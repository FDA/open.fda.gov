import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const byName = explorers['byName']
    const byCASRegistryNumber = explorers['byCASRegistryNumber']
    const byUNII = explorers['byUNII']
    const byFormula = explorers['byFormula']

    return (
      <section className="doc-content">
        <h2>Example Substance Data API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneRecord.description}
          query={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
          name={'oneRecord'}
        />
        <QueryTour
          desc={byName.description}
          query={byName.query}
          params={byName.params}
          title={byName.title}
          name={'byName'}
        />
        <QueryTour
          desc={byCASRegistryNumber.description}
          query={byCASRegistryNumber.query}
          params={byCASRegistryNumber.params}
          title={byCASRegistryNumber.title}
          name={'byCASRegistryNumber'}
        />
        <QueryTour
          desc={byUNII.description}
          query={byUNII.query}
          params={byUNII.params}
          title={byUNII.title}
          name={'byUNII'}
        />
        <QueryTour
          desc={byFormula.description}
          query={byFormula.query}
          params={byFormula.params}
          title={byFormula.title}
          name={'byFormula'}
        />
      </section>
    )
  }
}

export default IndexRoute
