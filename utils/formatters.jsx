import React from 'react'

const LongTextFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="long-text-formatter">
        { this.props.value.length >= 160 ? this.props.value.slice(0,160) + '...' : this.props.value }
      </div>
    );
  }
});

const ShortTextFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="long-text-formatter">
        { this.props.value.length >= 100 ? this.props.value.slice(0,100) + '...' : this.props.value }
      </div>
    );
  }
});

const DeviceFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.array.isRequired
  },

  render() {

    const value = this.props.value.length ? this.props.value[0].openfda.device_name : "";

    return (
      <div className="long-text-formatter">
        { value.length >= 160 ? value.slice(0,160) + '...' : value }
      </div>
    );
  }
});

const EventDescriptionFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.array.isRequired
  },

  render() {
    var value = ""
    this.props.value.forEach(val => {
      if(val.text_type_code.startsWith("Description")) {
        value = val.text
      }
    })
    return (
      <div className="long-text-formatter">
        { value.length >= 120 ? value.slice(0,120) + '...' : value }
      </div>
    );
  }
});



export  {LongTextFormatter, DeviceFormatter, EventDescriptionFormatter, ShortTextFormatter};