/* @flow */

import React from 'react'
import FilterRadio from './FilterRadio'
import FilterSelect from './FilterSelect'

/**
 * @description [a wrapper element. renders Radio or Select dep on breakpoint]
 * @param  {Object} props [breakpoint + all needed props for filtering]
 * @return {React.Element}
 */
interface FilterProps {
  bp?: {
    mob?: boolean;
  };
  filters?: any[];
  selected?: string;
  onChange?: () => void;
  [key: string]: any; // Allow additional props
}

const Filter = (props: FilterProps) => (
  props?.bp?.mob ?
    <FilterSelect
      filters={[]} selected={''} onChange={() => {}} {...props} />
    :
    <FilterRadio
      filters={[]} onChange={() => {}} selected={''} {...props} />
)

Filter.displayName = 'components/Filter'
export default Filter
