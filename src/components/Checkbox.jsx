/* @flow */

import React from 'react'


class Checkbox extends React.Component {
  state = {
    isChecked: this.props.column.isSelected,
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    if (this.props.column.isSelected !== this.state.isChecked) {
      this.setState({
        isChecked: this.props.column.isSelected
      })
    }
  }

  onMouseOver = event => {
    let e = event.toElement || event.relatedTarget;
    if (e.parentNode === this ||
      e === this) {
      return;
    }
    event.target.style.backgroundColor = "#ebf5ff"
  }

  onMouseOut = event => {
    let e = event.toElement || event.relatedTarget;
    if (e.parentNode === this ||
      e === this) {
      return;
    }
    if (this.state.isChecked) {
      event.target.style.backgroundColor = "#f5faff"
    } else {
      event.target.style.backgroundColor = "#fff"
    }
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, column } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ), () => {
      handleCheckboxChange(column)
    })
  }

  render() {
    const { column } = this.props;
    let style= this.state.isChecked ? '#f5faff': '#fff'

    return (
      <div className="checkbox"
           onMouseEnter={this.onMouseOver}
           onMouseLeave={this.onMouseOut}
           style={{backgroundColor: style}}
      >
        <label>
        <input
          type="checkbox"
          value={column.label}
          checked={this.state.isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: this.props.column.color,
            display: 'inline-block',
            margin: '0px 3px',
            paddingTop: 5
          }}
        />
        {column.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;