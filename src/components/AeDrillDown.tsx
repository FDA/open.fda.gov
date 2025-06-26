import React, { Component } from 'react'
import Select from 'react-select'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts'
import { API_LINK } from '../constants/api'

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: any }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className='custom-tooltip'>
        <h5 className='label'>{label}</h5>
        <p className='intro'>{`${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

interface AeDrillDownState {
  data: any[];
  dropDown: any[];
  numberOfDocs: any[];
  decade: any[];
  documents: any[];
  selectedEvent: any;
}

interface AeDrillDownProps {
  dropDown?: any;
  detail?: any;
  xAxis?: any;
}

class AeDrillDown extends Component<AeDrillDownProps, AeDrillDownState> {
  constructor (props: AeDrillDownProps) {
    super(props)

    this.state = {
      data: [],
      dropDown: [],
      numberOfDocs: [],
      decade: [],
      documents: [],
      selectedEvent: props.dropDown ? props.dropDown[0] : undefined
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
          const aeData: { [key: string]: number } = {}
          json.results.forEach((line: { adverse_events_mentioned: any[]; decade: string; }) => {
            line.adverse_events_mentioned.forEach((x: { meddra_term: any; count: any; }) => {
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
          const data: { name: string; total: unknown; }[] = []
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
            data={this.state.data}
          >
            <XAxis dataKey='name' interval={0}/>
            <YAxisR />
            <CartesianGrid strokeDasharray='8 8'/>
            <Tooltip content={<CustomTooltip />} />
            <Legend height={36} verticalAlign='top'/>
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
