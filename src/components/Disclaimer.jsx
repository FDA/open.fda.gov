/* @flow */

import React from 'react'
import ReactModal from 'react-modal'
import Link from 'gatsby-link'
import ComposedDisclaimer from '../containers/DisclaimerContainer'

type tPROPS = {
  showModal: boolean,
  handleCloseModal: Function,
  hideModal: Function
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
    handleCloseModal,
    hideModal
  } = props


  return (
    <ReactModal
      isOpen={showModal}
      className='modal-container'
      overlayClassName='modal-overlay'
      contentLabel="Disclaimer Modal"
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >
      <h4 className="modal-header">Disclaimer</h4>
      <div className='modal-body'>
        <span>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products.  We may limit or otherwise restrict your access to the API in line with our <Link className='underline' to='/terms/'> Terms of Service</Link></span>
      </div>
      <button className='button bg-primary clr-white' onClick={() => handleCloseModal(hideModal)}>ACCEPT</button>
    </ReactModal>
  )
}

Disclaimer.displayName = 'components/Disclaimer'
export default ComposedDisclaimer(Disclaimer)
