import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import FieldsHarmonization from '../../../../components/FieldsHarmonization'

import master_harmonization from '../../../../constants/fields/master_harmonization.yaml'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>REMS SPL Overview</h2>
        <p>The Food and Drug Administration Amendments Act of 2007 gave FDA the authority to require a Risk Evaluation and
          Mitigation Strategy (REMS) from manufacturers to ensure that the benefits of a drug or biological product outweigh its risks.
          A REMs may be required by the FDA as part of the approval of a new product, or for an approved product when new safety information arises.
          Essentially, a REMS is a safety strategy to manage a known or potential serious risk associated with a medicine and to enable patients
          to have continued access to such medicines by managing their safe use. Each REMS has specific safety measures unique to the safety
          risks associated with a particular drug or class of drugs.</p>
        <p>The FDA has begun accepting REMS in Structured Product Labeling (SPL) format to facilitate making REMS information
          available within existing healthcare systems and workflows. SPL can be used to capture and present REMS information
          in a format that is easily shared with stakeholders and readily incorporated into health information technology.</p>
        <p>The openFDA REMS SPL API returns REMS data that has been submitted to the FDA electronically using the REMS SPL format.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={true}
        />

        <h3>Fields Harmonization</h3>
        <p>Different datasets use different unique identifiers, which can make it difficult to find the same drug in each dataset.</p>
        <p>openFDA features harmonization on specific identifiers to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.</p>
        <p>Review the chart below to better understand which fields are harmonized.</p>
        <FieldsHarmonization
          master_harmonization={master_harmonization}
          selected_noun='drug'
        />

        <h3>Additional Information About REMS SPL</h3>
        <p>To read more about REMS SPL, please visit:</p>
        <ul>
          <li><a href="https://www.fda.gov/drugs/drug-safety-and-availability/risk-evaluation-and-mitigation-strategies-rems">FDA Basics Webinar - A Brief Overview of REMS</a></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>
        </section>
    )
  }
}

export default IndexRoute
