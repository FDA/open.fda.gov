import React from "react"

import QueryTour from '../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const data: Object = explorers.oneReport

    return (
      <section className='doc-content'>
        <h2>Try the API</h2>
        <p>The following example is a query for one report of an adverse drug event. In other words, it is a query for a single record from the <strong>adverse event</strong> endpoint for <strong>drugs</strong>.</p>
        <QueryTour
          desc={data.description}
          query={data.query}
          params={data.params}
          title={data.title}
          name={'data'}
        />
      </section>
    )
  }
}

export default IndexRoute
