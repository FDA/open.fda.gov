import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Tobacco Prevention Ads Research Overview</h2>
        <p> The U.S. Food and Drug Administration (FDA) regulates all tobacco products in the United States.</p>
        <p><a href='https://www.safetyreporting.hhs.gov/srp2/CTP/TobaccoProductsParts.html' target='_blank' rel='noopener noreferrer'>Tobacco products</a> are made or derived from tobacco and include any associated parts that are necessary
            for their use. For example, both a pipe device and the pipe tobacco are regulated by the FDA.</p>

        <p>This dataset makes available the research paper "Effectiveness of Youth Tobacco Prevention Ads: Meta-Analysis of a Decade's Worth of Copy Testing Data."</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link>.</p>
      </section>
    )
  }
}

export default IndexRoute
