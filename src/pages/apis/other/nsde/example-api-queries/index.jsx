import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneRecord = explorers['oneRecord']
    const byNDC = explorers['byNDC']
    const onTheMarket = explorers['onTheMarket']
    const discontinued = explorers['discontinued']

    return (
      <section className="doc-content">
        <h2>Example NSDE API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneRecord.description}
          query={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
          name={'oneRecord'}
        />
        <QueryTour
          desc={byNDC.description}
          query={byNDC.query}
          params={byNDC.params}
          title={byNDC.title}
          name={'byNDC'}
        />
        <QueryTour
          desc={onTheMarket.description}
          query={onTheMarket.query}
          params={onTheMarket.params}
          title={onTheMarket.title}
          name={'onTheMarket'}
        />
        <QueryTour
          desc={discontinued.description}
          query={discontinued.query}
          params={discontinued.params}
          title={discontinued.title}
          name={'discontinued'}
        />
      </section>
    )
  }
}

export default IndexRoute
