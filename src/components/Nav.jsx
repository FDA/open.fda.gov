/* @flow */

import React from 'react'
import cx from 'classnames'
import ARIA from '../constants/aria'

import NavContainer from '../containers/NavContainer'
import Disclaimer from '../components/Disclaimer'

import Link from 'gatsby-link'

const linkCx: string = 'sub-menu-item no-underline'


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
  closeMobileNav: Function;
  toggleDropdownContent: Function;
  hideDropdownContent: Function;
  showDropdownContent: Function;
  handleOpenModal: Function;
  handleCloseModal: Function;
  activeDropdown: string;
  path: string;
  style: object;
  validated: boolean;
};


const Nav = (props: tPROPS) => {
  const {
    showMobileNav,
    showModal,
    toggleMobileNav,
    closeMobileNav,
    toggleDropdownContent,
    hideDropdownContent,
    showDropdownContent,
    handleOpenModal,
    handleCloseModal,
    activeDropdown,
    path,
    style,
    validated
  } = props

  const navCx = cx({
    'bg-white col d-5 flex-row': true,
    'tab-hide': !showMobileNav,
  })

  return (
    <nav className='bg-white clr-gray flex-box dir-column main-nav-bar' style={style}>
      <Disclaimer validated={validated} handleCloseModal={handleCloseModal} showModal={showModal} />
      <a
        href='#hero'
        className='visually-hidden'>
        Skip navigation, go to start of content
      </a>
      <div>
      <div className='container dir-column tab-pad-b-1 tab-pad-t-1 nav-bar'>
        <div className={showMobileNav ? 'dir-column relative': 'flex-row relative'}>
          <div className='container d-40 align-center logo-wrapper relative'>
            <Link
              className="nav-logos"
              to='/'>
              {/*<img
                alt='Go to FDA website'
                src='/img/FDA_logo_blue.png'
                className='fda-logo'
              />
              <div className="nav-bar-divider-line"/>*/}
              <img
                className='open-fda-logo'
                alt='Go to openFDA homepage'
                src='/img/l_openFDA.png'
              />
            </Link>
            <div
              className='absolute right d-hide'
              onClick={toggleMobileNav}
              style={{
                height: '25px',
                transform: 'rotate(0deg)',
                width: '36px',
              }}
            >
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
                  className={path === '/' ? 'menu-header header-selected emphasis': activeDropdown==='Home' ? 'menu-header emphasis': 'menu-header'}
                  onClick={closeMobileNav}
                >Home</Link>
                <div className={path === '/' ? 'menu-header-underbar': 'menu-header-underbar display-none'} style={{width: 'calc(100% - 1em)'}}/>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                  title='About'
                  className={path.indexOf('about') >= 0 ? 'menu-header header-selected emphasis': activeDropdown==='About' ? 'menu-header emphasis': 'menu-header'}
                  onTouchStart={toggleDropdownContent}
                >About <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none' : '')}/></span>
                <div className={path.indexOf('about') >= 0 ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown==='About' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/about/introduction/' onClick={closeMobileNav}>What is openFDA?</Link>
                    <Link className={linkCx} to='/about/updates/' onClick={closeMobileNav}>Updates</Link>
                    <Link className={linkCx} to='/about/status/' onClick={closeMobileNav}>API status</Link>
                    <Link className={linkCx} to='/about/statistics/' onClick={closeMobileNav}>API usage statistics</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                  title='APIs'
                  className={path.indexOf('apis') >= 0 ? 'menu-header header-selected emphasis': activeDropdown==='APIs' ? 'menu-header emphasis': 'menu-header'}
                  onTouchStart={toggleDropdownContent}
                >APIs<i className={"fa fa-angle-down " + (showMobileNav ? 'display-none' : '')}/></span>
                <div className={path.indexOf('apis') >= 0 ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown==='APIs' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/apis/' onClick={closeMobileNav}>API basics</Link>
                    <Link className={linkCx} to='/apis/drug/' onClick={closeMobileNav}>Drug Endpoints</Link>
                    <Link className={linkCx} to='/apis/device/' onClick={closeMobileNav}>Device Endpoints</Link>
                    <Link className={linkCx} to='/apis/food/' onClick={closeMobileNav}>Food Endpoints</Link>
                    <Link className={linkCx} to='/apis/other/' onClick={closeMobileNav}>Other Endpoints</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                  title='Tools'
                  className={path.indexOf('tools') >= 0 ? 'menu-header header-selected emphasis': activeDropdown==='Tools' ? 'menu-header emphasis': 'menu-header'}
                  onTouchStart={toggleDropdownContent}
                >Tools <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none' : '')}/></span>
                <div className={path.indexOf('tools') >= 0 ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown==='Tools' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <Link className={linkCx} to='/tools/' onClick={closeMobileNav}>Research tools</Link>
                    <Link className={linkCx} to='/tools/downloads/' onClick={closeMobileNav}>Downloads</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown' onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                <span
                  title='Community'
                  className={path.indexOf('community') >= 0 ? 'menu-header header-selected emphasis': activeDropdown==='Community' ? 'menu-header emphasis': 'menu-header'}
                  onTouchStart={toggleDropdownContent}
                >Community <i className={"fa fa-angle-down " + (showMobileNav ? 'display-none': '')}/></span>
                <div className={path.indexOf('community') >= 0 ? 'menu-header-underbar': 'menu-header-underbar display-none'}/>
                <div className={activeDropdown==='Community' ? 'dropdown-content display-block': 'dropdown-content display-none'}>
                  <div className='sub-menu-container' role='navigation'>
                    <a
                      className={`${linkCx}`}
                      href='https://github.com/FDA'
                      onClick={closeMobileNav}
                      rel='noopener noreferrer'
                      target='_blank'>
                      Source code (GitHub)
                    </a>
                    <a
                      className={`${linkCx}`}
                      href='https://opendata.stackexchange.com/questions/tagged/openfda'
                      onClick={closeMobileNav}
                      rel='noopener noreferrer'
                      target='_blank'>
                      Q&A (StackExchange)
                    </a>
                    <a
                      className={`${linkCx}`}
                      href='https://twitter.com/openFDA'
                      onClick={closeMobileNav}
                      rel='noopener noreferrer'
                      target='_blank'>
                      @openFDA (Twitter)
                    </a>
                    <Link className={linkCx} to='/community/' onClick={closeMobileNav}>openFDA Apps</Link>
                  </div>
                </div>
              </div>
              <div className='dropdown'>
                <button
                  title='Disclaimer'
                  onClick={handleOpenModal}
                  className={activeDropdown==='Home' ? 'menu-header emphasis': 'menu-header'}
                >Disclaimer</button>
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
