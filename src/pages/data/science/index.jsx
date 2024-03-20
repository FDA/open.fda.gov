import React from "react"

import PerformancePanel from "../../../components/panels/PerformancePanel"
import PositionsPanel from "../../../components/panels/PositionsPanel"
import DecadeChart from "../../../components/DecadeChart"

export default () => {
  return (
    <main className='container panels'>
      <div className='panels-top flex-row'>
        <div className='panel-allocation'>
          <DecadeChart />
        </div>
        <div className='panel-balance'>
          <PerformancePanel />
        </div>
      </div>
      <div className='panel-positions'>
        <PositionsPanel />
      </div>
    </main>
  )
}
