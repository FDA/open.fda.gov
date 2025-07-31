import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneRecord = explorers.oneRecord
    const capsule = explorers.capsule
    const updateTypeCount = explorers.updateTypeCount

    return (
      <section className='doc-content'>
        <h2>Example Drug Shortages queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneRecord.description}
          query={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
          name={'oneRecord'}
        />
        <QueryTour
          desc={capsule.description}
          query={capsule.query}
          params={capsule.params}
          title={capsule.title}
          name={'capsule'}
        />
        <QueryTour
          desc={updateTypeCount.description}
          query={updateTypeCount.query}
          params={updateTypeCount.params}
          title={updateTypeCount.title}
          name={'updateTypeCount'}
        />
      </section>
    )
  }
}

export default IndexRoute
