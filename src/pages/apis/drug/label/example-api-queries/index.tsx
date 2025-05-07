import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const oneLabel = explorers.oneLabel
    const boxedWarning = explorers.boxedWarning
    const countByType = explorers.countByType

    return (
      <section className='doc-content'>
        <h2>Example drug labeling API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={oneLabel.description}
          query={oneLabel.query}
          params={oneLabel.params}
          title={oneLabel.title}
          name={'oneLabel'}
        />
        <QueryTour
          desc={boxedWarning.description}
          query={boxedWarning.query}
          params={boxedWarning.params}
          title={boxedWarning.title}
          name={'boxedWarning'}
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
