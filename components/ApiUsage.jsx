import React from 'react'
import Charts from 'react-chartjs'
const Line:ReactClass = Charts.Line
import xhrGET from '../utils/xhr'
import bp from '../constants/breakpoints'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


type tPROPS = {
    frequency: string
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
        size = (1400 * 1) - 340
    } else if(winWidth >= 1000) {
        size = (winWidth * 1) - 330
    }
    // tablet sizing
    else {
        size = (winWidth * 1) - 80
    }
}


const ApiUsage = (props:tPROPS) => {

    class Usage extends React.Component {

        constructor(props:tPROPS) {

            super(props);
            this.nf = Intl.NumberFormat();

            this.state = {
                lastThirtyDayUsage: 0,
                sinceLaunchUsage: 0,
                thisYearUsage: 0,
                data: null,
                prefix: "1/api.fda.gov/",
                breadcrumbs : ["1/api.fda.gov/"]
            };
        }

        componentDidMount () {
            this.fetchStats()
        }

        handleUsageResponse(data) {

            var graphData = {
                labels: [],
                datasets: [
                    {
                        fillColor: 'rgba(17, 46, 81, .3)',
                        strokeColor: '#112e51',
                        pointColor: '#112e51',
                        pointStrokeColor: '#112e51',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: '#112e51',
                        data : []
                    }
                ],
                table: null
            };

            if (data) {

                graphData.table = data.table;

                data.stats.forEach(function(stat){
                    graphData.labels.push(stat.day);
                    graphData.datasets[0].data.push(stat.totalCount);
                });

            }
            this.state.indexInfo = data.indexInfo;
            this.state.lastThirtyDayUsage = this.state.lastThirtyDayUsage || data.lastThirtyDayUsage;
            this.state.sinceLaunchUsage = this.state.sinceLaunchUsage || data.sinceLaunchUsage;
            this.state.thisYearUsage = this.state.thisYearUsage || data.thisYearUsage;

            this.state.data = graphData;
            this.setState(this.state);
        }
        refreshPrefix(evt) {
            this.state.prefix = evt.target.getAttribute('data-prefix');
            this.refreshBreadcrumbs();
            this.fetchStats();
        }
        refreshBreadcrumbs() {

            let i = this.state.breadcrumbs.indexOf(this.state.prefix);
            if (i < 0) {
                this.state.breadcrumbs.push(this.state.prefix);
            } else if (i < (this.state.breadcrumbs.length - 1)) {
                this.state.breadcrumbs = this.state.breadcrumbs.slice(0, i+1);
            }
        }

        fetchStats(){

            xhrGET("http://e41f8c87.ngrok.io/usage.json?prefix=" + this.state.prefix, (data)=>{
                this.handleUsageResponse(data);
            }, false)
        }
        docCount(typeName:string):string {
            return this.formatNumber(this.state.indexInfo[typeName]);
        }
        formatNumber(n:number):string {
            return n ? this.nf.format(n) : "0";
        }

        totalCount(typeName:string):string {
            return this.formatNumber(this.state[typeName]);
        }


        render() {
            if (this.state.data) {

                var pathFormat = (cell, row) => {
                    let p =  row.path.length  > 60 ? row.path.substring(0, 60) + "..." : row.path;

                    if (!row.terminal) {
                        p = <a onClick={(e)=>this.refreshPrefix(e)} data-prefix={row.descendent_prefix} >{p}</a>
                    }
                    return p;
                }

                return (
                    <div className="flex-box">
                        <aside id="sidebarWrap" className="relative col sb">
                            <div className="marg-t-4">
                                <h6 className="font-size-3 txt-c">API Calls to date in 2016</h6>
                                <h5 className="txt-c">{this.totalCount('thisYearUsage')}</h5>
                            </div>
                            <div>
                                <h6 className="font-size-3 txt-c">API Calls since Launch</h6>
                                <h5 className="txt-c">{this.totalCount('sinceLaunchUsage')}</h5>
                            </div>
                            <div>
                                <h5 className="font-size-3 txt-c">Current APIs</h5>

                                <div className="usage-api t-marg-b-3">
                                    <h6 className="small">For Human Drugs</h6>
                                    <ul>
                                        <li className="usage-api-li">Labeling (more than {this.docCount('druglabel')} drugs currently on the market)</li>
                                        <li className="usage-api-li">Reports on negative side effects ({this.docCount('drugevent')} since 2003)</li>
                                        <li className="usage-api-li">Enforcement reports ({this.docCount('recall')} records since 2012)</li>
                                    </ul>
                                </div>

                                <div className="usage-api t-marg-b-3">
                                    <h6 className="font-size-5">For Devices</h6>
                                    <ul>
                                        <li className="usage-api-li">Classification of {this.docCount('deviceclass')} distince types of devices organized into 16 medical specialities (6,000 records)</li>
                                        <li className="usage-api-li">Registration and listing ({this.docCount('devicereglist')} records)</li>
                                        <li className="usage-api-li">Premarket approvals (PMAs) and approval supplements ({this.docCount('devicepma')} records since 1997)</li>
                                        <li className="usage-api-li">Clearence through premarket notifications (510ks)and granted de novo requests ({this.docCount('deviceclearance')} records since 1996)</li>
                                        <li className="usage-api-li">Recalls ({this.docCount('devicerecall')} records since 2000)</li>
                                        <li className="usage-api-li">Adverse event reports ({this.docCount('deviceevent')} since 1991)</li>
                                        <li className="usage-api-li">Universal device identifiers ({this.docCount('deviceudi')} since September 2016)</li>
                                    </ul>
                                </div>

                                <div className="usage-api t-marg-b-3">
                                    <h6 className="small">For Foods</h6>
                                    <ul>
                                        <li className="usage-api-li">Enforcement reports (more than {this.docCount('recall')} records since 2012)</li>
                                    </ul>
                                </div>

                            </div>
                        </aside>

                        <div className="float-r">
                            <h4>API Calls in the past 30 Days: {this.totalCount('lastThirtyDayUsage')}</h4>
                            <Line redraw={true}
                                  data={this.state.data}
                                  options={{
                                animation: true,
                                maintainAspectRatio: false,
                            }}
                                  height={600}
                                  width={size}
                            />
                            <h4>API Calls in Past 30 Days by Dataset</h4>
                            <div>
                                {
                                    this.state.breadcrumbs.map((b, i) => {
                                        if(i > 0) {
                                            return (<span> > <a key={'p' + i} onClick={(e)=>this.refreshPrefix(e)} data-prefix={b}>{b.substring(0, b.length-1).split('/').pop()}</a></span> )
                                        }
                                        return (<a key={'p' + i} onClick={(e)=>this.refreshPrefix(e)} data-prefix={b}>{b.substring(0, b.length-1).split('/').pop()}</a>)

                                    })
                                }
                            </div>
                            <div>

                                <BootstrapTable data={this.state.data.table} striped={true} hover={true}  >
                                    <TableHeaderColumn dataField="path" isKey={true} dataFormat={pathFormat} dataSort={true}>API</TableHeaderColumn>
                                    <TableHeaderColumn dataField="hits" dataSort={true}>Hits</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>

                    </div>
                );
            }
            return (<span>Loading....</span>)

        }

    }
    return <Usage />;

}

ApiUsage.displayName = 'component/ApiUsage'
export default ApiUsage