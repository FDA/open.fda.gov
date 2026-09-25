import React from 'react'
import EndpointBox from '../../../components/EndpointBox'


export default () => (
  <section className='body-bg-offwhite full-height'>
    <div className='container flex-box dir-column just-center pad-b-2'>
      <h2 className='center-heading' style={{margin: '60px 0px'}}><span>Research API Endpoints</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <EndpointBox
          noun_name='research'
          endpoint_name='covidmirnaandproteomics'
        />
        <EndpointBox
          noun_name='research'
          endpoint_name='tobaccopreventionads'
        />
        <EndpointBox
          noun_name='research'
          endpoint_name='tobaccodigitalads'
        />
        <EndpointBox
          noun_name='research'
          endpoint_name='tobaccosmokefree'
        />
        <EndpointBox
          noun_name='research'
          endpoint_name='tobaccoharmmenthol'
        />
      </div>
    </div>
  </section>
)
