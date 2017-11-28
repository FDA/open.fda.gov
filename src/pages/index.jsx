/* @flow */

import React from 'react'
import Link from 'gatsby-link'
import NounBox from '../components/NounBox'
import BlogRoll from '../components/BlogRoll'

// homepage
const INDEX = () => (
  <section>
    <section className='flex-box just-center homepage-hero'>
      <div>
        <h2>Open Access to FDA Data</h2>
        <div className="divider-line"></div>
        <p style={{color: "white"}}>APIs and file downloads for FDA data, including adverse events, product labeling, and enforcement reports.</p>
        <Link className="btn btn-icon-right weight-700 bg-white" style={{color: "#00B1CB"}} to='/getting_started/api_basics/'>
          Learn More<i className="fa fa-arrow-right marg-l-1"/>
        </Link>
      </div>
    </section>
    <section className='body-bg-offwhite flex-box dir-column just-center'>
      <h2 className="center-heading" style={{margin: '30px 0px 10px'}}><span>API Endpoint Categories</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <NounBox noun_name="food"/>
        <NounBox noun_name="medical_devices"/>
        <NounBox noun_name="drugs"/>
        <NounBox noun_name="animal_and_veterinary"/>
      </div>
      <Link className="btn btn-icon-right marg-b-2 txt-c clr-primary weight-700" to='/api_endpoints/'>
        VIEW ALL<i className="fa fa-angle-right marg-l-1"/>
      </Link>
    </section>
    <section className='flex-box just-between'>
      <div className="relative half-hero area-chart-container">
        <div>
          <h3 className="marg-b-1">API Usage Statistics</h3>
          <span>This site also offers an overview of the usage of API endpoints by the community.</span>
          <div>
            <Link className="btn btn-icon-right marg-t-2 weight-700 bg-white" style={{color: "#00B1CB"}} to='/about/statistics/'>
              VIEW USAGE ACTIVITY<i className="fa fa-arrow-right marg-l-1"/>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative clr-primary-darker half-hero down-arrows-container">
        <div>
          <h3 className="marg-b-1">Download OpenFDA Data</h3>
          <span>The endpoints' data may be downloaded in zipped JSON format.</span>
          <div>
            <Link className="btn btn-icon-right marg-t-2 weight-700 clr-white" style={{backgroundColor: "#007CBA"}} to='/about/downloads/'>
              DOWNLOAD ENDPOINTS<i className="fa fa-arrow-right marg-l-1"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  <section className='flex-box just-center blue-code-container'>
    <div>
      <h3>Citizen Science and Crowdsourcing</h3>
      <p style={{color: "white"}}>View some examples created by the community using OpenFDA data.</p>
      <Link className="btn btn-icon-right weight-700 bg-white" style={{color: "#007CBA"}} to='/community/'>
        SHOW ME MORE<i className="fa fa-arrow-right marg-l-1"/>
      </Link>
    </div>
  </section>
  <BlogRoll
    small={true}
  />
  </section>
)

INDEX.displayName = 'Homepage'
export default INDEX
