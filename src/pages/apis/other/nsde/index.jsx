import React from "react"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>NSDE Overview</h2>
        <p>For more information about NSDE, please see the following section of the FDA SPL website: <a href="https://www.fda.gov/forindustry/datastandards/structuredproductlabeling/ucm240580.htm">FDA Comprehensive NDC SPL Data Elements</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />
      </section>
    )
  }
}

export default IndexRoute



