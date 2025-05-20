/* @flow */

import React from 'react'
import find from 'lodash/find'
import xhrGET from '../utils/xhr'
import { API_LINK } from '../constants/api'
import { attributesToProps } from 'html-react-parser';

type tPROPS = {
  endpoint: string;
  path: string;
  status: string;
  fullPath: string;
  data: Object | null;
  className?: string;
  style?: Object;
  [key: string]: any;
};

type tSTATE = {
  data: Object | null;
};

type PROPS = {

}
// A state wrapper for the api status component
// just fetches data and then passes it down as props
const EndpointStatusContainer = function (ComposedEndpointStatus: React.ComponentType<tPROPS & tSTATE>): React.ComponentType<tPROPS & tSTATE> {
  // this is a higher order component
  class HOC extends React.Component<tPROPS> {
    static defaultProps: tPROPS = {
      path: '',
      status: '',
      endpoint: '',
      data: null,
      className: '',
      style: {},
      fullPath: ''
    };

    state: tSTATE = {
      data: null,
    };

    _getStatus () {
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

    componentDidMount () {
      this._getStatus()
    }

    render (): any {
      if (!this.state.data) return <span />

      const path: string = this.props?.path.replace(/(\/api_endpoints){1}/g, '').replace(/(\/reference){1}/g, '')
      const fullPath: string = API_LINK + `${path}.json`

      return (
        <ComposedEndpointStatus
        {...this.props}
        {...this.state}
        fullPath={fullPath}        />
      )
    }
  }

  return HOC
}

export default EndpointStatusContainer
