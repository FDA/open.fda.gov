import React from "react"
import Link from "gatsby-link"
import DocumentTitle from 'react-document-title'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

DocumentTitle.displayName = 'Document Title'

class Layout extends React.Component {
  render() {
    return (
      <DocumentTitle title="openFDA" key="openFDA">
        <div>
          <Nav
            meta={this.props.meta}
          />
          {this.props.children()}
          <Footer />
        </div>
      </DocumentTitle>
    )
  }
}

Layout.displayName = 'Layout'
export default Layout