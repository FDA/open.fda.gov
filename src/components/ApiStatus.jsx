/* @flow */

import React from 'react'
import cx from 'classnames'

import Hero from './Hero'
import ApiStatusContainer from '../containers/ApiStatusContainer'

type tPROPS = {
  data: Array<Object>;
};

const catMap: Object = Object.freeze({
  'foodenforcement': 'Foods › Enforcement Reports',
  'foodevent': 'Foods › Adverse Events',
  'drugevent': 'Drugs › Adverse Events',
  'druglabel': 'Drugs › Labeling',
  'drucndc': 'Drugs › NDC Directory',
  'drugenforcement': 'Drugs › Enforcement Reports',
  'deviceevent': 'Devices › Adverse Events',
  'devicerecall': 'Devices › Recalls',
  'deviceclass': 'Devices › Classification',
  'devicereglist': 'Devices › Registration',
  'deviceclearance': 'Devices › 510k',
  'devicepma': 'Devices › PMA',
  'deviceudi': 'Devices › UDI',
  'deviceenforcement': 'Devices › Enforcement Reports',
  'othernsde': 'Other › NSDE'
})


const endpointLinkMap: Object = Object.freeze({
  'foodevent': 'food/event',
  'foodenforcement': 'food/enforcement',
  'drugevent': 'drug/event',
  'druglabel': 'drug/label',
  'drugndc': 'drug/ndc',
  'drugenforcement': 'drug/enforcement',
  'deviceevent': 'device/event',
  'devicerecall': 'device/recall',
  'deviceclass': 'device/classification',
  'devicereglist': 'device/registrationlisting',
  'deviceclearance': 'device/510k',
  'devicepma': 'device/pma',
  'deviceudi': 'device/udi',
  'deviceenforcement': 'device/enforcement',
  'othernsde': 'other/nsde'
})

/**
 * @description [component for rendering apiStatus page]
 * @param  {Object} props [from ApiStatusContainer. has response data]
 */
const ApiStatus = (props: tPROPS) => (
  <section>
    <Hero
      label='Learn'
      title='API status'
      description='This is the current status of the openFDA API endpoints, including when they were last updated.'
    />
    <section className='container clearfix marg-t-3 marg-b-3 relative'>
      <ul className='flex-box dir-row flex-wrap'>
        {
          props.data.map((end: Object, i) => {
            const { endpoint, status, } = end

            const catCx = cx({
              'weight-600 marg-b-1': true,
              'clr-secondary': status !== 'GREEN',
              'clr-green': status === 'GREEN',
            })

            const liStyl: Object = Object.freeze({
              borderTop: status === 'GREEN' ?
                '5px solid #2e8540' :
                '5px solid #e31c3d'
            })

            const pStyl: Object = Object.freeze({
              background: status === 'GREEN' ? '#2e8540' : '#e31c3d',
            })

            return (
              <li
                key={i}
                style={liStyl}
                className='col marg-b-2 pad-2 t-3 d-2 b-1 grow-none'>
                <p className={catCx}>{catMap[endpoint]}</p>
                <p className='small'>api.fda.gov/{endpointLinkMap[endpoint]}</p>
                <ul className='flex-box'>
                  <li className='clr-base marg-r-2 small'>
                    Status
                    <p
                      style={pStyl}
                      className='clr-white marg-t-2 pad-1 txt-c weight-600'>
                      {
                        status === 'GREEN' ?
                        'OK'
                        :
                        'OFFLINE'
                      }
                    </p>
                  </li>
                  <li className='clr-base marg-r-2 small'>
                    Last Updated
                    <p className='small'>
                      {end.last_updated}
                    </p>
                  </li>
                  <li className='clr-base marg-r-2 small'>
                    Total records
                    <p className='small'>
                      {end.documents}
                    </p>
                  </li>
                </ul>
              </li>
            )
          })
        }
      </ul>
    </section>
  </section>
)

ApiStatus.displayName = 'component/ApiStatus'
export default ApiStatusContainer(ApiStatus)
