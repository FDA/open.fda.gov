import React from "react";
import AeDrillDown from '../component/AeDrillDown'

class PerformancePanel extends React.Component {
  constructor (props: Object) {
    super(props)

    this.state = {
      data: ["14987", "16259", "15700", "18193", "22181", "21269", "20319"]
    }
  }

  render () {
    return (
      <AeDrillDown/>
    )
  }
}

export default PerformancePanel