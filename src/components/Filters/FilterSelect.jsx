/* @flow */

import React from 'react'

type PROPS = {
  filters: Array<Object>;
  selected: string;
  onChange: Function;
};

/**
 * @description [used in Infographic when on MOBILE or TABLET]
 * @param  {Array<Object>} filters [list of filters. labels + values]
 * @param  {Function} onChange [callback for handling click]
 * @param  {string} selected [selected = the currently active radio]
 * @return {React.Element}
 */
const FilterSelect = ({ filters, selected, onChange }: tPROPS) => {
  const _onChange = e => onChange(e.target.value)

  return (
    <div className='select-wrap'>
      <select
        selectedValue={selected}
        onChange={_onChange}>
        {
          filters &&
          filters.map((filter: Object, i) => (
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
