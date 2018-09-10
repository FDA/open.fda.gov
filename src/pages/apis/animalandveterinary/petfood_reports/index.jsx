import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import ExplorerLink from '../../../../components/ExplorerLink'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Animal & Veterinary Pet Food Overview</h2>
        <p>The Food and Drug Administration (FDA) regulates that can of cat food, bag of dog food, or box of dog treats or snacks in your pantry. The FDA’s regulation of pet food is similar to that for other animal foods. The Federal Food, Drug, and Cosmetic Act (FFDCA) requires that all animal foods, like human foods, be safe to eat, produced under sanitary conditions, contain no harmful substances, and be truthfully labeled.</p>
        <p>There is no requirement that pet food products have pre-market approval by the FDA. However, FDA ensures that the ingredients used in pet food are safe and have an appropriate function in the pet food. Many ingredients such as meat, poultry and grains are considered safe and do not require pre-market approval. Other substances such as sources of minerals, vitamins or other nutrients, flavorings, preservatives, or processing aids may be generally recognized as safe (GRAS) for an intended use (21 CFR 582 and 584) or must have approval as food additives (21 CFR 570, 571 and 573). Colorings must have approvals for that use as specified in 21 CFR 70 and be listed in Parts 73, 74, or 81.</p>

        <ExplorerLink
          endpoint_name='Pet Food Reports'
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
