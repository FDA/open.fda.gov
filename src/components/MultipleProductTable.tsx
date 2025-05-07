/* @flow */

import React from 'react'

const cellCx: string = 'b-b-1 b-r-1 font-size-2 pad-2'
const smallCx: string = 'small pad-l-1 inline-block'
const ulCx: string = 'font-size-3 weight-300 pad-t-1'

const MultipleProductTable = (props: Object) => (
  <section
    key={props.k}
    className='clr-gray marg-t-2 marg-b-2 b-l-1 b-t-1'>
    <div className={cellCx}>
      General Information
      <span className={smallCx}>Report ID, receive date, etc.</span>
    </div>
    <div className={cellCx}>
      Patient or other information
      <span className={smallCx}>Age, weight, sex, etc.</span>
    </div>
    <div className='flex-row'>
      <div className={`col weight-700 ${cellCx}`}>
        Products
        <ul className={ulCx}>
          <li>Product A</li>
          <li>Product B</li>
          <li>Product C</li>
          <li>Product D</li>
          <li>Product E</li>
        </ul>
      </div>
      <div className={`col weight-700 ${cellCx}`}>
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

MultipleProductTable.displayName = 'components/MultipleProductTable'
export default MultipleProductTable
