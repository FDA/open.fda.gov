/* @flow */

import React from 'react'
import xhrGET from '../utils/xhr'

type tPROPS = {
  // description of query
  desc: string;
  // key, passed in from parent
  k: number;
  // what header level to use
  level: number;
  // query parameters
  params: Array<string>;
  // query result
  result: string;
  // query title
  title: string;
};

type tSTATE = {
  queryToRun: string;
  result: string;
  showResult: boolean;
};

const QueryExplorerContainer = function (ComposedQueryExplorer: ReactClass): ReactClass {
  class HOC extends React.Component {
    defaultProps: tPROPS = {
      desc: '',
      k: 0,
      level: 5,
      params: [''],
      query: '',
      result: '',
      title: '',
    };

    // for flow
    state: tSTATE = {
      queryToRun: '',
      result: '',
      showResult: false,
    };

    constructor (props: Object) {
      super(props)
      this.state.queryToRun = props.originalQuery
    }

    _fetchQuery (query: string) {
      const _handleResponse = data => {
        this.setState({
          result: JSON.stringify(data, null, '  '),
          showResult: true,
        })
      }

      xhrGET(query, _handleResponse)
    }

    _toggleVisibility () {
      this.setState({
        showResult: false,
      })
    }

    _updateQuery (e: Object) {
      this.setState({
        queryToRun: e.target.value,
      })
    }

    render (): React.Element {
      return (
        <ComposedQueryExplorer
          { ...this.props }
          { ...this.state }
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
