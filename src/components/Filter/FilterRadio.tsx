/* @flow */

import {RadioGroup, Radio} from 'react-radio-group'

type Filter = {
  searchParam: string;
  title: string;
};

type PROPS = {
  filters: Array<Filter>;
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

  const handleChange = (value: any): void => {
    onChange(value)
  }

  return (
    <RadioGroup
      // name is only needed on radio
      // because react-radio-group does not
      // work without it
      name='infographic'
      selectedValue={selected}
      onChange={handleChange}>
      {
        <fieldset
          id='params-filter'
          tabIndex={0}
          className='no-b no-marg no-pad'
        >
          <legend className='visually-hidden'>
              Filter records using example parameters for current visualization.
          </legend>
          {
            filters?.map((filter: Filter, i) => (
              <label
                className='clr-gray cursor-pointer smallest weight-600 row block pad-b-1'
                tabIndex={0}
                role='option'
                key={i}
              >
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
