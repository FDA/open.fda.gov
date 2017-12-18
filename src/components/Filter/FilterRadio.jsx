/* @flow */

import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

type PROPS = {
  filters: Array<Object>;
  onChange: Function;
  selected: string;
};

/**
 * @description [used in Infographic when on desktop]
 * @param  {Array<Object>} filters [list of filters. labels + values]
 * @param  {Function} onChange [callback for handling click]
 * @param  {string} selected [selected = the currently active radio]
 * @return {React.Element}
 */
const FilterRadio = ({ filters, onChange, selected }: PROPS) => {
  const _onChange = value => onChange(value)

  return (
    <RadioGroup
      // name is only needed on radio
      // because react-radio-group does not
      // work without it
      name='infographic'
      selectedValue={selected}
      onChange={_onChange}>
      {
          <fieldset
            id='params-filter'
            tabIndex={0}
            style={{
              border: 0,
              margin: 0,
              padding: 0,
            }}>
            <legend className='visually-hidden'>
              Filter records using example parameters for current visualization.
            </legend>
            {
              filters.map((filter: Object, i) => (
                <label
                  className='clr-gray cursor-pointer smallest weight-600 row block pad-b-1'
                  tabIndex={0}
                  role='option'
                  key={i}
                  style={{
                    cursor: 'pointer',
                  }}>
                  <Radio
                    tabIndex={-1}
                    className='marg-r-1'
                    value={filter.searchParam}
                  />
                  {filter.title}
                </label>
              ))
            }
          </fieldset>
      }
    </RadioGroup>
  )
}

FilterRadio.displayName = 'components/FilterRadio'
export default FilterRadio
