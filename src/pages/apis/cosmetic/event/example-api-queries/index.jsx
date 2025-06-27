import React from "react"
import explorers from '../_explorers.yaml'
import QueryTour from "../../../../../components/QueryTour"

class IndexRoute extends React.Component {
  render () {

    const oneReport = explorers.oneReport

    return (
      <section className='doc-content'>
        <h2>Example cosmetic adverse events API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call
            the API and get back results. You can experiment by editing the example queries in the black text
            box.</p>
        <QueryTour
          desc={oneReport.description}
          query={oneReport.query}
          params={oneReport.params}
          title={oneReport.title}
          name={'oneReport'}
        />
      </section>
    )
  }
}

export default IndexRoute
