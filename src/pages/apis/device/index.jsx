import React from 'react'
import EndpointBox from '../../../components/EndpointBox'

export default () => (
  <section className="body-bg-offwhite full-height">
    <div className="container flex-box dir-column just-center">
      <h2 className="center-heading" style={{margin: '60px 0px'}}><span>Medical Device API Endpoints</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <EndpointBox
          noun_name='device'
          endpoint_name='510k'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='classification'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='enforcement'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='event'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='pma'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='recall'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='registrationlisting'
        />
        <EndpointBox
          noun_name='device'
          endpoint_name='udi'
        />
      </div>
    </div>
  </section>
)
