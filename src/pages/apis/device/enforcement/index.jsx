import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import InteractiveInfographic from '../../../../components/InteractiveInfographic'

import infographic_definitions from './_infographic_definitions.json'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Device Enforcement Overview</h2>
        <p>The openFDA device enforcement reports API returns data from the FDA Recall Enterprise System (RES), a database that contains information on recall event information submitted to FDA. Currently, this data covers publicly releasable records from 2004-present. The data is updated weekly.</p>
        <p>The procedures followed to input recall information into RES when FDA learns of a recall event are outlined in Chapter 7 of FDA’s Regulatory Procedure Manual. The Regulatory Procedures Manual is a reference manual for FDA personnel. It provides FDA personnel with information on internal procedures to be used in processing domestic and import regulatory and enforcement matters.</p>

        <InteractiveInfographic
          infographicDefinitions={infographic_definitions}
          meta={meta}
        />

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized
          status={meta.status}
        />

        <h3>Additional Information About Medical Device Recall Enforcement Reports</h3>
        <p>Recalls are an appropriate alternative method for removing or correcting marketed consumer products, their labeling, and/or promotional literature that violate the laws administered by the Food and Drug Administration (FDA). Recalls afford equal consumer protection but generally are more efficient and timely than formal administrative or civil actions, especially when the product has been widely distributed.</p>
        <p>Manufacturers and/or distributors may initiate a recall at any time to fulfill their responsibility to protect the public health from products that present a risk of injury or gross deception, or are otherwise defective. Firms may also initiate a recall following notification of a problem by FDA or a state agency, in response to a formal request by FDA, or as ordered by FDA.</p>
        <p>The procedures followed to input recall information into RES when FDA learns of a recall event are outlined in Chapter 7 of FDA’s Regulatory Procedure Manual. The Regulatory Procedures Manual is a reference manual for FDA personnel. It provides FDA personnel with information on internal procedures to be used in processing domestic and import regulatory and enforcement matters.</p>
        <p>An enforcement report contains information on actions taken in connection with FDA regulatory activities. Whereas not all recalls are announced in the media or on <a href='http://www.fda.gov/Safety/recalls/default.htm'>FDA’s Recalls press release page</a>, all recalls monitored by FDA are included in <a href='http://www.fda.gov/Safety/Recalls/EnforcementReports/default.htm'>FDA’s weekly Enforcement Report</a> once they are classified according to the level of hazard involved.</p>
        <p>For more information about the Device Recall Enforcement Reporting, please visit:</p>
        <ul>
          <li><a href='https://www.fda.gov/ForConsumers/ConsumerUpdates/ucm049070.htm'>FDA 101: Product Recalls from First Alert to Effectiveness Checks</a></li>
          <li><a href='http://www.fda.gov/Safety/recalls/default.htm'>FDA’s Recalls press release page</a></li>
          <li><a href='https://www.fda.gov/Safety/Recalls/EnforcementReports/default.htm'>FDA’s weekly Enforcement Report</a></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to='/terms/'>Terms of Service</Link></p>

        <h3>Disclaimer</h3>
        <p>This data should not be used as a method to collect data to issue alerts to the public, nor should it be used to track the lifecycle of a recall. FDA seeks publicity about a recall only when it believes the public needs to be alerted to a serious hazard. FDA works with industry and our state partners to publish press releases and other public notices about recalls that may potentially present a significant or serious risk to the consumer or user of the product. Subscribe to this Recall/Safety Alert feed here.</p>
        <p>Further, FDA does not update the status of a recall after the recall has been classified according to its level of hazard. As such, the status of a recall (open, completed, or terminated) will remain unchanged after published in the Enforcement Reports.</p>
        <p>When necessary, the FDA will make corrections or changes to recall information previously disclosed in a past Enforcement Report for various reasons. For instance, the firm may discover that the initial recall should be expanded to include more batches or lots of the same recalled product than formerly reported.</p>
      </section>
    )
  }
}

export default IndexRoute
