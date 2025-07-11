/* @flow */

import React from 'react'

import { PieChart, Pie, Cell, Sector , Legend, ResponsiveContainer} from "recharts";
import Res from '../pages/data/res';

// refer to http://jsfiddle.net/ro31mjuf/

const RADIAN = Math.PI / 180;

const renderActiveShape = (props: any) => {
  const { cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          startAngle,
          endAngle,
          fill,
          payload,
          percent,
          value,
          pct,
          name,
          textLabel
        } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const subName = name !== undefined && typeof name == 'string' ? name.split('(')[0] : ''


  return (
    <g>
      <text
        x={cx}
        y={cy-10}
        dy={8}
        textAnchor="middle"
        id="textLabel1"
        className="piechart-centered-title"
      >
      </text>
      <text
        x={cx}
        y={cy+10}
        dy={8}
        textAnchor="middle"
        id="textLabel2"
        className="piechart-centered-title"
      >
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="piechart-label">{`${subName}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey+15} textAnchor={textAnchor} fill="#333" className="piechart-label">{`${pct}`}</text>
    </g>
  );
};

interface TwoLevelPieChartState {
  activeIndex: number | null;
}

class TwoLevelPieChart extends React.Component<any, TwoLevelPieChartState> {

   constructor (props: Object) {
    super(props)

    this.state = {
      activeIndex: null
    }

    this.onPieEnter = this.onPieEnter.bind(this)
    this.onPieClick = this.onPieClick.bind(this)
  }

  componentDidMount () {
    const activeIndex = this.props.default.index || 0;
    this.state = {
      activeIndex: activeIndex
    }
    this.props.parent.setState({
      activeIndex
    })
  }

  onPieEnter(data: any, index: any) {
    this.setState({
      activeIndex: index,
    });
    if(this.props.onMouseEnter!== undefined){
      this.props.onMouseEnter(data, index)
    }
  }

  onPieClick(data: any, index: any) {
    this.setState({
      activeIndex: index,
    });
    this.props.parent.setState({
      activeIndex: index
    })
    if(this.props.onClick!== undefined){
      this.props.onClick(data, index)
    }
  }

  render () {
    return (
      <PieChart
        width={this.props.width}
        height={this.props.height}
      >
        <Pie
          ref="interactivePie"
          dataKey="value"
          activeIndex={this.state.activeIndex !== null ? this.state.activeIndex : undefined}
          activeShape={renderActiveShape}
          data={this.props.data}
          cx={this.props.radius.cx}
          cy={this.props.radius.cy}
          innerRadius={this.props.radius.innerRadius}
          outerRadius={this.props.radius.outerRadius}
          fill={this.props.fill}
          onClick={this.onPieClick}
          textLabel={this.props.textLabel}
        >
          {
            this.props.data.map((entry: any, index: React.Key | null | undefined) => <Cell key={index} fill={ this.props.colors[index % this.props.colors.length] } />)
          }
        </Pie>
       </PieChart>
    );
  }
}


export default TwoLevelPieChart
