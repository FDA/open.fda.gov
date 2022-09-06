import React from 'react'
import DocumentTitle from 'react-document-title'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DocSidebar from '../components/DocSidebar'
import docsSidebar from '../pages/docs/doc-links.yaml'

DocumentTitle.displayName = 'Document Title'

class Layout extends React.Component {
  render() {

    const scrollClass = {
      down: 'sticky-scroll-down',
      up: 'sticky-scroll-up'
    }

    const hasSidebar = this.props.location.pathname.slice(0, 6) === `/apis/`
    const isDataexplorer = this.props.location.pathname.slice(6, 20) === '/dataexplorer/'

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
                {/*<img
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
            </span>*/}
              </div>
            </div>
          </div>
          <Sticky scrollClass={scrollClass}>
            <div className='sticky' id='nav'><Nav meta={this.props.meta}/></div>
          </Sticky>
          {
            hasSidebar &&
              <div className='body-container body-doc-container' id='body-doc-container'>
                <StickySidebar enter='58' sidebarFixed={this.state.sidebarFixed} toggleFixed={this.toggleSidebarFixed}>
                  <DocSidebar
                    inline
                    yaml={docsSidebar}
                  />
                </StickySidebar>
                <div className={'doc-container ' + (this.state.sidebarFixed ? 'fixed-padding' : '')} id='doc-container'>
                  {this.props.children()}
                </div>
              </div>
          }
          {
            !hasSidebar &&
              <div className='body-container'>
                {this.props.children()}
              </div>
          }
          {
            !hasSidebar && !isDataexplorer &&
              <Footer/>
          }
        </div>
      </DocumentTitle>
    )
  }
}

Layout.displayName = 'Layout'
export default Layout
