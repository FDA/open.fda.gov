/* @flow */

import React from 'react'
import cx from 'classnames'
import Charts from 'react-chartjs'
import getFieldValues from '../utils/getFieldValues'

const Doughnut: ReactClass = Charts.Doughnut

const _getChartColor = function (i: number): string {
  const colors: Array<string> = [
    '#025181',
    '#4874bd',
    '#9bdaf1',
    '#2e8540',
    '#a1c974',
    '#b7e062',
    '#571873',
    '#9a47aa',
    '#ca9af1',
  ]

  return colors[i]
}

const _getChartData = function (
  data: Array<Object>,
  fieldValues: Object,
  colors: Array<string>,
  hasLegend: boolean) {

  // $FlowIgnore because of the filter
  return data.map((d: Object, i) => {
    const color: string = !colors ? _getChartColor(i) : colors[i]
    const label: void|string = fieldValues[d.term] || d.term

    // hasLegend === main donut chart, not sidebar record chart
    // the sidebar record chart won't have labels, so we
    // check for those things so the chart doesn't err
    // we also want to limit the things we are rendering
    // to be things that are actually in fieldValues
    if (hasLegend && typeof label === 'undefined') return

    return {
      value: d.count,
      color,
      label,
    }
  }).filter(d => d)
}

type tPROPS = {
  colors: Array<string>;
  countParam: string;
  data: Array<Object>;
  fields: Object;
  hasLegend: boolean;
  records: number;
  size: string;
};

/**
 * @description [reactjs chart for endpoint basics pages]
 *              [slightly different logic depending on placement]
 * @param  {Array<string>} colors [array of acceptable colors we cycle through]
 * @param  {string} countParam [filter by value]
 * @param  {Object} fields     [all data for this endpoint]
 * @param  {boolean} hasLegend [big donut charts get legends, small ones don't]
 * @param  {number} size       [number of pxs to render. small vs big]
 */
const ChartDonut = (props: tPROPS) => {
  const {
    colors,
    countParam,
    data,
    fields,
    hasLegend,
    size,
  } = props

  const fieldValues: Object = getFieldValues(countParam, fields)
  // map over data, return as arr of obj formatted for chart js
  const chartData: Array<Object> = _getChartData(data, fieldValues, colors, hasLegend)
  // always map over all data, sometimes chartData can be a subset
  const total: number = data.map(d => d.count).reduce((a, b) => a + b)

  const legendCx = cx({
    'col t-range-6 d-3 marg-t-2 d-marg-l-2': true,
    'd-pad-l-2 overflow-scroll donut-legend': true,
  })

  const wrapperCx = cx({
    'flex-row align-center donut-wrap': true,
    'm-hide': !hasLegend,
  })

  return (
    <div className={wrapperCx}>
      <Doughnut
        data={chartData}
        height={size}
        options={{
          percentageInnerCutout: 60,
          animationEasing: 'easeInOutQuint',
          // 20 frames at 60fps == 350ms
          animationSteps: 20,
          segmentShowStroke: false,
        }}
        width={size}
        redraw="true"
      />
      {
        hasLegend &&
        <ul className={legendCx}>
          {
            chartData.map((d: Object, i) => {
              // get % of records that the current field matches
              const porCiento: number = (d.value / total) * 100 | 0

              return (
                <li
                  className='marg-b-1 clr-gray-darkest'
                  key={i}>
                  <p className='small'>
                    <span
                      className='float-l inline-block clr-white'
                      style={{
                        backgroundColor: d.color,
                        height: '10px',
                        marginRight: '5px',
                        width: '10px',
                      }}
                    />
                    <strong>{d.label}</strong><br />
                    <span className='clr-gray'>B{porCiento}% - {d.value} records</span>
                  </p>
                </li>
              )
            })
          }
        </ul>
      }
    </div>
  )
}

ChartDonut.displayName = 'component/ChartDonut'
export default ChartDonut
