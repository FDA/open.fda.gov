/* @flow */

import React from 'react'

import Joyride, { STATUS, Step } from 'react-joyride'
import QueryExplorer from './QueryExplorer'
import type { queryTour, queryTourState } from '../types';

const steps = (name: string): Step[] => [
  {
    target: ('#explorer-' + name),
    content: 'This tool is intended to demonstrate an example openFDA query.',
    placement: 'top',
    disableBeacon: true,
    placementBeacon: 'top-end'
  },
  {
    target: ('#params-' + name),
    content: 'These are the parameters of the query.',
    placement: 'top'
  },
  {
    target: ('#query-' + name),
    content: 'You can use this tool to modify the query as desired.',
    placement: 'bottom'
  },
  {
    target: ('#run-query-' + name),
    content: 'Click this button to run the query.',
    placement: 'bottom'
  },
  {
    target: ('#query-result-' + name),
    content: 'The query results display here.',
    placement: 'top'
  },
  {
    target: ('#close-query-' + name),
    content: 'Click this button to close the query.',
    placement: 'bottom'
  }
]

class QueryTour extends React.Component<queryTour, queryTourState> {

  constructor (props: queryTour) {
    super(props)

    this.state = {
      tourRun: false,
      stepa: steps(this.props.name)
    }

    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this)
    this.closeTour = this.closeTour.bind(this)
    
  }

  handleClickStart = () => {
    this.setState({
      tourRun: true
    })
  }

  closeTour = () => {
    this.setState({
      tourRun: false
    })
  }

  handleJoyrideCallback = (data: any) => {
    const { status } = data
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ tourRun: false })
    }
  };


  render (): any {
    return (
      <section>
        <Joyride
          continuous
          showSkipButton
          spotlightClicks
          steps={this.state.stepa}
          styles={{
            options: {
              primaryColor: "#000",
              textColor: "#004a14"
            }
          }}
          run={this.state.tourRun}
          callback={this.handleJoyrideCallback}
        />
        <QueryExplorer
          closeTour={this.closeTour}
          tourStart={this.handleClickStart}
          desc={this.props.desc}
          name={this.props.name}
          originalQuery={this.props.query}
          params={this.props.params}
          title={this.props.title} k={0} level={0} result={''} query={''}        
        />
      </section>
    )
  }
}


export default QueryTour
