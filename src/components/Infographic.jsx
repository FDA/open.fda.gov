/* @flow */

import React from 'react'
import marked from 'marked'

import ChartBar from './ChartBar'
import ChartDonut from './ChartDonut'
import ChartLine from './ChartLine'
import Filter from './Filter'

import bp from '../constants/breakpoints'
import BPContainer from '../containers/BreakpointContainer'
import yamlGet from '../utils/yamlGet'

type tEXPLORER = {
  description: Array<string>;
  filters: Object;
  title: string;
  type: 'Bar'|'Line'|'Donut';
};

type tPROPS = {
  current: tEXPLORER;
  data: Object;
  fields: Object;
  nextCountParam: string;
  onSearchChange: Function;
  onSearchChangeUpdate: Function;
  records: number;
  recordsTotal: number;
  searchParam: string;
  type: string;
  handler: Function;
  onCountChange: Function;
  onKeyPress: Function;
  onCountChangeAndUpdate: Function;
  container: Object;
};


const Infographic = (props: tPROPS) => {
  const {
    current,
    data,
    fields,
    nextCountParam,
    onSearchChange,
    onSearchChangeUpdate,
    records,
    recordsTotal,
    searchParam,
    type,
    handler,
    container,
    onCountChange,
    onKeyPress,
    onCountChangeAndUpdate
  } = props

  const {
    description,
    filters,
    title,
  }: tEXPLORER = current

  // mobile sizing for infographic
  // window - 40 (margin) - 40 (padding)
  const hasWindow: boolean = typeof window !== 'undefined'
  let size: number = hasWindow ? window.innerWidth - 80 : 300

  // desktop sizing is a little more complicated
  // we calculate the width based on window
  // and what we know about how the layout will be
  if (!bp.mob && hasWindow) {
    const winWidth: number = window.innerWidth

    // 1400 = site-container width
    // .73 = 25% sidebar + 2% margin (100 - 27)
    // .67 = width of infographic container
    // 40 = padding for infographic container
    if (winWidth >= 1400) {
      size = ((1400 * 0.73) * 0.65) - 40
    }
    // tablet sizing
    else {
      size = ((winWidth * 0.73) * 0.65) - 40
    }
  }

  // Don't render if there is no data, or the field we are trying to
  // count by (visualize) is unknown
  const fieldDefinition: void|Object = yamlGet(nextCountParam, fields)
  const error: boolean = data.error || !fieldDefinition

  // if fieldDef has description, then markdown-ify it
  const markedFieldDef: string = fieldDefinition &&
    fieldDefinition.description ?
      `${marked(fieldDefinition.description)}` :
      ''

  // add breakpoint logic to filter
  const FilterWithState: ReactClass = BPContainer(Filter, {
    filters: filters,
    onChange: onSearchChangeUpdate,
    selected: searchParam,
  })

  const tabs = props.infographics
  const paramsCx: string = 'col t-3 t-marg-t-2'
  const textAreaCx: string = 'bg-gray-dark clr-gray-lightest block row pad-1 small mono'


  //   data: infographicKeys,
  // // update which infographic we're looking at
  // handler: this._sidebarToggle.bind(this),
  // // the current active infographic
  // selected: this.state.selected,
  // // sidebar header
  // title: 'Explore the data',

  // onSearchChangeUpdate={this._update.bind(this)}
  // onSearchChange={this._onSearchChange.bind(this)}

  return (
      <section>
        {
          title &&
          <h2
            className='font-size-2 marg-b-2'
            tabIndex={0}>
            {title}
          </h2>
        }
        {
          description &&
          description.map((para, i) =>
            <div
              key={i}
              tabIndex={0}
              dangerouslySetInnerHTML={{__html: marked(para)}}>
            </div>
          )
        }
        <a
          href='#chartWrapper'
          className='visually-hidden'>
          Skip visualization options. Go to data visualization
        </a>

        <div className="tab">
          {
            Object.keys(tabs).map((value,i) => {
              return <button 
                      onClick={() => { handler(tabs[value])} }
                      key={i}
                      className={container.state.selected === value ? "tab active": "tab"}
                    >
                    {tabs[value].short}
                    </button>
            })
          }
        </div>

        <div className='flex-row tab-content'>
          <aside
            className='col no-marg m-pad-b-1 pad-2 t-2'
            style={{
              background: '#f6f6f6',
              borderBottom: bp.mob ? '1px solid #e4e2e0' : 0,
              borderRight: '2px solid #e4e2e0',
            }}>
            <p className="infographic-header">
              View:
            </p>
            <div
              className='select-wrap'
              style={{
                marginTop: '10px',
              }}>
              <label>
                <span className='visually-hidden'>
                  Select a count parameter to filter by
                </span>
                <select
                  className='select clr-primary'
                  value={props.countParam}
                  onChange={onCountChangeAndUpdate}
                  // inline because of uncss
                  // client side only code not picked up
                  style={{
                    appearance: 'none',
                    background: '#fff',
                    border: '1px solid #0af',
                    borderRadius: 0,
                    display: 'block',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 0,
                    padding: '7px',
                    width: '100%',
                    WebkitAppearance: "none"
                  }}>
                  {
                    Object.keys(props.fieldsFlattened).map((field: string, i) => (
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

            <p className="infographic-header">
              <br/>
              Filter:
            </p>
            <FilterWithState />

            <br/>
            <div>
              <p className="infographic-header">
                Custom search parameter:
              </p>
              <p className="infographic-subheader">
                Type in a custom search parameter, <br/>
                and then press Enter to update the chart
              </p>
              <div className={`${paramsCx} t-marg-r-1 marg-b-1`} style={{width: "100%"}}>
                <textarea
                  aria-label='Search parameter'
                  className={textAreaCx}
                  value={props.nextSearchParam}
                  onChange={onSearchChange}
                  onKeyPress={onKeyPress}
                >
                  i.e. search=device
                </textarea>
              </div>
              <p
                className='b-t-1 small marg-t-1 marg-b-1 pad-t-1'
                style={{
                  letterSpacing: '0.025em',
                  fontSize: 14
                }}
                tabIndex={0}
              >
                {records}{' '}records match these search parameters
              </p>
            </div>
            <a
              href='#params-filter'
              className='visually-hidden'>
              Return to parameters filter
            </a>
          </aside>

          <div
            className='col dir-column bg-gray-lightest t-4 m-pad-t-1 pad-2'
            tabIndex={0}
            id='chartWrapper'>
            {
              data.error &&
              <span className='clr-secondary weight-600 txt-c'>
                Request returned no response.<br />
                Change your search and/or count parameters and try again
              </span>
            }
            {
              !fieldDefinition &&
              <span className='clr-secondary weight-600 txt-c'>
                No Field Definition found in fields yaml.<br />
                Please fix the missing field and try again
              </span>
            }
            {
              !error &&
              <div className='col row reverse-pre b-b-1 marg-b-2'>
                <p>
                  <strong>{nextCountParam}</strong><br />
                  {
                    fieldDefinition &&
                    fieldDefinition.description &&
                    <span
                      dangerouslySetInnerHTML={{
                        __html: markedFieldDef,
                      }}
                    />
                  }
                </p>
              </div>
            }
            {
              !error &&
              type === 'Bar' &&
              <ChartBar
                data={data.results}
                fields={fields}
                countParam={nextCountParam}
              />
            }
            {
              !error &&
              (type === 'Pie' || type === 'Donut') &&
              <ChartDonut
                countParam={nextCountParam}
                data={data.results}
                fields={fields}
                hasLegend
                records={records}
                size={`${!bp.desk ? size - 40 : size - 240}px`}
              />
            }
            {
              !error &&
              type === 'Line' &&
              <ChartLine
                countParam={nextCountParam}
                data={data.results}
                fields={fields}
                height={`${size / 2}px`}
                width={`${size}px`}
              />
            }
            <p className='small no-marg clr-base weight-600 pad-t-2 pad-b-1'>
              current query
            </p>
            <textarea
              aria-label='Current query'
              className={textAreaCx}
              value={props.query}
              rows={3}
              readOnly
            />
          </div>
        </div>
      </section>
  )
}

Infographic.displayName = 'components/Infographic'
export default Infographic
