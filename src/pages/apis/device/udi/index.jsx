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
        <h2>Unique Device Identifier Overview</h2>
        <p>The openFDA unique device identifier API returns data from the Global Unique Device Identification Database (GUDID), which contains information submitted to the FDA about medical devices that have Unique Device Identifiers (UDI).</p>
        <p>UDIs are unique numeric or alphanumeric codes that consist of two parts—a device identifier (DI) and a production identifier (PI). UDIs are intended to increase electronic tracking abilities for devices involved in adverse events. Submission to the GUDID database is required for manufacturers of medical devices. The FDA is establishing the unique device identification system to adequately identify devices sold in the U.S.- from manufacturing through distribution to patient use.</p>
        <p>To learn more about UDIs, see the <a href="https://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/UniqueDeviceIdentification/default.htm">FDA's General information about UDI page</a>.</p>

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
