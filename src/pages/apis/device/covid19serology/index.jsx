import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import InteractiveInfographic from '../../../../components/InteractiveInfographic'
import FieldsHarmonization from '../../../../components/FieldsHarmonization'

import master_harmonization from '../../../../constants/fields/master_harmonization.yaml'
import infographic_definitions from './_infographic_definitions.json'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>COVID-19 Serological Testing Validation Overview</h2>
        <p>Serology tests detect the presence of antibodies in the blood when the body is responding to a specific infection, like COVID-19. In other words, the tests detect the body’s immune response to the infection caused by the virus rather than detecting the virus itself. In the early days of an infection when the body’s immune response is still building, antibodies may not be detected. This limits the test’s effectiveness for diagnosing COVID-19, and this is one reason serology tests should not be used as the sole basis to diagnose COVID-19. Serology tests could play a role in the fight against COVID-19 by helping healthcare professionals identify individuals have developed an immune response to SARS-CoV-2. In addition, these test results can aid in determining who may donate a part of their blood called convalescent plasma, which may serve as a possible treatment for those who are seriously ill from COVID-19. However, to use these test properly, it is important to understand their performance characteristics and limitations. Moreover, studies are underway to address questions that will better inform the appropriate use of these tests, such as whether the presence of antibodies conveys a level of immunity that would prevent or minimize the severity of re-infection as well as the duration for which immunity lasts.</p>
        <p>For additional information, please visit the FDA's <a href="https://www.fda.gov/medical-devices/emergency-situations-medical-devices/eua-authorized-serology-test-performance">EUA Authorized Serology Test Performance page</a>.</p>

        {/*<InteractiveInfographic*/}
          {/*infographicDefinitions={infographic_definitions}*/}
          {/*meta={meta}*/}
        {/*/>*/}

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.path.split("/")[3]}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>
      </section>
    )
  }
}

export default IndexRoute
