/* @flow */

import { Bar } from 'nivo'
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

const data = [
  {
    "country": "AD",
    "hot dog": 130,
    "hot dogColor": "hsl(210, 70%, 50%)",
    "burger": 125,
    "burgerColor": "hsl(178, 70%, 50%)",
    "sandwich": 26,
    "sandwichColor": "hsl(22, 70%, 50%)",
    "kebab": 117,
    "kebabColor": "hsl(340, 70%, 50%)",
    "fries": 83,
    "friesColor": "hsl(196, 70%, 50%)",
    "donut": 43,
    "donutColor": "hsl(326, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 139,
    "hot dogColor": "hsl(69, 70%, 50%)",
    "burger": 119,
    "burgerColor": "hsl(141, 70%, 50%)",
    "sandwich": 147,
    "sandwichColor": "hsl(211, 70%, 50%)",
    "kebab": 123,
    "kebabColor": "hsl(31, 70%, 50%)",
    "fries": 161,
    "friesColor": "hsl(160, 70%, 50%)",
    "donut": 159,
    "donutColor": "hsl(46, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 165,
    "hot dogColor": "hsl(170, 70%, 50%)",
    "burger": 20,
    "burgerColor": "hsl(66, 70%, 50%)",
    "sandwich": 132,
    "sandwichColor": "hsl(355, 70%, 50%)",
    "kebab": 182,
    "kebabColor": "hsl(288, 70%, 50%)",
    "fries": 41,
    "friesColor": "hsl(78, 70%, 50%)",
    "donut": 25,
    "donutColor": "hsl(286, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 46,
    "hot dogColor": "hsl(60, 70%, 50%)",
    "burger": 70,
    "burgerColor": "hsl(100, 70%, 50%)",
    "sandwich": 124,
    "sandwichColor": "hsl(66, 70%, 50%)",
    "kebab": 90,
    "kebabColor": "hsl(308, 70%, 50%)",
    "fries": 200,
    "friesColor": "hsl(219, 70%, 50%)",
    "donut": 21,
    "donutColor": "hsl(288, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 88,
    "hot dogColor": "hsl(268, 70%, 50%)",
    "burger": 143,
    "burgerColor": "hsl(349, 70%, 50%)",
    "sandwich": 78,
    "sandwichColor": "hsl(105, 70%, 50%)",
    "kebab": 168,
    "kebabColor": "hsl(59, 70%, 50%)",
    "fries": 129,
    "friesColor": "hsl(43, 70%, 50%)",
    "donut": 151,
    "donutColor": "hsl(152, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 107,
    "hot dogColor": "hsl(181, 70%, 50%)",
    "burger": 174,
    "burgerColor": "hsl(22, 70%, 50%)",
    "sandwich": 18,
    "sandwichColor": "hsl(313, 70%, 50%)",
    "kebab": 21,
    "kebabColor": "hsl(221, 70%, 50%)",
    "fries": 46,
    "friesColor": "hsl(16, 70%, 50%)",
    "donut": 2,
    "donutColor": "hsl(197, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 190,
    "hot dogColor": "hsl(302, 70%, 50%)",
    "burger": 157,
    "burgerColor": "hsl(356, 70%, 50%)",
    "sandwich": 18,
    "sandwichColor": "hsl(358, 70%, 50%)",
    "kebab": 133,
    "kebabColor": "hsl(345, 70%, 50%)",
    "fries": 167,
    "friesColor": "hsl(134, 70%, 50%)",
    "donut": 11,
    "donutColor": "hsl(76, 70%, 50%)"
  }
]


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

  // return (
  //   <section
  //     aria-label='Experiment with parameters for current visualization. Select different parameters or type in your own to change the result.'
  //     id='infoExplorer'
  //     className='b-b-1 m-hide t-show marg-b-3 pad-b-3'>
  //     <a
  //       href='#start-of-content'
  //       className='visually-hidden'>
  //       Skip visualization explorer.
  //     </a>
  //     <p className='small no-marg clr-base weight-600 pad-t-2 pad-b-1'>
  //       current query
  //     </p>
  //     <textarea
  //       aria-label='Current query'
  //       className={textAreaCx}
  //       value={query}
  //       readOnly
  //     />
  //     <aside className='flex-box'>
  //       <div className={`${paramsCx} t-marg-r-1`}>
  //         <p className='small weight-600 marg-b-1'>
  //           <span className='clr-primary-darker'>search=&nbsp;</span>
  //           parameter
  //         </p>
  //         <textarea
  //           aria-label='Search parameter'
  //           className={textAreaCx}
  //           value={nextSearchParam}
  //           onChange={onSearchChange}
  //           onKeyPress={onKeyPress}
  //         />
  //         <p className='clr-gray marg-t-1 small weight-600'>Type in a custom search parameter, and then press Enter to update the chart</p>
  //       </div>
  //       <div className={paramsCx}>
  //         <p className='small weight-600 marg-b-1'>
  //           <span className='clr-primary-darker'>count=&nbsp;</span>
  //           parameter
  //         </p>
  //         <textarea
  //           aria-label='Count parameter'
  //           className={textAreaCx}
  //           value={countParam}
  //           onChange={onCountChange}
  //           onKeyPress={onKeyPress}
  //         />
  //         <div
  //           className='select-wrap'
  //           style={{
  //             marginTop: '10px',
  //           }}>
  //           <label>
  //             <span className='visually-hidden'>Select a count parameter to filter by</span>
  //             <select
  //               className='select clr-primary'
  //               value={countParam}
  //               onChange={onCountChangeAndUpdate}
  //               // inline because of uncss
  //               // client side only code not picked up
  //               style={{
  //                 appearance: 'none',
  //                 background: '#fff',
  //                 border: '1px solid #323a45',
  //                 borderRadius: 0,
  //                 display: 'block',
  //                 fontFamily: 'inherit',
  //                 fontSize: '17px',
  //                 outline: 0,
  //                 padding: '7px',
  //                 width: '100%',
  //               }}>
  //               {
  //                 Object.keys(fieldsFlattened).map((field: string, i) => (
  //                   <option
  //                     key={i}
  //                     value={field}>
  //                     {field}
  //                   </option>
  //                 ))
  //               }
  //             </select>
  //           </label>
  //         </div>
  //       </div>
  //     </aside>
  //     <a
  //       href='#chartWrapper'
  //       className='visually-hidden'>
  //       Return to: data visualization for result.
  //     </a>
  //   </section>
  // )
  return (
    <Bar
          data={{data}}
          indexBy="country"
          margin={{
              "top": 50,
              "right": 60,
              "bottom": 50,
              "left": 60
          }}
          xPadding={0.2}
          groupMode="stacked"
          layout="vertical"
          colors="nivo"
          colorBy="id"
          axisBottom={{
              "orient": "bottom",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "country",
              "legendPosition": "center",
              "legendOffset": 36
          }}
          axisLeft={{
              "orient": "left",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "food",
              "legendPosition": "center",
              "legendOffset": -40
          }}
          enableGridX={false}
          enableGridY={true}
          enableLabels={true}
          labelsTextColor="inherit:darker(1.6)"
          labelsLinkColor="inherit"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
        />
  )
}

InfographicExplorer.displayName = 'components/InfographicExplorer'
export default InfographicExplorer
