/* @flow */

import React from 'react'
import cx from 'classnames'
import {Doughnut} from 'react-chartjs-2'
import getFieldValues from '../utils/getFieldValues'

const _getChartColor = function (i: number): string {
  const colors: Array<string> = [
    '#1ECFFF',
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
  return {
    labels: data.map((d: Object) => fieldValues[d.term] || d.term),
    datasets: [
      {
        data: data.map((d: Object) => d.count),
        backgroundColor: data.map((d: Object, i) => !colors ? _getChartColor(i) : colors[i])
      }
    ]
  }
}

type tPROPS = {
  colors: Array<string>;
  countParam: string;
  data: Array<Object>;
  fields: Object;
  hasLegend: boolean;
  records: number;
  size: string;
  divSize: string;
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
    divSize,
    size,
  } = props

  const fieldValues: Object = getFieldValues(countParam, fields)
  // map over data, return as arr of obj formatted for chart js
  const chartData: Object = _getChartData(data, fieldValues, colors, hasLegend)
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
      <div style={{ width: divSize, paddingBottom: 70, paddingTop: 30, display: 'flex', justifyContent: 'center'}}>
        <Doughnut
          data={chartData}
          height={size}
          width={size}
          options={{
            cutoutPercentage: 60,
            animation: {
              animationEasing: 'easeInOutQuint',
              duration: 350
            },
            segmentShowStroke: false,
            maintainAspectRatio: false,
            responsive: false,
            legend: {display: false}
          }}
        />
      </div>
      {
        hasLegend &&
        <ul className={legendCx}>
          {
            chartData.datasets[0].data.slice(0,7).map((d: number, i) => {
              // get % of records that the current field matches
              const porCiento: number = (d / total) * 100 | 0

              return (
                <li
                  className='marg-b-1 clr-gray-darkest'
                  key={i}>
                  <p className='small'>
                    <span
                      className='float-l inline-block clr-white'
                      style={{
                        backgroundColor: chartData.datasets[0].backgroundColor[i],
                        height: '10px',
                        marginRight: '5px',
                        width: '10px',
                      }}
                    />
                    <strong>{chartData.labels[i]}</strong><br />
                    <span className='clr-gray'>{porCiento}% - {d} records</span>
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
