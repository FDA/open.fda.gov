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
        <h2>Device Registrations & Listings Overview</h2>
        <p>The <strong>openFDA registration and listing API</strong> contains the location of medical device establishments and the devices manufactured at those establishments. Owners or operators of places of business (also called establishments or facilities) that are involved in the production and distribution of medical devices intended for use in the United States are required to register annually with the FDA. This process is known as establishment registration. Most foreign and domestic establishments that are required to register with the FDA are also required to list the devices that are made there for commercial distribution.</p>
        <p>For additional information, please visit the <a href="http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/RegistrationandListing/default.htm">FDA's Device Registrations and Listings page.</a></p>

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
