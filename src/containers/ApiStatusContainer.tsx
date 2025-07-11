/* @flow */

import React from 'react'
import xhrGET from '../utils/xhr'
import { API_LINK } from '../constants/api'

type tSTATE = {
  data: Object[] | null | undefined;
};

// A state wrapper for the api status component
// just fetches data and then passes it down as props
const ApiStatusContainer = function (ComposedApiStatus: React.ComponentType): React.ComponentType {
  class HOC extends React.Component {
    state: tSTATE = {
      data: null,
    };

    componentDidMount () {
      this._getStatus()
    }

    _getStatus () {
      interface ApiStatusData {
        [key: string]: any;
      }

      const _handleResponse = (data: ApiStatusData[] | null | undefined): void => {
        this.setState({
          data,
        })
      }

      xhrGET(API_LINK + '/status', _handleResponse)
    }

    render (): any {
      if (!this.state.data) {
        return (
          <section
            className='flex-box font-size-2 just-center align-center'
            style={{
              minHeight: '50vh',
            }}>
            Loading..
          </section>
        )
      }

      return (
        <ComposedApiStatus
          data={this.state.data}
        />
      )
    }
  }

  return HOC
}

export default ApiStatusContainer
