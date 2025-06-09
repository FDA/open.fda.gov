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
        <p><strong>Note:</strong> Some data fields may contain the field MSK. MSK is a null flavor that means "masked."
          MSK is used when there is information available for the value, but it has not been provided
          to the sender due to security, privacy, or other reasons.</p>
        <FieldExplorer
          fields={fields}
          meta={meta}
        />
      </section>
    )
  }
}

export default IndexRoute
