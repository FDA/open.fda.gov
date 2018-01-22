import React from "react"

import Fields from '../../../components/RenderContentObject/Fields'
import fields from '../_fields.yaml'

class IndexRoute extends React.Component {
  render() {

    const meta_fields = [
      "meta.disclaimer",
      "meta.license",
      "meta.last_updated",
      "meta.results.skip",
      "meta.results.limit",
      "meta.results.total"
    ]

    return (
      <section className="doc-content">
        <h2>Anatomy of a response</h2>
        <p>Responses for non-<code>count</code> queries are divided into two sections, <code>meta</code> and <code>results</code>.</p>
        <h3>Meta</h3>
        <p>For non-<code>count</code> queries, the <code>meta</code> section includes a disclaimer, a link to the openFDA data license, and information about the results that follow.</p>
        <Fields
          data={meta_fields}
          fields={fields}
        />
        <h3>Results</h3>
        <p>For non-<code>count</code> queries, the <code>results</code> section is an array of matching records.</p>
      </section>
    )
  }
}

export default IndexRoute
