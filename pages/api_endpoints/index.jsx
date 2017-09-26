/* @flow */

import React from 'react'

import Hero from '../../components/Hero/index'
import Layout from '../../components/Layout'
import Endpoint_Box from '../../components/Endpoint_Box'


export default () => (
  <Layout title='openFDA'>
    <Hero
      label='Endpoint Categories'
      title='Open-source APIs and a developer community for FDA data'
    />
    <section className='flex-box dir-column just-center'>
      <h2 className="center-heading" style={{margin: '30px 0px 10px'}}><span>API Endpoint Categories</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <Endpoint_Box endpoint_name="food"/>
        <Endpoint_Box endpoint_name="medical_devices"/>
        <Endpoint_Box endpoint_name="drugs"/>
        <Endpoint_Box endpoint_name="animal_and_veterinary"/>
      </div>
    </section>
  </Layout>
)