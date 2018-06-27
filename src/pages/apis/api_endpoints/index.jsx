/* @flow */

import React from 'react'

import NounBox from '../../../components/NounBox'


export default () => (
  <section>
    <section className="body-bg-offwhite">
      <div className="container flex-box dir-column just-center">
        <h2 className="center-heading" style={{margin: '30px 0px 10px'}}><span>API Endpoint Categories</span></h2>
        <div className='flex-row just-center align-center flex-wrap'>
          <NounBox noun_name='food' />
          <NounBox noun_name='medical_devices' />
          <NounBox noun_name='drugs' />
          <NounBox noun_name='animal_and_veterinary' />
        </div>
      </div>
    </section>
  </section>
)
