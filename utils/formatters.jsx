import React from 'react'

const LongTextFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },

  render() {

    // overflow-x: scroll;
    // overflow-y: hidden;
    // white-space: nowrap;
    // overflowWrap: "break-word"

    var classes = {
      wordBreak: "break-all",
      whiteSpace: "normal",
      overflow: "auto",
      paddingTop: "20px",
      paddingBottom: "20px"
    };

    return (
      <div style={classes}>
        { this.props.value.length >= 160 ? this.props.value.slice(0,160) + '...' : this.props.value }
      </div>
    );
  }
});

const DeviceFormatter = React.createClass({
  propTypes: {
    value: React.PropTypes.array.isRequired
  },

  render() {
    var classes = {
      wordBreak: "break-all",
      whiteSpace: "normal",
      overflow: "auto",
      paddingTop: "20px",
      paddingBottom: "20px",
      fontSize: "12px"
    };

    const value = this.props.value.length ? this.props.value[0].openfda.device_name : "";

    return (
      <div style={classes}>
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
    var classes = {
      wordBreak: "break-all",
      whiteSpace: "normal",
      overflow: "auto",
      paddingTop: "20px",
      paddingBottom: "20px",
      fontSize: "12px"
    };

    const value = this.props.value.length ? this.props.value[0].text : "";

    return (
      <div style={classes}>
        { value.length >= 160 ? value.slice(0,160) + '...' : value }
      </div>
    );
  }
});


export  {LongTextFormatter, DeviceFormatter, EventDescriptionFormatter};