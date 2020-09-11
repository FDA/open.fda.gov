import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneReport = explorers['oneReport']
    const hazard = explorers['hazard']
    const voluntaryVsMandated = explorers['voluntaryVsMandated']

    return (
      <section className="doc-content">
        <h2>Example Device Enforcement API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneReport.description}
          query={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
          name={'oneReport'}
        />
        <QueryTour
          desc={hazard.description}
          query={hazard.query}
          params={hazard.params}
          title={hazard.title}
          name={'hazard'}
        />
        <QueryTour
          desc={voluntaryVsMandated.description}
          query={voluntaryVsMandated.query}
          params={voluntaryVsMandated.params}
          title={voluntaryVsMandated.title}
          name={'voluntaryVsMandated'}
        />
      </section>
    )
  }
}

export default IndexRoute
