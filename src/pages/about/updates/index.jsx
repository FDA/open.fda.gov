/* @flow */

import React from 'react'

import BlogRoll from '../../../components/BlogRoll'
import Hero from '../../../components/Hero/index'
import Layout from '../../../components/Layout'


// homepage
export default () => (
  <Layout title='OpenFDA updates'>
    <Hero
      title='OpenFDA updates'
    />
    <BlogRoll/>
  </Layout>
)
