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
        <h2>Drug NDC Overview</h2>
        <p>The Drug Listing Act of 1972 requires registered drug establishments to provide the Food and Drug Administration (FDA) with a current list of all drugs manufactured, prepared, propagated, compounded, or processed by it for commercial distribution.</p>
        <p>The openFDA drug NDC reports API returns data from the <Link to="/data/ndc/">NDC Directory</Link>, a database that contains information on the National Drug Code (NDC). FDA publishes the listed NDC numbers and the information submitted as part of the listing information in the NDC Directory which is updated daily.</p>
        <p>The information submitted as part of the listing process, the NDC number, and the NDC Directory are used in the implementation and enforcement of the Act.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Additional Information About Drug Recall Enforcement Reports</h3>
        <p>To read more about Drug Recall Enforcement Reporting, please visit:</p>
        <ul>
          <li><a href="https://www.fda.gov/Drugs/InformationOnDrugs/ucm142438.htm">NDC Directory data definitions and download page</a></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>

        <h3>Disclaimer</h3>
        <p>This data should not be used as a method to collect data to issue alerts to the public, nor should it be used to track the lifecycle of a recall. FDA seeks publicity about a recall only when it believes the public needs to be alerted to a serious hazard. FDA works with industry and our state partners to publish press releases and other public notices about recalls that may potentially present a significant or serious risk to the consumer or user of the product. <a href="http://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/Recalls/rss.xml">Subscribe to this Recall/Safety Alert feed here</a></p>
        <p>Further, FDA does not update the status of a recall after the recall has been classified according to its level of hazard. As such, the status of a recall (open, completed, or terminated) will remain unchanged after published in the Enforcement Reports.</p>
      </section>
    )
  }
}

export default IndexRoute
