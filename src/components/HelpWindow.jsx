import React from 'react'
import ReactModal from 'react-modal'
import Link from 'gatsby-link'

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

    const ep_path = {
      "animaldrugs": "/apis/animalandveterinary/label/"
    }

    const help_text = this.props.help_text
    let help_body = ''
    if (typeof help_text === 'string') {
      help_body = <p>{help_text}</p>
    } else {
      help_body = help_text.map(function(line, i) {
        return <p key={i}>{line}</p>
      })
    }

    return (
      <i style={{textDecoration: "underline", fontWeight: "bold", color: "#00517d"}} onClick={this.openModal}>
        Help
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
          {
            this.props.dataset_name in ep_path &&
              <p>For more information about the specifics of {this.props.dataset_label}, visit <Link
                to={ep_path[this.props.dataset_name]}>{ep_path[this.props.dataset_name]}</Link>.</p>
          }
          {help_body}
        </ReactModal>
      </i>
    )
  }
}


export default HelpWindow