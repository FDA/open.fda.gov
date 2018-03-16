/* @flow */

import React from 'react'

import { default as ReactTable } from "react-table"

import createClass from 'create-react-class'
import Select from 'react-select'
import FileSaver from 'file-saver'
import Json2csvParser from 'json2csv'
import PropTypes from 'prop-types'
import Moment from 'moment'


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
      d.Cell = (props) => {
        let value = this.toTitleCase(props.value)

        let html = null

        //   <ol>
        //    { question.map(questionlist =>
        //      <li key={questionlist.key}>{questionlist.description}</li>)}}
        // </ol>


        if(props.column.filter_values && value){

          props.column.filter_values.forEach(filter_value => {
            value = value.replace(filter_value, "")
          })
          value = value.trim().replace(':','').replace(new RegExp("^s ", "i"), "")


          // var p = new RegExp(props.column.filter_regex, "i")
          // value = value.replace(p, "").replace(': ',"")
          // console.log(value)
        }
        if(props.column.split && value){
          var split = value.split(',').length > 1 ? value.split(',') : value.split('•')

          if(split.length > 1){
            html = (
              <ol style={{
                height:150,
                overflowY: "scroll"
              }}>
                {
                  split.filter(v => (v !== null && v.length !== 0 && v !== " ")).map((v,idx) =>
                    <li
                      key={`key-${idx}`}
                      style={{
                        whiteSpace: "initial"
                      }}
                    >
                     • {v.trim()}
                    </li>
                  )
                }
              </ol>
            )
          }
        }

        if(props.column.type === "date"){
          value = Moment(value).format('MM/DD/YYYY')
        }

        if(html === null){
          html = (<span style={{
                        whiteSpace: "initial"
                  }}>{ value }</span>)
        }

        return (
          html
        )
      }
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
    this.toTitleCase = this.toTitleCase.bind(this)
  }

  toTitleCase(str) {
    if(!str){
      return str
    }else if(typeof(str) === "object" && str.constructor === Array){
       str = str.join()
    }else if(typeof(str) === "object"){
       str = str[0]
    }
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

    if(this.props.rows === undefined){
      return (<span/>)
    }

    return (
      <div>
        <div style={{
          height: 40,
          display:"flex",
          justifyContent: "space-between",
          paddingTop: 40,
          paddingBottom: 43
        }}>
          <p >{this.props.rows.length} matches out of {this.props.total}</p>
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
          pageSize={100}
          columns={this.state.columns}
          defaultPageSize={this.props.rows.length}
          showPagination={false}
          minRows={10}
          style={{
            height: 800,
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

    this.state = {}
    this.formatValues = this.formatValues.bind(this)
    this.removeValue = this.removeValue.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  componentDidMount () {
  }

  removeValue(idx, valueIdx){
    const filter = this.props.parent.state.filters[idx]
    if(!filter){ return }

    if(filter.value.length){
      filter.value.splice(valueIdx, 1)
    }

    this.props.parent.state.filters[idx].value = filter.value

    this.props.parent.setState({
      filters: this.props.parent.state.filters
    })
  }

  clearAll(){
    this.props.parent.setState({
      filters: this.props.parent.state.filters.map((filter, idx) => {
        if(filter.query_type !== "range"){
          filter.value = []
        }
        return filter
      })
    })
  }

  formatValues(values){
    const filters = []
    this.props.parent.state.filters.forEach((filter,idx) => {
      if (
        filter.query_type === "term" &&
        filter.type === "checkbox"
      ){
        filter.value.forEach( (f, valueIdx) => {
          var valueObj = filter.options.filter(o => o.value === f)
          if(valueObj.length){
            filters.push({
              value: valueObj[0].label,
              label: filter.label,
              query_type: filter.query_type,
              idx: idx,
              valueIdx: valueIdx
            })
          }
        })
      } else if(
        filter.query_type === "range" &&
        filter.value.length
      ){
        const startDay = Moment(filter.value[0]).format('MM/DD/YYYY')
        const endDay = Moment(filter.value[1]).format('MM/DD/YYYY')
        filters.push({
          value: `${startDay} - ${endDay}`,
          label: filter.label,
          query_type: filter.query_type,
          idx: idx
        })
      } else if (
        filter.query_type === "term" &&
        filter.value.length &&
        filter.type !== "checkbox"
      ){
        filter.value.forEach( (f, valueIdx) => {
          filters.push({
            value: f,
            label: filter.label,
            query_type: filter.query_type,
            idx: idx,
            valueIdx: valueIdx
          })
        })
      }
    })

    return filters.map((filter, idx) => {
      return (
        <button
          key={`button${idx}`}
          onClick={() => this.removeValue(filter.idx, filter.valueIdx)}
          style={{
            padding: 5,
            borderRadius: 35,
            border: "2px solid black",
            boxShadow: "0 0 3px gray",
            backgroundColor: "white",
            marginLeft: 7,
            marginTop: 10
          }}
        >
          <i style={{
            paddingRight: 10
          }}>
            {`${filter.label}: ${filter.value}`}
          </i>
          { filter.query_type === "range" ? null :
            <img src='/img/cancel_icon.png' style={{
              height:20,
              display: 'inline',
              paddingTop: 2
            }}/>
          }
        </button>
      )
    })
  }

  render (): ?React.Element {
    const filters = this.formatValues()
    return (
      <div style={{height: "100%"}}>
        <h3>Selected Filters:</h3>
        <div
          style={{
            paddingTop: 10
          }}
        >
          {filters}
          <a
            onClick={ () => this.clearAll() }
            style={{
              paddingLeft:10,
              textDecoration: "underline",
              fontWeight: "bold"
            }}
          >
          Clear All
          </a>
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
      <div className={'dataset-explorer-content '} id='dataset-explorer-content'>
        <div>
          <SelectedFiltersComponent
            parent={this.props.parent}
          />
        </div>
        <ResultsComponent
          dataset={this.props.parent.state.dataset}
          rows={this.props.parent.state._rows}
          total={this.props.parent.state.totalRecords}
        />
      </div>
    )
  }
}

export default DatasetExplorerContentComponent



