import React from 'react'
import EndpointBox from '../../../components/EndpointBox'


export default () => (
  <section className='body-bg-offwhite full-height'>
    <div className='container flex-box dir-column just-center pad-b-2'>
      <h2 className='center-heading' style={{margin: '60px 0px'}}><span>Other API Endpoints</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <EndpointBox
          noun_name='other'
          endpoint_name='historicaldocument'
        />
        <EndpointBox
          noun_name='other'
          endpoint_name='nsde'
        />
        <EndpointBox
          noun_name='other'
          endpoint_name='pubmed'
        />
        <EndpointBox
          noun_name='other'
          endpoint_name='substance'
        />
        <EndpointBox
          noun_name='other'
          endpoint_name='unii'
        />
      </div>
    </div>
  </section>
)
