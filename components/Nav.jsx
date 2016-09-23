/* @flow */

import React from 'react'
import cx from 'classnames'

import NavContainer from '../containers/NavContainer'

import ARIA from '../constants/aria'

const Link: ReactClass = require('react-router').Link

const ulCx: string = 'col t-range-2 m-pad-t-2 t-range-pad-t-2 small nav-ul flex-wrap dir-row'
const catCx: string = 'd-pad-t-3 t-pad-b-1 nav-li grow-none row no-b'
const liCx: string = 'nav-li m-3'
const linkCx: string = 'clr-primary-darker block pad-t-1 pad-b-1 no-underline'

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
};

const Nav = (props: tPROPS) => {
  const {
    showMobileNav,
    toggleMobileNav,
  } = props

  const navCx = cx({
    'col t-4 d-5 flex-row': true,
    'm-hide': !showMobileNav,
  })

  // we include a disclaimer to cover our asses
  // CAERS is new, and we have a different disclaimer for it
  const doesItCAER: boolean = props.meta &&
    props.meta.datasets &&
    props.meta.datasets.indexOf('CAERS') !== -1

  return (
    <nav className='bg-white clr-gray t-pad-b-2 flex-box dir-column'>
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
              height='25px'
              width='62px'
              src='/img/l_FDA_white.png'
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
      <div className='pad-t-2 bg-secondary-darkest t-marg-b-2 m-ord-3'>
        <p className='clr-white weight-600 container smallest'>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products.  We may limit or otherwise restrict your access to the API in line with our <Link className='clr-white underline' to='/terms/'> Terms of Service</Link></p>
        {
          doesItCAER &&
          <p className='clr-white weight-600 container smallest'>
            Submission of an adverse event report does not constitute an admission that a product caused or contributed to an event. The information in these reports has not been scientifically or otherwise verified as to a cause and effect relationship and cannot be used to estimate incidence (occurrence rate) or to estimate risk.
          </p>
        }
      </div>
      <div className='container m-pad-b-2 dir-column m-ord-1 m-pad-t-2'>
        <div className='flex-row relative'>
          <div
            className='col t-2 marg-t-2 logo-wrapper'
            style={{
              minHeight: '35px',
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
          </div>
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
          <div
            className={navCx}
            style={{
              maxWidth: '735px',
            }}>
            <ul
              className={`${ulCx} t-range-hide`}
              role='navigation'>
              <li
                { ...ARIA.hide }
                className={catCx}>
                openFDA
              </li>
              <li className={liCx}>
                <Link
                  aria-label='About Open FDA'
                  className={linkCx}
                  to='/about/'>
                  About
                </Link>
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/updates/'>
                  Updates
                </Link>
              </li>
              <li className={liCx}>
                <Link
                    className={linkCx}
                    to='/api/status/'>
                  API status
                </Link>
              </li>
              <li className={liCx}>
                <Link
                    className={linkCx}
                    to='/api/statistics/'>
                  API Usage Statistics
                </Link>
              </li>

            </ul>
            <ul
              className={ulCx}
              role='navigation'>
              <li
                { ...ARIA.hide }
                className={catCx}>
                Learn
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/api/'>
                  API basics
                </Link>
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/api/reference/'>
                  API reference
                </Link>
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/analytics/'>
                  Analytics & research
                </Link>
              </li>
            </ul>
            <ul
              className={ulCx}
              role='navigation'>
              <li
                { ...ARIA.hide }
                className={catCx}>
                API endpoints
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/drug/'>
                  Drugs
                </Link>
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/device/'>
                  Devices
                </Link>
              </li>
              <li className={liCx}>
                <Link
                  className={linkCx}
                  to='/food/'>
                  Foods
                </Link>
              </li>
            </ul>
            <ul
              className={ulCx}
              role='navigation'>
              <li
                { ...ARIA.hide }
                className={catCx}>
                Community
              </li>
              <li className={`${liCx} m-6`}>
                <a
                  className={`${linkCx} link-external`}
                  href='https://github.com/FDA'
                  rel='noopener noreferrer'
                  target='_blank'>
                  Source code (GitHub)
                </a>
              </li>
              <li className={`${liCx} m-6`}>
                <a
                  className={`${linkCx} link-external`}
                  href='https://opendata.stackexchange.com/questions/tagged/openfda'
                  rel='noopener noreferrer'
                  target='_blank'>
                  Q&A (StackExchange)
                </a>
              </li>
              <li className={`${liCx} m-6`}>
                <a
                  className={`${linkCx} link-external`}
                  href='https://twitter.com/openFDA'
                  rel='noopener noreferrer'
                  target='_blank'>
                  @openFDA (Twitter)
                </a>
              </li>
              <li className={`${liCx} m-6`}>
                <Link
                    className={linkCx}
                    to='/community/'>openFDA Apps</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

Nav.displayName = 'components/Nav'
export default NavContainer(Nav)
