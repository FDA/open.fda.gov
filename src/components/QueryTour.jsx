/* @flow */

import React from 'react'

import Joyride from 'react-joyride'
import QueryExplorer from './QueryExplorer'


class QueryTour extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
      tourRun: false
    }

    this.handleClickStart = this.handleClickStart.bind(this)
    this.callback = this.callback.bind(this)
    this.closeTour = this.closeTour.bind(this)
  }

  componentDidMount () {

  }


  handleClickStart = e => {
    e.preventDefault()

    this.setState({
      tourRun: true
    })
  }

  closeTour = () => {
    this.setState({
      tourRun: false
    })
  }

  callback = (data) => {
    const { action, index, type } = data;
  }


  render (): ?React.Element {

    const steps: Array = [
      {
        target: ('#explorer-' + this.props.name),
        content: 'This tool is intended to demonstrate an example openFDA query.',
        placement: 'top',
        disableBeacon: true,
        placementBeacon: 'top-end'
      },
      {
        target: ('#params-' + this.props.name),
        content: 'These are the parameters of the query.',
        placement: 'top'
      },
      {
        target: ('#query-' + this.props.name),
        content: 'You can use this tool to modify the query as desired.',
        placement: 'bottom'
      },
      {
        target: ('#run-query-' + this.props.name),
        content: 'Click this button to run the query.',
        placement: 'bottom'
      },
      {
        target: ('#query-result-' + this.props.name),
        content: 'The query results display here.',
        placement: 'top'
      },
      {
        target: ('#close-query-' + this.props.name),
        content: 'Click this button to close the query.',
        placement: 'bottom'
      }
    ]

    return (
      <section>
        <Joyride
          continuous
          showSkipButton
          spotlightClicks={true}
          steps={steps}
          styles={{
            options: {
              primaryColor: "#000",
              textColor: "#004a14",
              beaconColor: "rgba(79, 26, 0, 0.6)"
            }
          }}
          run={this.state.tourRun}
          callback={this.props.callback}
        />
        <QueryExplorer
          closeTour={this.closeTour}
          tourStart={this.handleClickStart}
          desc={this.props.desc}
          name={this.props.name}
          originalQuery={this.props.query}
          params={this.props.params}
          title={this.props.title}
        />
      </section>
    )
  }
}


export default QueryTour