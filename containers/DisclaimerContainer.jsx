/* @flow */

import React from 'react'

type tSTATE = {
  showModal: boolean;
};

const DiclaimerContainer = function (ComposedDisclaimer: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      showModal: false
    };

    componentDidMount () {
      console.log("smart disc mount valid",this.props.validated)
      console.log("smart disc mount showmodal: ", this.state.showModal)
      if (this.props.validated == false) {
        this.setState({
          showModal: true
        })
      }
    }

    _hideModal () {
      console.log("smart disc hide valid", this.props.validated)
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

export default DiclaimerContainer
