/* @flow */

import React from 'react'

import Downloads from '../../components/Downloads'
import Hero from '../../components/Hero'
import Layout from '../../components/Layout'

import animaldrug_event_meta from '../animaldrug/event/_meta.yaml'
import animaldrug_label_meta from '../animaldrug/label/_meta.yaml'
import animaldrug_phishpharm_meta from '../animaldrug/phishpharm/_meta.yaml'
import food_enforcement_meta from '../food/enforcement/_meta.yaml'
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
    <section className='container clearfix marg-t-3 marg-b-3 relative'>
      <div className="float-r" style={{  maxWidth: '100%',}}>
        <Downloads
          k={0}
          meta={animaldrug_event_meta}
        />
        <Downloads
          k={1}
          meta={animaldrug_label_meta}
        />
        <Downloads
          k={2}
          meta={animaldrug_phishpharm_meta}
        />
        <Downloads
          k={3}
          meta={food_enforcement_meta}
        />
        <Downloads
          k={4}
          meta={drug_enforcement_meta}
        />
        <Downloads
          k={5}
          meta={drug_event_meta}
        />
        <Downloads
          k={6}
          meta={drug_label_meta}
        />
        <Downloads
            k={1}
            meta={device_510k_meta}
        />
        <Downloads
            k={1}
            meta={device_classification_meta}
        />
        <Downloads
            k={1}
            meta={device_enforcement_meta}
        />
        <Downloads
            k={1}
            meta={device_event_meta}
        />
        <Downloads
            k={1}
            meta={device_pma_meta}
        />
        <Downloads
            k={1}
            meta={device_recall_meta}
        />
        <Downloads
            k={1}
            meta={device_registration_listing_meta}
        />
        <Downloads
            k={1}
            meta={device_udi_meta}
        />
      </div>
    </section>
  </Layout>
)