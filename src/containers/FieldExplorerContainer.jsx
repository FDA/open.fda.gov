/* @flow */

import React from 'react'

type tSTATE = {
  selectedField: string
};

const FieldExplorerContainer = function (ComposedFieldExplorer: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      selectedField: 'fields'
    };

    _updateField (val) {
      if ( val !== 'fields' ) {
        this.setState({
          selectedField: val.value,
        })
      } else (
        this.setState({
          selectedField: val
        })
      )
    }

    _updateSelected(e) {
      let title = e.target.getAttribute('title')
      if (this.state.selectedField !== title) {
        this.setState({
          selectedField: title
        })
      }
    }

    render (): React.Element {
      return (
        <ComposedFieldExplorer
          {...this.props}
          {...this.state}
          updateField={this._updateField.bind(this)}
          updateSelected={this._updateSelected.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default FieldExplorerContainer
