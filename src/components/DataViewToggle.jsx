/* @flow */

import React from 'react'

type tPROPS = {
  visualization: boolean,
  handleToggleChange: Function
};

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} label [small text right above the title]
 * @param {string} path [the page route, for endpoint pages]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @param {string} type [endpoint or not, used for styling and tabs]
 * @return {React.Element}
 */
const DataViewToggle = (props: tPROPS) => {
  const {
    visualization,
    toggleTable,
    toggleChart
  } = props


  return (
    <div className='data-view-toggle'>
      <div className={visualization ? '': 'grey-background'} onClick={toggleTable}>
        <i className='fa fa-lg fa-table' />
        <span>Table View</span>
      </div>
      <div className={visualization ? 'grey-background': ''} onClick={toggleChart}>
        <i className='fa fa-lg fa-bar-chart' />
        <span>Chart View</span>
      </div>
    </div>
  )
}

DataViewToggle.displayName = 'components/Disclaimer'
export default DataViewToggle
