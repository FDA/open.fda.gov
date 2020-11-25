import React from "react";
import AeDrillDown from '../AeDrillDown'

class PerformancePanel extends React.Component {
  constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    this.getDropdown()
  }

  getDropdown() {
    fetch('https://openfda-api.preprod.fda.gov/other/historicaldocumentanalytics.json?count=adverse_events_mentioned.meddra_term')
      .then(res => res.json())
      .then((json => {
        if (json.results){
          let dropdown_data = json.results.map(line => {
            return {label: line['term'] + ' (' + line['count'] + ')', value: line['term']}
          })
          this.setState({
            dropDown: dropdown_data
          })
        }
      }))
  }

  render () {
    if(this.state.dropDown === undefined){
      return (<span/>)
    }

    return (
      <AeDrillDown dropDown={this.state.dropDown}/>
    )
  }
}

export default PerformancePanel