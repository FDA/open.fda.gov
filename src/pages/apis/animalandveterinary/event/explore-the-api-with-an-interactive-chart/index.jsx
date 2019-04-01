import React from "react"

import InfographicContainer from '../../../../../containers/InfographicContainer'

import infographics from '../_infographics.yaml'
import fields from '../_fields.yaml'
import meta from '../_meta.yaml'
import mapFields from "../../../../../utils/mapFields";
import flattenFields from "../../../../../utils/flattenFields";

class IndexRoute extends React.Component {
  render() {

    let fieldsMapped = mapFields(fields.properties)
    let fieldsFlattened = flattenFields(fieldsMapped)

    return (
      <section className="doc-content">
        <InfographicContainer
          fieldsMapped={fieldsMapped}
          fieldsFlattened={fieldsFlattened}
          fields={fields}
          infographics={infographics}
          api='https://api.fda.gov'
          meta={meta}
        />
      </section>
    )
  }
}

export default IndexRoute
