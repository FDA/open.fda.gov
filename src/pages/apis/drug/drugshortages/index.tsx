import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import FieldsHarmonization from '../../../../components/FieldsHarmonization'

import masterHarmonization from '../../../../constants/fields/master_harmonization.yaml'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Drug Shortages Overview</h2>
        <p>
          <a href='https://www.fda.gov/media/163858/download?attachment'>Drug Shortages</a> can occur for many reasons,
          including manufacturing and quality problems, delays, and discontinuations. Manufacturers provide FDA most
          drug shortage information, and the agency works closely with them to prevent or reduce the impact of
          shortages. When a shortage is listed as current on the Drug Shortage Database, the FDA is aware of the supply
          situation and is working with the manufactures on efforts to mitigate the supply disruption. FDA also continue
          to work with manufacturers on shortage prevention efforts for drugs not yet listed on the Drug Shortage
          Database.
        </p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized
          status='drugshortages'
        />

        <h3>Fields Harmonization</h3>
        <p>
          Different datasets use different unique identifiers, which can make it difficult to find the same drug in
          each dataset.
        </p>
        <p>
          openFDA features harmonization on specific identifiers to make it easier to both search for and understand the
          drug products returned by API queries. These additional fields are attached to records in all categories,
          if applicable.
        </p>
        <p>Review the chart below to better understand which fields are harmonized.</p>
        <FieldsHarmonization
          master_harmonization={masterHarmonization}
          selected_noun='drug'
        />

        <h3>Responsible use of the data</h3>
        <p>
          Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about
          the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API
          in line with our <Link to='/terms/'>Terms of Service</Link>
        </p>
      </section>
    )
  }
}

export default IndexRoute
