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
        <p>The openFDA drug NDC Directory endpoint returns data from the <Link to="/data/ndc/">NDC Directory</Link>, a database that contains information on the National Drug Code (NDC). FDA publishes the listed NDC numbers and the information submitted as part of the listing information in the NDC Directory which is updated daily.</p>
        <p>The information submitted as part of the listing process, the NDC number, and the NDC Directory are used in the implementation and enforcement of the Act.</p>
        <p>If you experience any issues accessing the data or issues related to data accuracy, please report your concerns via the <a href="https://www.accessdata.fda.gov/scripts/email/cder/comment.cfm">CDER Contact form</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Additional Information About Drug NDC Directory</h3>
        <p>To read more about Drug NDC Directory, please visit:</p>
        <ul>
          <li><a href="https://www.fda.gov/Drugs/InformationOnDrugs/ucm142438.htm">NDC Directory data definitions and download page</a></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the Application Programming Interface in line with our <Link to="/terms/">Terms of Service</Link></p>

        <h3>Disclaimer</h3>
        <p>Please be aware of the following when using information from this endpoint:</p>
        <p>The NDC Directory contains ONLY information on final marketed drugs submitted to FDA in SPL electronic listing files by labelers. (A labeler may be either a manufacturer, including a repackager or relabeler, or, for drugs subject to private labeling arrangements, the entity under whose own label or trade name the product will be distributed.) Inclusion of information in the NDC Directory does not indicate that FDA has verified the information provided. The content of each NDC Directory entry is the responsibility of the labeler submitting the SPL file.</p>
        <p>Assignment of an NDC number does not in any way denote FDA approval of the product. Any representation that creates an impression of official approval because of possession of an NDC number is misleading and constitutes misbranding. (21 CFR 207.37 (a)(2))</p>
        <p>Neither inclusion in the NDC Directory nor assignment of an NDC number is a determination that a product is a drug as defined by the FD&C Act, nor does either denote that a product is covered or eligible for reimbursement by Medicare, Medicaid or other payers. Assignment of NDC number to non-drug products is extremely prohibited.</p>
      </section>
    )
  }
}

export default IndexRoute
