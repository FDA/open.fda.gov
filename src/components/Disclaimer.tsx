/* @flow */

import React from 'react'
import ReactModal from 'react-modal'
import Link from 'gatsby-link'
import '../css/components/Disclaimer.scss'

type tPROPS = {
  showModal: boolean,
  setIsModal: (val: boolean) => void;
  validated: boolean
};

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} label [small text right above the title]
 * @param {string} path [the page route, for endpoint pages]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @param {string} type [endpoint or not, used for styling and tabs]
 * @return {React.Element}
 */
const Disclaimer = (props: tPROPS) => {
  const {
    showModal,
    setIsModal
  } = props


  return (
    <ReactModal
      isOpen={showModal}
      className='modal-container'
      overlayClassName='modal-overlay'
      contentLabel='Disclaimer Modal'
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >
      <h4 className='modal-header'>Disclaimer</h4>
      <div className='modal-body'>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products.  We may limit or otherwise restrict your access to the API in line with our <Link className='underline' to='/terms/'> Terms of Service</Link></p>
        <p>This warning banner provides privacy and security notices consistent with applicable federal laws, directives, and other federal guidance for accessing this Government system, which includes all devices/storage media attached to this system. This system is provided for Government-authorized use only. Unauthorized or improper use of this system is prohibited and may result in disciplinary action and/or civil and criminal penalties. At any time, and for any lawful Government purpose, the government may monitor, record, and audit your system usage and/or intercept, search and seize any communication or data transiting or stored on this system. Therefore, you have no reasonable expectation of privacy. Any communication or data transiting or stored on this system may be disclosed or used for any lawful Government purpose.</p>
      </div>
      <button className='button bg-primary clr-white' onClick={() => setIsModal(false)}>ACCEPT</button>
    </ReactModal>
  )
}

Disclaimer.displayName = 'components/Disclaimer'
export default Disclaimer
