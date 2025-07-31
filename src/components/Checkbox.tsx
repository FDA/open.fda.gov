/* @flow */

import React from 'react'


interface CheckboxProps {
  column: {
    isSelected: boolean;
    label: string;
    color: string;
  };
  handleCheckboxChange: (column: any) => void;
}

interface CheckboxState {
  isChecked: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  state: CheckboxState = {
    isChecked: this.props.column.isSelected,
  }

  componentDidUpdate (prevProps: any, prevState: any, snapshot: any): void {
    if (this.props.column.isSelected !== this.state.isChecked) {
      this.setState({
        isChecked: this.props.column.isSelected
      })
    }
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, column } = this.props

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ), () => {
      handleCheckboxChange(column)
    })
  }

  render () {
    const { column } = this.props
    const style = this.state.isChecked ? '#f5faff' : '#fff'

    return (
      <label
        className='checkbox'
        style={{backgroundColor: style}}
      >
        <input
          type='checkbox'
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
    )
  }
}

export default Checkbox
