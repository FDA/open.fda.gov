/* @flow */

import React from 'react'

type tSTATE = {
  path: string;
  showModal: boolean;
};

const DisclaimerContainer = function (ComposedDisclaimer: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      path: ' ',
      showModal: false
    };

    componentDidMount () {
      if (this.props.validated === false || window.location.pathname === '/apis/drug/ndc/') {
        this.setState({
          path: window.location.pathname,
          showModal: true
        })
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.ndcValidated === false && window.location.pathname === '/apis/drug/ndc/') {
        this.setState({
          path: window.location.pathname,
          showModal: true
        })
      } else if (this.props.ndcValidated === false && nextProps.ndcValidated === true && window.location.pathname === '/apis/drug/ndc/') {
        this.setState({
          path: window.location.pathname,
          showModal: false
        })
      } else if (this.props.validated === true && nextProps.validated === false) {
        this.setState({
          path: window.location.pathname,
          showModal: true
        })
      } else if (this.props.validated === false && nextProps.validated === true) {
        this.setState({
          path: window.location.pathname,
          showModal: false
        })
      }
    }

    _hideModal () {
      this.setState({
        showModal: false
      })
    }

    render (): React.Element {
      return (
        <ComposedDisclaimer
          {...this.props}
          {...this.state}
          hideModal={this._hideModal.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default DisclaimerContainer
