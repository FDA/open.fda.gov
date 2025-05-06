import React from "react"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>UNII Overview</h2>
        <p>For more information about UNII, please see the following section of the FDA Standards Advisory Board website: <a href='https://www.fda.gov/industry/fda-data-standards-advisory-board/fdas-global-substance-registration-system'>FDA Global Substance Registration System</a>.</p>

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


