import React from "react"

import InteractiveInfographicTour from '../../../../../components/InteractiveInfographicTour'

import infographics from '../_infographics.yaml'
import fields from '../../../../../constants/fields/devicereglist.yaml'
import meta from '../_meta.yaml'
import mapFields from "../../../../../utils/mapFields"
import flattenFields from "../../../../../utils/flattenFields"

class IndexRoute extends React.Component {
  render () {

    const fieldsMapped = mapFields(fields.properties)
    const fieldsFlattened = flattenFields(fieldsMapped)

    return (
      <section className='doc-content'>
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
