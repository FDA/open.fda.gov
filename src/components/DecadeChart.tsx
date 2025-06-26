import React, {Component} from 'react'
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import { API_LINK } from '../constants/api'

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <h5 className='label'>{label}</h5>
        <p className='intro'>{`${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

interface DecadeChartProps {}

interface DecadeChartState {
  data: Array<{ name: string; total: number }>;
  decade: string;
}

class DecadeChart extends Component<DecadeChartProps, DecadeChartState> {
  constructor(props: DecadeChartProps) {
    super(props)
    this.state = {
      data: [],
      decade: 'all_decades'
    }
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    let url = API_LINK + '/other/historicaldocumentanalytics.json?limit=1000'
    if (this.state.decade !== 'all_decades') {
      url = API_LINK + '/other/historicaldocumentanalytics.json?search=decade:' + this.state.decade + '&limit=1000'
    }

    fetch(url)
      .then(res => res.json())
      .then((json => {
        if (json.results) {
          const aeData = {}
          json.results.forEach(line => {
            line.adverse_events_mentioned.forEach(x => {
              if (x.meddra_term in aeData) {
                aeData[x.meddra_term] += x.count
              }
              else {
                aeData[x.meddra_term] = x.count
              }
            })
          })
          const sortedData = Object.entries(aeData)
            .sort(([, a], [, b]) => b - a)
          const data = []
          let i = 0
          while (i < 10) {
            data.push({name: String(sortedData[i][0]), total: sortedData[i][1]})
            i++
          }
          this.setState({
            data
          })
        }
      }))
  }

  handleButtonClickDecade = e => {
    this.setState({
      decade: e.target.value
    }, () => {
      this.getData()
    })
  };

  render () {
    return (
      <div>
        <div>
          <h1 className='decade-header'>Historical Documents Trends</h1>
          <div className='decade-buttons'>
            <button
              value='all_decades'
              onClick={this.handleButtonClickDecade}
            >
                All Decades
            </button>
            <button
              value='1910'
              onClick={this.handleButtonClickDecade}
            >
                1910's
            </button>
            <button
              value='1920'
              onClick={this.handleButtonClickDecade}
            >
                1920's
            </button>
            <button
              value='1930'
              onClick={this.handleButtonClickDecade}
            >
                1930's
            </button>
            <button
              value='1940'
              onClick={this.handleButtonClickDecade}
            >
                1940's
            </button>
            <button
              value='1950'
              onClick={this.handleButtonClickDecade}
            >
                1950's
            </button>
            <button
              value='1960'
              onClick={this.handleButtonClickDecade}
            >
                1960's
            </button>
            <button
              value='1970'
              onClick={this.handleButtonClickDecade}
            >
                1970's
            </button>
            <button
              value='1980'
              onClick={this.handleButtonClickDecade}
            >
                1980's
            </button>
            <button
              value='1990'
              onClick={this.handleButtonClickDecade}
            >
                1990's
            </button>
            <button
              value='2000'
              onClick={this.handleButtonClickDecade}
            >
                2000's
            </button>
            <button
              value='2010'
              onClick={this.handleButtonClickDecade}
            >
                2010's
            </button>
          </div>


          <ResponsiveContainer className='chart-background bar-chart-background' height={500} width='90%'>
            <BarChart
              layout='vertical'
              data={this.state.data}
            >
              <XAxis type='number'/>
              <YAxis dataKey='name' interval={0} type='category' width={110}/>
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
      </div>
    )
  }
}

export default DecadeChart
