import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const onePub = explorers.onePub
    const byPMID = explorers.byPMID

    return (
      <section className='doc-content'>
        <h2>Example PubMed API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={onePub.description}
          query={onePub.query}
          params={onePub.params}
          title={onePub.title}
          name={'onePub'}
        />
        <QueryTour
          desc={byPMID.description}
          query={byPMID.query}
          params={byPMID.params}
          title={byPMID.title}
          name={'byPMID'}
        />
      </section>
    )
  }
}

export default IndexRoute
