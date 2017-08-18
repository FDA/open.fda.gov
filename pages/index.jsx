/* @flow */

import React from 'react'

import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Endpoint_Box from '../components/Endpoint_Box'

type PROPS = {
  route: Object;
};

// homepage
const INDEX = ({ route }: PROPS) => (
  <Layout title='openFDA'>
    <Hero
      label='openFDA'
      title='Open-source APIs and a developer community for FDA data'
    />
    <section className='container flex-box dir-column just-center'>
      <div className="txt-c marg-3 clr-primary-alt-dark weight-700"><h2>API Endpoint Categories</h2></div>
      <div className='container flex-row just-between'>
        <Endpoint_Box endpoint_name="food"/>
        <Endpoint_Box endpoint_name="medical_devices"/>
        <Endpoint_Box endpoint_name="drugs"/>
        <Endpoint_Box endpoint_name="animal_and_veterinary"/>
      </div>
      <div className="txt-c marg-2 clr-primary weight-700">VIEW ALL <i className="fa fa-angle-right"/></div>
    </section>
    <section className='container flex-box just-center'>
      <div style={{backgroundImage: "url('/img/area-chart.svg')"}}>

      </div>
      <img src="/img/area-chart.svg"/>
      <img src="/img/down-arrows.svg"/>
    </section>
  </Layout>
)

INDEX.displayName = 'Homepage'
export default INDEX
