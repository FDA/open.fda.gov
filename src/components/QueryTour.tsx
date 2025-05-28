/* @flow */

import React from 'react'

import Joyride, { STATUS, Step } from 'react-joyride'
import QueryExplorer from './QueryExplorer'

type tPROPS = {
  name: string,
  desc: string,
  title: string,
  query: string,
  params: Array<string>,
  k: number,
  closeTour?: () => void,
  level: number,
  results: Array<any>,
  qwery: string,
  className?: string,
  style?: Object,
  [key: string]: any,
}

type tSTATe = {
  tourRun: boolean
  stepa: Array<Step>
}

class QueryTour extends React.Component<tPROPS, tSTATe> {

  constructor (props: tPROPS) {
    super(props)

    this.state = {
      tourRun: false,
      stepa: []
    }

    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this)
    this.closeTour = this.closeTour.bind(this)
  }

  componentDidMount () {

  }


  handleClickStart = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  handleJoyrideCallback = (data: any) => {
    const { status, type } = data
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ tourRun: false })
    }
  };


  render (): any {

    const steps: Step[] = [
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
          spotlightClicks
          steps={steps}
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
          title={this.props.title} k={0} level={0} result={''} query={''}        />
      </section>
    )
  }
}


export default QueryTour
