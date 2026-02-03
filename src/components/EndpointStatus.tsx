/* @flow */

import React from 'react'
import EndpointStatusContainer from '../containers/EndpointStatusContainer'
import '../css/components/EndpointStatus.scss'
import type { endpointStatusProps } from '../types'

const EndpointStatus = ({ data, fullPath, }: endpointStatusProps) => {
  const date = data ? new Date(data.last_updated) : null;
  return (
    <section className='flex-box just-between b-b-1 bg-gray-lightest m-hide pad-b-2 pad-t-2 pad-l-4 pad-r-4'>
      <div>
        <span className='weight-700'>Endpoint: </span>
        <span className='status-content'>{fullPath}</span>
      </div>
      <div>
        <span className='weight-700'>Status: </span>
        {
          data
            ? (data.status === 'GREEN' ?
              <span className='status-content status-content-bg bg-green-light clr-white'>
                <i className='fa fa-check' /> OK
              </span>
              :
              <span className='status-content status-content-bg bg-red clr-white'>
                <i className='fa fa-close' /> DOWN
              </span>
            )
            : <span className='status-content'>N/A</span>
        }
      </div>
      <div>
        <span className='weight-700'>Last updated: </span>
        <span className='status-content'>{date ? date.toDateString() : 'N/A'}</span>
      </div>
      <div>
        <span className='weight-700'>Total records: </span>
        <span className='status-content'>{data ? data.documents : 'N/A'}</span>
      </div>
    </section>
  )
}

EndpointStatus.displayName = 'component/Endpoint_Box'
export default EndpointStatusContainer(EndpointStatus)
