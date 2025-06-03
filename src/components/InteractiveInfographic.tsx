/* @flow */

import React from 'react'

import PieChartInfographic from './PieChartInfographic'

import Select from 'react-select'

import '../css/components/InteractiveInfographic.scss'


interface InfographicChoice {
  subfield: string;
  subfieldLabel: string;
  type: string;
  [key: string]: any; 
}
interface infographicDefinitionsProps {
  choices: InfographicChoice[];
  globalDefs: Object;
  api_path: string;
  type?: string;
  [key: string]: any;
}

type tSTATE = {
  choice: InfographicChoice | null;
  options: Array<{ value: string; label: string }>;
  choosenField: { value: string; label: string };
  infographic?: React.ReactNode;
};

type tPROPS = {
  meta: {
    api_path: string;
  };
  infographicDefinitions: infographicDefinitionsProps;
};

class InteractiveInfographic extends React.Component<tPROPS, tSTATE> {
  static displayName: string;

  constructor (props: tPROPS) {
    super(props)


    const options = this.props.infographicDefinitions.choices.map((choice: any) => {
      return {
        value: choice.subfield,
        label: choice.subfieldLabel
      }
    })

    this.state = {
      choice: null,
      options: options,
      choosenField: options[0]
    }

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    this.handleChange(this.state.choosenField)
  }

  handleChange (value: { value: string; label: string }) {

    let choice: InfographicChoice | null = null
    this.props.infographicDefinitions.choices.forEach((obj: InfographicChoice) => {
      if (obj.subfield === value.value) {
        choice = obj
      }
    })

    if(!choice) return;

    let infographic = null

    switch ((choice as InfographicChoice).type) {
    case "PieChart":
      infographic =
          (<PieChartInfographic
            api={this.props.meta.api_path}
            infographicDefinitions={choice}
            globalDefs={this.props.infographicDefinitions.globalDefs}
            parent={this}
          />)
      break
    default:
      break
    }
    this.setState({
      infographic,
      choice,
      choosenField: value
    })
  }

  render () {
    return (
      <div id='infographic-border' className='interactive-infographic-border'>
        <div className='interactive-infographic-select'>
          { this.state.choice !== null && this.state.choice.type !== "PieChart" ? null :
            <Select
              name='toggle'
              value={this.state.choosenField}
              options={this.state.options}
              onChange={() => this.handleChange}
              placeholder='Search the fields'
            />
          }
        </div>
        {this.state.infographic}
      </div>

    )
  }
}

InteractiveInfographic.displayName = 'components/InteractiveInfographic'
export default InteractiveInfographic
