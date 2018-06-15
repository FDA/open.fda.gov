import React from "react"
import DocumentTitle from 'react-document-title'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DocSidebar from "../components/DocSidebar"
import docsSidebar from "../pages/docs/doc-links.yaml"

import { Sticky, StickyContainer } from "react-sticky"

DocumentTitle.displayName = 'Document Title'

const hhsCx = 'pad-r-1 flex-box dir-column m-marg-t-2 m-marg-l-2 hhs'
const hhsACx = 'clr-white relative hhs'

class Layout extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
      sidebarFixed: false
    }

    this.toggleSidebarFixed = this.toggleSidebarFixed.bind(this)
  }

  toggleSidebarFixed(fixed) {
    this.setState({
      sidebarFixed: fixed
    })
  }

  render() {

    const hasSidebar = this.props.location.pathname.slice(0, 6) === `/docs/`

    return (
      <DocumentTitle title='openFDA' key='openFDA'>
        <div>
          <div className='menu-shadow bg-primary-darker pad-t-1 pad-b-1'>
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
        <StickyContainer>
          <Sticky>
            {({style}) => <Nav meta={this.props.meta} style={style} />}
            {/*{({ style }) => <h1 style={style}>Sticky element</h1>}*/}
          </Sticky>
          {
            hasSidebar &&
            <div className='body-container'>
              <Sticky>
                {({ style, isSticky }) =>
                  <DocSidebar
                    inline
                    isSticky={isSticky}
                    style={style}
                    toggleFixed={this.toggleSidebarFixed}
                    yaml={docsSidebar}
                  />}
              </Sticky>
              <div className={'doc-container ' + (this.state.sidebarFixed ? 'fixed-padding' : '')}>
                {this.props.children()}
              </div>
            </div>
          }
          {
            !hasSidebar &&
              <div className=''>
                {this.props.children()}
              </div>
          }
          {
            !hasSidebar &&
              <Footer/>
          }
        </StickyContainer>
        </div>
      </DocumentTitle>
    )
  }
}

Layout.displayName = 'Layout'
export default Layout