/* @flow */

import React from 'react'
import get from 'lodash/get'
import xhrGET from '../utils/xhr'
import { API_LINK } from '../constants/api'
import type { DownloadsContainerState } from '../types/download.types'

const DownloadsContainer = function (ComposedDownloads: React.ComponentType<any>): React.ComponentType<any> {
  class HOC extends React.Component {
    state: DownloadsContainerState = {
      data: null,
      showAllResults: false,
    };

    componentDidMount () {
      this._fetchDownloads()
    }

    _fetchDownloads () {
      const _handleResponse = (data: any) => {

        this.setState({
          data,
        })
      }

      xhrGET(API_LINK + '/download.json', _handleResponse)
    }

    _toggleDownloads () {
      const showAllResults: boolean = !this.state.showAllResults

      this.setState({
        showAllResults,
      })
    }

    /**
     * @description [takes in array of unsorted data]
     *              [maps by year, or related endpoint]
     * @param {Array<Object>} results [original results array]
     * @returns {Object} [map, where each year is an array]
     */
    _getResultsByCategory (results: Array<any>): Object {
      // handle data sorted by years
      // or data sorted by set
      // or data that is just all lumped together for some reason
      const yearRe: RegExp = /(\d{4} )|(All other data)|^(\w|\/)+/
      const resultsByYear: { [key: string]: any } = {}

      for (const result of results) {
        if (result.size_mb < 0.01) {
          result.size_mb = 0.01
        }
        const match: string = result.display_name.match(yearRe)[0]

        if (!resultsByYear.hasOwnProperty(match)) {
          resultsByYear[match] = []
        }

        resultsByYear[match].push(result)
      }

      return resultsByYear
    }

    render (): any {
      if (typeof this.state.data !== 'object') return <span />

      const api_path: string = this.props.meta.api_path
      // drug/event => results.drug.event
      const key: string = `results${api_path.split('/').join('.')}`
      // data = { results: { drug: { event: relevantData } } }
      const results: any = get(this.state.data, key)

      // some endpoint won't have download data
      if (typeof results !== 'object') return <span />

      // [ {}, {}, ] => { 2005: [{}], 2006: [{}], }
      const resultsByCat: Object = this._getResultsByCategory(results.partitions)
      // type so flow knows meta can't be undefined
      // NOT the same as this.props.meta
      const meta: any = get(this.state.data, 'meta') || {}

      return (
        <ComposedDownloads
          k={this.props?.k}
          api_path={api_path}
          title={this.props?.meta?.title}
          allPartitions={results.partitions}
          results={resultsByCat}
          showAllResults={this.state.showAllResults}
          toggle={this._toggleDownloads.bind(this)}
          updated={meta.last_updated}
        />
      )
    }
  }

  return HOC
}

export default DownloadsContainer
