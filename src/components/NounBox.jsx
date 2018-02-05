/* @flow */

import React from 'react'

import Link from 'gatsby-link'

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
const NounBox = (props: tPROPS) => {
  const {
    noun_name
  } = props

  const description = {
    food: "Ensuring that the nation's food supply is sanitary, wholesome, and honestly labeled",
    medical_devices: "Overseeing medical devices from tongue depressors to surgical devices",
    drugs: "Regulating over-the-counter and prescription drugs for people in the United States",
    animal_and_veterinary: "Regulating over-the-counter and prescription products for animals in the United States"
  }

  const noun_title = {
    food: "Food",
    medical_devices: "Medical Devices",
    drugs: "Drugs",
    animal_and_veterinary: "Animal and Veterinary"
  }

  const bg_image = {
    food: '/img/grocery-bag.svg',
    medical_devices: '/img/stethoscope.svg',
    drugs: '/img/crucible.svg',
    animal_and_veterinary: '/img/pet-meds.svg'
  }
  const bg_color = {
    food: {backgroundColor: "#1FA02B"},
    medical_devices: {backgroundColor: "#F37549"},
    drugs: {backgroundColor: "#9958A3"},
    animal_and_veterinary: {backgroundColor: "#007CBA"}
  }

  const noun_path = {
    food: '/api_endpoints/food/',
    medical_devices: '/api_endpoints/device/',
    drugs: '/api_endpoints/drug/',
    animal_and_veterinary: '/api_endpoints/animal_and_veterinary/'
  }

  return (
    <section
      id='noun_card' className='noun-card marg-1'>
      <Link className='noun-box' style={bg_color[noun_name]} to={noun_path[noun_name]}>
        <div className='bg-img-container'>
          <img className='icon' src={bg_image[noun_name]}/>
        </div>
        <div className='flex-row dir-column m-pad-t-2 m-pad-b-2 noun-text-box no-flex-wrap'>
          <h3 className='txt-c clr-white pad-t-4'>{noun_title[noun_name]}</h3>
          <span className='clr-white marg-1'>{description[noun_name]}</span>
        </div>
      </Link>
    </section>
  )
}

NounBox.displayName = 'components/NounBox'
export default NounBox
