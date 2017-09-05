/* @flow */

import React from 'react'

import Layout from '../components/Layout'
import Endpoint_Box from '../components/Endpoint_Box'
import BlogRoll from '../components/BlogRoll'

const Link: ReactClass = require('react-router').Link

type PROPS = {
  route: Object;
};

// homepage
const INDEX = ({ route }: PROPS) => (
  <Layout title='openFDA'>
    <section className='flex-box dir-column just-center'>
      <h2 className="center-heading" style={{margin: '30px 0px 10px'}}><span>API Endpoint Categories</span></h2>
      <div className='flex-row just-center align-center flex-wrap'>
        <Endpoint_Box endpoint_name="food"/>
        <Endpoint_Box endpoint_name="medical_devices"/>
        <Endpoint_Box endpoint_name="drugs"/>
        <Endpoint_Box endpoint_name="animal_and_veterinary"/>
      </div>
      <Link className="btn marg-b-2 txt-c clr-primary weight-700" to='/categories/'>
        VIEW ALL<i className="fa fa-angle-right marg-l-1"/>
      </Link>
    </section>
    <section className='flex-box just-between'>
      <div className="relative half-hero area-chart-container">
        <div>
          <h3 className="marg-b-1">API Usage Statistics</h3>
          <span>This site also offers an overview of the usage of API endpoints by the community.</span>
          <div>
            <Link className="btn marg-t-2 weight-700 bg-white" style={{color: "#00B1CB"}} to='/api/statistics/'>
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
            <Link className="btn marg-t-2 weight-700 clr-white" style={{backgroundColor: "#007CBA"}} to='/downloads/'>
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
      <Link className="btn weight-700 bg-white" style={{color: "#00B1CB"}} to='/community/'>
        SHOW ME MORE<i className="fa fa-arrow-right marg-l-1"/>
      </Link>
    </div>
  </section>
  <BlogRoll
    posts={route.pages}
    small={true}
  />
  </Layout>
)

INDEX.displayName = 'Homepage'
export default INDEX
