/* @flow */


import withQuery from 'with-query'
import {default as $} from 'jquery'
import Moment from 'moment'
import {API_LINK} from "../constants/api";

class DataRetrievalService {

  constructor (url, endpoint) {
    this.url = url
    this.endpoint = endpoint

    this.convertFiltersToJson = this.convertFiltersToJson.bind(this)
    this.getTopValues = this.getTopValues.bind(this)
    this.getTopValuesByIterating = this.getTopValuesByIterating.bind(this)
    this.getData = this.getData.bind(this)
    this.getTotal = this.getTotal.bind(this)
  }

  convertFiltersToJson(filters, options){
    const formattedFilters = filters.filter(filter => filter.value.length).map((filter,idx) => {
      var value = {
        "query-type": filter.query_type,
        "key": filter.field,
        "value": filter.value
      }
      if (value["query-type"] == "range") {
        value.value = {
          "gte": Moment(value.value[0]).format('YYYYMMDD'),
          "lte": Moment(value.value[1]).format('YYYYMMDD')
        }
      } else if (value["query-type"] == "exists"){
        value.value = filter.value[0].toString()
      }
      return value
    })

    if(options.drugtype){
      formattedFilters.push({
        "query-type": "term",
        "key": "@drugtype",
        "value": [
          options.drugtype
        ]
      })
    }

    return {
      "data": {
        "queryJSON": {
          "size": 5000,
          "searchType": options.searchType,
          "filters": formattedFilters
        }
      }
    }
  }

  getTopValues(field){
    return fetch(
      withQuery(`${this.url}/${this.endpoint}`,{
        count: field
      },{
        mode: 'cors'
      })
    ).then(res => res.json())
      .then((json) => {
        const res = json.results.map(obj => {
          return {
            label: obj.term,
            value: obj.term
          }
        });
        return res
      }).catch((err) => [])
  }


  getTopValuesByIterating(fields, removeChars){

    const limit = 200
    let urls = []

    for (var i = 0; i < (limit/100); i++) {
      urls.push(
        withQuery(`${this.url}/${this.endpoint}`, {
          limit: 100,
          skip: i*100
        })
      )
    }

    const itemPromises = urls.map($.getJSON)
    return Promise.all(itemPromises)
      .then((results) => {
        const response = []
        results.forEach(r => {
          response.push(...r.results)
        })
        return response
      })
  }


  getData(params, options){
    const data = this.convertFiltersToJson(params, options)
    console.log("filters:")
    console.log(JSON.stringify(data, null, 4));
    return fetch(`${this.url}/${this.endpoint}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      mode: 'cors'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        return res
      })
      .catch((err) => {})
  }


  getTotal() {
    return fetch(`${this.url}/${this.endpoint}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return res
      })
      .catch((err) => {})
  }
}

export default DataRetrievalService
