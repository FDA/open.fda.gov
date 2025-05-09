import React, { JSX } from "react"
import { API_LINK } from '../../constants/api'

type PositionsPanelState = {
  columns: Array<{ Header: string; accessor: string; Cell?: (row: any) => JSX.Element }>;
  data: Array<any>;
  pageSize: number;
};

class PositionsPanel extends React.Component<{}, PositionsPanelState> {
  constructor (props: Object) {
    super(props)

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
          Cell: (row: any) => (
            <ol style={{
              height: 100,
              overflowY: "scroll"
            }}>
              {/* <li>{row.value}</li>*/}
              {row.value.map((v: any, idx: any) =>
                <li key={`key-${idx}`} style={{whiteSpace: "initial"}}>• {v}</li>
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


  componentDidMount () {
    this.getData()
  }

  getData () {
    fetch(API_LINK + '/other/historicaldocumentanalytics.json?limit=1000')
      .then(res => res.json())
      .then((json => {
        if (json.results) {
          const data = json.results.map((line: { decade: string; year: string; doc_file_name: string; adverse_events_mentioned: { meddra_term: string }[] }) => {
            return {
              decade: line.decade,
              pub_year: line.year,
              // file_name: <a href={'https://download.open.fda.gov/historical_documents/' + line['doc_file_name']} target='_blank'>{line['doc_file_name']}</a>,
              file_name: line.doc_file_name,
              ae: line.adverse_events_mentioned.map(ae => {
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


  render () {
    return (
      <Table columns={this.state.columns} data={this.state.data} />
    )
  }
}

const Table = ({ columns, data }: { columns: any; data: any }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} className="table -striped -highlight">
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PositionsPanel
function useTable(arg0: { columns: any; data: any; }): { getTableProps: any; getTableBodyProps: any; headerGroups: any; rows: any; prepareRow: any; } {
  throw new Error("Function not implemented.");
}

