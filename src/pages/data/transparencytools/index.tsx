import React from 'react'
import TransparencyBox from '../../../components/TransparencyBox'


export default () => (
  <section className='body-bg-offwhite full-height'>
    <div className='container flex-box dir-column just-center pad-b-2'>
      <h2 className='center-heading' style={{margin: '60px 0px'}}><span>Transparency Tools</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <TransparencyBox
          noun_name='transparency'
          endpoint_name='crl'
        />
      </div>
    </div>
  </section>
)
