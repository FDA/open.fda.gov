/* @flow */

import React from 'react'

const paramsCx: string = 'col t-3 t-marg-t-2'
const textAreaCx: string = 'bg-gray-dark clr-gray-lightest block row pad-1 small mono'

type tPROPS = {
  // count parameter to filter by
  countParam: string;
  // all fields for select dropdown
  fieldsFlattened: Object;
  // search parameter for text
  nextSearchParam: string;
  // look for Enter key when typing, then fetch and update
  onKeyPress: Function;
  // when typing in count field, keep count param up to date
  onCountChange: Function;
  // on dropDown select
  onCountChangeAndUpdate: Function;
  // when typing in search field
  onSearchChange: Function;
  // complete query string
  query: string;
};

const InfographicExplorer = (props: tPROPS) => {
  const {
    countParam,
    fieldsFlattened,
    nextSearchParam,
    onKeyPress,
    onCountChange,
    onCountChangeAndUpdate,
    onSearchChange,
    query,
  } = props

  return (
    <section
      aria-label='Experiment with parameters for current visualization. Select different parameters or type in your own to change the result.'
      id='infoExplorer'
      className='b-b-1 m-hide t-show marg-b-3 pad-b-3'>
      <a
        href='#start-of-content'
        className='visually-hidden'
      >
        Skip visualization explorer.
      </a>
      <p className='small no-marg clr-base weight-600 pad-t-2 pad-b-1'>
        current query
      </p>
      <textarea
        aria-label='Current query'
        className={textAreaCx}
        value={query}
        readOnly
      />
      <aside className='flex-row'>
        <div className={`${paramsCx} t-marg-r-1`}>
          <p className='small weight-600 marg-b-1'>
            <span className='clr-primary-darker'>search=&nbsp;</span>
            parameter
          </p>
          <textarea
            aria-label='Search parameter'
            className={textAreaCx}
            value={nextSearchParam}
            onChange={onSearchChange}
            onKeyPress={onKeyPress}
          />
          <p className='clr-gray marg-t-1 small weight-600'>Type in a custom search parameter, and then press Enter to update the chart</p>
        </div>
        <div className={paramsCx}>
          <p className='small weight-600 marg-b-1'>
            <span className='clr-primary-darker'>count=&nbsp;</span>
            parameter
          </p>
          <textarea
            aria-label='Count parameter'
            className={textAreaCx}
            value={countParam}
            onChange={onCountChange}
            onKeyPress={onKeyPress}
          />
          <div
            className='select-wrap'
            style={{
              marginTop: '10px',
            }}>
            <label>
              <span className='visually-hidden'>Select a count parameter to filter by</span>
              <select
                className='select clr-primary'
                value={countParam}
                onChange={onCountChangeAndUpdate}
                // inline because of uncss
                // client side only code not picked up
                style={{
                  appearance: 'none',
                  background: '#fff',
                  border: '1px solid #323a45',
                  borderRadius: 0,
                  display: 'block',
                  fontFamily: 'inherit',
                  fontSize: '17px',
                  outline: 0,
                  padding: '7px',
                  width: '100%',
                  WebkitAppearance: "none"
                }}>
                {
                  Object.keys(fieldsFlattened).map((field: string, i) => (
                    <option
                      key={i}
                      value={field}>
                      {field}
                    </option>
                  ))
                }
              </select>
            </label>
          </div>
        </div>
      </aside>
      <a
        href='#chartWrapper'
        className='visually-hidden'>
        Return to: data visualization for result.
      </a>
    </section>
  )
}

InfographicExplorer.displayName = 'components/InfographicExplorer'
export default InfographicExplorer
