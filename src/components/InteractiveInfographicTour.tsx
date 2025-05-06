/* @flow */

import React from 'react'

import Joyride, { STATUS } from 'react-joyride'
import InfographicContainer from '../containers/InfographicContainer'


class InteractiveInfographicTour extends React.Component {

  constructor (props: Object) {
    super(props)

    this.state = {
      tourRun: false
    }

    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this)
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

  handleJoyrideCallback = data => {
    const { status, type } = data
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ tourRun: false })
    }
  };


  render (): ?React.Element {

    const steps: Array = [
      {
        target: ('#infographic-tabs'),
        content: 'These tabs represents the different charts available to view.',
        placement: 'top',
        disableBeacon: true,
        placementBeacon: 'top-end'
      },
      {
        target: ('.active'),
        content: 'The active chart is highlighted and underscored.',
        placement: 'top'
      },
      {
        target: ('#chartWrapper'),
        content: 'The chart changes as each option is selected, visualizing the results of the query.',
        placement: 'bottom'
      },
      {
        target: ('#view-select'),
        content: 'This dropdown includes all fields which can be visualized in the current chart. Try selecting a different field to see the results change.',
        placement: 'bottom'
      },
      {
        target: ('#current-query'),
        content: 'This is the current query. Note that the count parameter reflects the selected field.',
        placement: 'bottom'
      },
      {
        target: ('#params-filter'),
        content: 'These filters represent additional search parameters. Select one to further narrow the search.',
        placement: 'top'
      },
      {
        target: ('#search-parameter'),
        content: 'These are the search parameters active on the current query. If nothing is displayed, there are no search parameters applied. You can type in search parameters manually as well.',
        placement: 'bottom'
      },
      {
        target: ('#current-query'),
        content: 'The current query also includes selected search parameters.',
        placement: 'bottom'
      }
    ]

    return (
      <section>
        <Joyride
          continuous
          showSkipButton
          spotlightClicks
          steps={steps}
          styles={{
            options: {
              primaryColor: "#000",
              textColor: "#004a14",
              beaconColor: "rgba(79, 26, 0, 0.6)"
            }
          }}
          run={this.state.tourRun}
          callback={this.handleJoyrideCallback}
        />
        <InfographicContainer
          tourStart={this.handleClickStart}
          fieldsMapped={this.props.fieldsMapped}
          fieldsFlattened={this.props.fieldsFlattened}
          fields={this.props.fields}
          infographics={this.props.infographics}
          meta={this.props.meta}
        />
      </section>
    )
  }
}


export default InteractiveInfographicTour
