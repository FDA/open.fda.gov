import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneCompanyMed = explorers.oneCompanyMed
    const updated = explorers.updated

    return (
      <section className='doc-content'>
        <h2>Example Device Unique Device Identifier API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneCompanyMed.description}
          query={oneCompanyMed.query}
          params={oneCompanyMed.params}
          title={oneCompanyMed.title}
          name={'oneCompanyMed'}
        />
        <QueryTour
          desc={updated.description}
          query={updated.query}
          params={updated.params}
          title={updated.title}
          name={'updated'}
        />
      </section>
    )
  }
}

export default IndexRoute
