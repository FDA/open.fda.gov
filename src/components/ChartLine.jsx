/* @flow */

import React from 'react'
import {Line} from 'react-chartjs-2'
import get from 'lodash/get'
import {default as ChartBar} from './ChartBar'

/**
 * @description [loops over the data, pulls out each year]
 * @param  {Object} data [result of the api call]
 * @return {Array<string>} [returns array of years]
 */
const _getYearsInData = (data: Array<Object>) => {
  if (!data[0] || !data[0].time) return

  // get first matching year
  // string: 2004 08 19 -> string: 2004
  let year: string = data[0].time.slice(0, 4)
  // we'll keep a record of the years so far
  // and we'll start with the first one above
  const years: Array<string> = [year]

  data.forEach(d => {
    // is the year for this bit of data
    // already accounted for?
    const oldYear: boolean = d.time.indexOf(year) !== -1

    // if yes, do nothing
    // if no, then pull out
    // the year and push that up
    if (!oldYear) {
      const newYear: string = d.time.slice(0, 4)

      year = newYear
      return years.push(newYear)
    }
  })

  // return final arr of all
  // mentioned years
  return years
}

/**
 * @description [takes in data and years, then groups said data by year]
 * @param  {Array<Object>} data [result of the api call]
 * @param  {Array<string>} years [result of _getYearsInData]
 * @return {Object} [returns an Object where each key is a year, whose values are an array of records]
 */
const _getRecordsByYear = (data: Array<Object>, years: Array<string>) => {
  const dataByYear: Object = {}

  years.forEach(y => {
    dataByYear[y] = []
  })

  data.forEach(d => {
    const year: string = d.time.slice(0, 4)
    return dataByYear[year].push(d)
  })

  return dataByYear
}

/**
 * @description [reduces records, grouped by year]
 * @param  {Object} data [takes in result of _getRecordsByYear]
 * @return {Array<number>} [returns simple array of reduced records]
 */
const _getTotalsByYear = (data: Object) => {
  return Object.keys(data).map(y => {
    return data[y]
      .map(d => d.count)
      .reduce((a, b) => a + b)
  })
}

const _getChartData = (years: Array<string>, totalsByYear: Array<number>) => {
  return {
    labels: years,
    datasets: [{
      data: totalsByYear,
      // area fill color and transparency
      backgroundColor: 'rgba(107, 218, 255, .3)',
      // line color
      borderColor: '#1ECFFF',
      // point color
      pointBackgroundColor: '#1ECFFF',
      pointBorderColor: '#112e51',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#112e51',
      // fillColor: 'rgba(17, 46, 81, .3)', B22222
      // strokeColor: '#112e51',
      // pointColor: '#112e51',
      // pointStrokeColor: '#112e51',
      // pointHighlightFill: '#fff',
      // pointHighlightStroke: '#112e51',
    }],
  }
}

type PROPS = {
  countParam: string;
  data: Array<Object>;
  height: string;
  width: string;
  fields: Array<Object>;
};


/**
 * @description [reactjs chart for endpoint basics pages]
 * @param  {string} countParam  [filter by value]
 * @param  {Array<Object>} data [an array of data cooresponding to DATES or YEARS]
 * @param  {Object} height      [height in px to render]
 * @param  {boolean} fields     [all data for endpoint]
 * @param  {number} width       [width in px to render]
 */
// const ChartLine = ({ countParam, data, height, fields, width, }: PROPS) => {

class ChartLine extends React.Component {

  constructor (props: Object) {
    super(props)
  }

  render (): ?React.Element {
    let previousChartData: Object = {}
    const years: Array<string> = _getYearsInData(this.props.data)
    let recordsByYear: Object = {}
    let totalsByYear: Array<number> = [0]
    const height = parseInt(this.props.height)
    const width = parseInt(this.props.width)

    // not every line chart is necessarily date based
    if (years) {
      recordsByYear = _getRecordsByYear(this.props.data, years)
      totalsByYear = _getTotalsByYear(recordsByYear)
    }

    // we keep track so we don't redraw unnecessarily
    // chartjs normally takes care of this on it's own
    // but because we toggle animations on / off to prevent
    // sluggishness / bugginess with big datasets
    // we have to check ourselves and then force redraw
    // sometimes this results in non-responsiveness
    // but it is better than the alternative -
    // sluggishness that persists until the user refreshes
    const currChartData: Object = previousChartData
    const nextChartData: Object = _getChartData(years, totalsByYear)
    previousChartData = nextChartData

    let dataChanged: boolean = false
    const cData: Array<number> = get(currChartData, 'datasets[0].data')
    const nData: Array<number> = get(nextChartData, 'datasets[0].data')

    if (cData && nData) {
      // if we have both current and next chart data
      // we iterate over the dataset, and if -anything-
      // is not the same, we update
      dataChanged = cData.some((d, i) => nData[i] !== d)
    }

    // if something wrong happened with the years
    // try and fall back to a bar chart
    if (!years) {
      return (
        <ChartBar
          {...this.props}
        />
      )
    }

    return (
      <span>

        <Line
          data={nextChartData}
          height={height}
          width={width}
          redraw={dataChanged}
          options={{
            maintainAspectRatio: false, responsive: false, legend: {display: false},
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
        <a
          className='visually-hidden'
          href='#infoExplorer'>
          Skip Line Chart. Go to visualization query explorer.
        </a>
        <ul aria-label='Line Chart. Query result records by year.'>
          {
            years &&
            years.length > 0 &&
            years.map((year: string, i: number) => {
              return (
                <li
                  className='visually-hidden'
                  key={i}
                  tabIndex={0}>
                  Year: {year}. Records: {totalsByYear[i]}.
                </li>
              )
            })
          }
        </ul>
      </span>
    )
  }
}

export default ChartLine
