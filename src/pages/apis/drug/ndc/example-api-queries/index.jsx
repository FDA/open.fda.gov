import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneProduct = explorers['oneProduct']
    const lotion = explorers['lotion']
    const pharmClassCount = explorers['pharmClassCount']

    return (
      <section className="doc-content">
        <h2>Example drug NDC queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the Application Programming Interface and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneProduct.description}
          query={oneProduct.query}
          params={oneProduct.params}
          title={oneProduct.title}
          name={'oneProduct'}
        />
        <QueryTour
          desc={lotion.description}
          query={lotion.query}
          params={lotion.params}
          title={lotion.title}
          name={'lotion'}
        />
        <QueryTour
          desc={pharmClassCount.description}
          query={pharmClassCount.query}
          params={pharmClassCount.params}
          title={pharmClassCount.title}
          name={'pharmClassCount'}
        />
      </section>
    )
  }
}

export default IndexRoute
