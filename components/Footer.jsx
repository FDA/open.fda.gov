/* @flow */

import React from 'react'

const links: Array<Object> = [
  {
    txt: 'FDA Home',
    url: 'http://www.fda.gov',
  },
  {
    txt: 'Accessibility',
    url: 'http://www.fda.gov/AboutFDA/AboutThisWebsite/Accessibility/default.htm',
  },
  {
    txt: 'Careers',
    url: 'http://www.fda.gov/AboutFDA/WorkingatFDA/default.htm',
  },
  {
    txt: 'FDA Basics',
    url: 'http://www.fda.gov/AboutFDA/Transparency/Basics/default.htm',
  },
  {
    txt: 'FOIA',
    url: 'http://www.fda.gov/RegulatoryInformation/FOI/default.htm',
  },
  {
    txt: 'No Fear Act',
    url: 'http://www.fda.gov/AboutFDA/WorkingatFDA/NoFearAct/default.htm',
  },
  {
    txt: 'Site Map',
    url: 'http://www.fda.gov/SiteMap/default.htm',
  },
  {
    txt: 'Transparency',
    url: 'http://www.fda.gov/AboutFDA/Transparency/default.htm',
  },
  {
    txt: 'Website',
    url: 'http://www.fda.gov/AboutFDA/AboutThisWebsite/WebsitePolicies/default.htm'
  },
  {
    txt: 'openFDA Terms of Service',
    url: 'https://open.fda.gov/terms',
  },
  {
    txt: 'Email the openFDA team',
    url: '/',
  },
]

const aCx: string = 'clr-white inline-block underline pad-r-2 m-marg-b-2 t-marg-b-1 smallest underline'

// PreFooter should remain stateless
// although, it technically isn't pure
// but links should never change once pulled in
const Footer = () => (
  <footer
    id='footer'
    className='bg-primary-darker relative row'>
    <div
      className='container flex-box no-wrap pad-t-3 pad-b-3'
      style={{
        minHeight: '400px',
      }}>
      <ul
        aria-label='FDA address and phone number'
        className='col marg-r-3 clr-white small'
        tabIndex={0}
        style={{
          maxWidth: '235px',
        }}>
        <li className='marg-b-2 t-marg-b-3'>
          <a href='https://www.fda.gov/'>
            <img
              alt='Go to FDA website'
              width='180px'
              src='/img/gov-fda-new-white.svg'
            />
          </a>
        </li>
        <li><strong>U.S. Food and Drug Administration</strong></li>
        <li>10903 New Hampshire Avenue</li>
        <li>Silver Spring, MD 20993</li>
        <li>1-888-INFO-FDA (1-888-463-6332)</li>
        <li className='m-marg-t-1 marg-t-2'>
          <a
            className={aCx}
            href='http://www.fda.gov/AboutFDA/ContactFDA/default.htm'>
            Contact FDA
          </a>
        </li>
      </ul>
      <nav
        className='col m-marg-t-2'
        aria-label='FDA links'>
        <ul className='flex-box flex-wrap dir-row'>
          {
            links.map((item: Object, i: number) => (
              <li
                key={i}
                className='col grow-none no-marg m-3'>
                <a
                  className={aCx}
                  rel='noopener noreferrer'
                  target='_blank'
                  href={item.url}>
                  {item.txt}
                </a>
              </li>
            ))
          }
        </ul>
        <p
          className='small clr-white'
          style={{
            marginTop: '26px'
          }}>
          Some links on this website may direct you to non-FDA locations. FDA does not endorse or guarantee the integrity of information on these external sites.
        </p>
      </nav>
    </div>
  </footer>
)

Footer.displayName = 'components/Footer'
export default Footer
