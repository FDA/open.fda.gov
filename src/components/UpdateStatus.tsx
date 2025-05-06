import React from 'react'
import moment from "moment"

import { API_LINK } from "../constants/api"


class UpdateStatus extends React.Component {
  constructor (props: Object) {
    super(props)

    this.state = {
      status: null
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    let status = "delayed"
    fetch(API_LINK + this.props.api_path + '.json')
      .then((response) => {
        return response.json()
      })
      .then((endpointData) => {
        if (endpointData.meta.last_updated === moment().format("YYYY-MM-DD")
            || endpointData.meta.last_updated === moment().subtract(1, 'days').format("YYYY-MM-DD")) {
          status = "updated"
        }
        else {
          status = "delayed"
        }
        this.setState({
          status
        })
      }).catch((error) => {
        console.log("Error fetching response data: ", error)
      })

  }

  render () {

    if (this.state.status === undefined) {
      return (<span/>)
    }

    console.log(this.state.status)

    return (
      <section>
        {this.state.status === 'delayed' ? (
          <h5>The update for this downloadable dataset is currently delayed.</h5>
        ) : (
          <span/>
        )}
      </section>
    )
  }
}


export default UpdateStatus
