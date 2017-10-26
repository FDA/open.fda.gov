/* @flow */

import React from 'react'
import FilterRadio from './FilterRadio'
import FilterSelect from './FilterSelect'

/**
 * @description [a wrapper element. renders Radio or Select dep on breakpoint]
 * @param  {Object} props [breakpoint + all needed props for filtering]
 * @return {React.Element}
 */
const Filter = (props: Object) => (
  props.bp.mob ?
    <FilterSelect
      {...props}
    />
  :
    <FilterRadio
      {...props}
    />
)

Filter.displayName = 'components/Filter'
export default Filter
