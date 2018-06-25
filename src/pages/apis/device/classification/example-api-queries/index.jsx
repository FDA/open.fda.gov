import React from "react"

import QueryExplorer from '../../../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const oneDevice = explorers['oneDevice']
    const nob = explorers['nob']
    const topFei = explorers['topFei']

    return (
      <section className="doc-content">
        <h2>Example Device Classification API queries</h2>
        <p>To help get you started, we have provided some API query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryExplorer
          desc={oneDevice.description}
          originalQuery={oneDevice.query}
          params={oneDevice.params}
          title={oneDevice.title}
        />
        <QueryExplorer
          desc={nob.description}
          originalQuery={nob.query}
          params={nob.params}
          title={nob.title}
        />
        <QueryExplorer
          desc={topFei.description}
          originalQuery={topFei.query}
          params={topFei.params}
          title={topFei.title}
        />
      </section>
    )
  }
}

export default IndexRoute
