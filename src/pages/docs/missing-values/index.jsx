import React from "react"

import QueryExplorer from '../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const missing = explorers['missing']
    const exists = explorers['exists']

    return (
      <section className="doc-content">
        <h2>Missing (or not missing) values</h2>
        <ul>
          <li><p><code>_missing_</code>: <code>search</code> modifier that matches when a field has no value (is empty).</p></li>
          <li><p><code>_exists_</code>: <code>search</code> modifier that matches when a field has a value (is not empty).</p></li>
        </ul>
        <QueryExplorer
          desc={missing.description}
          originalQuery={missing.query}
          params={missing.params}
          title={missing.title}
        />
        <QueryExplorer
          desc={exists.description}
          originalQuery={exists.query}
          params={exists.params}
          title={exists.title}
        />
      </section>
    )
  }
}

export default IndexRoute
