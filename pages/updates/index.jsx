/* @flow */

import React from 'react'

import BlogRoll from '../../components/BlogRoll'
import Hero from '../../components/Hero'
import Layout from '../../components/Layout'

type PROPS = {
  route: Object;
};

// homepage
export default ({ route }: PROPS) => (
  <Layout title='OpenFDA Homepage'>
    <Hero
      title='OpenFDA updates'
    />
    <BlogRoll
      posts={route.pages}
    />
  </Layout>
)
