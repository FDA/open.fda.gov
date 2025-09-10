import React from "react"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>PubMed Overview</h2>
        <p>PubMed® comprises more than 39 million citations for biomedical literature from MEDLINE, life science
          journals, and online books. Citations may include links to full text content from PubMed Central and
          publisher web sites.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />
      </section>
    )
  }
}

export default IndexRoute


