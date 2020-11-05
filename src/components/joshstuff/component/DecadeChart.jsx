import React, {Component} from 'react';
import {total_appears_cnt, total_ae, decadeArr} from "../data/mockData";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <h5 className="label">{label}</h5>
        <p className="intro">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

class DecadeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      decadeData: total_appears_cnt,
      decadeLabel: total_ae
    };
  }

  componentDidMount () {
    this.getData()
  }

  getData() {
    let data = []
    let i = 0
    while (i < 10) {
      // console.log('entry: ', entry, "i: ", i)
      data.push({name: String(this.state.decadeLabel[i]), total: this.state.decadeData[i]})
      i++
    }
    this.setState({
      data
    })
  }

  handleButtonClickDecade = e => {
    const {value} = e.target;
    console.log("value: ", value, "decadeArr: ", decadeArr)
    const isAnnual = value === "all_decades";
    const useData = decadeArr[value];

    const newData = isAnnual ? total_appears_cnt : useData['appears_cnt'];
    const newLabels = isAnnual ? total_ae : useData['ae'];

    this.setState({
      decadeData: newData,
      decadeLabel: newLabels
    }, () => {
      this.getData()
    })
  };

  render() {
    console.log("data: ", this.state.data, "decadeData: ", this.state.decadeData, "decadeLabel: ", this.state.decadeLabel)

    return (
      <div>
        <div>
          <h1 className='decade-header'>Historical Documents Trends</h1>
          <div className='decade-buttons'>
            <button
              value="all_decades"
              onClick={this.handleButtonClickDecade}
            >
              All Decades
            </button>
            <button
              value="decade1910"
              onClick={this.handleButtonClickDecade}
            >
              1910's
            </button>
            <button
              value="decade1920"
              onClick={this.handleButtonClickDecade}
            >
              1920's
            </button>
            <button
              value="decade1930"
              onClick={this.handleButtonClickDecade}
            >
              1930's
            </button>
            <button
              value="decade1940"
              onClick={this.handleButtonClickDecade}
            >
              1940's
            </button>
            <button
              value="decade1950"
              onClick={this.handleButtonClickDecade}
            >
              1950's
            </button>
            <button
              value="decade1960"
              onClick={this.handleButtonClickDecade}
            >
              1960's
            </button>
            <button
              value="decade1970"
              onClick={this.handleButtonClickDecade}
            >
              1970's
            </button>
            <button
              value="decade1980"
              onClick={this.handleButtonClickDecade}
            >
              1980's
            </button>
            <button
              value="decade1990"
              onClick={this.handleButtonClickDecade}
            >
              1990's
            </button>
            <button
              value="decade2000"
              onClick={this.handleButtonClickDecade}
            >
              2000's
            </button>
            <button
              value="decade2010"
              onClick={this.handleButtonClickDecade}
            >
              2010's
            </button>
          </div>

          <ResponsiveContainer className='chart-background bar-chart-background' height={500} width="90%">
            <BarChart
              layout="vertical"
              data={this.state.data}
            >
              <XAxis type="number"/>
              <YAxis dataKey="name" interval={0} type="category" width={110}/>
              <CartesianGrid strokeDasharray="8 8"/>
              <Tooltip content={<CustomTooltip/>} />
              <Legend height={36} verticalAlign='top'/>
              <Bar
                dataKey="total"
                fill="#8884d8"
                barCategoryGap={"50%"}
                barGap={"50%"}
              />
            </BarChart>
          </ResponsiveContainer>

          {/*<BarGraph
            data={this.state.decadeData}
            labels={this.state.decadeLabel}
          />*/}
        </div>
      </div>
    );
  }
}

export default DecadeChart;