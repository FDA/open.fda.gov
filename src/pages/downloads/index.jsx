/* @flow */

import React from 'react'

import Downloads from '../../components/Downloads'
import Hero from '../../components/Hero/index'
import SideBar from '../../components/SideBar/index'
import SideBarContainer from '../../containers/SideBarContainer'

//Endpoint Meta Files
import animalandveterinary_event_meta from '../apis/animalandveterinary/event/_meta.yaml'
import food_enforcement_meta from '../apis/food/enforcement/_meta.yaml'
import food_event_meta from '../apis/food/event/_meta.yaml'
import drug_enforcement_meta from '../apis/drug/enforcement/_meta.yaml'
import drug_event_meta from '../apis/drug/event/_meta.yaml'
import drug_label_meta from '../apis/drug/label/_meta.yaml'
import drug_ndc_meta from '../apis/drug/ndc/_meta.yaml'
import device_510k_meta from '../apis/device/510k/_meta.yaml'
import device_classification_meta from '../apis/device/classification/_meta.yaml'
import device_enforcement_meta from '../apis/device/enforcement/_meta.yaml'
import device_event_meta from '../apis/device/event/_meta.yaml'
import device_pma_meta from '../apis/device/pma/_meta.yaml'
import device_recall_meta from '../apis/device/recall/_meta.yaml'
import device_registration_listing_meta from '../apis/device/registrationlisting/_meta.yaml'
import device_udi_meta from '../apis/device/udi/_meta.yaml'
import device_covid19serology_meta from '../apis/device/covid19serology/_meta.yaml'
import other_nsde_meta from '../apis/other/nsde/_meta.yaml'
import other_substance_meta from '../apis/other/substance/_meta.yaml'

// Source Files
import comprehensive_ndc_meta from './_comprehensive_ndc_meta.yaml'
import electronic_animal_drug_product_listing_directory from './_electronic_animal_drug_listing_meta.yaml'
import ndc_nhric_labeler_codes from './_ndc_nhric_labeler_codes_meta.yaml'

const ComposedSidebar: ReactClass = SideBarContainer(SideBar)

var endpoint_list = {
  'Animal and Veterinary': 'animalandveterinary_header',
  'Animal And Veterinary Event': animalandveterinary_event_meta,
  'Food': 'food_header',
  'Food Enforcement': food_enforcement_meta,
  'Food Event': food_event_meta,
  'Human Drug': 'humandrug_header',
  'Human Drug Event': drug_event_meta,
  'Human Drug Label': drug_label_meta,
  'Human NDC Directory': drug_ndc_meta,
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
  'Other': 'other_header',
  'NSDE': other_nsde_meta,
  'Substance': other_substance_meta,
  'Source Files': 'source_files_header',
  'Comprehensive NDC SPL Data Elements': comprehensive_ndc_meta,
  'Electronic Animal Drug Product Listing Directory': electronic_animal_drug_product_listing_directory,
  'NDC NHRIC Labeler Codes': ndc_nhric_labeler_codes
}

const source_files = [
  'Comprehensive NDC SPL Data Elements',
  'Electronic Animal Drug Product Listing Directory',
  'NDC NHRIC Labeler Codes'
]

let downloads_list = Object.keys(endpoint_list).map((key: string, i: number) => {
  if (typeof endpoint_list[key] === "string") {
    console.log("key: ", key)
    return <li id={key} key={i}><h2>{key}</h2></li>
  } else if (source_files.includes(key)) {
    console.log("key: ", key)
    return <li id={key} key={i}>
      <section className='marg-t-1 marg-b-1 clearfix'>
        <a href={endpoint_list[key].api_path}>{endpoint_list[key].title}</a>
      </section>
    </li>
  } else {
    return <li id={key} key={i}><Downloads
        k={i}
        meta={endpoint_list[key]}
    /></li>
  }
})

export default () => (
  <section>
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

      <div className="float-r ref-content" style={{  maxWidth: '100%'}}>
        <ul id='downloads'>
          {downloads_list}
        </ul>
      </div>
    </section>
  </section>
)