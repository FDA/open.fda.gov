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
        <h2>Tobacco Establishments Overview</h2>
          <p> The FDA Center for Tobacco Products (CTP) is responsible for carrying out the Family Smoking Prevention and Tobacco Control Act, which Congress passed in 2009. This law—commonly called the Tobacco Control Act—gives us broad authority to regulate the manufacturing, distribution, and marketing of tobacco products.</p>
          <h5>Vision Statement</h5>
          <p>To make tobacco-related death and disease part of America’s past, not America’s future and, by doing so, ensure a healthier life for every family.</p>

          <h5>Mission Statement</h5>
          <p>To protect Americans from tobacco-related death and disease by regulating the manufacture, distribution, and marketing of tobacco products and by educating the public, especially young people, about tobacco products and the dangers their use poses to themselves and others.
          For more information, see <a href="https://www.fda.gov/TobaccoProducts/AboutCTP/ucm383225.htm">here</a>.
          </p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>

        <h3>Disclaimer</h3>
        <p>Registration of an establishment, assignment of an FDA Establishment Identifier (FEI) number, or listing of a product does not constitute a jurisdictional determination, or an agency review or determination that the establishment or product is in compliance with FDA regulatory requirements.</p>
     </section>
    )
  }
}

export default IndexRoute
