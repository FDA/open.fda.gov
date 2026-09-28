import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneRecord = explorers.oneRecord
    const studyOne = explorers.studyOne
    const tobaccoProducts = explorers.tobaccoProducts

    return (
      <section className='doc-content'>
        <h2>Example Tobacco Prevention Ads Research API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>

        <QueryTour
          desc={oneRecord.description}
          query={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
          name={'oneRecord'}
        />
        <QueryTour
          desc={studyOne.description}
          query={studyOne.query}
          params={studyOne.params}
          title={studyOne.title}
          name={'dateRange'}
        />
        <QueryTour
          desc={tobaccoProducts.description}
          query={tobaccoProducts.query}
          params={tobaccoProducts.params}
          title={tobaccoProducts.title}
          name={'tobaccoProducts'}
        />
      </section>
    )
  }
}

export default IndexRoute