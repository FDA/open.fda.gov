import React from 'react'
import ReactModal from 'react-modal'
import FilterComponent from "./Filter";

class HelpWindow extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
      showModal: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount () {
  }

  closeModal () {
    this.setState({
      showModal: false
    })
  }

  openModal () {
    this.setState({
      showModal: true
    })
  }

  render (): ?React.Element {
    return (
      <i className='fa fa-info-circle pad-l-1' onClick={this.openModal}>
        <ReactModal
          isOpen={this.state.showModal}
          className='help-window'
          overlayClassName='modal-overlay'
          contentLabel="Help Modal"
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <h3>{this.props.help_header}</h3>
          <p>{this.props.help_text}</p>
        </ReactModal>
      </i>
    )
  }
}


export default HelpWindow