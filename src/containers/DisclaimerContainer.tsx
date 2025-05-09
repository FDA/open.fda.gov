/* @flow */

import React from 'react'

type tSTATE = {
  showModal: boolean;
};

type HOCProps = {
  validated: boolean;
};

const DisclaimerContainer = function (ComposedDisclaimer: React.ComponentType<{ showModal: boolean; setIsModal: (val: boolean) => void; validated: boolean }>): React.ComponentType<HOCProps> {

  class HOC extends React.Component<HOCProps> {
    state: tSTATE = {
      showModal: false
    };

    componentDidMount () {
      const hasSeenDisclamer = sessionStorage.getItem('hasSeenDisclaimer')
      const validated = sessionStorage.getItem('validated') === 'true'
      if (hasSeenDisclamer == null) {
        sessionStorage.setItem('hasSeenDisclaimer', 'true')
        this.setState({
          showModal: true
        })
      }
      else if (validated == true) {
        this.setState({
          showModal: false
        })
      }
      else
        if (this.props.validated == false) {
          this.setState({
            showModal: true
          })
        }
    }

    componentWillReceiveProps (nextProps: HOCProps) {
      if (this.props.validated == true && nextProps.validated == false) {
        this.setState({
          showModal: true
        })
      }
      else if (this.props.validated == false && nextProps.validated == true) {
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

    setIsModal (val: boolean) {
      this.setState({
        showModal: val
      })
    }

    render (): React.ReactElement {
      return (
        <ComposedDisclaimer
          {...this.props}
          {...this.state}
          setIsModal={(val: boolean) => this.setIsModal(val)}
        />
      )
    }
  }

  return HOC
}

export default DisclaimerContainer
