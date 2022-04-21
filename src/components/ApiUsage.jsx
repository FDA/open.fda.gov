import React from 'react'
import {
  VictoryChart,
  VictoryContainer,
  VictoryLegend,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLine
} from "victory"
import bp from '../constants/breakpoints'
import Table from './Table'
import { API_LINK, API_NAME } from '../constants/api'
import {default as $} from 'jquery'
import '../css/components/APIUsage.scss'

// Update total usage numbers with: https://api.fda.gov/usage.json?end_at=2022-04-01 - last 2022-04-01
// Update in pages/about/statistics/_content.yaml
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

//Graph data
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
      };
const toolTipLabel = "API Calls"
const yLegendCoordinate= -200
const customColorsList = [
  "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
  "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
  "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5",
  "#00008B"
]


class ApiUsage extends React.Component {
  constructor (props: Object) {
    super(props)

    this.nf = Intl.NumberFormat()

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
      width: 1100,
      showGrid: true,
      interpolation: "curveBasis",
      legend: [],
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
      selection:  null,
      tracker:   null,
      trackerInfoValues: [],
      columns: ["value"]
    }
  }

  componentDidMount() {
    this.fetchStats()
  }

  handleUsageResponse = (data) => {

    if (data) {

      const endpoint_paths = {
        "api.fda.gov/animalandveterinary/": {name: "Animal & Veterinary", color: "#007CBA"},
        "api.fda.gov/device/": {name: "Device", color: "#c94747"},
        "api.fda.gov/drug/": {name: "Drug", color: "#9958A3"},
        "api.fda.gov/food/": {name: "Food", color: "#51A116"},
        "api.fda.gov/other/": {name: "Other", color: "#099db7"},
        "api.fda.gov/tobacco/": {name: "Tobacco", color: "#6d5843"},
        "api.fda.gov/drug/ndc.json": {name: "NDC", color: "#542936"},
        "api.fda.gov/drug/event.json": {name: "Event", color: "#7C406B"},
        "api.fda.gov/drug/label.json": {name: "Label", color: "#9958A3"},
        "api.fda.gov/drug/enforcement.json": {name: "Enforcement", color: "#A083BD"},
        "api.fda.gov/drug/drugsfda.json": {name: "Drugs@FDA", color: "#B4AFD6"},
        "api.fda.gov/device/event.json": {name: "Event", color: "#695E1F"},
        "api.fda.gov/device/registrationlisting.json": {name: "Registration & Listing", color: "#9A5E32"},
        "api.fda.gov/device/classification.json": {name: "Classification", color: "#c94747"},
        "api.fda.gov/device/510k.json": {name: "510k Clearance", color: "#D25E73"},
        "api.fda.gov/device/enforcement.json": {name: "Enforcement", color: "#DB759B"},
        "api.fda.gov/device/recall.json": {name: "Recall", color: "#E38DBD"},
        "api.fda.gov/device/covid19serology.json": {name: "COVID-19 Serology", color: "#EAA5D8"},
        "api.fda.gov/device/udi.json": {name: "UDI", color: "#F1BEED"},
        "api.fda.gov/device/pma.json": {name: "PMA", color: "#F3D8F7"},
        "api.fda.gov/food/event.json": {name: "Event", color: "#065528"},
        "api.fda.gov/food/enforcement.json": {name: "Enforcement", color: "#51A116"},
        "api.fda.gov/other/nsde.json": {name: "NSDE", color: "#001A78"},
        "api.fda.gov/other/substance.json": {name: "Substance Data", color: "#099db7"},
        "api.fda.gov/animalandveterinary/event.json": {name: "Event", color: "#007CBA"},
        "api.fda.gov/tobacco/problem.json": {name: "Problem", color: "#6d5843"}
      }

      //console.log("data: ", data)

      graphData.table = data.table

      var dataz = [],
          endpoint_data = {},
          legend = [],
          minTime = null,
          maxTime = null,
          max = null,
          min = null;


/*        { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }*/

      data.stats.forEach(function (stat) {
        console.log("stat: ", stat)
        graphData.labels.push(stat.day)
        dataz.push({x: new Date(stat.day), y: stat.totalCount})
        graphData.datasets[0].data.push(stat.totalCount)
          stat.paths.forEach((ep) => {
          if (Object.keys(endpoint_paths).includes(ep.path)){
            //console.log("ep path: ", endpoint_paths[ep.path]['name'])
            if (Object.keys(endpoint_data).includes(endpoint_paths[ep.path]['name'])){
              endpoint_data[endpoint_paths[ep.path]['name']]['data'].push({x:new Date(stat.day), y: ep.count})
            } else {
              endpoint_data[endpoint_paths[ep.path]['name']] = {
                'color': endpoint_paths[ep.path]['color'],
                'data': [{x:new Date(stat.day), y: ep.count}]
              }
              legend.push({
                name: endpoint_paths[ep.path]['name'],
                symbol: { fill: endpoint_paths[ep.path]['color'] }
              })
            }
          }
        })

      })
      if (dataz.length){
        minTime = dataz[0][0]
        maxTime = dataz[dataz.length-1]['x']
        maxTime.setDate(maxTime.getDate() + 1)
        max = Math.max(...dataz.map((v) => v[1]))
        min = Math.min(...dataz.map((v) => v[1]))
      }
    }

    this.setState({
      series: dataz,
      endpoint_data: endpoint_data,
      legend,
      max: max,
      min: min,
      minTime: minTime,
      maxTime: maxTime,
      indexInfo: data.indexInfo,
      downloadStats: data.downloadStats || {},
      lastThirtyDayUsage: data.lastThirtyDayUsage,
      data: graphData
    })
  }

  refreshPrefix = (evt) => {
    this.setState({prefix: evt.target.getAttribute('data-prefix')})
    this.refreshBreadcrumbs()
    this.fetchStats()
  }

  refreshBreadcrumbs = () => {
    const i = this.state.breadcrumbs.indexOf(this.state.prefix)
    if (i < 0) {
        this.setState({ breadcrumbs: [...this.state.breadcrumbs, this.state.prefix] })
    }
    else if (i < (this.state.breadcrumbs.length - 1)) {
      this.setState({breadcrumbs: this.state.breadcrumbs.slice(0, i + 1)})
    }
  }

  fetchStats = () => {
    fetch(API_LINK + '/usage.json?prefix=' + this.state.prefix)
      .then((response) => {
        return response.json()
      }).then((data) => {
        this.handleUsageResponse(data)
      })
  }

  docCount = (typeName:string): string => {
    if (typeName in this.state.indexInfo) {
      return this.formatNumber(this.state.indexInfo[typeName])
    } else {
      return 0
    }
  }

  downloadCount = (typeName:string): string => {
    if (typeName in this.state.downloadStats) {
      return this.formatNumber(this.state.downloadStats[typeName])
    } else {
      return 0
    }
  }


  formatNumber = (n:number): string  => {
      return n ? this.nf.format(n) : "0"
  }

  totalCount = (typeName:string):string =>  {
    return this.formatNumber(this.state[typeName])
  }

  onHighlightChange = () => {}
  onChartResize = () => {}
  onSelectionChange = (selection) => {
    this.setState({
      selection
    })
  }

  onTrackerChanged = (tracker, selection)  => {
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
    const value = this.formatNumber(trackerEvent.toJSON().data["value"])

    this.setState({
      trackerInfoValues: [{label: toolTipLabel, value: value}],
      tracker: tracker
    })
  }

  linkClickHandler = () => {

  }

  render () {
    if (this.state.data) {
      const colors = {
        'Animal & Veterinary': "#007CBA",
        'Food': "#51A116",
        'Device': "#c94747",
        'Drug': "#9958A3",
        'Other': "#099db7",
        'Tobacco': "#6d5843"
      }

      const pathFormat = (cell, row) => {
        let p = row.path.length > 60 ? row.path.substring(0, 60) + "..." : row.path

        if (!row.terminal) {
          p = <a onClick={(e) => this.refreshPrefix(e)} data-prefix={row.descendent_prefix} >{p}</a>
        }
        return p
      }

      console.log("series: ", this.state.series, "ep data: ", this.state.endpoint_data)

      let vals = $("text").filter(function () {
        return $(this).attr("transform") == "rotate(-90)"
      })
      if(vals.length){
        $(vals[0]).attr("x",yLegendCoordinate)
      }

      let victoryGroups = Object.entries(this.state.endpoint_data).map(data => {
        return <VictoryLine
          data={data[1]['data']}
          key={data[0]}
          name={data[0]}
          style={{
            data: {
              stroke: data[1]['color'],
              strokeWidth: (d, active) => {return active ? 3 : 2;}
            },
            labels: { fill: data[1]['color'] }
          }}
        />
      })

      return (
        <div className='flex-box'>
          <aside className='relative col'>
            <div className='marg-t-2'>
              <h6 className='font-size-3 txt-c'>Total API Calls since Launch</h6>
              <h5 className='txt-c clr-green'>{this.state['sinceLaunchUsage']}</h5>
            </div>

            <div className='marg-t-2 b-t-2 pad-t-2'>
              <h5 className='usage-hash-link' onClick={() => document.getElementById("usage-by-dataset").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})}>View Usage Statistics by Dataset</h5>
            </div>
            <div className='marg-t-2 b-t-2 pad-t-2'>
              <h5 className='usage-hash-link' onClick={() => document.getElementById("dataset-downloads-scroll-anchor").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})}>View Download Statistics</h5>
            </div>

            <div className='marg-t-2 b-t-2 pad-t-2'>
              <h5 className='font-size-3 txt-c'>Size of Dataset</h5>

          <div>
            <table className="table-sm table-bordered">
              <tbody>
                <tr className="bg-primary-darkest clr-white">
                  <td colSpan="2"><strong>Animal & Veterinary</strong></td>
                </tr>
                <tr><td>Adverse Event Reports</td><td>{this.docCount('animalandveterinarydrugevent')}</td></tr>
                <tr className="bg-primary-darkest clr-white">
                  <td colSpan="2"><strong>Drugs</strong></td>
                </tr>
                <tr><td>Adverse Event Reports</td><td>{this.docCount('drugevent')}</td></tr>
                <tr><td>Labeling</td><td>{this.docCount('druglabel')}</td></tr>
                <tr><td>NDC Directory</td><td>{this.docCount('ndc')}</td></tr>
                <tr><td>Enforcement Reports</td><td>{this.docCount('drugenforcement')}</td></tr>
                <tr><td>Drugs@FDA</td><td>{this.docCount('drugsfda')}</td></tr>

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
                <tr><td>COVID-19 Serological Testing Evaluations</td><td>{this.docCount('covid19serology')}</td></tr>

                <tr className="bg-primary-darkest clr-white" id="dataset-downloads-scroll-anchor"><td colSpan="2"><strong>Tobacco</strong></td></tr>
                <tr><td>Problem Reports</td><td>{this.docCount('tobaccoproblem')}</td></tr>

                <tr className="bg-primary-darkest clr-white" id="dataset-downloads-scroll-anchor"><td colSpan="2"><strong>Other</strong></td></tr>
                <tr><td>NSDE</td><td>{this.docCount('othernsde')}</td></tr>
                <tr><td>Substance</td><td>{this.docCount('othersubstance')}</td></tr>
                </tbody>
              </table>
              </div>
            </div>

            <div className='marg-t-2 b-t-2 pad-t-2'>
              <h5 className='font-size-3 txt-c'>Dataset Downloads</h5>

              <div>
                <table className="table-sm table-bordered">
                  <tbody>
                  <tr className="bg-primary-darkest clr-white">
                    <td colSpan="2"><strong>Animal & Veterinary</strong></td>
                  </tr>
                  <tr><td>Adverse Event Reports</td><td>{this.downloadCount('animalandveterinarydrugevent')}</td></tr>
                  <tr className="bg-primary-darkest clr-white">
                    <td colSpan="2"><strong>Drugs</strong></td>
                  </tr>
                  <tr><td>Adverse Event Reports</td><td>{this.downloadCount('drugevent')}</td></tr>
                  <tr><td>Labeling</td><td>{this.downloadCount('druglabel')}</td></tr>
                  <tr><td>NDC Directory</td><td>{this.downloadCount('ndc')}</td></tr>
                  <tr><td>Enforcement Reports</td><td>{this.downloadCount('drugenforcement')}</td></tr>
                  <tr><td>Drugs@FDA</td><td>{this.downloadCount('drugsfda')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"><td colSpan="2"><strong>Foods</strong></td></tr>
                  <tr><td>Adverse Event Reports</td><td>{this.downloadCount('foodevent')}</td></tr>
                  <tr><td>Enforcement Reports</td><td>{this.downloadCount('foodenforcement')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"><td colSpan="2"><strong>Devices</strong></td></tr>
                  <tr><td>Classifications</td><td>{this.downloadCount('deviceclass')}</td></tr>
                  <tr><td>Registration and listing</td><td>{this.downloadCount('devicereglist')}</td></tr>
                  <tr><td>Premarket Approvals (PMAs)</td><td>{this.downloadCount('devicepma')}</td></tr>
                  <tr><td>510Ks</td><td>{this.downloadCount('deviceclearance')}</td></tr>
                  <tr><td>Recalls</td><td>{this.downloadCount('devicerecall')}</td></tr>
                  <tr><td>Adverse Event Reports</td><td>{this.downloadCount('deviceevent')}</td></tr>
                  <tr><td>UDIs</td><td>{this.downloadCount('deviceudi')}</td></tr>
                  <tr><td>Enforcement Reports</td><td>{this.downloadCount('deviceenforcement')}</td></tr>
                  <tr><td>COVID-19 Serological Testing Evaluations</td><td>{this.downloadCount('covid19serology')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"><td colSpan="2"><strong>Tobacco</strong></td></tr>
                  <tr><td>Problem Reports</td><td>{this.downloadCount('tobaccoproblem')}</td></tr>

                  <tr className="bg-primary-darkest clr-white"><td colSpan="2"><strong>Other</strong></td></tr>
                  <tr><td>NSDE</td><td>{this.downloadCount('othernsde')}</td></tr>
                  <tr><td>Substance</td><td>{this.downloadCount('othersubstance')}</td></tr>
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
                <VictoryChart
                  containerComponent={
                    <VictoryVoronoiContainer
                      mouseFollowTooltips
                      voronoiDimension='x'
                      labels={({ datum }) => `${datum.childName}: ${datum.y}`}
                      labelComponent={
                        <VictoryTooltip
                          cornerRadius={0}
                          flyoutStyle={{ fill: "white" }}
                        />
                      }
                    />
                  }
                  height={535}
                  width={this.state.width}
                  padding={{ top: 0, left: 60, right: 0, bottom: 40 }}
                  scale={{ x: "time" }}
                >
                  {victoryGroups}
                </VictoryChart>
              }
              <VictoryLegend
                x={60}
                y={0}
                title="Legend"
                borderPadding={{ right: 10 }}
                centerTitle
                containerComponent={<VictoryContainer height={70} width={this.state.width} responsive={false}/>}
                data={this.state.legend}
                orientation="horizontal"
                padding={{ top: 120, bottom: 60 }}
                style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
              />
            </div>

            <div id='usage-by-dataset'>
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
        </div>
      )
    }
    return (<span>Loading....</span>)
  }
}

export default ApiUsage
