/* @flow */

import React from 'react'
import xhrGET from '../utils/xhr'
import { Props } from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

type PROPS = StateManagerProps & {
  // close the website tour function
  closeTour?: () => void;
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
  originalQuery: string;
  // query to run
  query: string;
  [key: string]: any;
};

type tSTATE = {
  queryToRun: string;
  result: string;
  showResult: boolean;
};

const QueryExplorerContainer = function (ComposedQueryExplorer: React.ComponentType<any>) {
  class HOC extends React.Component<PROPS, tSTATE> {
    static defaultProps: Partial<PROPS> = {
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
    state: tSTATE = {
      queryToRun: '',
      result: '',
      showResult: false,
    };

    constructor (props: PROPS) {
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
        updateQuery={this._updateQuery.bind(this)}        />
      )
    }
  }

  return HOC
}

export default QueryExplorerContainer
