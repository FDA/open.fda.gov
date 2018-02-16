/* @flow */

import React from 'react'
import _ from 'lodash';


class FilterComponent extends React.Component {

   constructor (props: Object) {
    super(props)
  
    this.state = {
    }
  }

  componentDidMount () {
  }

  render (): ?React.Element {
    if (!this.state.data) return <span />
    return ()
  }
}

export default FilterComponent