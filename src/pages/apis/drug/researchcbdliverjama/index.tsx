import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>CBD Liver JAMA Research Overview</h2>
        <p>This dataset makes available the research paper "Cannabidiol and Liver Enzyme Level Elevations in Healthy Adults".</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          status={meta.status}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the Application Programming Interface in line with our <Link to='/terms/'>Terms of Service</Link></p>
      </section>
    )
  }
}

export default IndexRoute
