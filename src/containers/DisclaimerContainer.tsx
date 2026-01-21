
/* @flow */

import React from 'react'

type tSTATE = {
  showModal: boolean;
};

type HOCProps = {
  validated: boolean;
};

const DisclaimerContainer = function (ComposedDisclaimer: React.ComponentType<{ showModal: boolean; setIsModal: (val: boolean) => void; validated: boolean }>): React.ComponentType<HOCProps> {

  class HOC extends React.Component<HOCProps, tSTATE> {
    state: tSTATE;
    constructor(props: HOCProps) {
      super(props);
      this.state = {
        showModal: !this.props.validated
      };
    }

    componentDidMount() {
      const hasSeenDisclamer = sessionStorage.getItem('hasSeenDisclaimer')
      const validated = sessionStorage.getItem('validated') === 'true'

      // Simplify the logic to be more responsive
      if (hasSeenDisclamer == null) {
        sessionStorage.setItem('hasSeenDisclaimer', 'true')
        this.setState({ showModal: true })
      } else {
        // Set modal state based on validation status
        this.setState({ showModal: !validated && !this.props.validated })
      }
    }

    componentWillReceiveProps(nextProps: HOCProps) {
      if (this.props.validated !== nextProps.validated || !nextProps.validated) {
        this.setState({
          showModal: !nextProps.validated
        })
      }
    }

    _hideModal() {
      this.setState({
        showModal: false
      })
    }

    setIsModal(val: boolean) {
      // Immediately update the modal state for better responsiveness
      this.setState({
        showModal: val
      })
    }

    render(): React.ReactElement {
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
