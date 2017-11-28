/* @flow */

import React from 'react'

import HeatMapInfographic from '../components/HeatMapInfographic'
import DataMapInfographic from '../components/DataMapInfographic'
import PieChartInfographic from '../components/PieChartInfographic'
import GridInfographic from '../components/GridInfographic'

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
        infographicDefinitions={infographicDefinitions}
      />
    )
  } else if (infographicDefinitions.type == "DataMap") {
    return (

      <DataMapInfographic 
          api={meta.api_path}
          infographicDefinitions={infographicDefinitions}
        />
    )
  } else if (infographicDefinitions.type == "PieChart") {
      return (
        <PieChartInfographic
          api={meta.api_path}
          infographicDefinitions={infographicDefinitions}
        />
      )
  } else if (infographicDefinitions.type == "Grid") {
      return (
        <GridInfographic
          api={meta.api_path}
          infographicDefinitions={infographicDefinitions}
        />
      )
  } 
}

InteractiveInfographic.displayName = 'components/InteractiveInfographic'
export default InteractiveInfographic
