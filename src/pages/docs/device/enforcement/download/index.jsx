import React from "react"
import Link from "gatsby-link"

import Downloads from '../../../../../components/Downloads'

import meta from '../_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Download the dataset</h2>
        <p>Use the links below to download the dataset manually, or review the <Link to="/docs/downloads/">Downloads</Link> documentation for more information about other download methods.</p>
        <Downloads
          meta={meta}
        />
      </section>
    )
  }
}

export default IndexRoute
