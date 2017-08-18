/* @flow */

import React from 'react'
import EndpointStatusContainer from '../containers/EndpointStatusContainer'

type tPROPS = {
  data: Object;
  fullPath: string;
};

const EndpointStatus = ({ data, fullPath, }: tPROPS) => (
  <aside className='b-b-1 clr-gray m-hide t-show marg-b-2 pad-b-2'>
    <pre
      style={{
        fontFamily: 'Hack, monospace',
        marginBottom: '20px',
        padding: '10px 15px',
        width: '100%'
      }}>
      {fullPath}
    </pre>
    <div className='flex-box weight-600'>
      <div className='col self-start t-3'>
        API Status and Freshness
      </div>
      <div className='col self-end flex-box t-3'>
        <div className='col t-3 txt-r'>
          {
            data.status === 'GREEN' ?
            'API OK'
            :
            'API DOWN'
          }
        </div>
        <div className='col t-3 txt-r'>
          API updated {data.last_updated}
        </div>
      </div>
    </div>
  </aside>
)

EndpointStatus.displayName = 'component/Endpoint_Box'
export default EndpointStatusContainer(EndpointStatus)
