import React from "react"
import KeyFacts from "../../../../components/RenderContentObject/KeyFacts";
import meta from "./_meta.yaml";

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Complete Response Letters</h2>
        <p>These records include Complete Response Letters (CRL) issued in response to new drug applications
        (NDAs) and biologics license applications (BLAs). This is the first ever centralized database of past CRLs.</p>
        <a href='https://download.open.fda.gov/ApprovedCRLs_NDA_BLA_2020-2024.zip'>Download Complete Response Letters in PDF format</a>
        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />
      </section>
    )
  }
}

export default IndexRoute

