/* @flow */

import React from 'react'
import Hero from '../../../components/Hero/index'
import meta from './_meta.yaml'
import datasets from './_datasets.yaml'
import Select from 'react-select'


export default () => (
  <section>
    <Hero
      {...meta}
    />
    <section className='body-bg-offwhite'>
      <div className='container blog-bg'>
        <div className='blog-container'>
          <div style={{
            height: 100
          }}>
          {"I'm Interested In: "}
          <Select
            name="toggle"
            options={datasets.names}
            placeholder="Search the fields"
          />
          </div>
        </div>
      </div>
    </section>
  </section>
)