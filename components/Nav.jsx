/* @flow */

import React from 'react'
import cx from 'classnames'

import NavContainer from '../containers/NavContainer'

const Link: ReactClass = require('react-router').Link

const linkCx: string = 'sub-menu-item no-underline'

const hhsCx = 'col self-end pad-r-1 flex-box align-end dir-column m-marg-t-2 m-marg-l-2 hhs'
const hhsACx = 'clr-white relative hhs'

const hamStyl: Object = Object.freeze({
  borderRadius: '5px',
  height: '3px',
  marginTop: '-1px',
  transformOrigin: 'center center 0',
  transition: '0.3s ease',
})

type tPROPS = {
  showMobileNav: boolean;
  toggleMobileNav: Function;
  toggleDropdownContent: Function;
  hideDropdownContent: Function;
  showDropdownContent: Function;
  activeDropdown: string;
  path: string;
};


const Nav = (props: tPROPS) => {
  const {
    showMobileNav,
    toggleMobileNav,
    hideDropdownContent,
    showDropdownContent,
    toggleDropdownContent,
    activeDropdown,
    path
  } = props

  const navCx = cx({
    'col t-4 d-5 flex-row': true,
    'm-hide': !showMobileNav,
  })

  return (
    <nav className='bg-white clr-gray flex-box dir-column'>
      <a
        href='#hero'
        className='visually-hidden'>
        Skip navigation, go to start of content
      </a>
      <div className='bg-primary-darker m-ord-2'>
        <div className='container smallest clr-white pad-t-2 pad-b-2 flex-row dir-row'>
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
              width='320px'
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
            <strong className='row'>Food and Drug Administration</strong>
          </div>
        </div>
      </div>
      <div className='pad-t-2 bg-secondary-darkest m-ord-3'>
        <p className='clr-white weight-600 container smallest'>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products.  We may limit or otherwise restrict your access to the API in line with our <Link className='clr-white underline' to='/terms/'> Terms of Service</Link></p>
      </div>
      <div className='container dir-column m-ord-1 m-pad-b-1 m-pad-t-1' style={{width: '100%'}}>
        <div className='flex-row relative'>
          <div
            className='container t-2 logo-wrapper relative'
            style={{
              display: 'flex',
              minHeight: '35px',
              marginLeft: '0'
            }}>
            <Link
              className='open-fda-logo'
              to='/'>
              <img
                alt='Go to openFDA homepage'
                height='34px'
                width='189px'
                src='/img/l_openFDA.png'
              />
            </Link>
            <div
              className='absolute top right t-hide'
              onClick={toggleMobileNav}
              style={{
                height: '25px',
                marginTop: '5px',
                transform: 'rotate(0deg)',
                width: '36px',
              }}>
                <span
                  className='absolute bg-primary block row'
                  style={{
                    ...hamStyl,
                    transform: showMobileNav ?
                      'translate3d(0, 10px, 0) rotate(45deg)' :
                      'translate3d(0, 0, 0) rotate(0deg)',
                  }}
                />
                <span
                  className='absolute bg-primary block row'
                  style={{
                    ...hamStyl,
                    transform: 'translate3d(0, 10px, 0)',
                    opacity: showMobileNav ? 0 : 1,
                  }}
                />
                <span
                  className='absolute bg-primary block row'
                  style={{
                    ...hamStyl,
                    transform: showMobileNav ?
                      'translate3d(0, 10px, 0) rotate(-45deg)' :
                      'translate3d(0, 20px, 0) rotate(0deg)',
                  }}
                />
            </div>
          </div>
          <div
            className={navCx}
            style={{
              maxWidth: '845px',
            }}>
            <div className='menu-container' role='navigation'>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <Link
                  title='Home'
                  to='/'
                  className={showMobileNav ? 'display-none': activeDropdown=='Home' ? 'menu-header emphasis': path === '/' ? 'menu-header emphasis': 'menu-header'}
                >Home</Link>
                <div className={path === '/' ? 'menu-header-underbar': 'menu-header-underbar display-none'} style={{width: 'calc(100% - 1em)'}}/>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                  title='About'
                  className={activeDropdown=='About' ? 'menu-header emphasis': path.includes('about') ? 'menu-header emphasis': 'menu-header'}
                  onTouchStart={toggleDropdownContent}
                >About <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none' : '')}/></span>
                <div className={path.includes('about') ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown=='About' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/about/introduction/'>What is openFDA?</Link>
                    <Link className={linkCx} to='/about/updates/'>Updates</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                title='Getting Started'
                className={activeDropdown=='Getting Started' ? 'menu-header emphasis': path.includes('getting_started') ? 'menu-header emphasis': 'menu-header'}
                onTouchStart={toggleDropdownContent}
                >Getting Started <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none' : '')}/></span>
                <div className={path.includes('getting_started') ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown=='Getting Started' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/getting_started/api_basics/'>API basics</Link>
                    <Link className={linkCx} to='/getting_started/api_basics/reference/'>API reference</Link>
                    <Link className={linkCx} to='/getting_started/research/'>Research tools</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                  title='Explore the Data'
                  className={activeDropdown=='Explore the Data' ? 'menu-header emphasis': path.includes('explore') ? 'menu-header emphasis': 'menu-header'}
                  onTouchStart={toggleDropdownContent}
                >Explore the Data <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none' : '')}/></span>
                <div className={path.includes('explore') ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown=='Explore the Data' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/explore/status/'>API status</Link>
                    <Link className={linkCx} to='/explore/statistics/'>API usage statistics</Link>
                    <Link className={linkCx} to='/explore/downloads/'>Downloads</Link>
                    <Link className={linkCx} to='/explore/data/'>Data Reference</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                title='API Endpoints'
                className={activeDropdown=='API Endpoints' ? 'menu-header emphasis': path.includes('api_endpoints') ? 'menu-header emphasis': 'menu-header'}
                onTouchStart={toggleDropdownContent}
                >API Endpoints <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none': '')}/></span>
                <div className={path.includes('api_endpoints') ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown=='API Endpoints' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/api_endpoints/drug/'>Drugs</Link>
                    <Link className={linkCx} to='/api_endpoints/device/'>Devices</Link>
                    <Link className={linkCx} to='/api_endpoints/food/'>Foods</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                title='Community'
                className={activeDropdown=='Community' ? 'menu-header emphasis': path.includes('community') ? 'menu-header emphasis': 'menu-header'}
                onTouchStart={toggleDropdownContent}
                >Community <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none': '')}/></span>
                <div className={path.includes('community') ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown=='Community' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <a
                      className={`${linkCx} link-external`}
                      href='https://github.com/FDA'
                      rel='noopener noreferrer'
                      target='_blank'>
                      Source code (GitHub)
                    </a>
                    <a
                      className={`${linkCx} link-external`}
                      href='https://opendata.stackexchange.com/questions/tagged/openfda'
                      rel='noopener noreferrer'
                      target='_blank'>
                      Q&A (StackExchange)
                    </a>
                    <a
                      className={`${linkCx} link-external`}
                      href='https://twitter.com/openFDA'
                      rel='noopener noreferrer'
                      target='_blank'>
                      @openFDA (Twitter)
                    </a>
                    <Link
                      className={linkCx}
                      to='/community/'>openFDA Apps</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

Nav.displayName = 'components/Nav'
export default NavContainer(Nav)
