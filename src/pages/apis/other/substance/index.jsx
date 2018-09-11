import React from "react"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Substance Data Overview</h2>
        <p>For more information about Substance Data, please see the following NIH website: <a href="https://tripod.nih.gov/ginas/#/">The Ginas Project</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />
      </section>
    )
  }
}

export default IndexRoute



