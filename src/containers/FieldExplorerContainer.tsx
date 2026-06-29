/* @flow */

import React from 'react'
import type { fieldExplorerContainerState } from '../types'
import type { ComponentType } from 'react'

const FieldExplorerContainer = function (ComposedFieldExplorer: ComponentType<any>): ComponentType<any> {
  class HOC extends React.Component {
    state: fieldExplorerContainerState = {
      selectedField: 'fields'
    };

    _updateField (val: any) {
      if (val !== 'fields') {
        this.setState({
          selectedField: val.value,
        })
      }
      else (
        this.setState({
          selectedField: val
        })
      )
    }

    _updateSelected (e: any) {
      const title = e.target.getAttribute('title')
      if (this.state.selectedField !== title) {
        this.setState({
          selectedField: title
        })
      }
    }

    render () {
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
