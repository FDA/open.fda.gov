/* @flow */

import React from 'react'

type Filter = {
  query: string;
  title: string;
};

type PROPS = {
  filters: Array<Filter>;
  selected: string;
  onChange: Function;
};

/**
 * @description [used in Infographic when on MOBILE or TABLET]
const FilterSelect = ({ filters, selected, onChange }: PROPS) => {
 * @param  {Function} onChange [callback for handling click]
 * @param  {string} selected [selected = the currently active radio]
 * @return {React.Element}
 */
const FilterSelect = ({ filters, selected, onChange }: PROPS) => {

  const handleChange = (e: any) => onChange(e.target.value)

  return (
    <div className='select-wrap'>
      <select
        value={selected}
        onChange={handleChange}>
        {
          filters &&
          filters.map((filter: Filter, i: any) => (
            <option
              className='clr-gray cursor-pointer small weight-600 pad-t-1 pad-r-2 pad-l-1'
              tabIndex={0}
              role='option'
              value={filter.query}
              key={i}>
              {filter.title}
            </option>
          ))
        }
      </select>
    </div>
  )
}

FilterSelect.displayName = 'components/FilterSelect'
export default FilterSelect
