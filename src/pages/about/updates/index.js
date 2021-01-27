/* @flow */

import React from 'react'

import BlogRoll from '../../../components/BlogRoll'
import Hero from '../../../components/Hero/index'

import Layout from '../../../components/Layout'

// homepage
export default () => (
  <Layout>
    <section>
      <Hero
        title='openFDA updates'
      />
      <BlogRoll small={false} />
    </section>
  </Layout>
)
