import React from 'react'
import EndpointBox from '../../../components/EndpointBox'


export default () => (
  <section className="body-bg-offwhite full-height">
    <div className="container flex-box dir-column just-center pad-b-2">
      <h2 className="center-heading" style={{margin: '60px 0px'}}><span>Drug API Endpoints</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <EndpointBox
          noun_name='drug'
          endpoint_name='event'
        />
        <EndpointBox
          noun_name='drug'
          endpoint_name='label'
        />
        <EndpointBox
          noun_name='drug'
          endpoint_name='ndc'
        />
        <EndpointBox
          noun_name='drug'
          endpoint_name='enforcement'
        />
      </div>
    </div>
  </section>
)
