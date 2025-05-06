import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const botulism = explorers.botulism
    const poison = explorers.poison

    return (
      <section className='doc-content'>
        <h2>Example Historical Documents API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to
            call the API and get back results. You can experiment by editing the example queries in the black
            text box.</p>
        <QueryTour
          desc={botulism.description}
          query={botulism.query}
          params={botulism.params}
          title={botulism.title}
          name={'botulism'}
        />
        <QueryTour
          desc={poison.description}
          query={poison.query}
          params={poison.params}
          title={poison.title}
          name={'poison'}
        />
      </section>
    )
  }
}

export default IndexRoute
