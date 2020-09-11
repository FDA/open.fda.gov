import React from "react"

import QueryTour from '../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const timeseries: Object = explorers['timeseries']

    return (
      <section className="doc-content">
        <h2>Timeseries</h2>
        <p>The API supports <code>count</code> on date fields, which produces a timeseries at the granularity of <b>day</b>. The API returns a complete timeseries.</p>
        <QueryTour
          desc={timeseries.description}
          query={timeseries.query}
          params={timeseries.params}
          title={timeseries.title}
          name={'timeseries'}
        />
      </section>
    )
  }
}

export default IndexRoute
