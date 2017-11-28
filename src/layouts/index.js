import React from "react"
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
          <div className="body-container">
            {this.props.children()}
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    )
  }
}

Layout.displayName = 'Layout'
export default Layout