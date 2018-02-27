/* @flow */


import withQuery from 'with-query'
import {default as $} from 'jquery'

class DataRetrievalService {

  constructor (url, endpoint) {
    this.url = url
    this.endpoint = endpoint
  }

  convertFiltersToJson(filters){
    const formattedFilters = {}
    filters.forEach((filter,idx) => {
      // {
      //   "0": {
      //     "key": "set_id",
      //     "value": ["0000025c-6dbf-4af7-a741-5cbacaed519a"]
      //   }
      // }
      if(filter.value){
        formattedFilters[`${idx}`] = {
          "key": filter.field,
          "value": [filter.value]
        }
      }
    })
    return {
      "data": {
        "queryJSON": {
          "searchType": "nonLLT",
          "filters": formattedFilters
        }
      }
    }
  }

  getTopValues(field){
    return fetch(
        withQuery(`${this.url}/${this.endpoint}`,{
            count: field
        })
    )
    .then(res => res.json())
    .then((json) => {
      const res = json.results.map(obj => {
        return { 
          label: obj.term
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
        withQuery(`${this.url}/${this.endpoint}`,{
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


  getData(params){
    const data = this.convertFiltersToJson(params)
    return fetch(`${this.url}/${this.endpoint}`, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'no-cors'
    })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch((err) => {})
  }
}

export default DataRetrievalService