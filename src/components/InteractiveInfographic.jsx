/* @flow */

import React from 'react'

import HeatMapInfographic from '../components/HeatMapInfographic'
import DataMapInfographic from '../components/DataMapInfographic'
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
      case "HeatMap":
        infographic = <HeatMapInfographic
          api={this.props.meta.api_path}
          dateField={this.props.meta.dateConstraintKey}
          infographicDefinitions={choice}
          parent={this}
        />
        break;
      case "DataMap":
        infographic = <DataMapInfographic 
          api={this.props.meta.api_path}
          infographicDefinitions={choice}
          parent={this}
        />
        break;
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

    // const tabs = this.props.infographicDefinitions.choices.length > 1 ? 
    //     <div className="tab">
    //       {
    //         this.props.infographicDefinitions.choices.map((choice,i) => {
    //           return (
    //             <button 
    //               key={i}
    //               onClick={() => { this.toggleInfographic(choice) } }
    //               className={this.state.choice.type === choice.type ? "tab active": "tab"}
    //             >
    //               Visualization Example #{i+1}
    //             </button>
    //           )
    //         })
    //       }
    //     </div>
    //   :   <span/>;

    // select statement
    // const selectOptons = 
    //   (
    //     <div className='select-wrap'>
    //       <select
    //       className='select clr-primary'
    //       onChange={this.handleChange}
    //       value={this.state.choice}
    //       // inline because of uncss
    //       // client side only code not picked up
    //       style={{
    //         appearance: 'none',
    //         background: '#fff',
    //         border: '1px solid #0af',
    //         borderRadius: 0,
    //         display: 'block',
    //         fontFamily: 'inherit',
    //         fontSize: '14px',
    //         outline: 0,
    //         float: 'right',
    //         width: '20%',
    //         WebkitAppearance: "none"
    //       }}>
    //       {
    //        this.props.infographicDefinitions.choices.map((choice,i) => (
    //           <option
    //             key={i}
    //             value={i}>
    //             {choice.subfield}
    //           </option>
    //         ))
    //       }
    //     </select>
    //   </div>
    //   )

    return (
      <div className="interactive-infographic-border">
        <div style={{ float: 'right', width: '20%'}}>
          <Select
            name="toggle"
            value={this.state.choosenField}
            options={this.state.options}
            onChange={this.handleChange}
            placeholder="Search the fields"
            resetValue="fields"
            clearable={false}
          />
        </div>
        {this.state.infographic}
      </div>

    )
  }
}

InteractiveInfographic.displayName = 'components/InteractiveInfographic'
export default InteractiveInfographic



        // {
        //   Object.keys(tabs).map((value,i) => {
        //     return <button 
        //             onClick={() => { handler(tabs[value])} }
        //             key={i}
        //             className={this.state.selected === value ? "tab active": "tab"}
        //           >
        //           {tabs[value].short}
        //           </button>
        //   })
        // }