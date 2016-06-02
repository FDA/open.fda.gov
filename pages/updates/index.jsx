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
  <Layout title='Open FDA Homepage'>
    <Hero
      title='openFDA updates'
    />
    <section className='container marg-t-2'>
      <BlogRoll
        posts={route.pages}
      />
    </section>
  </Layout>
)
