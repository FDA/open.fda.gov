/* @flow */

import React from 'react'
import find from 'lodash/find'
import xhrGET from '../utils/xhr'
import { API_LINK } from '../constants/api'

type tPROPS = {
  endpoint: string;
  path: string;
};

type tSTATE = {
  data: Object;
};

// A state wrapper for the api status component
// just fetches data and then passes it down as props
const EndpointStatusContainer = function (ComposedEndpointStatus: ReactClass): ReactClass {
  class HOC extends React.Component {
    static defaultProps: tPROPS = {
      path: '',
      status: '',
    };

    state: tSTATE = {
      data: null,
    };

    _getStatus () {
      const _handleResponse = data => {
        const path: string = this.props.path.replace(/(\/api_endpoints){1}/g, '').replace(/(\/reference){1}/g, '')
        const key: string = this.props.status ?
          this.props.status :
          path.split('/').join('')

        // pull the relevant endpoint status from the api response
        const relevant: Object = find(data, d => d.endpoint === key)


        this.setState({
          data: relevant,
        })
      }

      xhrGET(API_LINK + '/status', _handleResponse)
    }

    componentDidMount () {
      this._getStatus()
    }

    render (): ?React.Element {
      if (!this.state.data) return <span />

      const path: string = this.props.path.replace(/(\/api_endpoints){1}/g, '').replace(/(\/reference){1}/g, '')
      const fullPath: string = API_LINK + `${path}.json`

      return (
        <ComposedEndpointStatus
          {...this.props}
          {...this.state}
          fullPath={fullPath}
        />
      )
    }
  }

  return HOC
}

export default EndpointStatusContainer
