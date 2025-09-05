import React from "react"
import AeDrillDown from '../AeDrillDown'
import { API_LINK } from '../../constants/api'

interface PerformancePanelState {
  dropDown?: { label: string; value: string }[];
}

class PerformancePanel extends React.Component<{}, PerformancePanelState> {
  constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.getDropdown()
  }

  getDropdown () {
    fetch(API_LINK + '/other/historicaldocumentanalytics.json?count=adverse_events_mentioned.meddra_term')
      .then(res => res.json())
      .then((json => {
        if (json.results) {
          const dropdownData = json.results.map((line: any) => {
            return {label: line.term + ' (' + line.count + ')', value: line.term}
          })
          this.setState({
            dropDown: dropdownData
          })
        }
      }))
  }

  render () {
    if (this.state.dropDown === undefined) {
      return (<span/>)
    }

    return (
      <AeDrillDown dropDown={this.state.dropDown}/>
    )
  }
}

export default PerformancePanel
