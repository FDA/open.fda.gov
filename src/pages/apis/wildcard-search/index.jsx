import React from "react"

import QueryTour from '../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const wildcardSearchExactField = explorers['wildcardSearchExactField']
    const wildcardSearchRegularField = explorers['wildcardSearchRegularField']
    const wildcardSearchFoodRecallInsensitive = explorers['wildcardSearchFoodRecallInsensitive']
    const wildcardSearchFoodRecallSensitive = explorers['wildcardSearchFoodRecallSensitive']


    return (
      <section className="doc-content">
        <h2>Wildcard search</h2>
        <p>Wildcard queries return documents that contain terms matching a wildcard pattern.</p>
        <p>A wildcard operator is a placeholder that matches one or more characters. At this point, openFDA supports the <code>*</code> ("star") wildcard operator, which
            matches zero or more characters. You can combine wildcard operators with other characters to create a wildcard pattern.</p>
        <p>This feature is available on all API Endpoints.</p>
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
      <QueryTour
          desc={wildcardSearchFoodRecallInsensitive.description}
          query={wildcardSearchFoodRecallInsensitive.query}
          params={wildcardSearchFoodRecallInsensitive.params}
          title={wildcardSearchFoodRecallInsensitive.title}
          name={'wildcardSearchFoodRecallInsensitive'}
      />
      <QueryTour
          desc={wildcardSearchFoodRecallSensitive.description}
          query={wildcardSearchFoodRecallSensitive.query}
          params={wildcardSearchFoodRecallSensitive.params}
          title={wildcardSearchFoodRecallSensitive.title}
          name={'wildcardSearchFoodRecallSensitive'}
      />
      </section>
    )
  }
}

export default IndexRoute
