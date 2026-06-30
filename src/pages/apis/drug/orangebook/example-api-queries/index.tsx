import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneProduct = explorers.oneProduct
    const singleSource = explorers.singleSource
    const expiring2020 = explorers.expiring2020
    const countByType = explorers.countByType


    return (
      <section className='doc-content'>
        <h2>Example Orange Book queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the Application Programming Interface and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneProduct.description}
          query={oneProduct.query}
          params={oneProduct.params}
          title={oneProduct.title}
          name={'oneProduct'}
        />
        <QueryTour
          desc={singleSource.description}
          query={singleSource.query}
          params={singleSource.params}
          title={singleSource.title}
          name={'singleSource'}
        />
        <QueryTour
          desc={expiring2020.description}
          query={expiring2020.query}
          params={expiring2020.params}
          title={expiring2020.title}
          name={'expiring2020'}
        />
        <QueryTour
          desc={countByType.description}
          query={countByType.query}
          params={countByType.params}
          title={countByType.title}
          name={'countByType'}
        />
      </section>
    )
  }
}

export default IndexRoute
