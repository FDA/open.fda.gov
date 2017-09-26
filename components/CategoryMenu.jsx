/* @flow */

import React from 'react'

const Link: ReactClass = require('react-router').Link

const CategoryMenu = () => {
  if (typeof window === 'undefined') return <span />

  var path = window.location.pathname

  const endpoints = {
    food: [
      'enforcement',
      'event'
    ],
    device: [
      'event',
      'classification',
      '510k',
      'pma',
      'registrationlisting',
      'recall',
      'enforcement',
      'udi'
    ],
    drug: [
      'event',
      'label',
      'enforcement'
    ],
    animal_and_veterinary: []
  }

  return (
    <div className='row m-pad-t-2 m-pad-b-2 t-pad-t-1 t-pad-b-1 bg-primary'>
      <nav
        aria-label='Endpoint navigation.'
        className='container flex-box align-center just-center dir-row font-size-4'>
        <div className="flex-box dir-column">
          <Link className={path.includes('food') ? 'cat-menu-item clr-white': 'cat-menu-item clr-muted-white'} to='/api_endpoints/food/'>Foods</Link>
          <div className={path.includes('food') ? 'cat-menu-underbar': 'cat-menu-underbar-hidden'}/>
        </div>
        <div className="flex-box dir-column">
          <Link className={path.includes('device') ? 'cat-menu-item clr-white ': 'cat-menu-item clr-muted-white'} to='/api_endpoints/device/'>Medical Devices</Link>
          <div className={path.includes('device') ? 'cat-menu-underbar': 'cat-menu-underbar-hidden'}/>
        </div>
        <div className="flex-box dir-column">
          <Link className={path.includes('drug') ? 'cat-menu-item clr-white': 'cat-menu-item clr-muted-white'} to='/api_endpoints/drug/'>Drugs</Link>
          <div className={path.includes('drug') ? 'cat-menu-underbar': 'cat-menu-underbar-hidden'}/>
        </div>
      </nav>
    </div>
  )
}

CategoryMenu.displayName = 'component/CategoryMenu'
export default CategoryMenu
