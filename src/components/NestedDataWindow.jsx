import React from 'react'
import ReactModal from 'react-modal'
import Link from 'gatsby-link'
import {default as ReactTable} from "react-table";

class NestedDataWindow extends React.Component {

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

    const tableMargin = {
      margin: '20px',
    };

    return (
        <i style={{textDecoration: "underline", fontWeight: "bold", color: "#00517d"}} onClick={this.openModal}>
          {this.props.data_text}
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
            <div style={tableMargin}>
              <ReactTable
                  data={this.props.help_text}
                  columns={this.props.column_def}
                  className="-striped -highlight"
              />
            </div>
          </ReactModal>
        </i>
    )
  }
}


export default NestedDataWindow