import React from "react"
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { API_LINK } from '../../constants/api'

type PositionsPanelState = {
  columns: any[],
  data: any[],
  pageSize: number,
  filtered?: any,
  resized?: any,
  sorted?: any,
  page?: any
}

class PositionsPanel extends React.Component<{}, PositionsPanelState> {
  tableBodyRef: React.RefObject<HTMLDivElement>;
  constructor(props: Object) {
    super(props)
    this.tableBodyRef = React.createRef() as React.RefObject<HTMLDivElement>
    this.state = {
      columns: [
        {
          'Header': 'Decade',
          'accessor': 'decade'
        },
        {
          'Header': 'Publication Year',
          'accessor': 'pub_year'
        },
        // {
        //   'Header': 'Historical Document',
        //   'accessor': 'file_name'
        // },
        {
          'Header': 'Reactions Mentioned',
          'accessor': 'ae',
          Cell: (row: { value: any[] }) => (
            <ol style={{
              height: 100,
              overflowY: "scroll"
            }}>
              {/* <li>{row.value}</li>*/}
              {row.value.map((v: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: any) =>
                <li key={`key-${idx}`} style={{ whiteSpace: "initial" }}>• {v}</li>
              )}
            </ol>
          )
        },
      ],
      data: [],
      pageSize: 25
    }
    this.getData = this.getData.bind(this)
  }

  handleChange() {
    const body = document.querySelector('.ReactTable .rt-tbody') as HTMLDivElement;
    if (body) {
      body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch(API_LINK + '/other/historicaldocumentanalytics.json?limit=1000')
      .then(res => res.json())
      .then((json => {
        if (json.results) {
          const data = json.results.map((line: any) => {
            return {
              decade: line.decade,
              pub_year: line.year,
              // file_name: <a href={'https://download.open.fda.gov/historical_documents/' + line['doc_file_name']} target='_blank'>{line['doc_file_name']}</a>,
              file_name: line.doc_file_name,
              ae: line.adverse_events_mentioned.map((ae: any) => {
                return ae.meddra_term
              })
            }
          })
          this.setState({
            data: data
          })
        }
      }))
  }


  render() {
    return (
      <div ref={this.tableBodyRef}>
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
          pageSize={this.state.pageSize}
          pageSizeOptions={[10, 25, 50, 100, 200, 250, 500, 1000]}
          showPagination
          minRows={10}
          className='table -striped -highlight'
          filtered={this.state.filtered}
          resized={this.state.resized}
          onSortedChange={(sorted: any) => {
            this.setState({ sorted })
            this.handleChange()
          }}
          onPageChange={(page: any) => {
            this.setState({ page })
            this.handleChange()
          }}
          onPageSizeChange={(pageSize: any, page: any) => {
            this.setState({ page, pageSize })
            this.handleChange()
          }}
          onResizedChange={(resized: any) => {
            this.setState({ resized })
            this.handleChange()
          }}
          onFilteredChange={(filtered: any) => {
            this.setState({ filtered })
            this.handleChange()
          }}
          style={{
            width: '100%',
            height: '494px',
            position: 'relative'
          }}
        />
      </div>
    )
  }
}

export default PositionsPanel
