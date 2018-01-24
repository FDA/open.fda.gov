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
        <h2>Device Pre-market Approval Overview</h2>
        <p><code>PMA</code> is any premarket approval application for a class III medical device, including all information submitted with or incorporated by reference. “PMA” includes a new drug application for a device under section 520(l) of the FD&C Act.</p>
        <p>The PMA dataset contains details about specific products and the sponsors of premarket approval applications and supplements. It also contains administrative and tracking information about the applications and receipt and decision dates. Premarket approval (PMA) is the FDA process of scientific and regulatory review to evaluate the safety and effectiveness of Class III medical devices. An approved PMA Application is, in effect, a private license granted to the applicant for marketing a particular medical device.</p>
        <p>Class III devices are those that support or sustain human life, are of substantial importance in preventing impairment of human health, or that present a potential, unreasonable risk of illness or injury. Due to the level of risk associated with Class III devices, FDA has determined that general and special controls alone are insufficient to assure the safety and effectiveness of class III devices.</p>
        <p>For additional information, please visit the <a href="https://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/PremarketSubmissions/PremarketApprovalPMA/default.htm">FDA's Premarket Approval (PMA) page</a>.</p>

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
      </section>
    )
  }
}

export default IndexRoute
