import React from "react"
import {Link} from 'gatsby'

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import FieldsHarmonization from '../../../../components/FieldsHarmonization'

import master_harmonization from '../../../../constants/fields/master_harmonization.yaml'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Drugs@FDA Overview</h2>
        <p>Drugs@FDA includes most of the drug products approved since 1939. The majority of patient information, labels, approval letters, reviews, and other information are available for drug products approved since 1998.</p>
        <p>Drugs@FDA contains information about the following FDA-approved products for human use:</p>
        <ul>
          <p>Prescription brand-name drug products, generic drug products, and many therapeutic biological products</p>
          <p>Over-the-counter brand-name and generic drugs</p>
        </ul>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          status={meta.status}
        />

        <h3>Fields Harmonization</h3>
        <p>Different datasets use different unique identifiers, which can make it difficult to find the same drug in each dataset.</p>
        <p>openFDA features harmonization on specific identifiers to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.</p>
        <p>Review the chart below to better understand which fields are harmonized.</p>
        <FieldsHarmonization
          master_harmonization={master_harmonization}
          selected_noun='drug'
        />

        <h3>Additional Information About Drugs@FDA</h3>
        <p>To read more about Drugs@FDA, please visit:</p>
        <ul>
          <li><a href='https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=faq.page'>Drugs@FDA Frequently Asked Questions</a></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the Application Programming Interface in line with our <Link to='/terms/'>Terms of Service</Link></p>
      </section>
    )
  }
}

export default IndexRoute
