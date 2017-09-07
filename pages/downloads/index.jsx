/* @flow */

import React from 'react'

import Downloads from '../../components/Downloads'
import Hero from '../../components/Hero'
import Layout from '../../components/Layout'
import SideBar from '../../components/SideBar'
import SideBarContainer from '../../containers/SideBarContainer'

import food_enforcement_meta from '../food/enforcement/_meta.yaml'
import food_event_meta from '../food/event/_meta.yaml'
import drug_enforcement_meta from '../drug/enforcement/_meta.yaml'
import drug_event_meta from '../drug/event/_meta.yaml'
import drug_label_meta from '../drug/label/_meta.yaml'
import device_510k_meta from '../device/510k/_meta.yaml'
import device_classification_meta from '../device/classification/_meta.yaml'
import device_enforcement_meta from '../device/classification/_meta.yaml'
import device_event_meta from '../device/event/_meta.yaml'
import device_pma_meta from '../device/pma/_meta.yaml'
import device_recall_meta from '../device/recall/_meta.yaml'
import device_registration_listing_meta from '../device/registrationlisting/_meta.yaml'
import device_udi_meta from '../device/udi/_meta.yaml'

const ComposedSidebar: ReactClass = SideBarContainer(SideBar)

var endpoint_list = {
  'Food': 'food_header',
  'Food Enforcement': food_enforcement_meta,
  'Food Event': food_event_meta,
  'Human Drug': 'humandrug_header',
  'Human Drug Event': drug_event_meta,
  'Human Drug Label': drug_label_meta,
  'Human Drug Enforcement': drug_enforcement_meta,
  'Medical Device': 'device_header',
  'Medical Device 510k': device_510k_meta,
  'Medical Device Classification': device_classification_meta,
  'Medical Device Enforcement': device_enforcement_meta,
  'Medical Device Event': device_event_meta,
  'Medical Device PMA': device_pma_meta,
  'Medical Device Recall': device_recall_meta,
  'Medical Device Registration Listing': device_registration_listing_meta,
  'Medical Device UDI': device_udi_meta
}

let downloads_list = Object.keys(endpoint_list).map((key: string, i: number) => {
  if (typeof endpoint_list[key] === "string") {
    return <li id={key} key={key}><h2>{key}</h2></li>
  }
  else {
    return <li id={key} key={key}><Downloads
      k={i}
      meta={endpoint_list[key]}
    /></li>
  }
})

export default () => (
  <Layout
      crumbs={['openFDA','downloads']}
      title='openFDA › Downloads'>
    <Hero
        label='Endpoint Downloads'
        title='Downloads'
        htmlDescription="true"
        description="This page provides all available endpoint downloads."
    />
    <section className='container t-marg-t-3 marg-b-3 relative row content-wrapper'>

      <ComposedSidebar
        downloads={Object.keys(endpoint_list)}
      />

      <div className="float-r ref-content" style={{  maxWidth: '100%',}}>
        <ul>
          {downloads_list}
        </ul>
      </div>
    </section>
  </Layout>
)