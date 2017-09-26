/* @flow */

import React from 'react'

import BlogRoll from '../../../components/BlogRoll'
import Hero from '../../../components/Hero/index'
import Layout from '../../../components/Layout'

type PROPS = {
  route: Object;
};

// homepage
export default ({ route }: PROPS) => (
  <Layout title='OpenFDA updates'>
    <Hero
      title='OpenFDA updates herp'
    />
    <BlogRoll
      posts={route.pages}
    />
  </Layout>
)
