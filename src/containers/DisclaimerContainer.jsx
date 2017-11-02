/* @flow */

import React from 'react'

type tSTATE = {
  showModal: boolean;
};

const DisclaimerContainer = function (ComposedDisclaimer: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      showModal: false
    };

    componentDidMount () {
      if (this.props.validated == false) {
        this.setState({
          showModal: true
        })
      }
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.validated == true && nextProps.validated == false) {
        this.setState({
          showModal: true
        })
      } else if (this.props.validated == false && nextProps.validated == true) {
        this.setState({
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
