import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneApplication = explorers.oneApplication
    const lotion = explorers.lotion
    const sponsorNameCount = explorers.sponsorNameCount

    return (
      <section className='doc-content'>
        <h2>Example Drugs@FDA queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the Application Programming Interface and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneApplication.description}
          query={oneApplication.query}
          params={oneApplication.params}
          title={oneApplication.title}
          name={'oneApplication'}
        />
        <QueryTour
          desc={lotion.description}
          query={lotion.query}
          params={lotion.params}
          title={lotion.title}
          name={'lotion'}
        />
        <QueryTour
          desc={sponsorNameCount.description}
          query={sponsorNameCount.query}
          params={sponsorNameCount.params}
          title={sponsorNameCount.title}
          name={'sponsorNameCount'}
        />
      </section>
    )
  }
}

export default IndexRoute
