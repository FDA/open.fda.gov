import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneRecord = explorers.oneRecord
    const lowBMICitalopram = explorers.lowBMICitalopram
    const countAnalytye = explorers.countAnalytye

    return (
      <section className='doc-content'>
        <h2>Example CBD Liver JAMA Research Part Two queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the Application Programming Interface and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneRecord.description}
          query={oneRecord.query}
          params={oneRecord.params}
          title={oneRecord.title}
          name={'oneRecord'}
        />
        <QueryTour
          desc={lowBMICitalopram.description}
          query={lowBMICitalopram.query}
          params={lowBMICitalopram.params}
          title={lowBMICitalopram.title}
          name={'lowBMICitalopram'}
        />
        <QueryTour
          desc={countAnalytye.description}
          query={countAnalytye.query}
          params={countAnalytye.params}
          title={countAnalytye.title}
          name={'countAnalytye'}
        />
      </section>
    )
  }
}

export default IndexRoute
