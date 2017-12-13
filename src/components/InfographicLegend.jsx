import React from 'react'

const InfographicLegend = React.createClass({
  propTypes: {
    ranges:React.PropTypes.array.isRequired,
    styles: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired
  },
  getStyle(color){  
    return { backgroundColor: color}
  },

  render() {
    return (
      <div style={this.props.styles}>
          <p className="infographic-legend-title"> {this.props.title}</p>
          <table className="infographic-legend-table">
            <tbody>
              { this.props.ranges.map( (obj, index) => 
                  <tr key={index}><td>
                      <span className="infographic-legend-tr" style={this.getStyle(obj.color)}>{' '}</span>{'  '}{obj.name}
                  </td></tr>
              )}
            </tbody>
          </table>
        </div>
    );
  }
});



export  {InfographicLegend};