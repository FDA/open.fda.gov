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
        <h2>Animal & Veterinary Adverse Events Overview</h2>
        <p>The FDA encourages veterinarians and animal owners to report adverse drug experiences and product defects associated with animal drugs or animal devices. Adverse drug experiences can include side effects or other problems, such as the drug not appearing effective. The FDA recommends that an animal drug adverse event reporter include details on the following: names and amounts of all drugs, products marketed as supplements, or vitamins the animal has been given; current type and/or brand of pet food and treats; information about any recent surgeries; and as much medical information as possible. Medical information may include: veterinary examination findings; bloodwork, urinalysis, and fecal exam results; x-ray findings; other relevant information such as blood pressure; and neurologic test results. However, the details and information submitted in any report may vary and in some cases certain information may not be included in a given report.</p>
        <p>To read more about animal & veterinary adverse events and adverse event reporting, see <a href="http://www.fda.gov/AnimalVeterinary/SafetyHealth/default.htm">Animal & Veterinary Safety & Health</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link>.</p>
      </section>
    )
  }
}

export default IndexRoute
