import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneRecord = explorers.oneRecord
    const timesQuit = explorers.timesQuit
    const quitMethodCount = explorers.quitMethodCount

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
          desc={timesQuit.description}
          query={timesQuit.query}
          params={timesQuit.params}
          title={timesQuit.title}
          name={'timesQuit'}
        />
        <QueryTour
          desc={quitMethodCount.description}
          query={quitMethodCount.query}
          params={quitMethodCount.params}
          title={quitMethodCount.title}
          name={'quitMethodCount'}
        />
      </section>
    )
  }
}

export default IndexRoute
