/* @flow */

import React from 'react'
import '../css/components/Footer.scss'

const links: Array<Object> = [
  {
    txt: 'FDA Home',
    url: 'https://www.fda.gov/',
  },
  {
    txt: 'Accessibility',
    url: 'https://www.fda.gov/about-fda/about-website/internet-accessibility',
  },
  {
    txt: 'Careers',
    url: 'https://www.fda.gov/about-fda/jobs-and-training-fda',
  },
  {
    txt: 'FDA Basics',
    url: 'https://www.fda.gov/about-fda/transparency/fda-basics',
  },
  {
    txt: 'FOIA',
    url: 'https://www.fda.gov/regulatory-information/freedom-information',
  },
  {
    txt: 'No Fear Act',
    url: 'https://www.fda.gov/about-fda/jobs-and-training-fda/no-fear-act',
  },
  {
    txt: 'Transparency',
    url: 'https://www.fda.gov/about-fda/transparency',
  },
  {
    txt: 'Website Policies',
    url: 'https://www.fda.gov/about-fda/about-website/website-policies'
  },
  {
    txt: 'Vulnerability Disclosure Policy',
    url: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html'
  },
  {
    txt: 'Privacy Policy',
    url: 'https://www.fda.gov/about-fda/about-website/website-policies#privacy'
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
  }
]

const aCx: string = 'clr-white inline-block small'

// PreFooter should remain stateless
// although, it technically isn't pure
// but links should never change once pulled in
class Footer extends React.Component {
  render() {
    return (
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
          </div>
        </div>
      </footer>
    )
  }
}

Footer.displayName = 'components/Footer'
export default Footer
