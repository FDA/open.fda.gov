import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneReport = explorers['oneReport']
    const pharmacologic = explorers['pharmacologic']
    const reaction = explorers['reaction']

    return (
      <section className="doc-content">
        <h2>Example drug labeling API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneReport.description}
          query={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
          name={'oneReport'}
        />
        <QueryTour
          desc={pharmacologic.description}
          query={pharmacologic.query}
          params={pharmacologic.params}
          title={pharmacologic.title}
          name={'pharmacologic'}
        />
        <QueryTour
          desc={reaction.description}
          query={reaction.query}
          params={reaction.params}
          title={reaction.title}
          name={'reaction'}
        />
      </section>
    )
  }
}

export default IndexRoute
