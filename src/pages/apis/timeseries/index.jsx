import React from "react"

import QueryExplorer from '../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const timeseries = explorers['timeseries']

    return (
      <section className="doc-content">
        <h2>Timeseries</h2>
        <p>The API supports <code>count</code> on date fields, which produces a timeseries at the granularity of <b>day</b>. The API returns a complete timeseries.</p>
        <QueryExplorer
          desc={timeseries.description}
          originalQuery={timeseries.query}
          params={timeseries.params}
          title={timeseries.title}
        />
      </section>
    )
  }
}

export default IndexRoute
