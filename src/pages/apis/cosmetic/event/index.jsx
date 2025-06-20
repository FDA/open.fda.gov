import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Cosmetic Adverse Events Overview</h2>
        <p>
          A responsible person is required to report serious adverse events associated with the use of cosmetic products
          in the United States to FDA within 15 business days. The responsible person must include a copy of the label
          on or within the retail packaging of such cosmetic product. If the responsible person receives medical or
          other information about the adverse event within 1 year of the initial report to FDA, they must submit this
          new information to FDA within 15 business days.
        </p>
        <p>
          A responsible person means the manufacturer, packer, or distributor of a cosmetic product whose name appears
          on the label of such cosmetic product in accordance with section 609(a) of the FD&C Act or section 4(a) of the
          Fair Packaging and Labeling Act.
        </p>
        <p>
          A serious adverse event is an adverse event that:
        </p>

        <ul>
          <li>(A) results in:</li>
          <ul>
            <li>death</li>
            <li>a life-threatening experience</li>
            <li>inpatient hospitalization</li>
            <li>a persistent or significant disability or incapacity</li>
            <li>a congenital anomaly or birth defect</li>
            <li>an infection</li>
            <li>significant disfigurement (including serious and persistent rashes, second- or third-degree burns, significant hair loss, or persistent or significant alteration of appearance), other than as intended under conditions of use that are customary or usual</li>
          </ul>
          <li>(B) requires, based on reasonable medical judgment, a medical or surgical intervention to prevent an outcome described in (A) above.</li>
        </ul>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />

        <h3>Responsible use of the data</h3>
        <p>
          Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about
          the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API
          in line with our <Link to='/terms/'>Terms of Service</Link>.
        </p>
      </section>
    )
  }
}

export default IndexRoute
