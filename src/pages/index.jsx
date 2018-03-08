/* @flow */

import React from 'react'
import Link from 'gatsby-link'
import NounBox from '../components/NounBox'
import BlogRoll from '../components/BlogRoll'

// homepage
const INDEX = () => (
  <section className='body-bg-offwhite'>
    <section className='container-homepage align-start'>
      <section className='flex-box align-center just-center homepage-hero'>
        <div>
          <h3>Open-source APIs</h3>
          <h6>and</h6>
          <h3>Developer Community for FDA Data</h3>
          <Link className='btn btn-icon-right marg-t-1 weight-700 bg-white clr-primary-darker' to='/docs/'>
            Learn More<i className='fa fa-arrow-right marg-l-1'/>
          </Link>
        </div>
      </section>
      <section className='noun-box-container flex-box dir-column just-center'>
        <div className='flex-box dir-row just-between align-center flex-wrap'>
          <NounBox noun_name='food'/>
          <NounBox noun_name='medical_devices'/>
        </div>
        <div className='flex-box dir-row just-between align-center flex-wrap'>
          <NounBox noun_name='drugs'/>
          <NounBox noun_name='animal_and_veterinary'/>
        </div>
        <Link className='btn btn-icon-right txt-c clr-primary weight-700' to='/api_endpoints/'>
          VIEW ALL<i className='fa fa-angle-right marg-l-1'/>
        </Link>
      </section>
    </section>
    <section className='container-homepage'>
      <section className='flex-box dir-column just-between homepage-link-list'>
        <Link className='link-card btn btn-icon-right weight-700' to='/about/statistics/'>
          <img className='' src='/img/line-graph.svg'/>
          <div className='flex-box dir-column marg-l-1 marg-r-1'>
            <h3 className='marg-b-1 clr-primary-darker'>View API Usage Statistics</h3>
            <p className='smallest'>This site also offers an overview of the usage of API endpoints by the community.</p>
          </div>
          <i className='fa fa-angle-right fa-2x marg-l-1'/>
        </Link>
        <Link className='link-card btn btn-icon-right weight-700' to='/tools/downloads/'>
          <img className='' src='/img/download.svg'/>
          <div className='flex-box dir-column marg-l-1 marg-r-1'>
            <h3 className='marg-b-1 clr-primary-darker'>Download OpenFDA Data</h3>
            <p className='smallest'>The endpoints' data may be downloaded in zipped JSON format.</p>
          </div>
          <i className='fa fa-angle-right fa-2x marg-l-1'/>
        </Link>
        <Link className='link-card btn btn-icon-right weight-700' to='/community/'>
          <img className='' src='/img/lightbulb.svg'/>
          <div className='flex-box dir-column marg-l-1 marg-r-1'>
            <h3 className='marg-b-1 clr-primary-darker'>View Community Apps</h3>
            <p className='smallest'>OpenFDA features an open user community for sharing open source code, examples, and ideas.</p>
          </div>
          <i className='fa fa-angle-right fa-2x marg-l-1'/>
        </Link>
      </section>
      <BlogRoll
        small={true}
      />
    </section>
  </section>
)

INDEX.displayName = 'Homepage'
export default INDEX
