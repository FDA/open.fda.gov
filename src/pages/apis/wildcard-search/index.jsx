import React from "react"

import QueryTour from '../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const wildcardSearchExactField = explorers['wildcardSearchExactField']
    const wildcardSearchRegularField = explorers['wildcardSearchRegularField']


    return (
      <section className="doc-content">
        <h2>Wildcard search</h2>
        <p>Wildcard queries return documents that contain terms matching a wildcard pattern.</p>
        <p>A wildcard operator is a placeholder that matches one or more characters. At this point, openFDA supports the <code>*</code> ("star") wildcard operator, which
            matches zero or more characters. You can combine wildcard operators with other characters to create a wildcard pattern.</p>
        <p>Here are some example queries that demonstrate how wildcard searches work.</p>

        <QueryTour
          desc={wildcardSearchRegularField.description}
          query={wildcardSearchRegularField.query}
          params={wildcardSearchRegularField.params}
          title={wildcardSearchRegularField.title}
          name={'wildcardSearchRegularField'}
        />
          <QueryTour
              desc={wildcardSearchExactField.description}
              query={wildcardSearchExactField.query}
              params={wildcardSearchExactField.params}
              title={wildcardSearchExactField.title}
              name={'wildcardSearchExactField'}
          />
      </section>
    )
  }
}

export default IndexRoute
