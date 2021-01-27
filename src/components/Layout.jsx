import React, {useState} from 'react'
import DocumentTitle from 'react-document-title'

import Nav from './Nav'
import Footer from './Footer'
import DocSidebar from "./DocSidebar"
import docsSidebar from "../pages/apis/doc-links.yaml"
import Sticky from 'react-sticky-state'
import StickySidebar from './StickySidebar'
import { Location } from '@reach/router';

import '../css/app.scss'
import '../css/components/Nav.scss'

DocumentTitle.displayName = 'Document Title'

const hhsCx = 'pad-r-1 flex-box dir-column m-marg-t-2 m-marg-l-2 hhs'
const hhsACx = 'clr-white relative hhs'

const Layout = (props) => {

  const [sidebarFixed, setSidebarFixed] = useState(false);


  const toggleSidebarFixed = (fixed) => {
    setSidebarFixed(fixed)
  }

  const scrollClass = {
    down: 'sticky-scroll-down',
    up: 'sticky-scroll-up'
  }

  console.log(props)

  const hasSidebar = props.location.pathname.slice(0, 6) === `/apis/`
  return (
    <DocumentTitle title='openFDA' key='openFDA'>
      <div>
        <div className='header-main menu-shadow bg-primary-darker pad-t-1 pad-b-1'>
          <div className='container clr-white smallest blue-nav-bar'>
            <a
              href='https://www.fda.gov/'
              className='col self-start'
              rel='noopener noreferrer'
              target='_blank'
              style={{
                verticalAlign: 'text-top'
              }}>
              <img
                alt='Go to FDA website'
                width='180px'
                src='/img/gov-fda-new-white.svg'
              />
            </a>
            <div className={hhsCx}>
              <a
                href='http://www.hhs.gov/'
                className={hhsACx}
                rel='noopener noreferrer'
                target='_blank'>
                <img
                  className='absolute top'
                  style={{
                    left: '-21px',
                  }}
                  alt='Go to HHS website'
                  height='16px'
                  width='15px'
                  src='/img/l_HHS_white.png'
                />
                  U.S. Department of Health and Human Services
                </a>
              <strong>Food and Drug Administration</strong>
            </div>
            <div
              className='txt-c right flex-box clearfix'
              style={{
                // ie stuff, mobile stuff
                fontSize: '13px',
                // ie needs more width than others
                maxWidth: '345px',
              }}>
            </div>
          </div>
        </div>
        <Sticky scrollClass={scrollClass}>
          <div className='sticky' id='nav'><Nav meta={props.meta} /></div>
        </Sticky>
        {
          hasSidebar &&
          <div className='body-container body-doc-container' id='body-doc-container'>
            <StickySidebar enter='58' sidebarFixed={sidebarFixed} toggleFixed={toggleSidebarFixed}>
              <DocSidebar
                inline
                yaml={docsSidebar}
              />
            </StickySidebar>
            <div className={'doc-container ' + (sidebarFixed ? 'fixed-padding' : '')} id='doc-container'>
              {props.children}
            </div>
          </div>
        }
        {
          !hasSidebar &&
          <div className='body-container'>
            {props.children}
          </div>
        }
        {
          !hasSidebar &&
          <Footer />
        }
      </div>
    </DocumentTitle>
  )
}

Layout.displayName = 'Layout'

export default props => (
  <Location>
    {locationProps => <Layout {...locationProps} {...props} />}
  </Location>
);