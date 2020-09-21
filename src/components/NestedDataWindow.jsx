import React from 'react'
import ReactModal from 'react-modal'
import Link from 'gatsby-link'
import {default as ReactTable} from "react-table";
import Moment from "moment";

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
    let columnsData = this.props.getFormattedColumns(this.props.column_def)

    this.setState({
      columns: columnsData.columns
    })
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
            <h3>{this.props.header}</h3>
            <div style={tableMargin}>
              <ReactTable
                  data={this.props.data}
                  columns={this.state.columns}
                  className="-striped -highlight"
              />
            </div>
          </ReactModal>
        </i>
    )
  }
}


export default NestedDataWindow