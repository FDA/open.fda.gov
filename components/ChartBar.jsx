/* @flow */

import React from 'react'
import getFieldValues from '../utils/getFieldValues'

const _renderBars = (data: Array<Object>, fieldValues: Object, show: number) => {
  const bars: Array<Object> = data.slice(0, show)

  // get maximum value
  const max: number = bars[0].count

  // max value * this number = 100
  const remainder: number = 100 / max

  return bars.map((result: Object, i: number) => {
    if (!result.count) return

    // the max value should equal 100%
    const width: string = `${Math.round(result.count * remainder)}%`
    // look in both places for term, coerce to string
    // because sometimes we have numbers as terms
    const term: void|string = result.term || fieldValues[result.term]

    return (
      <li
        className='pad-r-1 pad-b-2'
        tabIndex={0}
        key={i}>
        {
            (typeof term === 'string' || typeof term === 'number') &&
          <div className='clr-gray small weight-600'>
            <span className='clr-gray-dark'>
              {`${term}`.toLowerCase()}
            </span>
            &nbsp;{result.count}&nbsp;records
          </div>
        }
        {
          !term &&
          <div className='clr-gray small weight-600'>
            &nbsp;{result.count}&nbsp;records
          </div>
        }
        <span
          className='inline-block bar'
          style={{
            background: 'linear-gradient(to right, #112e51 0%, #112e51 50%, #205493 100%)',
            borderRadius: '16px',
            height: '7px',
            maxWidth: '100%',
            transition: 'width .35s ease-in-out',
            transform: 'translateZ(0)',
            width,
          }}
        />
      </li>
    )
  })
}

type tPROPS = {
  data: Array<Object>;
  fields: Object;
  countParam: string;
  show: number;
};


/**
 * @description [reactjs chart for endpoint basics pages]
 * @param  {Array<Array>} data [array of data to render. 1 index = 1 bar]
 * @param  {Object} fields     [all data for this endpoint]
 * @param  {string} countParam [countParam to filter by]
 * @param  {number} show       [number of bars to render]
 */
const ChartBar = ({ data = [{count: 0}], fields, countParam, show = 10 }: tPROPS) => {
  const fieldValues: Object = getFieldValues(countParam, fields)

  return (
    <ul
      className='col row'
      aria-label='Bar Chart'>
      <li className='visually-hidden'>
        <a
          href='#infoExplorer'>
          Skip Bar Chart. Go to visualization query explorer.
        </a>
      </li>
      {_renderBars(data, fieldValues, show)}
    </ul>
  )
}

ChartBar.displayName = 'component/ChartBar'
export default ChartBar
