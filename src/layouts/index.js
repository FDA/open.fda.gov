import React from "react"
import DocumentTitle from 'react-document-title'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DocSidebar from "../components/DocSidebar"
import docsSidebar from "../pages/docs/doc-links.yaml"

DocumentTitle.displayName = 'Document Title'

class Layout extends React.Component {
  render() {

    const hasSidebar = this.props.location.pathname.slice(0, 6) === `/docs/`

    return (
      <DocumentTitle title="openFDA" key="openFDA">
        <div>
          <Nav
            meta={this.props.meta}
          />
          {
            hasSidebar &&
            <div className="body-container">
              <DocSidebar inline yaml={docsSidebar} />
              <div className="doc-container">
                  {this.props.children()}
              </div>
            </div>
          }
          {
            !hasSidebar &&
              <div className="body-container">
                {this.props.children()}
              </div>
          }
          {
            !hasSidebar &&
              <Footer/>
          }
        </div>
      </DocumentTitle>
    )
  }
}

Layout.displayName = 'Layout'
export default Layout