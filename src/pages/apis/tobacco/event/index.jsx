import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Tobacco Adverse Events Overview</h2>
          <p> The U.S. Food and Drug Administration (FDA) regulates all tobacco products in the United States.</p>
          <p>  <a href="https://www.safetyreporting.hhs.gov/srp2/CTP/TobaccoProductsParts.html">Tobacco products</a> are made or derived from tobacco and include any associated parts that are necessary
            for their use. For example, both a pipe device and the pipe tobacco are regulated by the FDA.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />


        <h3>What tobacco product problem reports have been submitted to FDA?</h3>
        <p>Consumers, manufacturers, and health professionals submit reports about tobacco products that are damaged, defective, contaminated, smell or taste wrong, or cause undesirable health effects.</p>

        <h3>Why is FDA posting this information?</h3>
        <p>FDA is making reports about tobacco product problems available, so the public can more easily access this information. The reports allow interested parties to learn more about commonly reported potential tobacco product problems. Previously, tobacco-associated health and product problems reported to FDA were available to the public only upon request under the Freedom of Information Act (FOIA) or after FDA posted frequently requested reports in the FDA <a href="https://www.fda.gov/tobacco-products/about-center-tobacco-products-ctp/ctp-foia-electronic-reading-room">Center for Tobacco Products (CTP) FOIA Electronic Reading Room</a> or the <a href="https://www.fda.gov/tobacco-products/tobacco-science-research/tobacco-product-problem-reports#ends-reports">Tobacco Product Problem Reports</a> page.</p>

        <h3>What should I know about the information posted here?</h3>
        <ul>
            <li><strong>Report identification (ID) numbers are not sequential.</strong> Report numbers are randomly generated.</li>
            <li><strong>The information in summary reports comes directly from the submitted reports.</strong> The posted information is directly from the submitted reports, without editing, and not reflecting analysis by FDA.</li>
            <li><strong>Submitted information may be inaccurate or incomplete.</strong> Reports to FDA may include inaccurate or incomplete information. For example, reports may not include information about whether the product was used correctly, or whether an individual also suffered from other medical conditions or used other tobacco products or medications at the same time.</li>
            <li><strong>FDA has not determined causality.</strong> The inclusion of a report in this collection does not represent any conclusion by the Food and Drug Administration (FDA) about whether the product caused the adverse experience or simply coincided with it.</li>
            <li><strong>Reporting tobacco adverse experiences is voluntary.</strong> Information posted on this web page is from voluntarily submitted reports.</li>
            <li><strong>This adverse experience information cannot be used to estimate risk or incidence rates, or to compare products.</strong> Reporting rates have many influences and vary over time. The volume of use or exposure to specific tobacco products is generally not well characterized. Therefore, the accumulated reports cannot be used to calculate incidence (occurrence rates), to estimate risk, or to compare products.</li>
            <li><strong>Report content may change over time.</strong> Individuals reporting a problem with a tobacco product may correct or update their reports at a later date. Therefore, the content of reports may change after posting. FDA only posts information from initial reports.</li>
        </ul>

        <h3>How do I request a copy of a submitted report?</h3>
        <p>If you submitted the report, you may view your submission by following the instructions found in the Frequently Asked Questions about the Safety Reporting Portal, see <a href="https://www.fda.gov/regulatory-information/freedom-information/how-make-foia-request">How do I view a submitted report?</a>.</p>
        <p>You can <a href="https://www.fda.gov/regulatory-information/freedom-information/how-make-foia-request">request a copy of reports</a> filed submitted by others under the <a href="https://www.fda.gov/regulatory-information/freedom-information">Freedom of Information Act.</a> Per the provisions of the FOIA and the Privacy Act, access to personally identifiable information cannot be given to unauthorized third parties without the individuals' written consent and will not be included in the responses to these requests.</p>

        <h3>How do I report a problem with a tobacco product?</h3>
        <p>Anyone can <a href="https://www.fda.gov/tobacco-products/tobacco-science-research/safety-reporting-portal-tobacco-products">report a problem with a tobacco product,</a> including damaged, defective, or contaminated tobacco products, or tobacco products that may have caused health or safety problems.</p>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link>.</p>
      </section>
    )
  }
}

export default IndexRoute
