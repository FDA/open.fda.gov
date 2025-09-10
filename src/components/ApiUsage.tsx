import React from 'react'
import { TimeSeries, TimeRange} from "pondjs"
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler } from "react-timeseries-charts"
import bp from '../constants/breakpoints'
import Table from './Table'
import { API_LINK, API_NAME } from '../constants/api'
import {default as $} from 'jquery'
import '../css/components/APIUsage.scss'

// Update total usage numbers with: https://api.fda.gov/usage.json?start_at=2025-09-03 - last 2025-09-03
// Current total: 1,077 million

const nounMap = {
  drug: "Drug",
  device: "Device",
  food: "Food",
  other: "Other",
  animalandveterinary: "Animal and Veterinary",
  tobacco: "Tobacco",
  transparency: "Transparency"
}

// Update in pages/about/statistics/_content.yaml
type tPROPS = {
    clickEndpointDisclaimer: any
    accessSinceLaunch: string,
    dynamicDisclaimer: string
};

interface Stat{
  day: string
  totalCount: number
}

interface GraphData{
  labels: string[]
  datasets: {
    fillColor: string
    strokeColor: string
    pointColor: string
    pointStrokeColor: string
    pointHighlightFill: string
    pointHighlightStroke: string
    data: number[]
  }[]
  table: any
}

interface State{
  lastThirtyDayUsage: number
  sinceLaunchUsage: string
  dynamicDisclaimer: string
  clickEndpointDisclaimer: string
  data: GraphData | null
  indexInfo: any
  downloadStats: any
  prefix: string
  breadcrumbs: string[]
  width: number
  showGrid: boolean
  interpolation: string
  chartRow: {
    height: number
    trackerInfoWidth: number
  }
  enablePanZoom: boolean
  yAxis: {
    label: string
    width: number
    type: string
  }
  customColorsList: string[]
  selection: any
  tracker: any
  trackerInfoValues: any[]
  trackerTimeFormat: string
  fontSize: string
  fontFamily?: string
  color?: string | undefined
  yLegendCoordinate?: number | undefined
  toolTipLabel?: string | undefined
  columns: string[]
  series?: TimeSeries
  style?: any
  max?: number | undefined | null
  min?: number | undefined | null
  minTime?: Date
  maxTime?: Date
  timerange?: TimeRange
  highlight?: any
  docCount?: any
  downloadCount?: any
  formatNumber?: any
  totalCount?: any
  onHighlightChange?: any
  onChartResize?: any
  onSelectionChange?: any
  onTrackerChanged?: any
  linkClickHandler?: any
  refreshPrefix?: any
  refreshBreadcrumbs?: any
  fetchStats?: any
  handleUsageResponse?: any
  font: any
  [key: string]: any
}

let ApiUsage:React.FC<tPROPS> = (props:tPROPS) => {

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

  class Usage extends React.Component<{}, State> {
    nf: Intl.NumberFormat
    // handleChartResize: any

    constructor (props:tPROPS) {

      super(props)
      this.nf = Intl.NumberFormat()
      const initWidth = typeof window !== 'undefined' ? Math.max(1100, window.innerWidth - 400) : 1100

      this.state = {
        lastThirtyDayUsage: 0,
        sinceLaunchUsage: props.accessSinceLaunch,
        dynamicDisclaimer: props.dynamicDisclaimer,
        clickEndpointDisclaimer: props.clickEndpointDisclaimer,
        data: null,
        indexInfo: {},
        downloadStats: {},
        prefix: "1/" + API_NAME + "/",
        breadcrumbs: ["1/" + API_NAME + "/"],
        width: initWidth,
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
          "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#00008B"
        ],
        selection: null,
        tracker: null,
        trackerInfoValues: [],
        trackerTimeFormat: "%D",
        fontSize: "11px",
        font: "Merriweather,Georgia,serif",
        color: "#000000",
        yLegendCoordinate: -200,
        toolTipLabel: "API Calls",
        columns: ["value"]
      }

      this.onHighlightChange = this.onHighlightChange.bind(this)
      this.onSelectionChange = this.onSelectionChange.bind(this)
      this.onTrackerChanged = this.onTrackerChanged.bind(this)
      this.handleChartResize = this.handleChartResize.bind(this)
      this.handleWindowResize = this.handleWindowResize.bind(this)
    }

    componentDidMount () {
      this.fetchStats()

     if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.handleChartResize.bind(this))
      }

      this.setState({
        width: size,
        fontFamily: this.state.font,
        color: this.state.color,
        yLegendCoordinate: this.state.yLegendCoordinate,
        fontSize: this.state.fontSize
      })
    }

    componentWillUnmount () {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.handleChartResize.bind(this))
      }
    }

    handleChartResize () {
      if (typeof window !== 'undefined') {
        this.setState({
          width: Math.max(1100, window.innerWidth - 400)
        })
      }
    }
    handleWindowResize = () => {
      if (typeof window !== 'undefined') {
        this.setState({
          width: Math.max(1100, window.innerWidth - 400)
        })
      }
    }

    handleUsageResponse (data: any) {

      const graphData: GraphData = {
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

        console.log("data table: ", data.table)
        graphData.table = data.table

        const dataz: any[] = []
        var minTime = null
        var maxTime = null
        const values = []
        var max = null
        var min = null
        const that = this

        data.stats.forEach(function (stat:any){
          graphData.labels.push(stat.day)
          dataz.push([new Date(stat.day), stat.totalCount])
          graphData.datasets[0].data.push(stat.totalCount)
        })
        if (dataz.length) {
          minTime = dataz[0][0]
          maxTime = dataz[dataz.length - 1][0]
          maxTime.setDate(maxTime.getDate() + 1)
          max = Math.max(...dataz.map(v => v[1]))
          min = Math.min(...dataz.map(v => v[1]))
        }

        // set style according to categories
        var legendStyle = styler(this.state.columns.map((column, idx) => {
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

      this.setState({
      series: series,
      style: legendStyle,
      max: max,
      min: min,
      minTime: minTime,
      maxTime: maxTime,
      timerange: new TimeRange(minTime, maxTime),
      indexInfo: data.indexInfo,
      downloadStats: data.downloadStats || {},
      lastThirtyDayUsage: data.lastThirtyDayUsage,
        data: graphData
      })
      this.setState(this.state)
    }
    refreshPrefix (evt: any){
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
      const that = this
      fetch(API_LINK + '/usage.json?prefix=' + this.state.prefix)
        .then(function (response) {
          return response.json()
        }).then(function (data) {
          console.log("fetched data: ", data)
          that.handleUsageResponse(data)
        })
    }

    docCount (typeName:string):string {
      if (typeName in this.state.indexInfo) {
        return this.formatNumber(this.state.indexInfo[typeName])
      }
      return ""

    }

    downloadCount (typeName:string):string {
      if (typeName in this.state.downloadStats) {
        return this.formatNumber(this.state.downloadStats[typeName])
      }
      return ""
    }

    formatNumber (n:number):string {
      return n ? this.nf.format(n) : "0"
    }

    totalCount (typeName:string):string {
      return this.formatNumber(this.state[typeName])
    }

    onHighlightChange () {}
    onChartResize () {
      this.handleChartResize()
    }
    onSelectionChange (selection: any) {
      this.setState({
        selection
      })
    }

    onTrackerChanged (tracker: any, selection: any) {
      if (!this.state.series) {
        return
      }
      let index
      try {
        index = this.state.series.bisect(tracker)
      }
      catch (e) {
        return
      }
      const trackerEvent = this.state.series.at(index)
      const value = trackerEvent.toJSON().data.value

      this.setState({
        trackerInfoValues: [{label: this.state.toolTipLabel, value: value}],
        tracker
      })
    }

    linkClickHandler () {

    }

    render () {
      if (this.state.data) {

        const pathFormat = (cell: any, row: any) => {
          let p = row.path.length > 60 ? row.path.substring(0, 60) + "..." : row.path

          if (!row.terminal) {
            p = <a onClick={(e) => this.refreshPrefix(e)} data-prefix={row.descendent_prefix} >{p}</a>
          }
          return p
        }

        $("text").css("font-family", this.state.fontFamily ?? 'Arial')
        $('text').css('fill', this.state.color as string)
        $('text').css('font-size', this.state.fontSize)

        const vals = $("text").filter(function () {
          return $(this).attr("transform") == "rotate(-90)"
        })
        if (vals.length) {
          $(vals[0]).attr("x", this.state.yLegendCoordinate as number)
        }

        let nounName
        if (this.state.breadcrumbs.length > 1) {
          nounName = nounMap[this.state.breadcrumbs[1].substring(0, this.state.breadcrumbs[1].length - 1).split('/').pop()]
        }

        return (
          <div className='flex-box'>
            <aside className='relative col'>
              <div className='marg-t-2'>
                <h6 className='font-size-3 txt-c'>Total API Calls since Launch</h6>
                <h5 className='txt-c clr-green'>{this.state.sinceLaunchUsage}</h5>
              </div>

              <div className='marg-t-2 b-t-2 pad-t-2'>
                <h5 className='usage-hash-link' onClick={() => document.getElementById("usage-by-dataset")?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})}>View Usage Statistics by Dataset</h5>
              </div>
              <div className='marg-t-2 b-t-2 pad-t-2'>
                <h5 className='usage-hash-link' onClick={() => document.getElementById("dataset-downloads-scroll-anchor")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})}>View Download Statistics</h5>
              </div>

              <div className='marg-t-2 b-t-2 pad-t-2'>
                <h5 className='font-size-3 txt-c'>Size of Dataset</h5>
                <p className='font-size-3 txt-c'>(number of records)</p>

                <div>
                  <table className='table-sm table-bordered'>
                    <tbody>
                      <tr className='bg-primary-darkest clr-white'>
                        <td colSpan={2}><strong>Animal & Veterinary</strong></td>
                      </tr>
                      <tr><td>Adverse Event Reports</td><td>{this.docCount('animalandveterinarydrugevent')}</td></tr>
                      <tr className='bg-primary-darkest clr-white'>
                        <td colSpan={2}><strong>Drugs</strong></td>
                      </tr>
                      <tr><td>Adverse Event Reports</td><td>{this.docCount('drugevent')}</td></tr>
                      <tr><td>Labeling</td><td>{this.docCount('druglabel')}</td></tr>
                      <tr><td>NDC Directory</td><td>{this.docCount('ndc')}</td></tr>
                      <tr><td>Enforcement Reports</td><td>{this.docCount('drugenforcement')}</td></tr>
                      <tr><td>Drugs@FDA</td><td>{this.docCount('drugsfda')}</td></tr>
                      <tr><td>Drug Shortages</td><td>{this.docCount('drugshortages')}</td></tr>

                      <tr className='bg-primary-darkest clr-white'><td colSpan={2}><strong>Foods</strong></td></tr>
                      <tr><td>Adverse Event Reports</td><td>{this.docCount('foodevent')}</td></tr>
                      <tr><td>Enforcement Reports</td><td>{this.docCount('foodenforcement')}</td></tr>

                      <tr className='bg-primary-darkest clr-white'><td colSpan={2}><strong>Devices</strong></td></tr>
                      <tr><td>Classifications</td><td>{this.docCount('deviceclass')}</td></tr>
                      <tr><td>Registration and listing</td><td>{this.docCount('devicereglist')}</td></tr>
                      <tr><td>Premarket Approvals (PMAs)</td><td>{this.docCount('devicepma')}</td></tr>
                      <tr><td>510Ks</td><td>{this.docCount('deviceclearance')}</td></tr>
                      <tr><td>Recalls</td><td>{this.docCount('devicerecall')}</td></tr>
                      <tr><td>Adverse Event Reports</td><td>{this.docCount('deviceevent')}</td></tr>
                      <tr><td>UDIs</td><td>{this.docCount('deviceudi')}</td></tr>
                      <tr><td>Enforcement Reports</td><td>{this.docCount('deviceenforcement')}</td></tr>
                      <tr><td>COVID-19 Serological Testing Evaluations</td><td>{this.docCount('covid19serology')}</td></tr>

                      <tr className='bg-primary-darkest clr-white' id='dataset-downloads-scroll-anchor'> <td colSpan={2}><strong>Tobacco</strong></td></tr>
                      <tr> <td>Problem Reports</td><td>{this.docCount('tobaccoproblem')}</td> </tr>

                      <tr className='bg-primary-darkest clr-white' id='dataset-downloads-scroll-anchor'> <td colSpan={2}><strong>Transparency</strong></td></tr>
                      <tr> <td>Complete Response Letters</td><td>{this.docCount('transparencycrl')}</td> </tr>

                      <tr className='bg-primary-darkest clr-white' id='dataset-downloads-scroll-anchor'> <td colSpan={2}><strong>Other</strong></td></tr>
                      <tr> <td>Historical Documents</td><td>{this.docCount('otherhistoricaldocument')}</td> </tr>
                      <tr> <td>NSDE</td><td>{this.docCount('othernsde')}</td> </tr>
                      <tr> <td>Substance</td><td>{this.docCount('othersubstance')}</td> </tr>
                      <tr> <td>UNII</td><td>{this.docCount('otherunii')}</td> </tr>
                    </tbody>

                  </table>

                </div>


              </div>

              <div className='marg-t-2 b-t-2 pad-t-2'>
                <h5 className='font-size-3 txt-c'>Dataset Downloads</h5>
                <p className='font-size-3 txt-c'>(number of times each dataset has been downloaded)</p>

                <div>
                  <table className='table-sm table-bordered'>
                    <tbody>
                      <tr className='bg-primary-darkest clr-white'>
                        <td colSpan={2}><strong>Animal & Veterinary</strong></td>
                      </tr>
                      <tr><td>Adverse Event Reports</td><td>{this.downloadCount('animalandveterinarydrugevent')}</td></tr>
                      <tr className='bg-primary-darkest clr-white'>
                        <td colSpan={2}><strong>Drugs</strong></td>
                      </tr>
                      <tr><td>Adverse Event Reports</td><td>{this.downloadCount('drugevent')}</td></tr>
                      <tr><td>Labeling</td><td>{this.downloadCount('druglabel')}</td></tr>
                      <tr><td>NDC Directory</td><td>{this.downloadCount('ndc')}</td></tr>
                      <tr><td>Enforcement Reports</td><td>{this.downloadCount('drugenforcement')}</td></tr>
                      <tr><td>Drugs@FDA</td><td>{this.downloadCount('drugsfda')}</td></tr>
                      <tr><td>Drug Shortages</td><td>{this.downloadCount('drugshortages')}</td></tr>

                      <tr className='bg-primary-darkest clr-white'><td colSpan={2}><strong>Foods</strong></td></tr>
                      <tr><td>Adverse Event Reports</td><td>{this.downloadCount('foodevent')}</td></tr>
                      <tr><td>Enforcement Reports</td><td>{this.downloadCount('foodenforcement')}</td></tr>

                      <tr className='bg-primary-darkest clr-white'><td colSpan={2}><strong>Devices</strong></td></tr>
                      <tr><td>Classifications</td><td>{this.downloadCount('deviceclass')}</td></tr>
                      <tr><td>Registration and listing</td><td>{this.downloadCount('devicereglist')}</td></tr>
                      <tr><td>Premarket Approvals (PMAs)</td><td>{this.downloadCount('devicepma')}</td></tr>
                      <tr><td>510Ks</td><td>{this.downloadCount('deviceclearance')}</td></tr>
                      <tr><td>Recalls</td><td>{this.downloadCount('devicerecall')}</td></tr>
                      <tr><td>Adverse Event Reports</td><td>{this.downloadCount('deviceevent')}</td></tr>
                      <tr><td>UDIs</td><td>{this.downloadCount('deviceudi')}</td></tr>
                      <tr><td>Enforcement Reports</td><td>{this.downloadCount('deviceenforcement')}</td></tr>
                      <tr><td>COVID-19 Serological Testing Evaluations</td><td>{this.downloadCount('covid19serology')}</td></tr>

                      <tr className='bg-primary-darkest clr-white'><td colSpan={2}><strong>Tobacco</strong></td></tr>
                      <tr><td>Problem Reports</td><td>{this.downloadCount('tobaccoproblem')}</td></tr>

                      <tr className='bg-primary-darkest clr-white'> <td colSpan={2}><strong>Transparency</strong></td></tr>
                      <tr> <td>Complete Response Letters</td><td>{this.downloadCount('transparencycrl')}</td> </tr>

                      <tr className='bg-primary-darkest clr-white'> <td colSpan={2}><strong>Other</strong></td></tr>
                      <tr> <td>Historical Documents</td><td>{this.downloadCount('otherhistoricaldocument')}</td> </tr>
                      <tr> <td>NSDE</td><td>{this.downloadCount('othernsde')}</td> </tr>
                      <tr> <td>Substance</td><td>{this.downloadCount('othersubstance')}</td> </tr>
                      <tr> <td>UNII</td><td>{this.downloadCount('otherunii')}</td> </tr>
                    </tbody>

                  </table>

                </div>


              </div>
            </aside>

            <div className='float-r b-l-2'>
              <h2 className='txt-c marg-t-2'>{nounName} API Calls in the Past 30 Days: {this.totalCount('lastThirtyDayUsage')}</h2>
              <div className='italic txt-c t-6 smallest'> {this.state.dynamicDisclaimer}</div>
              <div className='marg-l-1'>

                { !this.state.series ? null :
                  <ChartContainer
                    timeRange={this.state.timerange}
                    enablePanZoom={this.state.enablePanZoom}
                    onTimeRangeChanged={(timerange: any) => { this.setState({ timerange }) }}
                    trackerPosition={this.state.tracker}
                    minTime={this.state.minTime}
                    maxTime={this.state.maxTime}
                    showGrid={this.state.showGrid}
                    width={this.state.width}
                    onTrackerChanged={this.onTrackerChanged}
                    onChartResize={this.onChartResize}
                  >
                    <ChartRow
                      trackerInfoValues={this.state.trackerInfoValues}
                      trackerTime={this.state.tracker}
                      trackerTimeFormat={this.state.trackerTimeFormat}
                      timeFormat={this.state.trackerTimeFormat}
                      {...this.state.chartRow}
                    >
                      <YAxis
                        id='axis1'
                        max={this.state.max}
                        min={this.state.min}
                        {...this.state.yAxis}
                      />
                      <Charts>
                        <LineChart
                          axis='axis1'
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
              <div id='usage-by-dataset'>
                <h3 className='txt-c marg-t-3 b-t-light-1'>{nounName} API Calls in Past 30 Days by Dataset</h3>
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

                      // render without link
                      return (<span key={i}>{ (i > 0 ? ' > ' : '') + b.substring(0, b.length - 1).split('/').pop()}</span>)

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
