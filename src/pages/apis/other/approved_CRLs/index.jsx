import React from "react"

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Complete Response Letters</h2>
        <p>These records include Complete Response Letters (CRL) issued in response to approved new drug applications
        (NDAs) and biologics license applications (BLAs) between 2020 and 2024. This is the first ever centralized
        database of past CRLs.</p>
        <a href='https://download.open.fda.gov/ApprovedCRLs_NDA_BLA_2020-2024.zip'>Download Approved CRLs</a>
      </section>
    )
  }
}

export default IndexRoute

