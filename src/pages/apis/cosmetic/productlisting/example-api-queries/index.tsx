import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneRecord = explorers.oneRecord
    const fragrances = explorers.fragrances
    const categoryNames = explorers.categoryNames

    return (
      <section className='doc-content'>
        <h2>Example Cosmetic Product Listing API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>

        <QueryTour
          desc={oneRecord.description}
          query={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
          name={'oneRecord'}
        />
        <QueryTour
          desc={fragrances.description}
          query={fragrances.query}
          params={fragrances.params}
          title={fragrances.title}
          name={'fragrances'}
        />
        <QueryTour
          desc={categoryNames.description}
          query={categoryNames.query}
          params={categoryNames.params}
          title={categoryNames.title}
          name={'categoryNames'}
        />
      </section>
    )
  }
}

export default IndexRoute
