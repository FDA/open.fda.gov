/* @flow */

import React from 'react'
import get from 'lodash/get'
import xhrGET from '../utils/xhr'
import { API_LINK } from '../constants/api'

type tSTATE = {
  data: ?Object;
  showAllResults: boolean;
};

const DownloadsContainer = function (ComposedDownloads: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      data: null,
      showAllResults: false,
    };

    componentDidMount () {
      this._fetchDownloads()
    }

    _fetchDownloads () {
      const _handleResponse = data => {
        
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
    _getResultsByCategory (results: Array<Object>): Object {
      // handle data sorted by years
      // or data sorted by set
      // or data that is just all lumped together for some reason
      const yearRe: RegExp = /(\d{4} )|(All other data)|^(\w|\/)+/
      const resultsByYear: Object = {}

      for (const result of results) {
        const match: string = result.display_name.match(yearRe)[0]

        if (!resultsByYear.hasOwnProperty(match)) {
          resultsByYear[match] = []
        }

        resultsByYear[match].push(result)
      }

      return resultsByYear
    }

    render (): ?React.Element {
      if (typeof this.state.data !== 'object') return <span />

      const api_path: string = this.props.meta.api_path
      // drug/event => results.drug.event
      const key: string = `results${api_path.split('/').join('.')}`
      // data = { results: { drug: { event: relevantData } } }
      const results: Object = get(this.state.data, key)

      // some endpoint won't have download data
      if (typeof results !== 'object') return <span />

      // [ {}, {}, ] => { 2005: [{}], 2006: [{}], }
      const resultsByCat: Object = this._getResultsByCategory(results.partitions)
      // type so flow knows meta can't be undefined
      // NOT the same as this.props.meta
      const meta: Object = get(this.state.data, 'meta')

      return (
        <ComposedDownloads
          k={this.props.k}
          api_path={api_path}
          title={this.props.meta.title}
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
