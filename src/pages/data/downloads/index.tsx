/* @flow */

import React from 'react'

import Downloads from '../../../components/Downloads'
import Hero from '../../../components/Hero'
import SideBar from '../../../components/SideBar'
import SideBarContainer from '../../../containers/SideBarContainer'

import animalandveterinary_event_meta from '../../apis/animalandveterinary/event/_meta.yaml'
import cosmetic_event_meta from '../../apis/cosmetic/event/_meta.yaml'
import food_enforcement_meta from '../../apis/food/enforcement/_meta.yaml'
import food_event_meta from '../../apis/food/event/_meta.yaml'
import drug_enforcement_meta from '../../apis/drug/enforcement/_meta.yaml'
import drug_event_meta from '../../apis/drug/event/_meta.yaml'
import drug_label_meta from '../../apis/drug/label/_meta.yaml'
import drug_ndc_meta from '../../apis/drug/ndc/_meta.yaml'
import drugsfda_meta from '../../apis/drug/drugsfda/_meta.yaml'
import drug_drugshortages_meta from '../../apis/drug/drugshortages/_meta.yaml'
import drug_remsspl_meta from '../../apis/drug/remsspl/_meta.yaml'
import device_510k_meta from '../../apis/device/510k/_meta.yaml'
import device_classification_meta from '../../apis/device/classification/_meta.yaml'
import device_enforcement_meta from '../../apis/device/enforcement/_meta.yaml'
import device_event_meta from '../../apis/device/event/_meta.yaml'
import device_pma_meta from '../../apis/device/pma/_meta.yaml'
import device_recall_meta from '../../apis/device/recall/_meta.yaml'
import device_registration_listing_meta from '../../apis/device/registrationlisting/_meta.yaml'
import device_udi_meta from '../../apis/device/udi/_meta.yaml'
import device_covid19serology_meta from '../../apis/device/covid19serology/_meta.yaml'
import tobacco_problem_meta from '../../apis/tobacco/problem/_meta.yaml'
import transparency_crl_meta from '../../apis/transparency/completeresponseletters/_meta.yaml'
import other_historicaldocument_meta from '../../apis/other/historicaldocument/_meta.yaml'
import other_nsde_meta from '../../apis/other/nsde/_meta.yaml'
import other_substance_meta from '../../apis/other/substance/_meta.yaml'
import other_unii_meta from '../../apis/other/unii/_meta.yaml'

const ComposedSidebar: ReactClass = SideBarContainer(SideBar)

const endpoint_list = {
  'Animal and Veterinary': 'animalandveterinary_header',
  'Animal And Veterinary Event': animalandveterinary_event_meta,
  'Cosmetics': 'cosmetic_header',
  'Cosmetic Event': cosmetic_event_meta,
  'Food': 'food_header',
  'Food Enforcement': food_enforcement_meta,
  'Food Event': food_event_meta,
  'Human Drug': 'humandrug_header',
  'Human Drug Event': drug_event_meta,
  'Human Drug Label': drug_label_meta,
  'Human NDC Directory': drug_ndc_meta,
  'Human Drugs@FDA': drug_drugsfda_meta,
  'Human Drug Shortages': drug_drugshortages_meta,
  'Human Drug Enforcement': drug_enforcement_meta,
  'Medical Device': 'device_header',
  'Medical Device 510k': device_510k_meta,
  'Medical Device Classification': device_classification_meta,
  'Medical Device Enforcement': device_enforcement_meta,
  'Medical Device Event': device_event_meta,
  'Medical Device PMA': device_pma_meta,
  'Medical Device Recall': device_recall_meta,
  'Medical Device Registration Listing': device_registration_listing_meta,
  'Medical Device UDI': device_udi_meta,
  'COVID-19 Serological Testing Evaluations': device_covid19serology_meta,
  'Tobacco': 'tobacco_header',
  'Tobacco Problem Reports': tobacco_problem_meta,
  'Transparency': 'transparency_header',
  'Complete Response Letters': transparency_crl_meta,
  'Other': 'other_header',
  'Historical Documents': other_historicaldocument_meta,
  'NSDE': other_nsde_meta,
  'Substance': other_substance_meta,
  'UNII': other_unii_meta
}

const downloads_list = Object.keys(endpoint_list).map((key: string, i: number) => {
  if (typeof endpoint_list[key] === "string") {
    return <li id={key} key={i}><h2>{key}</h2></li>
  }

  return (<li id={key} key={i}><Downloads
    k={i}
    meta={endpoint_list[key]}
  /></li>)

})

export default () => (
  <section>
    <Hero
      label='Endpoint Downloads'
      title='Downloads'
      htmlDescription='true'
      description='This page provides all available endpoint downloads.'
    />
    <section className='container t-marg-t-3 marg-b-3 relative row content-wrapper'>

      <ComposedSidebar
        downloads={Object.keys(endpoint_list)}
      />

      <div className='float-r ref-content' style={{ maxWidth: '100%'}}>
        <ul id='downloads'>
          {downloads_list}
        </ul>
      </div>
    </section>
  </section>
)
