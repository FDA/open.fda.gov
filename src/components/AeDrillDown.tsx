import React, { Component } from 'react'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts'
import { API_LINK } from '../constants/api'
import Select from 'react-select'

const CustomTooltip: React.FC<{ active?: boolean; payload: any[]; label?: string; detail?: any; yLabel?: any }> = ({ active, payload, label, detail, yLabel }) => {
  if (active) {
    return (
      <div className='custom-tooltip'>
        <h5 className='label'>{label}</h5>
        <p className='intro'>{`${payload[0].value}`}</p>
        {detail && <p className='detail'>{`Detail: ${detail}`}</p>}
        {yLabel && <p className='yLabel'>{`Y-Axis Label: ${yLabel}`}</p>}
      </div>
    )
  }
  return null
}

interface AeDrillDownState {
  data: Array<{ name: string; total: number }>;
  dropDown: any[];
  numberOfDocs: any[];
  decade: any[];
  documents: any[];
  selectedEvent: any;
}

interface AeDrillDownProps {
  dropDown: any[];
  detail?: any;
  xAxis?: any;
}

class AeDrillDown extends Component<AeDrillDownProps, AeDrillDownState> {
  constructor (props: any) {
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

  handleChange (val: any) {
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
          const aeData: any = {}
          json.results.forEach((line: any) => {
            line.adverse_events_mentioned.forEach((x: any) => {
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
          const data: any = []
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
          ref={React.createRef()}
          data={this.state.data}
          barCategoryGap="50%" // Move here
          barGap="50%" // Move here
        >
          <XAxis dataKey='name' interval={0} />
          <YAxisR />
          <CartesianGrid strokeDasharray='8 8' />
          <Tooltip content={<CustomTooltip detail={this.props.detail} yLabel={this.props.xAxis} payload={[]} />} />
          <Legend height={36} verticalAlign='top' />
          <Bar
            dataKey='total'
            fill='#8884d8'
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    )
  }
}

export default AeDrillDown
