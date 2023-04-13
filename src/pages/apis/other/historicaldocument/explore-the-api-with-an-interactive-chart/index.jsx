import React from "react"

import InteractiveInfographicTour from '../../../../../components/InteractiveInfographicTour'

import infographics from '../_infographics.yaml'
import fields from '../../../../../constants/fields/otherhistoricaldocument.yaml'
import meta from '../_meta.yaml'
import mapFields from "../../../../../utils/mapFields";
import flattenFields from "../../../../../utils/flattenFields";

class IndexRoute extends React.Component {
  render() {

    let fieldsMapped = mapFields(fields.properties)
    let fieldsFlattened = flattenFields(fieldsMapped)

    return (
      <section className="doc-content">
        <InteractiveInfographicTour
          fieldsMapped={fieldsMapped}
          fieldsFlattened={fieldsFlattened}
          fields={fields}
          infographics={infographics}
          meta={meta}
        />
      </section>
    )
  }
}

export default IndexRoute
