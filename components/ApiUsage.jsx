import React from 'react'
import Charts from 'react-chartjs'
const Line:ReactClass = Charts.Line
import xhrGET from '../utils/xhr'
import bp from '../constants/breakpoints'
import Table from './Table'


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
        prefix: "1/api.fda.gov/",
        breadcrumbs: ["1/api.fda.gov/"]
      }
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

        data.stats.forEach(function (stat) {
          graphData.labels.push(stat.day)
          graphData.datasets[0].data.push(stat.totalCount)
        })

      }
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

      xhrGET("http://ec2-54-86-220-160.compute-1.amazonaws.com:8000/usage.json?prefix=" + this.state.prefix, (data) => {
        this.handleUsageResponse(data)
      }, false)
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


    render () {
      if (this.state.data) {

        const pathFormat = (cell, row) => {
          let p = row.path.length > 60 ? row.path.substring(0, 60) + "..." : row.path

          if (!row.terminal) {
            p = <a onClick={(e) => this.refreshPrefix(e)} data-prefix={row.descendent_prefix} >{p}</a>
          }
          return p
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
                      <tr className="bg-primary-darkest clr-white"> <td colSpan="2"><strong>Foods</strong></td></tr>
                      <tr> <td>Adverse Event Reports</td><td>{this.docCount('foodevent')}</td> </tr>
                      <tr> <td>Enforcement Reports</td><td>{this.docCount('foodenforcement')}</td> </tr>

                      <tr className="bg-primary-darkest clr-white"> <td colSpan="2"><strong>Human Drugs</strong></td></tr>
                      <tr> <td>Labeling</td><td>{this.docCount('druglabel')}</td> </tr>
                      <tr> <td>Adverse Event Reports</td><td>{this.docCount('drugevent')}</td> </tr>
                      <tr> <td>Enforcement Reports</td><td>{this.docCount('drugenforcement')}</td> </tr>

                      <tr className="bg-primary-darkest clr-white"> <td colSpan="2"><strong>Medical Devices</strong></td></tr>
                      <tr> <td>Classifications</td><td>{this.docCount('deviceclass')}</td> </tr>
                      <tr> <td>Registration and listing</td><td>{this.docCount('devicereglist')}</td> </tr>
                      <tr> <td>Premarket Approvals (PMAs)</td><td>{this.docCount('devicepma')}</td> </tr>
                      <tr> <td>510Ks</td><td>{this.docCount('deviceclearance')}</td> </tr>
                      <tr> <td>Recalls</td><td>{this.docCount('devicerecall')}</td> </tr>
                      <tr> <td>Adverse Event Reports</td><td>{this.docCount('deviceevent')}</td> </tr>
                      <tr> <td>UDIs</td><td>{this.docCount('deviceudi')}</td> </tr>
                      <tr> <td>Enforcement Reports</td><td>{this.docCount('deviceenforcement')}</td> </tr>
                    </tbody>
                  </table>

                </div>


              </div>
            </aside>

            <div className='float-r b-l-2'>
              <h2 className='txt-c marg-t-2'>API Calls in the Past 30 Days: {this.totalCount('lastThirtyDayUsage')}</h2>
              <div className='italic txt-c t-6 smallest'> {this.state.dynamicDisclaimer}</div>
              <div className='marg-l-1'>
                <Line redraw={true}
                      data={this.state.data}
                      options={{
                    animation: true,
                    maintainAspectRatio: false,
                  }}
                      height={600}
                      width={size}
                />

              </div>
              <h3 className='txt-c marg-t-3 b-t-light-1'>API Calls in Past 30 Days by Dataset</h3>
              <div className='italic txt-c t-6 smallest'> {this.state.clickEndpointDisclaimer}</div>
              <div className='marg-l-1 marg-t-1 font-size-3 b-t-light-1'>
                {
                  this.state.breadcrumbs.map((b, i) => {
                    if ((this.state.breadcrumbs.length - 1) > i) {
                      // render link
                      return (<span> {(i > 0 ? ' > ' : '') } <a key={'p' + i} onClick={(e) => this.refreshPrefix(e)} data-prefix={b}>{b.substring(0, b.length - 1).split('/').pop()}</a></span>)
                    }
                    else {
                      // render without link
                      return (<span>{ (i > 0 ? ' > ' : '') + b.substring(0, b.length - 1).split('/').pop()}</span>)
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
