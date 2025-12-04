import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Drug Orange Book Overview</h2>
        <p>The publication Approved Drug Products with Therapeutic Equivalence Evaluations (commonly known as the Orange Book) identifies drug products approved on the basis of safety and effectiveness by the Food and Drug Administration (FDA) under the Federal Food, Drug, and Cosmetic Act (the Act) and related patent and exclusivity information.</p>
        <p>The main criterion for the inclusion of any product is that the product is the subject of an application with an approval that has not been withdrawn for safety or efficacy reasons.</p>
        <p>Inclusion of products in the Orange Book is independent of any current regulatory action through administrative or judicial means against a drug product.  In addition, the Orange Book contains therapeutic equivalence evaluations for approved multisource prescription drug products.</p>


        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          status={meta.status}
        />

        <h3>Additional Information About Orange book</h3>
        <p>To read more about Orange Book, please visit:</p>
        <ul>
          <li><a href='https://www.fda.gov/Drugs/DevelopmentApprovalProcess/ucm079068.htm'>Orange Book Preface</a></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the Application Programming Interface in line with our <Link to="/terms/">Terms of Service</Link></p>
      </section>
    )
  }
}

export default IndexRoute
