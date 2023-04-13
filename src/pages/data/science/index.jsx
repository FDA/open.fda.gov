import React from "react"

import AllocationPanel from "../../../components/panels/AllocationPanel"
import PerformancePanel from "../../../components/panels/PerformancePanel"
import PositionsPanel from "../../../components/panels/PositionsPanel"

export default () => {
  return (
    <div className='container panels'>
      <div className='panels-top flex-row'>
        <div className='panel-allocation'>
          <AllocationPanel />
        </div>
        <div className='panel-balance'>
          <PerformancePanel />
        </div>
      </div>
      <div className='panel-positions'>
        <PositionsPanel />
      </div>
    </div>
  )
}
