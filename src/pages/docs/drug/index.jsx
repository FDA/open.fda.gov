import React from 'react'
import EndpointBox from '../../../components/EndpointBox'


export default () => (
  <section className="body-bg-offwhite">
    <div className="container flex-box dir-column just-center pad-b-2">
      <h2 className="center-heading" style={{margin: '30px 0px 30px'}}><span>Drug API Endpoints</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <EndpointBox
          noun_name='drug'
          endpoint_name='enforcement'
        />
        <EndpointBox
          noun_name='drug'
          endpoint_name='event'
        />
        <EndpointBox
          noun_name='drug'
          endpoint_name='label'
        />
      </div>
    </div>
  </section>
)
