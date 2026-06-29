/* @flow */

import React from 'react'
import find from 'lodash/find'
import xhrGET from '../utils/xhr'
import { API_LINK } from '../constants/api'
import type { endpointStatusContainerProps, endpointStatusContainerState } from '../types/endpoint.types'

// A state wrapper for the api status component
// just fetches data and then passes it down as props
const EndpointStatusContainer = function (ComposedEndpointStatus: React.ComponentType<endpointStatusContainerProps & endpointStatusContainerState>): React.ComponentType<endpointStatusContainerProps & endpointStatusContainerState> {
  // this is a higher order component
  class HOC extends React.Component<endpointStatusContainerProps, endpointStatusContainerState> {
    static defaultProps: endpointStatusContainerProps = {
      path: '',
      status: '',
      endpoint: '',
      data: null,
      className: '',
      style: {},
      fullPath: ''
    };

    state: endpointStatusContainerState = {
      data: null,
    };

    _getStatus() {
      const _handleResponse = (data: any) => {
        const path = this.props.path.replace(/(\/api_endpoints){1}/g, '').replace(/(\/reference){1}/g, '')
        const key = this.props.status ?
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

    componentDidMount() {
      this._getStatus()
    }

    render(): any {
      if (!this.state.data) return <span />

      const path: string = this.props?.path.replace(/(\/api_endpoints){1}/g, '').replace(/(\/reference){1}/g, '')
      const fullPath: string = API_LINK + `${path}.json`

      return (
        <ComposedEndpointStatus
          {...this.props}
          {...this.state}
          fullPath={fullPath} />
      )
    }
  }

  return HOC
}

export default EndpointStatusContainer
