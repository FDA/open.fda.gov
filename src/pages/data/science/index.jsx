import React from "react";

import InfoPanel from "../../../components/joshstuff/panels/InfoPanel";
import AllocationPanel from "../../../components/joshstuff/panels/AllocationPanel";
import PerformancePanel from "../../../components/joshstuff/panels/PerformancePanel";
import PositionsPanel from "../../../components/joshstuff/panels/PositionsPanel";

export default () => {
  return (
    <div className="container panels">
{/*      <div className="panel-info">
        <InfoPanel />
      </div>*/}
      <div className="panels-top flex-row">
        <div className="panel-allocation">
          <AllocationPanel />
        </div>
        <div className="panel-balance">
          <PerformancePanel />
        </div>
      </div>
      <div className="panel-positions">
        <PositionsPanel />
      </div>
    </div>
  )
}
