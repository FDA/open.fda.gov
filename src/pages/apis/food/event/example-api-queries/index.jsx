import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneReport = explorers['oneReport']
    const industry = explorers['industry']
    const reaction = explorers['reaction']

    return (
      <section className="doc-content">
        <h2>Example food event API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneReport.description}
          query={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
          name={'oneReport'}
        />
        <QueryTour
          desc={industry.description}
          query={industry.query}
          params={industry.params}
          title={industry.title}
          name={'industry'}
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
