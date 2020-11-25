import React from "react";
import { default as ReactTable } from "react-table";

class PositionsPanel extends React.Component {
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
        {
          'Header': 'Historical Document',
          'accessor': 'file_name'
        },
        {
          'Header': 'Reactions Mentioned',
          'accessor': 'ae',
          Cell: row => (
            <ol style={{
              height:100,
              overflowY: "scroll"
            }}>
                {/*<li>{row.value}</li>*/}
              {row.value.map((v,idx) =>
                  <li
                    key={`key-${idx}`}
                    style={{
                      whiteSpace: "initial"
                    }}
                  >
                    • {v}
                  </li>
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

  getData(){
    fetch('https://openfda-api.preprod.fda.gov/other/historicaldocumentanalytics.json?limit=1000')
      .then(res => res.json())
      .then((json => {
        if (json.results){
          let data = json.results.map(line => {
            return {
              decade: line['decade'],
              pub_year: line['year'],
              // file_name: <a href={'https://download.open.fda.gov/historical_documents/' + line['doc_file_name']} target='_blank'>{line['doc_file_name']}</a>,
              file_name: line['doc_file_name'],
              ae: line['adverse_events_mentioned'].map(ae => {
                return ae['meddra_term']
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
      <ReactTable
        data={this.state.data}
        columns={this.state.columns}
        pageSize={this.state.pageSize}
        pageSizeOptions={[10, 25, 50, 100, 200, 250, 500, 1000]}
        showPagination={true}
        minRows={10}
        className="table -striped -highlight"
        filtered={this.state.filtered}
        resized={this.state.resized}
        onSortedChange={sorted => this.setState({ sorted })}
        onPageChange={page => this.setState({ page })}
        onPageSizeChange={(pageSize, page) =>
          this.setState({ page, pageSize })}
        onResizedChange={resized => this.setState({ resized })}
        onFilteredChange={filtered => this.setState({ filtered })}
        style={{
          width: '100%',
          height: '494px',
          position: 'relative'
        }}
      />
    )
  }
}

export default PositionsPanel