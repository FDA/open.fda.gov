import React, { Component } from 'react';
import Select from 'react-select'
import {BarChart, Bar, XAxis, YAxis as YAxisR, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'Recharts'

import aeData from '../data/ae_json.json'
import {aeArr, aeArrDrug } from "../data/mockData";

var text = "/fda_press_release_archive/";

const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
		return (
			<div className="custom-tooltip">
				<h5 className="label">{label}</h5>
				<p className="intro">{`${payload[0].value}`}</p>
			</div>
		);
	}
	return null;
}

class AeDrillDown extends Component {
	constructor(props){
		super(props);

		// console.log("aeData: ", aeData[0])
		this.state = {
			data: [],
			dropDown: aeData,
			number_of_docs: [],
			decade: [],
			documents: [],
			selectedEvent: aeData[0]
		};

		this.handleChange = this.handleChange.bind(this)
		this.getData = this.getData.bind(this)
	}

	componentDidMount () {
		this.getData()
	}

	handleChange(val) {
		this.setState({
			selectedEvent: val
		}, () => {
			this.getData()
		})
	}

	getData() {
		const useaeArrData = aeArrDrug[this.state.selectedEvent['id']];
		const documentsAE = useaeArrData['documents']

		const newAEData = useaeArrData['number_of_docs'];
		const newAELabels = useaeArrData['decade'];

		let data = []

		newAEData.forEach((entry, i) => {
			// console.log('entry: ', entry, "i: ", i)
			data.push({name: String(newAELabels[i]), total: entry})
		})

		// console.log("data: ", data, "useaeArrData", useaeArrData, "newAEData: ", newAEData)
		this.setState({
			data: data,
			decade: newAELabels,
			documents:documentsAE,
			number_of_docs: newAEData
		})
	};

	render(){

		console.log("dropdown: ", this.state.dropDown, "data: ", this.state.data)
		return(
			<div>
				<h1 className='drill-down-header'>Adverse Events By Decade</h1>
					<Select
						name='adverse events'
						onChange={this.handleChange}
						options={this.state.dropDown}
						placeholder='Select adverse event'
						aria-label='Select adverse event'
						defaultValue={this.state.dropDown[0]}
					/>

				<ResponsiveContainer className='chart-background bar-chart-background' height={300}>
					<BarChart
						ref="bar"
						data={this.state.data}
					>
						<XAxis dataKey="name" interval={0}/>
						<YAxisR />
						<CartesianGrid strokeDasharray="8 8"/>
						<Tooltip content={<CustomTooltip detail={this.props.detail} yLabel={this.props.xAxis}/>} />
						<Legend height={36} verticalAlign='top'/>
						<Bar
							dataKey="total"
							fill="#8884d8"
							barCategoryGap={"50%"}
							barGap={"50%"}
						/>
					</BarChart>
				</ResponsiveContainer>
				{/*<AEBarGraph
				 data = {number_of_docs}
				 labels = {decade}
				 />*/}

				<div className="documents-download">
					<ul className="flex-wrap flex-row overflow-scroll">
						{this.state.documents.map(s =>
							<li className="font- marg-b-1 row col grow-none t-3 d-3" key={s}>
								<a href={'https://download.open.fda.gov/historical_documents/'+s} download={'https://download.open.fda.gov/historical_documents/'+s} target="_blank">{s}</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		)
	}
}

export default AeDrillDown;