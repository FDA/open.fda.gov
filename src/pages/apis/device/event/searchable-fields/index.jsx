import React from "react"

import FieldExplorer from '../../../../../components/FieldExplorer'

import meta from '../_meta.yaml'
import fields from '../_fields.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Searchable Fields</h2>
        <p>Use the fields explorer below to find detailed explanations of every field in the dataset.</p>
        <FieldExplorer
          fields={fields}
          meta={meta}
        />
      </section>
    )
  }
}

export default IndexRoute
