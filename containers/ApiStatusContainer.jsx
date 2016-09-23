/* @flow */

import React from 'react'
import xhrGET from '../utils/xhr'

type tSTATE = {
  data: ?Array<Object>;
};

// A state wrapper for the api status component
// just fetches data and then passes it down as props
const ApiStatusContainer = function (ComposedApiStatus: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      data: null,
    };

    componentDidMount () {
      this._getStatus()
    }

    _getStatus () {
      const _handleResponse = data => {
        this.setState({
          data,
        })
      }

      xhrGET('https://api.fda.gov/status', _handleResponse, false)
    }

    render (): ?React.Element {
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
