/* @flow */

import React from 'react'
import DocumentTitle from 'react-document-title'

import Nav from './Nav'
import BreadCrumbs from './BreadCrumbs'
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
  <DocumentTitle title={title}>
    <div>
      <div
        className='align-center bg-gray-lightest flex-box clr-black just-center smallest dir-row pad-1'
        style={{
          minHeight: '35px',
        }}>
        {
          // inner wrapper for centering on IE
          // floats also for ie, same with inline styles
        }
        <div
          className='txt-c center flex-box clearfix'
          style={{
            // ie stuff, mobile stuff
            fontSize: '13px',
            // ie needs more width than others
            maxWidth: '345px',
          }}>
          <img
            { ...ARIA.hide }
            alt='United States Flag'
            className='float-l'
            height='11px'
            src='/img/us_flag_small.png'
            style={{
              height: '11px',
              marginRight: '5px',
              marginTop: '3px',
            }}
            width='16px'
          />
          <span className='inline-block float-l'>
            An official website of the United States Government
          </span>
        </div>
      </div>
      <Nav
        meta={meta}
      />
      <BreadCrumbs />
      {children}
      <Footer />
    </div>
  </DocumentTitle>
)

Layout.displayName = 'components/Layout'
export default Layout
