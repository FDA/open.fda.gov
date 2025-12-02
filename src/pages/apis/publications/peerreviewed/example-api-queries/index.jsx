import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const journal223 = explorers['journal223']
    const pubmedid = explorers['pubmedid']

    return (
      <section className='doc-content'>
        <h2>Example Peer Reviewed Journals API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to
            call the API and get back results. You can experiment by editing the example queries in the black
            text box.</p>
        <QueryTour
          desc={journal223.description}
          query={journal223.query}
          params={journal223.params}
          title={journal223.title}
          name={'journal223'}
        />
        <QueryTour
          desc={pubmedid.description}
          query={pubmedid.query}
          params={pubmedid.params}
          title={pubmedid.title}
          name={'pubmedid'}
        />
      </section>
    )
  }
}

export default IndexRoute
