/* @flow */

import React from 'react'

const Link: ReactClass = require('react-router').Link

type tPROPS = {
  endpoint_name: string
};

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} label [small text right above the title]
 * @param {string} path [the page route, for endpoint pages]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @param {string} type [endpoint or not, used for styling and tabs]
 * @return {React.Element}
 */
const Endpoint_Box = (props: tPROPS) => {
  const {
    endpoint_name
  } = props

  const description = {
    food: "Ensuring that the nation's food supply is sanitary, wholesome, and honestly labeled",
    medical_devices: "Overseeing medical devices from tongue depressors to surgical devices",
    drugs: "Regulating over-the-counter and prescription drugs for people in the United States",
    animal_and_veterinary: "Regulating over-the-counter and prescription products for animals in the United States"
  }

  const ep_name = {
    food: "Food",
    medical_devices: "Medical Devices",
    drugs: "Drugs",
    animal_and_veterinary: "Animal and Veterinary"
  }
  const bg_image = {
    food: '/img/apple.png',
    medical_devices: '/img/stethoscope.png',
    drugs: '/img/pill-bottle.png',
    animal_and_veterinary: '/img/dog.png'
  }
  const bg_image_color = {
    food: {background: "linear-gradient(to bottom right, rgba(189, 213, 120, 1), rgba(106, 186, 69, 1))"},
    medical_devices: {background: "linear-gradient(to bottom right, rgba(255, 198, 59, 1), rgba(243, 117, 73, 1))"},
    drugs: {background: "linear-gradient(to bottom right, rgba(220, 141, 188, 1), rgba(153, 88, 163, 1))"},
    animal_and_veterinary: {background: "linear-gradient(to bottom right, rgba(255, 229, 107, 1), rgba(251, 170, 24, 1))"}
  }

  const icon = {
    food: <div className="icon" style={{backgroundColor:"#E1F1DA"}}><i className="fa fa-3x fa-leaf" style={{color: "#6ABA45"}}/></div>,
    medical_devices: <div className="icon" style={{backgroundColor:"#FEDFCF"}}><i className="fa fa-3x fa-stethoscope absolute" style={{color: "#F37549"}}/></div>,
    drugs: <div className="icon" style={{backgroundColor:"#EBDEED"}}><i className="fa fa-3x fa-medkit absolute" style={{color: "#9958A3"}}/></div>,
    animal_and_veterinary: <div className="icon" style={{backgroundColor:"#FEEED1"}}><i className="fa fa-3x fa-paw absolute" style={{color: "#FBAA18"}}/></div>
  }

  const ep_path = {
    food: '/api_endpoints/food/',
    medical_devices: '/api_endpoints/device/',
    drugs: '/api_endpoints/drug/',
    animal_and_veterinary: '/api_endpoints/animal_and_veterinary/'
  }

  return (
    <section
      id='endpoint_box' className="ep-box marg-2">
      <div className="bg-img-container" style={bg_image_color[endpoint_name]}>
        <img src={bg_image[endpoint_name]}/>
      </div>
      <div className="absolute" style={{paddingBottom:"50px"}}>
        {icon[endpoint_name]}
      </div>
      <div className='flex-row dir-column m-pad-t-2 m-pad-b-2 ep-text-box no-flex-wrap'>
        <h3 className="txt-c clr-primary-darker pad-t-4">{ep_name[endpoint_name]}</h3>
        <span className="marg-1">{description[endpoint_name]}</span>
        <Link className="btn clr-primary weight-700" to={ep_path[endpoint_name]}>
          LEARN MORE<i className="fa fa-angle-right marg-l-1"/>
        </Link>
      </div>
    </section>
  )
}

Endpoint_Box.displayName = 'components/Hero'
export default Endpoint_Box
