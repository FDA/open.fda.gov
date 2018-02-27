/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import createClass from 'create-react-class'
import Select from 'react-select'
import FileSaver from 'file-saver'
import Json2csvParser from 'json2csv'


const GravatarOption = createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
  },
  handleMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  },
  handleMouseEnter (event) {
    this.props.onFocus(this.props.option, event);
  },
  handleMouseMove (event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  },
  render () {
    let gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    };
    return (
      <div className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}>
        <input type="checkbox" checked={this.props.option.show}/>
        {"  "}{ this.props.option['Header'] }
      </div>
    );
  }
});



class ResultsComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    let columns = this.props.dataset.columns
    const shownColumnsCount = columns.filter(c => c.show).length
    columns = columns.map((d,idx) => {
      d.idx = idx
      return d
    })

    this.state = {
      columns: columns, 
      placeholder: `Manage Columns ${shownColumnsCount}/${columns.length}`,
      choosenColumn: "",
      parser: new Json2csvParser.Parser()
    }
    this.onColumnToggle = this.onColumnToggle.bind(this)
    this.onExportChoosen = this.onExportChoosen.bind(this)
  }

  onColumnToggle(selectionObj){

    this.state.columns[selectionObj.idx].show = !selectionObj.show
    const shownColumnsCount = this.state.columns.filter(c => c.show).length

    this.setState({
      columns: [...this.state.columns],
      placeholder: `Manage Columns ${shownColumnsCount}/${this.state.columns.length}`
    })
  }
  onExportChoosen(selectionObj){

    if(selectionObj.label === "CSV"){
      const fields = this.state.columns.filter(c => c.show).map(c => {
        return {
          label: c['Header'],
          value: c.accessor
        }
      })
      const opts = { 
        fields,
        doubleQuote: ""
      };
       
      try {
        const csv = this.state.parser.parse(this.props.rows);
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "download.csv");
      } catch (err) {
        console.error(err);
      }
    } else {
      var blob = new Blob(this.props.rows.map(obj => JSON.stringify(obj)), {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "download.json");
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {

    if(!this.props.rows.length){
      return (<span/>)
    }

    return (
      <div>
        <div style={{
          height: 40,
          display:"flex",
          justifyContent: "space-between",
          paddingTop:10,
          paddingBottom: 43
        }}>
          <p >{this.props.rows.length} results</p>
          <div style={{
            display: "flex"
          }}>
            <Select
              name="toggle"
              optionComponent={GravatarOption}
              menuStyle={{
                maxHeight: 130
              }}
              style={{
                width: 300
              }}
              options={this.state.columns}
              onChange={this.onColumnToggle}
              resetValue="Header"
              ref={(ref)=>{this.DOMNode = ref}}
              removeSelected={false}
              clearable={false}
              closeOnSelect={false}
              placeholder={this.state.placeholder}
            />
            <div style={{paddingLeft: 30}}>
              <Select
                name="toggle"
                menuStyle={{
                  maxHeight: 130
                }}
                style={{
                  width: 80
                }}
                onChange={this.onExportChoosen}
                options={this.props.dataset.exportOptions}
                resetValue="Header"
                ref={(ref)=>{this.DOMNode = ref}}
                removeSelected={false}
                clearable={false}
                closeOnSelect={true}
                placeholder={"Export"}
              />
            </div>
          </div>
        </div>
        <ReactTable
          data={this.props.rows}
          columns={this.state.columns}
          defaultPageSize={this.props.rows.length}
          showPagination={false}
          style={{
            height: "400px",
            width: "100%"
          }}
          className="-striped -highlight"
        />
      </div>
    )
  }
}

class BarChartComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div>
      </div>
    )
  }
}

class PieChartComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div>
      </div>
    )
  }
}

class SelectedFiltersComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div style={{height:100}}>
        <h3>Selected Filters:</h3>
        <div>
          <i>Filter Here</i>
          <img src="/img/cancel_icon.png" style={{
            height:20
          }}/>
        </div>
      </div>
    )
  }
}

class DatasetExplorerContentComponent extends React.Component {

   constructor (props: Object) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    return (
      <div style={{
        width: "75%",
        marginLeft: 50
      }}>
        <div>
          <SelectedFiltersComponent/>
        </div>
        <ResultsComponent
          dataset={this.props.parent.state.dataset}
          rows={this.props.parent.state._rows}
        />
      </div>
    )
  }
}

export default DatasetExplorerContentComponent



