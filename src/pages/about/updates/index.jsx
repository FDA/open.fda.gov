/* @flow */

import React from 'react'

import BlogRoll from '../../../components/BlogRoll'
import Hero from '../../../components/Hero/index'


// homepage
export default () => (
  <section>
    <Hero
      title='openFDA updates'
    />
    <BlogRoll small={false}/>
  </section>
)
