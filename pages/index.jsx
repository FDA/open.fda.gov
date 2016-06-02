/* @flow */

import React from 'react'

import BlogRoll from '../components/BlogRoll'
import Hero from '../components/Hero'
import Layout from '../components/Layout'

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
    <section className='container marg-t-2'>
      <BlogRoll
        posts={route.pages}
      />
    </section>
  </Layout>
)

INDEX.displayName = 'Homepage'
export default INDEX
