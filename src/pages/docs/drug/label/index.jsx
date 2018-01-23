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
        <h2>Drug Labeling Overview</h2>
        <p>Drug manufacturers and distributors submit documentation about their products to FDA in the <a href="http://labels.fda.gov/">Structured Product Labeling (SPL) format</a>. The openFDA drug product labeling API returns data from this dataset.</p>
        <p>The labeling is a 'living document' that changes over time to reflect increased knowledge about the safety and effectiveness of the drug.</p>
        <p>The openFDA drug product labels API returns data from these submissions for both prescription and over-the-counter (OTC) drugs. The labels are broken into sections, such as indications for use (prescription drugs) or purpose (OTC drugs), adverse reactions, and so forth. There is considerable variation between drug products in terms of these sections and their contents, since the information required for safe and effective use varies with the unique characteristics of each drug product.</p>
        <p>To read more about Structured Product Labeling, please visit the <a href="https://www.fda.gov/forindustry/datastandards/structuredproductlabeling/default.htm">FDA’s SPL Resources page</a>.</p>

        <InteractiveInfographic
          infographicDefinitions={infographic_definitions}
          meta={meta}
        />

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>

        <h3>Disclaimer</h3>
        <p>Please be aware of the following when using information from this API:</p>
        <p>The drug labels and other drug-specific information provided in this API represent the most recent drug listing information companies have submitted to the Food and Drug Administration (FDA). (See 21 CFR part 207.) The drug labeling and other information has been reformatted to make it easier to read but its content has neither been altered nor verified by FDA. The drug labeling provided in this API may not be the labeling on currently distributed products or identical to the labeling that is approved. Most OTC drugs are not reviewed and approved by FDA; however, they may be marketed if they comply with applicable regulations and policies described in monographs. Drugs marked 'OTC monograph final' or 'OTC monograph not final' are not checked for conformance to the monograph. Drugs marked 'unapproved medical gas', 'unapproved homeopathic' or 'unapproved drug other' have not been evaluated by FDA for safety and efficacy and their labeling has not been approved. In addition, FDA is not aware of scientific evidence to support homeopathy as effective.</p>
      </section>
    )
  }
}

export default IndexRoute
