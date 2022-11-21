import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import ExplorerLink from '../../../../components/ExplorerLink'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Animal & Veterinary Labeling Overview</h2>
        <p>Drug manufacturers and distributors submit documentation about their products to FDA in the <a href="http://labels.fda.gov/">Structured Product Labeling (SPL) format</a>. The openFDA drug product labeling API returns data from this dataset.</p>
        <p>The labeling is a 'living document' that changes over time to reflect increased knowledge about the safety and effectiveness of the drug.</p>
        <p>The openFDA drug product labels API returns data from these submissions for both prescription and over-the-counter (OTC) drugs. The labels are broken into sections, such as indications for use (prescription drugs) or purpose (OTC drugs), adverse reactions, and so forth. There is considerable variation between drug products in terms of these sections and their contents, since the information required for safe and effective use varies with the unique characteristics of each drug product.</p>
        <p>To read more about animal drug products, please visit the <a href="http://www.fda.gov/AnimalVeterinary/Products/default.htm">Animal and Veterinary Products</a>.</p>

        <ExplorerLink
          endpoint_name='Animal Drug Labeling'
        />

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link>.</p>
      </section>
    )
  }
}

export default IndexRoute
