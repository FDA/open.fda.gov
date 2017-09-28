/* @flow */

import React from 'react'
import DocumentTitle from 'react-document-title'

import Nav from './Nav'
import Footer from './Footer'
import ARIA from '../constants/aria'

type PROPS = {
  children: Array<React.Element>;
  meta: Object;
  title: string;
};

DocumentTitle.displayName = 'Document Title'

// got really tired of importing DocumentTitle
// and Nav and Footer, etc into every file
const Layout = ({ children, meta, title, }: PROPS) => (
  <DocumentTitle title={title} key={title}>
    <div>
      <Nav
        meta={meta}
      />
      {children}
      <Footer />
    </div>
  </DocumentTitle>
)

Layout.displayName = 'components/Layout'
export default Layout
