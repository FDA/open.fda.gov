/* @flow */

import React from 'react'
import cx from 'classnames'

import NavContainer from '../containers/NavContainer'
import Disclaimer from '../components/Disclaimer'

import Link from 'gatsby-link'

const linkCx: string = 'sub-menu-item no-underline'

const hhsCx = 'col pad-r-1 flex-box align-end dir-column m-marg-t-2 m-marg-l-2 hhs'
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
  showModal: boolean;
  toggleMobileNav: Function;
  toggleDropdownContent: Function;
  hideDropdownContent: Function;
  showDropdownContent: Function;
  handleOpenModal: Function;
  handleCloseModal: Function;
  activeDropdown: string;
  path: string;
  validated: boolean;
};


const Nav = (props: tPROPS) => {
  const {
    showMobileNav,
    showModal,
    toggleMobileNav,
    toggleDropdownContent,
    hideDropdownContent,
    showDropdownContent,
    handleOpenModal,
    handleCloseModal,
    activeDropdown,
    path,
    validated
  } = props

  const navCx = cx({
    'col d-5 flex-row': true,
    'tab-hide': !showMobileNav,
  })

  return (
    <nav className='bg-white clr-gray flex-box dir-column'>
      <Disclaimer validated={validated} handleCloseModal={handleCloseModal} showModal={showModal} />
      <a
        href='#hero'
        className='visually-hidden'>
        Skip navigation, go to start of content
      </a>
      <div className='bg-primary-darker m-ord-2 fda-bar'>
        <div className='container smallest clr-white pad-t-1 pad-b-1 flex-row dir-row align-center'>
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
              className='fda-logo'
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
            <strong className='row txt-r'>Food and Drug Administration</strong>
          </div>
        </div>
      </div>
      <div className='container dir-column m-ord-1 m-pad-b-1 m-pad-t-1 nav-bar'>
        <div className={showMobileNav ? 'dir-column relative': 'flex-row relative'}>
          <div
            className='container d-2 align-center logo-wrapper relative'
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
              className='absolute top right d-hide'
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
          <div className={navCx}>
            <div className='menu-container responsive-header' role='navigation'>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <Link
                  title='Home'
                  to='/'
                  className={showMobileNav ? 'display-none': activeDropdown=='Home' ? 'menu-header emphasis': path === '/' ? 'menu-header emphasis': 'menu-header'}
                >Home</Link>
                <div className={path === '/' ? 'menu-header-underbar': 'menu-header-underbar display-none'} style={{width: 'calc(100% - 2em)'}}/>
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
                    <Link className={linkCx} to='/about/status/'>API status</Link>
                    <Link className={linkCx} to='/about/statistics/'>API usage statistics</Link>
                    <Link className={linkCx} to='/about/downloads/'>Downloads</Link>
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
              <div className='dropdown'>
                <button
                  title='Disclaimer'
                  onClick={handleOpenModal}
                  className={showMobileNav ? 'display-none': activeDropdown=='Home' ? 'menu-header emphasis': 'menu-header'}
                >Disclaimer</button>
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
