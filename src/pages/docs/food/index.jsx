import React from 'react'
import EndpointBox from '../../../components/EndpointBox'

export default () => (
  <section className="body-bg-offwhite full-height">
    <div className="container flex-box dir-column just-center">
      <h2 className="center-heading" style={{margin: '60px 0px'}}><span>Food API Endpoints</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <EndpointBox
          noun_name='food'
          endpoint_name='enforcement'
        />
        <EndpointBox
          noun_name='food'
          endpoint_name='event'
        />
      </div>
    </div>
  </section>
)
