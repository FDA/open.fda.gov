import React from 'react'
import Select from 'react-select'
import ReactModal from "react-modal"
import ReactTable from "react-table-6"
import "react-table-6/react-table.css"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import FileSaver from "file-saver"
import XLSX from 'xlsx'

import dictionary from '../constants/fields/master_fields.yaml'
import { API_LINK } from "../constants/api"

import '../css/components/DataDictionary.scss'
import { JSX } from 'react/jsx-runtime'

/* generate a download */
function s2ab (s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}


function flattenJSON (data: string | any[]) {

  const flattenedJSON: any[] = []

  for (let i = 0; i < data.length; i++) {
    const newRow: Record<string, any> = {}
    for (const item in data[i]) {
      if (typeof data[i][item] === "object") {
        if (data[i][item] && data[i][item].constructor === Array) {
          newRow[item] = data[i][item].join("; ")
        }
        else if (data[i][item]) {
          newRow[item] = flattenJSON(data[i][item])
        }
      }
      else {
        newRow[item] = data[i][item]
      }
    }

    flattenedJSON.push(newRow)
  }

  return flattenedJSON

}

interface DataDictionaryState {
  colors: string[];
  columns: any[];
  data: any[];
  pieData: any[];
  hits: number | string;
  totalHits: number | string;
  modalRows: any[];
  modalColumns: any[];
  endpoint_columns: { [key: string]: any[] };
  endpointOptions: { [key: string]: any[] };
  nouns: any[];
  pageSize: number;
  selectedRow: any;
  selectedNoun: any;
  selectedEndpoint: any[];
  resized: any[];
  sorted: any[];
  filtered: any[];
  showModal?: boolean;
  search?: string;
  page?: number;
  [key: string]: any; // To allow additional properties
}

class DataDictionary extends React.Component<{}, DataDictionaryState> {
  tableBodyRef: React.RefObject<HTMLDivElement>;
  constructor (props: Object) {
    super(props)

    this.tableBodyRef = React.createRef() as React.RefObject<HTMLDivElement>

    const nounList: { [key: string]: string } = {
      'animalandveterinary': 'Animal & Veterinary',
      'drug': 'Human Drug',
      'device': 'Device',
      'food': 'Food',
      'other': 'Other',
      'tobacco': 'Tobacco'
    }

    const endpointList: { [key: string]: string } = {
      'event': 'Event',
      'label': 'Label',
      'classification': 'Classification',
      'historicaldocument': 'Historical Documents',
      'ndc': 'NDC',
      'problem': 'Problem',
      '510k': '510k Clearance',
      'enforcement': 'Enforcement',
      'nsde': 'NSDE',
      'drugsfda': 'Drugs@FDA',
      'drugshortages': 'Drug Shortages',
      'covid19serology': 'COVID-19 Serology',
      'pma': 'Pre-Market Approval',
      'recall': 'Recall',
      'registrationlisting': 'Registration List',
      'substance': 'Substance Data',
      'udi': 'UDI',
      'unii': 'UNII'
    }


    const nouns: any[] = []
    const endpoint_columns: {[key: string]: any[]} = {}
    const endpoint_options: {[key: string]: any[]} = {}
    Object.keys(dictionary).forEach(function (noun) {
      nouns.push({'label': nounList[noun], 'value': noun})
      endpoint_columns[noun] = []
      endpoint_options[noun] = []
      Object.keys(dictionary[noun]).forEach(function (endpoint) {
        endpoint_columns[noun].push({'Header': endpointList[endpoint], 'accessor': endpoint})
        endpoint_options[noun].push({'label': endpointList[endpoint], 'value': endpoint})
      })
    })

    this.state = {
      colors: ["#0088FE", "#1ECFFF", "#00C49F", "#FFBB28", "#d62728"],
      columns: [
        {
          'Header': 'Field Name',
          'accessor': 'field_name'
        },
        {
          'Header': 'Datatype',
          'accessor': 'datatype'
        },
        {
          'Header': 'Datasets',
          'accessor': 'dataset_number'
        },
        {
          'Header': 'Definition',
          'accessor': 'definition'
        },
      ],
      data: [],
      pieData: [],
      hits: 0,
      totalHits: 0,
      modalRows: [],
      modalColumns: [],
      endpoint_columns: endpoint_columns,
      endpointOptions: endpoint_options,
      nouns: nouns,
      pageSize: 25,
      selectedRow: {},
      selectedNoun: nouns[0],
      selectedEndpoint: [],
      resized: [],
      sorted: [],
      filtered: []
    }

    this.handleNounChange = this.handleNounChange.bind(this)
    this.handleEndpointChange = this.handleEndpointChange.bind(this)
    this.getData = this.getData.bind(this)
    this.getObject = this.getObject.bind(this)
    this.getNestedValue = this.getNestedValue.bind(this)
    this.exportToXLS = this.exportToXLS.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getModalData = this.getModalData.bind(this)
  }

  componentDidMount () {
    this.handleNounChange(this.state.selectedNoun)
  }

  getModalData (rowInfo: { datasets: string | any[] }) {
    const col_list: any[] = []
    const columns: { Header: any; accessor: any; Cell: (row: any) => JSX.Element }[] = []

    const data: {[key: string]: boolean} = {}

    this.state.endpoint_columns[this.state.selectedNoun.value].forEach((endpoint: { Header: any; accessor: any }) => {
      const endpoint_name = endpoint.Header
      const endpoint_value = endpoint.accessor
      if (rowInfo.datasets.includes(endpoint_value)) {
        data[endpoint_value] = true
      }
      if (col_list.indexOf(endpoint_value) === -1) {
        columns.push({
          Header: endpoint_name,
          accessor: endpoint_value,
          Cell: (row: { value: any }) => (
            <div className='checkbox-cell'>{row.value ? <i className='fa fa-2x fa-check' style={{color: "green"}}/> : <span/>}</div>
          )
        })
        col_list.push(endpoint_value)
      }
    })

    this.setState({
      modalColumns: columns,
      modalRows: [data]
    })
  }

  closeModal () {
    this.setState({
      showModal: false
    })
  }

  openModal (row: any) {
    this.getModalData(row)
    this.setState({
      selectedRow: row,
      showModal: true
    })
  }

  handleNounChange (val: { value: string | number }) {
    this.setState({
      selectedNoun: val,
      selectedEndpoint: this.state.endpointOptions[val.value]
    }, () => {
      this.getData()
    })
  }

  handleChange() {
    const body = document.querySelector('.ReactTable .rt-tbody') as HTMLDivElement;
    if (body) {
      body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  handleEndpointChange (val: any) {
    this.setState({
      selectedEndpoint: val
    }, () => {
      this.getData()
    })
  }

  getNestedValue (rowObj: { [x: string]: any }, path: string) {
    const props = path.split('.')
    props.forEach(function (prop: string | number) {
      if (rowObj) {
        rowObj = rowObj[prop]
      }
    })
    return rowObj
  }

  exportToXLS () {
    try {
      /* export only visible columns */
      const columns: any[] = []
      this.state.columns.forEach(function (column: { accessor: any }) {
        columns.push(column.accessor)
      })

      const exportableRows: {}[] = []
      this.state.data.forEach((row: any) => {
        const truncatedRow: Record<string, any> = {}
        let rowData: string = ""
        columns.forEach((column) => {
          const columnValue = this.getNestedValue(row, column)
          truncatedRow[column] = columnValue
          rowData += columnValue ? columnValue : ""
        })
        if (rowData) {
          exportableRows.push(truncatedRow)
        }
      })

      /* make the worksheet */
      const ws = XLSX.utils.json_to_sheet(flattenJSON(exportableRows))

      /* add to workbook */
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "data")

      /* write workbook (use type 'binary') */
      const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'})

      FileSaver.saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), this.state.selectedNoun.label + ".xlsx")
    }
    catch (err) {
      console.error(err)
    }
  }

getObject (
  data: { [x: string]: { dataset: any[]; definition?: string; type?: string }; hasOwnProperty?: any },
  parent_name: string,
  parent_obj: { [x: string]: { items: any; description: any; type: any } },
  endpoint: any
) {
    Object.keys(parent_obj).forEach(function (val) {
      const val_name = parent_name + '.' + val
      if (!data.hasOwnProperty(val_name) && parent_obj[val].hasOwnProperty('items')) {
        data[val_name] = {
          'dataset': [endpoint],
          'definition': parent_obj[val].items.description,
          'type': 'array of ' + parent_obj[val].items.type + 's'
        }
      }
      else if (!data.hasOwnProperty(val_name) && !parent_obj[val].hasOwnProperty('items')) {
        data[val_name] = {
          'dataset': [endpoint],
          'definition': parent_obj[val].description,
          'type': parent_obj[val].type
        }
      }
      else {
        data[val_name].dataset.push(endpoint)
      }
    })
  }

  getData () {
    const data: { [key: string]: any } = {}
    const usage_endpoints: { [key: string]: number } = {}
    let hits = 0
    let total_hits = 0
    const noun = this.state.selectedNoun.value
    fetch(API_LINK + '/usage.json?prefix=' + '2/api.fda.gov/' + noun + '/')
      .then((response) => {
        return response.json()
      }).then((usage_data) => {
        usage_data.table.forEach((dataset: { path: string; hits: number }) => {
          if (dataset.path.includes('/')) {
            usage_endpoints[dataset.path.split('/')[2].split('.')[0]] = dataset.hits
            total_hits += dataset.hits
          }
        })
        if (this.state.selectedEndpoint && this.state.selectedEndpoint.length) {
          this.state.selectedEndpoint.forEach((endpoint: { value: string }) => {
            if (Object.keys(usage_endpoints).includes(endpoint.value)) {
              hits += usage_endpoints[endpoint.value]
            }

            Object.keys(dictionary[noun][endpoint.value].properties).forEach((val) => {
              if (dictionary[noun][endpoint.value].properties[val].type === 'object') {
                this.getObject(data, val, dictionary[noun][endpoint.value].properties[val].properties, endpoint.value)
              }
              else if (dictionary[noun][endpoint.value].properties[val].type === 'array' &&
              dictionary[noun][endpoint.value].properties[val].items.type === 'object') {
                this.getObject(data, val, dictionary[noun][endpoint.value].properties[val].items.properties, endpoint.value)
              }
              else if (!data.hasOwnProperty(val) && dictionary[noun][endpoint.value].properties[val].hasOwnProperty('items')) {
                data[val] = {
                  'dataset': [endpoint.value],
                  'definition': dictionary[noun][endpoint.value].properties[val].items.description,
                  'type': 'array of ' + dictionary[noun][endpoint.value].properties[val].items.type + 's'
                }
              }
              else if (!data.hasOwnProperty(val) && !dictionary[noun][endpoint.value].properties[val].hasOwnProperty('items')) {
                data[val] = {
                  'dataset': [endpoint.value],
                  'definition': dictionary[noun][endpoint.value].properties[val].description,
                  'type': dictionary[noun][endpoint.value].properties[val].type
                }
              }
              else {
                data[val].dataset.push(endpoint.value)
              }
            })
          })
        }
const data_array: {
  field_name: any;
  dataset_number: any;
  datatype?: any;
  datasets?: any;
  definition?: any;
}[] = []
        Object.keys(data).forEach((field) => {
          data_array.push({
            'field_name': field,
            'datasets': data[field].dataset,
            'datatype': data[field].type,
            'dataset_number': data[field].dataset.length,
            'definition': data[field].definition
          })
        })
        data_array.sort((a, b) => (a.dataset_number < b.dataset_number) ? 1 : (a.dataset_number === b.dataset_number) ? ((a.field_name > b.field_name) ? 1 : -1) : -1)
        const pieData = []
        if (data_array && data_array.length) {
          for (let i = 0; i < 5; i++) {
            pieData.push({
              'name': data_array[i].field_name,
              'value': data_array[i].dataset_number
            })
          }
        }

        this.setState({
          'data': data_array,
          'hits': hits.toLocaleString(),
          'totalHits': total_hits.toLocaleString(),
          'pieData': pieData
        })
      }).catch((error) => {
        console.log("Error fetching response data: ", error)
        this.setState({
          'data': [],
          'hits': hits.toLocaleString(),
          'totalHits': total_hits.toLocaleString(),
          'pieData': []
        })
      })
  }

  render () {

    if (this.state.data === undefined) {
      return (<span/>)
    }

    // if (Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object) {
    //   return <span/>
    // }

    let data = this.state.data
    const searchText = this.state.search
    let harmonized = false

    if (Object.keys(this.state.selectedRow).includes('field_name') && this.state.selectedRow.field_name.includes('openfda')) {
      harmonized = true
    }

    if (searchText) {
      const regex = new RegExp(searchText, "i")
      data = data.filter((row: any) => {
        for (let i = 0; i < this.state.columns.length; i++) {
          if (regex.test(String(this.getNestedValue(row, this.state.columns[i].accessor)))) {
            return true
          }
        }
        return false
      })
    }

    return (
      <section className='container data-dictionary' id='data-dictionary'>
        <ReactModal
          isOpen={!!this.state.showModal}
          className='help-window'
          overlayClassName='modal-overlay'
          contentLabel='Help Modal'
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick
          ariaHideApp={false}
        >
          <h3>{this.state.selectedRow.field_name} <span>({this.state.selectedRow.datatype})</span></h3>
          <div>
            <h4>Definition</h4>
            <p>{this.state.selectedRow.definition}</p>
            <h4>{harmonized ? 'Harmonized' : 'Included'} in these {this.state.selectedNoun.label} Endpoints</h4>
            <ReactTable
              data={this.state.modalRows}
              minRows={0}
              columns={this.state.modalColumns}
              className='-striped -highlight'
              showPagination={false}
              resizable={false}
            />
          </div>
        </ReactModal>
        <div className='dataset-select' id='datasets'>
          <div className='nouns'>
            <h5>Data Category</h5>
            <Select
              isClearable={false}
              name='toggle'
              options={this.state.nouns}
              onChange={this.handleNounChange}
              placeholder='Select category'
              aria-label='Select category'
              value={this.state.selectedNoun}
            />
          </div>
          <div className='endpoints'>
            <h5>Datasets</h5>
            <Select
              name='endpoints'
              isMulti
              options={this.state.endpointOptions[this.state.selectedNoun.value]}
              onChange={this.handleEndpointChange}
              placeholder='Select datasets'
              aria-label='Select datasets'
              className='basic-multi-select'
              classNamePrefix='select'
              value={this.state.selectedEndpoint}
            />
          </div>
        </div>
        <h3 className='usage-header'>Usage Summary</h3>
        <div className='graphics'>
          <div className='left'>
            <div>
              <h4>Total {this.state.selectedNoun.label} API Calls</h4>
              <h5>{this.state.totalHits}</h5>
              <span>past 30 days</span>
            </div>
            <div>
              <h4>Selected Endpoints API Calls</h4>
              <h5>{this.state.hits}</h5>
              <span>past 30 days</span>
            </div>
          </div>
          <div className='right'>
            <PieChart
              width={150}
              height={150}
            >
              <Pie
                // ref removed: string refs are not supported in TypeScript
                dataKey='value'
                data={this.state.pieData}
                innerRadius={40}
                outerRadius={60}
              >
                {
                  this.state.pieData.map((entry: any, index: number) => (
                    <Cell key={index} fill={this.state.colors[index % this.state.colors.length]} />
                  ))
                }
              </Pie>
              <Tooltip wrapperStyle={{zIndex: 1000}}/>
            </PieChart>
            <div>
              <h4 style={{marginBottom: "20px"}}>Top 5 Common Fields in {this.state.selectedNoun.label}</h4>
              <ul style={{position: "relative"}}>
                {
                  this.state.pieData.map((entry: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, index: React.Key | null | undefined) =>
                    <li key={index}><span className='color-box' style={{backgroundColor: this.state.colors[Number(index) % this.state.colors.length]}}/>{entry.name}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='table-databar'>
          <span>{data.length} Fields</span>
          <div>
            <span>Search: </span>
            <input className='search-input' onChange={e => this.setState({search: e.target.value})}
              placeholder='Type to Search in Results...' type='search' autoFocus
            />

            <a href='#' onClick={this.exportToXLS} style={{ lineHeight: 2.5}} >
              <img alt='Export to XLS' style={{float: "left", width: 31, padding: 5}}
                src='/img/xls-icon.svg'/>Export to XLS
            </a>
          </div>
        </div>
        <div ref={this.tableBodyRef}>
        <ReactTable
          data={data}
          getTrProps={(state: any, rowInfo: any, column: any, instance: any) => {
            if (!rowInfo || !rowInfo.row || !rowInfo.row._original) {
              return {};
            }
            return {
              onClick: () => this.openModal(rowInfo.row._original)
            }
          }}
          columns={this.state.columns}
          pageSize={this.state.pageSize}
          pageSizeOptions={[10, 25, 50, 100, 200, 250, 500, 1000]}
          showPagination
          minRows={10}
          className='table -striped -highlight'
          filtered={this.state.filtered}
          resized={this.state.resized}
          onSortedChange={(sorted: any) =>{
             this.setState({ sorted })
             this.handleChange()
            }}
          onPageChange={(page: any) =>{ 
            this.handleChange()
            this.setState({ page })
            
          }}
          onPageSizeChange={(pageSize: any, page: any) =>
            this.setState({ page, pageSize })}
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
      </section>
    )
  }
}


export default DataDictionary
