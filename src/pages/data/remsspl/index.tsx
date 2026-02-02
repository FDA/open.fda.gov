import React from 'react'

import Dataset from '../../../components/Dataset'

import meta from './_meta.yaml'

export default class IndexRoute extends React.Component {
  render () {
    return (
      <Dataset
        meta={meta}
      />
    )
  }
}
