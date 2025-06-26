import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneAPPR = explorers.oneAPPR
    const oneLWP = explorers.oneLWP
    const topAdvisory = explorers.topAdvisory

    return (
      <section className='doc-content'>
        <h2>Example Device Pre-Market Approval API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneAPPR.description}
          query={oneAPPR.query}
          params={oneAPPR.params}
          title={oneAPPR.title}
          name={'oneAPPR'}
        />
        <QueryTour
          desc={oneLWP.description}
          query={oneLWP.query}
          params={oneLWP.params}
          title={oneLWP.title}
          name={'oneLWP'}
        />
        <QueryTour
          desc={topAdvisory.description}
          query={topAdvisory.query}
          params={topAdvisory.params}
          title={topAdvisory.title}
          name={'topAdvisory'}
        />
      </section>
    )
  }
}

export default IndexRoute
