import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneReport = explorers.oneReport
    const genericName = explorers.genericName
    const topEvents = explorers.topEvents

    return (
      <section className='doc-content'>
        <h2>Example Device Adverse Event API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneReport.description}
          query={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
          name={'oneReport'}
        />
        <QueryTour
          desc={genericName.description}
          query={genericName.query}
          params={genericName.params}
          title={genericName.title}
          name={'genericName'}
        />
        <QueryTour
          desc={topEvents.description}
          query={topEvents.query}
          params={topEvents.params}
          title={topEvents.title}
          name={'topEvents'}
        />
      </section>
    )
  }
}

export default IndexRoute
