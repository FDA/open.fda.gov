import React from 'react'
import Hero from '../../../components/Hero'
import EndpointBox from '../../../components/EndpointBox'

import meta from './_meta.yaml'

export default () => (
  <section>
    <Hero
      {...meta}
    />
    <section className='container flex-box dir-column just-center'>
      <h2 className="center-heading" style={{margin: '30px 0px 30px'}}><span>Food API Endpoints</span></h2>
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
    </section>
  </section>
)
