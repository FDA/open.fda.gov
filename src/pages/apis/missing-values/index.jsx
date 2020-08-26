import React from "react"

import QueryTour from '../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const missing: Object = explorers['missing']
    const exists: Object = explorers['exists']

    return (
      <section className="doc-content">
        <h2>Missing (or not missing) values</h2>
        <ul>
          <li><p><code>_missing_</code>: <code>search</code> modifier that matches when a field has no value (is empty).</p></li>
          <li><p><code>_exists_</code>: <code>search</code> modifier that matches when a field has a value (is not empty).</p></li>
        </ul>
        <QueryTour
          desc={missing.description}
          query={missing.query}
          params={missing.params}
          title={missing.title}
          name={'missing'}
        />
        <QueryTour
          desc={exists.description}
          query={exists.query}
          params={exists.params}
          title={exists.title}
          name={'exists'}
        />
      </section>
    )
  }
}

export default IndexRoute
