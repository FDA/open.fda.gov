/* @flow */

import React from 'react'
import EndpointStatusContainer from '../containers/EndpointStatusContainer'

type tPROPS = {
  data: Object;
  fullPath: string;
};

const EndpointStatus = ({ data, fullPath, }: tPROPS) => {
  var date = new Date(data.last_updated)
  return (
    <section className='flex-box just-between b-b-1 bg-gray-lightest m-hide pad-b-2 pad-t-2 pad-l-4 pad-r-4'>
      <div>
        <span className='weight-700'>Endpoint: </span>
        <span className='status-content'>{fullPath}</span>
      </div>
      <div>
        <span className='weight-700'>Status: </span>
        {
          data.status === 'GREEN' ?
            <span className='status-content status-content-bg bg-green-light clr-white'>
            <i className='fa fa-check'/> OK
          </span>
            :
            <span className='status-content status-content-bg bg-red clr-white'>
            <i className='fa fa-close'/> DOWN
          </span>
        }
      </div>
      <div>
        <span className='weight-700'>Last updated: </span>
        <span className='status-content'>{date.toDateString()}</span>
      </div>
      <div>
        <span className='weight-700'>Total records: </span>
        <span className='status-content'>{data.documents}</span>
      </div>
    </section>
  )
}

EndpointStatus.displayName = 'component/Endpoint_Box'
export default EndpointStatusContainer(EndpointStatus)
