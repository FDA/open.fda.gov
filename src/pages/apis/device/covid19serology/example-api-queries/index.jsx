import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneSample = explorers.oneSample
    const antibodyPositive = explorers.antibodyPositive
    const countType = explorers.countType

    return (
      <section className='doc-content'>
        <h2>Example Serological Testing Evaluations API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneSample.description}
          query={oneSample.query}
          params={oneSample.params}
          title={oneSample.title}
          name={'oneSample'}
        />
        <QueryTour
          desc={antibodyPositive.description}
          query={antibodyPositive.query}
          params={antibodyPositive.params}
          title={antibodyPositive.title}
          name={'antibodyPositive'}
        />
        <QueryTour
          desc={countType.description}
          query={countType.query}
          params={countType.params}
          title={countType.title}
          name={'countType'}
        />
      </section>
    )
  }
}

export default IndexRoute
