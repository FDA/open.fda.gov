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
      id='noun_card' className='noun-card'>
      <Link className='noun-box' style={bg_color[noun_name]} to={noun_path[noun_name]}>
        <div className='bg-img-container'>
          <img className='icon' src={bg_image[noun_name]}/>
        </div>
        <div className='flex-row dir-column noun-text-box no-flex-wrap'>
          <h3 className='txt-c clr-white pad-t-4'>{noun_title[noun_name]}</h3>
        </div>
      </Link>
    </section>
  )
}

NounBox.displayName = 'components/NounBox'
export default NounBox
