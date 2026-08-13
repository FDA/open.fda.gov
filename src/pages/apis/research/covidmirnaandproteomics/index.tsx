import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Covid miRNA and Proteomics Research Overview</h2>

        <p>This dataset is associated with the research paper "Integrated miR-omics and Proteomics Reveal the Regulatory Role of miR in Protein Networks Associated with COVID-19 Disease Progression"</p>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to='/terms/'>Terms of Service</Link>.</p>
      </section>
    )
  }
}

export default IndexRoute
