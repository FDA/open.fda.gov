/* @flow */

import React from 'react'

import PieChartInfographic from '../components/PieChartInfographic'
import GridInfographic from '../components/GridInfographic'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

type tPROPS = {
  meta: Array<Object|string>;
  infographicDefinitions: Object;
};

class InteractiveInfographic extends React.Component {

  constructor (props: tPROPS) {
    super(props)
    
    
    const options = this.props.infographicDefinitions.choices.map(choice => {
      return {
        value: choice.subfield,
        label: choice.subfieldLabel
      }
    })

    this.state = {
      choice : null,
      options: options,
      choosenField: options[0]
    };
    console.log(this.state.options)

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    this.handleChange(this.state.choosenField)
  }

  handleChange (value) {

    let choice = null
    this.props.infographicDefinitions.choices.forEach(obj => {
      if(obj.subfield == value.value){
        choice = obj
      }
    })

    let infographic = null;
    
    switch (choice.type) {
      case "PieChart":
        infographic = 
          <PieChartInfographic
            api={this.props.meta.api_path}
            infographicDefinitions={choice}
            globalDefs={this.props.infographicDefinitions.globalDefs}
            parent={this}
          />
        break;
      case "Grid":
        infographic = 
          <GridInfographic
            api={this.props.meta.api_path}
            infographicDefinitions={choice}
            parent={this}
          />
        break;
        default:
          break;
    }
    this.setState({ 
      infographic,
      choice,
      choosenField: value.value
    })
  };

  render (): ?React.Element {

    return (
      <div id="infographic-border" className="interactive-infographic-border">
        <div className="interactive-infographic-select">
          { this.state.choice !== null && this.state.choice.type !== "PieChart" ? null :
            <Select
              name="toggle"
              value={this.state.choosenField}
              options={this.state.options}
              onChange={this.handleChange}
              placeholder="Search the fields"
              resetValue="fields"
              clearable={false}
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
