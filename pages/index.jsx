/* @flow */

import React from 'react'

import Hero from '../components/Hero'
import Layout from '../components/Layout'

const Link: ReactClass = require('react-router').Link

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
      <p className="marg-t-3">OpenFDA provides APIs and full sets of downloadable files to a number of high-value, high priority and scalable
        structured datasets, including adverse events, drug product labeling, and recall enforcement reports.</p>
      <h2 className="marg-t-4" style={{color: "#00517d"}}>Where to Start</h2>
      <p>The best place to start is on the <Link to="/api/">API basics</Link> page. It provides a great introduction to
        openFDA and some good pointers on how you can begin developing using the platform.</p>
      <h2 className="marg-t-4" style={{color: "#00517d"}}>The OpenFDA Developer Community</h2>
      <p>OpenFDA features an open user community for sharing open source code, examples, and ideas. Share your feedback,
        questions, and ideas with the community on <a href="https://github.com/fda">GitHub</a>,
        <a href="https://twitter.com/openFDA"> Twitter</a>, and
        <a href="http://stackexchange.com/search?q=openfda"> StackExchange</a>. Take a look at some of the
        <Link to="/community/"> openFDA apps</Link> built by members of the community. </p>
    </section>
  </Layout>
)

INDEX.displayName = 'Homepage'
export default INDEX
