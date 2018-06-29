import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import InteractiveInfographic from '../../../../components/InteractiveInfographic'

import infographic_definitions from './_infographic_definitions.json'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Animal & Veterinary Phish-Pharm Overview</h2>
        <p>Increased aquaculture production in the US and abroad has led to increased concern over the use of drugs and chemicals (both legal and illegal) in the production of fish products. To address this, the FDA’s Center for Veterinary Medicine (CVM), Office of Research developed and regularly updated Phish-Pharm, a free, searchable, literature database that details drug metabolism, depletion, and pharmacokinetics in fish. The goal of the database is to aid researchers in finding and generating the necessary data to support safe and effective drug approvals for aquatic animals, to improve screening methods for illegal drugs, and to aid in study design by highlighting data gaps. The database was updated in 2014.</p>
        <p>The database was updated in 2014. The current version contains data from nearly 600 articles covering 175 aquatic species and over 200 drug and chemical compounds.</p>
        <p>Explore Phish-Pharm with the <Link to='/tools/dataexplorer/'>openFDA Data Explorer</Link></p>

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
