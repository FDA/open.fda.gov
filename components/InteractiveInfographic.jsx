/* @flow */

import React from 'react'

import HeatMapInfographic from '../components/HeatMapInfographic'
import DataMapInfographic from '../components/DataMapInfographic'

type tPROPS = {
  meta: Array<Object|string>;
  infographicDefinitions: Object;
};

const InteractiveInfographic = (props: tPROPS) => {
  const {
    infographicDefinitions,
    meta
  } = props

  if(infographicDefinitions.type == "HeatMap"){
    return (
      <HeatMapInfographic
        api={meta.api_path}
        dateField={meta.dateConstraintKey}
        startYear={infographicDefinitions.startYear}
        title={infographicDefinitions.title}
        countBy={infographicDefinitions.countBy}
        queries={infographicDefinitions.queries}
        defaults={infographicDefinitions.defaults}
        yName={infographicDefinitions.yName}
        xName={infographicDefinitions.xName}
        tooltipFormat={infographicDefinitions.tooltipFormat}
      />
    )
  } else if (infographicDefinitions.type == "DataMap") {
    return (

      <DataMapInfographic 
          api={meta.api_path}
          dateField={infographicDefinitions.dateField}
          startYear={infographicDefinitions.startYear}
          title={infographicDefinitions.title}
          countBy={infographicDefinitions.countBy}
          selectedState={infographicDefinitions.selectedState}
          dataGridProperties={infographicDefinitions.dataGridProperties}
        />
    )
  } 
}

InteractiveInfographic.displayName = 'components/InteractiveInfographic'
export default InteractiveInfographic
