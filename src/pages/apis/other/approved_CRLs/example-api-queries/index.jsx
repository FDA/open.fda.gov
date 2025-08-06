import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const letter22 = explorers['letter22']
    const evalIII = explorers['evalIII']

    return (
      <section className='doc-content'>
        <h2>Example CRL API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to
            call the API and get back results. You can experiment by editing the example queries in the black
            text box.</p>
        <QueryTour
          desc={letter22.description}
          query={letter22.query}
          params={letter22.params}
          title={letter22.title}
          name={'letter22'}
        />
        <QueryTour
          desc={evalIII.description}
          query={evalIII.query}
          params={evalIII.params}
          title={evalIII.title}
          name={'evalIII'}
        />
      </section>
    )
  }
}

export default IndexRoute
