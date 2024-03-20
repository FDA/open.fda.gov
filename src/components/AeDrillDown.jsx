import React, { Component } from 'react'
import Select from 'react-select'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'Recharts'
import { API_LINK } from '../constants/api'

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className='custom-tooltip'>
        <h5 className='label'>{label}</h5>
        <p className='intro'>{`${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

class AeDrillDown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      dropDown: [],
      numberOfDocs: [],
      decade: [],
      documents: [],
      selectedEvent: props.dropDown[0]
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  handleChange (val) {
    this.setState({
      selectedEvent: val
    }, () => {
      this.getData()
    })
  }

  getData () {
    const selectedEvent = this.state.selectedEvent.value
    const url = API_LINK + '/other/historicaldocumentanalytics.json?search=adverse_events_mentioned.meddra_term:'
        + selectedEvent + '&limit=1000'

    fetch(url)
      .then(res => res.json())
      .then((json => {
        if (json.results) {
          const aeData = {}
          json.results.forEach(line => {
            line.adverse_events_mentioned.forEach(x => {
              if (x.meddra_term === selectedEvent) {
                if (line.decade in aeData) {
                  aeData[line.decade] += x.count
                }
                else {
                  aeData[line.decade] = x.count
                }
              }
            })
          })
          const data = []
          Object.entries(aeData).forEach(entry => {
            data.push({
              name: entry[0],
              total: entry[1]
            })
          })
          this.setState({
            data: data
          })
        }
      }))
  }

  render () {
    if (this.state.selectedEvent === undefined) {
      return (<span/>)
    }

    return (
      <div>
        <h1 className='drill-down-header'>Reactions By Decade</h1>
        <Select
          name='adverse events'
          onChange={this.handleChange}
          options={this.props.dropDown}
          placeholder='Select adverse event'
          aria-label='Select adverse event'
          defaultValue={this.props.dropDown[0]}
        />

        <ResponsiveContainer className='chart-background bar-chart-background' height={500}>
          <BarChart
            ref='bar'
            data={this.state.data}
          >
            <XAxis dataKey='name' interval={0}/>
            <YAxisR />
            <CartesianGrid strokeDasharray='8 8'/>
            <Tooltip content={<CustomTooltip detail={this.props.detail} yLabel={this.props.xAxis}/>} />
            <Legend height={36} verticalAlign='top'/>
            <Bar
              dataKey='total'
              fill='#8884d8'
              barCategoryGap={"50%"}
              barGap={"50%"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default AeDrillDown
