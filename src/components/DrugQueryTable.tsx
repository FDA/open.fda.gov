/* @flow */

import React from 'react'

const cellCx: string = 'b-b-1 b-r-1 font-size-1 pad-2'
const smallCx: string = 'small pad-l-1 inline-block'
const ulCx: string = 'font-size-3 pad-t-1'

const DrugQueryTable = (props: Object) => (
  <section
    key={props.k}
    className='clr-gray marg-t-2 b-l-1 b-t-1'>
    <div className={cellCx}>
      Header Information
      <span className={smallCx}>Report ID, receive date, etc.</span>
    </div>
    <div className={cellCx}>
      Patient information
      <span className={smallCx}>Age, weight, sex, etc.</span>
    </div>
    <div className='flex-row'>
      <div className={`col ${cellCx}`}>
        Drugs
        <ul className={ulCx}>
          <li>Drug A suspect</li>
          <li>Drug B suspect</li>
          <li>Drug C suspect</li>
          <li>Drug D concomitant</li>
          <li>Drug E concomitant</li>
        </ul>
      </div>
      <div className={`col ${cellCx}`}>
        Patient reactions
        <ul className={ulCx}>
          <li>Reaction 1</li>
          <li>Reaction 2</li>
          <li>Reaction 3</li>
        </ul>
      </div>
    </div>
  </section>
)

DrugQueryTable.displayName = 'components/DrugQueryTable'
export default DrugQueryTable
