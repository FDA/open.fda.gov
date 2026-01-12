/* @flow */

import React from 'react'
import xhrGET from '../utils/xhr'
import type { queryExplorerContainerProps, queryExplorerContainerState } from '../types';

const QueryExplorerContainer = function (ComposedQueryExplorer: React.ComponentType<any>) {
  class HOC extends React.Component<queryExplorerContainerProps, queryExplorerContainerState> {
    static defaultProps: Partial<queryExplorerContainerProps> = {
      closeTour: () => {},
      desc: '',
      k: 0,
      level: 5,
      params: [''],
      query: '',
      result: '',
      title: '',
      originalQuery: '',
    };

    // for flow
    state: queryExplorerContainerState = {
      queryToRun: '',
      result: '',
      showResult: false,
    };

    constructor (props: queryExplorerContainerProps) {
      super(props)
      this.state.queryToRun = props.originalQuery
    }

    _fetchQuery (query: string) {
      const _handleResponse = (data: any) => {
        this.setState({
          result: JSON.stringify(data, null, '  '),
          showResult: true,
        })
      }
      xhrGET(query, _handleResponse)
    }

    _toggleVisibility () {
      this.props.closeTour?.()
      this.setState({
        showResult: false,
      })
    }

    _updateQuery (e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
        queryToRun: e.target.value,
      })
    }

    render (): React.ReactElement {
      return (
        <ComposedQueryExplorer
          closeTour={() => {}}
          {...this.props}
          {...this.state}
          fetchQuery={this._fetchQuery.bind(this)}
          toggleQuery={this._toggleVisibility.bind(this)}
          updateQuery={this._updateQuery.bind(this)}      
         />
      )
    }
  }

  return HOC
}

export default QueryExplorerContainer
