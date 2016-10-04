import React from 'react'
import Charts from 'react-chartjs'
const Line:ReactClass = Charts.Line
import xhrGET from '../utils/xhr'
import bp from '../constants/breakpoints'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


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
        size = (1400 * 1) - 80
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

            this.state = {
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
                    <div>
                        <Line redraw={true}
                            data={this.state.data}
                            options={{
                                animation: true,
                                maintainAspectRatio: false,
                            }}
                          height={600}
                          width={size}
                        />
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
                                <TableHeaderColumn dataField="path" isKey={true} dataFormat={pathFormat} dataSort={true}>Path</TableHeaderColumn>
                                <TableHeaderColumn dataField="hits" dataSort={true}>Hits</TableHeaderColumn>
                            </BootstrapTable>
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