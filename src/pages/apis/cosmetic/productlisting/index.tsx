import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Cosmetic Product Listing Overview</h2>
        <p>
          A responsible person must list each marketed cosmetic product with FDA, including product ingredients, and
          provide any updates annually.
        </p>
        <p>
          Responsible person means the manufacturer, packer, or distributor of a cosmetic product whose name appears on
          the label of such cosmetic product in accordance with section 609(a) of the FD&C Act or section 4(a) of the
          Fair Packaging and Labeling Act.
        </p>

        <p>This dataset provides a product listing for cosmetics.</p>

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
