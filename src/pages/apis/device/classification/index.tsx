import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import FieldsHarmonization from '../../../../components/FieldsHarmonization'

import master_harmonization from '../../../../constants/fields/master_harmonization.yaml'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Device Classification Overview</h2>
        <p>Most medical devices can be classified by finding the matching description of the device in Title 21 of the Code of Federal Regulations (CFR), Parts 862-892.</p>
        <p>The Food and Drug Administration (FDA) has established classifications for approximately 1,700 different generic types of devices and grouped them into 16 medical specialties referred to as panels. Each of these generic types of devices is assigned to one of three regulatory classes based on the level of control necessary to assure the safety and effectiveness of the device.</p>
        <p>The <strong>openFDA Device Classification API</strong> contains medical device names, their associated product codes, their medical specialty areas (panels) and their classification. The name and product code identify the generic category of a device for FDA. The product code assigned to a device is based upon the medical device product classification designated under 21 CFR Parts 862-892.</p>
        <p>For additional information, see <a href='http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/Overview/ClassifyYourDevice/default.htm'>here</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized
          status={meta.status}
        />

        <h3>Fields Harmonization</h3>
        <p>Different datasets use different unique identifiers, which can make it difficult to find the same device in each dataset.</p>
        <p>openFDA features harmonization on specific identifiers to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.</p>
        <p>Review the chart below to better understand which fields are harmonized.</p>
        <FieldsHarmonization
          master_harmonization={master_harmonization}
          selected_noun='device'
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to='/terms/'>Terms of Service</Link></p>

        <h3>Disclaimer</h3>
        <p>This data should not be used as a method to collect data to issue alerts to the public, nor should it be used to track the lifecycle of a recall. FDA seeks publicity about a recall only when it believes the public needs to be alerted to a serious hazard. FDA works with industry and our state partners to publish press releases and other public notices about recalls that may potentially present a significant or serious risk to the consumer or user of the product. Subscribe to this Recall/Safety Alert feed here.</p>
        <p>Further, FDA does not update the status of a recall after the recall has been classified according to its level of hazard. As such, the status of a recall (open, completed, or terminated) will remain unchanged after published in the Enforcement Reports.</p>
      </section>
    )
  }
}

export default IndexRoute
