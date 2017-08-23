/* @flow */

import React from 'react'

import Hero from '../components/Hero'
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
    <Hero
      label='openFDA'
      title='Open-source APIs and a developer community for FDA data'
    />
    <section className='flex-box dir-column just-center'>
      <div className="txt-c marg-3 clr-primary-darker weight-700"><h2>API Endpoint Categories</h2></div>
      <div className='container flex-row just-between'>
        <Endpoint_Box endpoint_name="food"/>
        <Endpoint_Box endpoint_name="medical_devices"/>
        <Endpoint_Box endpoint_name="drugs"/>
        <Endpoint_Box endpoint_name="animal_and_veterinary"/>
      </div>
      <div className="txt-c marg-2 clr-primary weight-700">VIEW ALL <i className="fa fa-angle-right"/></div>
    </section>
    <section className='flex-box just-between'>
      <div className="relative clr-white" style={{width: "50%", marginRight: "2px", backgroundColor: "#00B1CB"}}>
        <div className="marg-3 marg-r-4 marg-l-4 flex-box dir-column just-center absolute" style={{zIndex: "1"}}>
          <h3 className="marg-b-1">API Usage Statistics</h3>
          <span>This site also offers an overview of the usage of API endpoints by the community.</span>
          <div>
            <Link className="btn marg-t-2 weight-700 bg-white" style={{color: "#00B1CB"}} to='/api/statistics/'>
              VIEW USAGE ACTIVITY   <i className="fa fa-arrow-right marg-l-1"/>
            </Link>
          </div>
        </div>
        <img className="pad-t-3 absolute bottom" src="/img/area-chart.svg"/>
      </div>
      <div className="relative clr-primary-darker" style={{width: "50%", marginLeft: "2px", backgroundColor: "#DEF1F5"}}>
        <div className="marg-3 marg-r-4 marg-l-4 flex-box dir-column just-center absolute" style={{zIndex: "1"}}>
          <h3 className="marg-b-1">Download OpenFDA Data</h3>
          <span>The endpoints' data may be downloaded in zipped JSON format.</span>
          <div>
            <Link className="btn marg-t-2 weight-700 clr-white" style={{backgroundColor: "#007CBA"}} to='/downloads/'>
              DOWNLOAD ENDPOINTS<i className="fa fa-arrow-right marg-l-1"/>
            </Link>
          </div>
        </div>
        <img className="pad-t-4" src="/img/down-arrows.svg"/>
      </div>
    </section>
  <section className='flex-box just-center blue-code-container'>
    <div className="marg-3">
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
