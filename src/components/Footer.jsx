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
    url: '/terms',
  },
  {
    txt: 'License',
    url: 'https://open.fda.gov/license'
  },
  {
    txt: 'Email the openFDA team',
    url: 'mailto:open@fda.hhs.gov',
  },
]

const aCx: string = 'clr-white inline-block small'
const hhsCx = 'col pad-r-1 flex-box align-end dir-column m-marg-t-2 m-marg-l-2 hhs'
const hhsACx = 'clr-white relative hhs'

// PreFooter should remain stateless
// although, it technically isn't pure
// but links should never change once pulled in
const Footer = () => (
  <footer
    id='footer'
    className='bg-primary-darker relative row'>
    <div className='container flex-box just-between no-wrap pad-t-3 pad-b-3 footer-container'>
      <ul
        aria-label='FDA address and phone number'
        className='col d-2 clr-white small footer-left'
        tabIndex={0}>
        <li className='marg-b-1'>
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
        <li>
          <a
            className={aCx}
            href='http://www.fda.gov/AboutFDA/ContactFDA/default.htm'>
            Contact FDA
          </a>
        </li>
      </ul>
      <nav
        className='d-2 m-marg-t-2'
        aria-label='FDA links'>
        <ul className='link-columns'>
          {
            links.map((item: Object, i: number) => (
              <li
                key={i}
                className='marg-b-1'>
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
      </nav>
      <div className="flex-row dir-column footer-right">
        <p className='small clr-white italic'>
          Some links on this website may direct you to non-FDA locations. FDA does not endorse or guarantee the
          integrity of information on these external sites.
        </p>
        <div className={hhsCx}>
          <a
            href='http://www.hhs.gov/'
            className={hhsACx}
            rel='noopener noreferrer'
            target='_blank'>
            <img
              className='absolute top'
              alt='Go to HHS website'
              height='16px'
              width='15px'
              src='/img/l_HHS_white.png'
            />
            U.S. Department of Health and Human Services
          </a>
          <strong className='clr-white row txt-r'>Food and Drug Administration</strong>
        </div>
      </div>
    </div>
  </footer>
)

Footer.displayName = 'components/Footer'
export default Footer
