import React from 'react'
import { TimeSeries, TimeRange} from "pondjs"
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from "react-timeseries-charts"
import bp from '../constants/breakpoints'
import Table from './Table'
import { API_LINK, API_NAME } from '../constants/api'
import {default as $} from 'jquery'

// Update total usage numbers with: https://api.fda.gov/usage.json?end_at=2018-08-01 - last 2018-11-21
type tPROPS = {
    accessSinceLaunch: string,
    dynamicDisclaimer: string
};


// mobile sizing for infographic
// window - 40 (margin) - 40 (padding)
const hasWindow: boolean = typeof window !== 'undefined'
let size: number = hasWindow ? window.innerWidth - 80 : 300

// desktop sizing is a little more complicated
// we calculate the width based on window
// and what we know about how the layout will be
if (!bp.mob && hasWindow) {
  const winWidth: number = window.innerWidth

  // 1400 = site-container width
  // .73 = 25% sidebar + 2% margin (100 - 27)
  // .67 = width of infographic container
  // 40 = padding for infographic container
  if (winWidth >= 1400) {
    size = (1400) - 340
  }
  else if (winWidth >= 1000) {
    size = (Number(winWidth)) - 330
  }
  // tablet sizing
  else {
    size = (Number(winWidth)) - 80
  }
}


const ApiUsage = (props:tPROPS) => {

  class Usage extends React.Component {

    constructor (props:tPROPS) {

      super(props)
      this.nf = Intl.NumberFormat()

      this.state = {
        lastThirtyDayUsage: 0,
        sinceLaunchUsage: props.accessSinceLaunch,
        dynamicDisclaimer: props.dynamicDisclaimer,
        clickEndpointDisclaimer: props.clickEndpointDisclaimer,
        data: null,
        prefix: "1/" + API_NAME + "/",
        breadcrumbs: ["1/" + API_NAME + "/"],
        width: 1100,
        showGrid: true,
        interpolation: "curveBasis",
        chartRow: {
          "height": 500,
          "trackerInfoWidth": 105
        },
        enablePanZoom: false,
        yAxis: {
          "label": "Number of API Calls",
          "width": 50,
          "type": "linear"
        },
        customColorsList: [
          "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
          "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
          "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
          "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5","#00008B"
        ],
        selection:  null,
        tracker:   null,
        trackerInfoValues: [],
        trackerTimeFormat: "%D",
        fontSize: "11px",
        font: "Merriweather,Georgia,serif",
        color:"#000000",
        yLegendCoordinate: -200,
        toolTipLabel: "API Calls",
        columns: ["value"]
      }

      this.onHighlightChange = this.onHighlightChange.bind(this)
      this.onSelectionChange = this.onSelectionChange.bind(this)
      this.onTrackerChanged = this.onTrackerChanged.bind(this)
    }

    componentDidMount () {
      this.fetchStats()
    }

    handleUsageResponse (data) {

      const graphData = {
        labels: [],
        datasets: [
          {
            fillColor: "rgba(172,194,132,0.4)",
            strokeColor: "#ACC26D",
            pointColor: "#ACC26D",
            pointStrokeColor: "#9DB86D",
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#112e51',
            data: []
          }
        ],
        table: null
      }

      if (data) {

        graphData.table = data.table

        var dataz = [],
          minTime = null,
          maxTime = null,
          values = [],
          max = null,
          min = null,
          that = this;

        data.stats.forEach(function (stat) {
          graphData.labels.push(stat.day)
          dataz.push( [ new Date(stat.day), stat.totalCount])
          graphData.datasets[0].data.push(stat.totalCount)
        })
        if (dataz.length){
          minTime = dataz[0][0]
          maxTime = dataz[dataz.length-1][0]
          maxTime.setDate(maxTime.getDate() + 1)
          max = Math.max(...dataz.map(v => v[1]))
          min = Math.min(...dataz.map(v => v[1]))
        }

        // set style according to categories
        var legendStyle = styler(this.state.columns.map((column,idx)=> {
          return {
            key: column,
            color: that.state.customColorsList[0],
            width: 3
          }
        }))

        var series = new TimeSeries({
          name: "timeseries",
          columns: ["time"].concat(this.state.columns),
          points: dataz
        })
      }

      this.state.series = series
      this.state.style = legendStyle
      this.state.max = max
      this.state.min = min
      this.state.minTime = minTime
      this.state.maxTime = maxTime
      this.state.timerange = new TimeRange(minTime, maxTime)
      this.state.indexInfo = data.indexInfo
      this.state.lastThirtyDayUsage = data.lastThirtyDayUsage

      this.state.data = graphData
      this.setState(this.state)
    }
    refreshPrefix (evt) {
      this.state.prefix = evt.target.getAttribute('data-prefix')
      this.refreshBreadcrumbs()
      this.fetchStats()
    }

    refreshBreadcrumbs () {

      const i = this.state.breadcrumbs.indexOf(this.state.prefix)
      if (i < 0) {
        this.state.breadcrumbs.push(this.state.prefix)
      }
      else if (i < (this.state.breadcrumbs.length - 1)) {
        this.state.breadcrumbs = this.state.breadcrumbs.slice(0, i + 1)
      }
    }

    fetchStats () {
      var that = this
      fetch(API_LINK + '/usage.json?prefix=' + this.state.prefix)
        .then(function (response) {
          return response.json()
        }).then(function (data) {
          that.handleUsageResponse(data)
        })
    }
    docCount (typeName:string):string {
      return this.formatNumber(this.state.indexInfo[typeName])
    }
    formatNumber (n:number):string {
      return n ? this.nf.format(n) : "0"
    }

    totalCount (typeName:string):string {
      return this.formatNumber(this.state[typeName])
    }

    onHighlightChange () {}
    onChartResize () {}
    onSelectionChange(selection) {
      this.setState({ 
        selection
      })
    }

    onTrackerChanged(tracker, selection) {
      if( !this.state.series){
        return;
      }
      let index;
      try{
        index = this.state.series.bisect(tracker);
      } catch (e) {
        return;
      }
      const trackerEvent = this.state.series.at(index);
      const value = trackerEvent.toJSON().data["value"]

      this.setState({
        trackerInfoValues: [{label: this.state.toolTipLabel, value: value}],
        tracker
      })
    }

    render () {
      if (this.state.data) {

        const pathFormat = (cell, row) => {
          let p = row.path.length > 60 ? row.path.substring(0, 60) + "..." : row.path

          if (!row.terminal) {
            p = <a onClick={(e) => this.refreshPrefix(e)} data-prefix={row.descendent_prefix} >{p}</a>
          }
          return p
        }

      $("text").css("font-family",this.state.fontFamily)
      $('text').css('fill', this.state.color)
      $('text').css('font-size', this.state.fontSize)

      var vals = $("text").filter(function () {
        return $(this).attr("transform") == "rotate(-90)"
      })
      if(vals.length){
        $(vals[0]).attr("x",this.state.yLegendCoordinate)
      }

        return (
          <div className='flex-box'>
            <aside className='relative col'>
              <div className='marg-t-2'>
                <h6 className='font-size-3 txt-c'>Total API Calls since Launch</h6>
                <h5 className='txt-c clr-green'>{this.state['sinceLaunchUsage']}</h5>
              </div>

              <div className='marg-t-2 b-t-2 pad-t-2'>
                <h5 className='font-size-3 txt-c'>Size of Dataset</h5>

            <div>
              <table className="table-sm table-bordered">
                <tbody>
                  <tr className="bg-primary-darkest clr-white">
                    <td colSpan="2"><strong>Drugs</strong></td>
                  </tr>
                  <tr><td>Adverse Event Reports</td><td>{this.docCount('drugevent')}</td></tr>
                  <tr><td>Labeling</td><td>{this.docCount('druglabel')}</td></tr>
                  <tr><td>NDC Directory</td><td>{this.docCount('ndc')}</td></tr>
                  <tr><td>Enforcement Reports</td><td>{this.docCount('drugenforcement')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"><td colSpan="2"><strong>Foods</strong></td></tr>
                  <tr><td>Adverse Event Reports</td><td>{this.docCount('foodevent')}</td></tr>
                  <tr><td>Enforcement Reports</td><td>{this.docCount('foodenforcement')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"><td colSpan="2"><strong>Devices</strong></td></tr>
                  <tr><td>Classifications</td><td>{this.docCount('deviceclass')}</td></tr>
                  <tr><td>Registration and listing</td><td>{this.docCount('devicereglist')}</td></tr>
                  <tr><td>Premarket Approvals (PMAs)</td><td>{this.docCount('devicepma')}</td></tr>
                  <tr><td>510Ks</td><td>{this.docCount('deviceclearance')}</td></tr>
                  <tr><td>Recalls</td><td>{this.docCount('devicerecall')}</td></tr>
                  <tr><td>Adverse Event Reports</td><td>{this.docCount('deviceevent')}</td></tr>
                  <tr><td>UDIs</td><td>{this.docCount('deviceudi')}</td></tr>
                  <tr><td>Enforcement Reports</td><td>{this.docCount('deviceenforcement')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"> <td colSpan="2"><strong>Other</strong></td></tr>
                  <tr> <td>NSDE</td><td>{this.docCount('othernsde')}</td> </tr>
                  </tbody>

                </table>

                </div>


              </div>
            </aside>

            <div className='float-r b-l-2'>
              <h2 className='txt-c marg-t-2'>API Calls in the Past 30 Days: {this.totalCount('lastThirtyDayUsage')}</h2>
              <div className='italic txt-c t-6 smallest'> {this.state.dynamicDisclaimer}</div>
              <div className='marg-l-1'>
                
                { !this.state.series ? null : 
                  <ChartContainer 
                    timeRange={this.state.timerange} 
                    enablePanZoom={this.state.enablePanZoom}
                    onTimeRangeChanged={timerange => { this.setState({ timerange }) }}
                    trackerPosition={this.state.tracker}
                    minTime={this.state.minTime}
                    maxTime={this.state.maxTime}
                    showGrid={this.state.showGrid}
                    width={this.state.width}
                    onTrackerChanged={this.onTrackerChanged}
                    onChartResize={this.handleChartResize}
                  >
                      <ChartRow 
                        trackerInfoValues={this.state.trackerInfoValues}
                        trackerTime={this.state.tracker}
                        trackerTimeFormat={this.state.trackerTimeFormat}
                        timeFormat={this.state.trackerTimeFormat}
                        {...this.state.chartRow}
                      >
                          <YAxis 
                            id="axis1"
                            max={this.state.max}
                            min={this.state.min}
                            {...this.state.yAxis}
                          />
                          <Charts>
                              <LineChart 
                                axis="axis1"
                                style={this.state.style}
                                series={this.state.series}
                                columns={this.state.columns}
                                highlight={this.state.highlight}
                                selection={this.state.selection}
                                interpolation={this.state.interpolation}
                                onHighlightChange={this.onHighlightChange}
                                onSelectionChange={this.onSelectionChange}
                              />
                          </Charts>
                      </ChartRow>
                  </ChartContainer>
                }

              </div>
              <h3 className='txt-c marg-t-3 b-t-light-1'>API Calls in Past 30 Days by Dataset</h3>
              <div className='italic txt-c t-6 smallest'> {this.state.clickEndpointDisclaimer}</div>
              <div className='marg-l-1 marg-t-1 font-size-3 b-t-light-1'>
                {
                  this.state.breadcrumbs.map((b, i) => {
                    if ((this.state.breadcrumbs.length - 1) > i) {
                      // render link
                      return (
                        <span key={i}> 
                          {(i > 0 ? ' > ' : '') } 
                          <a 
                            key={'p' + i} 
                            onClick={(e) => this.refreshPrefix(e)} 
                            data-prefix={b}
                          >
                            {b.substring(0, b.length - 1).split('/').pop()}
                          </a>
                        </span>
                      )
                    }
                    else {
                      // render without link
                      return (<span key={i}>{ (i > 0 ? ' > ' : '') + b.substring(0, b.length - 1).split('/').pop()}</span>)
                    }
                  })
                }
              </div>
              <div className='marg-1'>

                <Table labels={['API', 'Hits']}
                       rows={this.state.data.table}
                       cols={['path', 'hits']}
                       formatters={{path: pathFormat}}/>

              </div>
            </div>

          </div>
        )
      }
      return (<span>Loading....</span>)

    }

  }
  return <Usage {...props} />

}

ApiUsage.displayName = 'component/ApiUsage'
export default ApiUsage
