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
        <h2>Device 510(k) Overview</h2>
        <p>A 510(k) is a premarket submission made to FDA to demonstrate that the device to be marketed is at least as safe and effective, that is, substantially equivalent, to a legally marketed device (21 CFR 807.92(a)(3)) that is not subject to PMA. Submitters must compare their device to one or more similar legally marketed devices and make and support their substantial equivalency claims. A legally marketed device, as described in 21 CFR 807.92(a)(3), is a device that was legally marketed prior to May 28, 1976 (preamendments device), for which a PMA is not required, or a device which has been reclassified from Class III to Class II or I, or a device which has been found substantially equivalent through the 510(k) process. The legally marketed device(s) to which equivalence is drawn is commonly known as the “predicate".</p>
        <p>The **openFDA Device 510(k) Clearances API** contains details about specific products and the original sponsors of premarket notification applications. It also contains administrative and tracking information about the applications and receipt and decision dates.</p>
        <p>For additional information, please visit the FDA's <a href="https://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/PremarketSubmissions/PremarketNotification510k/default.htm">Premarket Notification 510(k) page</a>.</p>

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
