/* @flow */

import React from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'
import DownloadsContainer from '../containers/DownloadsContainer'

const liCx: string = 'marg-b-1 row col grow-none t-2 d-2'
const mbCx: string = 'clr-gray inline-block'

const _renderByLimit = (results: any, limit: any) => {
  const sliced: Array<any> = results.slice(0, limit)

  return sliced.map((s, i) => (
    <li
      className={liCx}
      key={i}>
      <a href={s.file}>
        {s.display_name}
      </a>
      <span
        className={mbCx}
        style={{
          marginLeft: '5px',
        }}>
        {s.size_mb} mb
      </span>
    </li>
  ))
}

const _renderByYear = (results: any, years: any) => {
  return years.sort().map((y: any, i: any) => {
    const data: any[] = results[y]

    return (
      <li
        key={i}
        className='col t-2 grow-none'>
        <h3 className='marg-t-2'>{y}</h3>
        <ul>
          {
            data.map((d: any, i: any) => (
              <li
                className='marg-b-1'
                key={i}>
                <a href={d.file}>
                  {d.display_name}
                </a>
                {
                  // inline for ie
                }
                <span
                  className={mbCx}
                  style={{
                    marginLeft: '5px',
                  }}>
                  {d.size_mb} mb
                </span>
              </li>
            ))
          }
        </ul>
      </li>
    )
  })
}

type tPROPS = {
  allPartitions: Array<Object>;
  k: number;
  api_path: string;
  title: string;
  results: Object;
  showAllResults: boolean;
  toggle: Function;
  updated: string;
};

const Downloads = (props: tPROPS) => {
  const {
    allPartitions,
    k,
    api_path,
    title,
    results,
    showAllResults,
    toggle,
    updated,
  } = props

  const limit: number = 10 | 0
  const years: Array<string> = Object.keys(results)
  const btnCx = cx({
    'clr-white weight-700': true,
    'bg-primary': !showAllResults,
    'bg-primary-darker': showAllResults,
  })

  return (
    <section
      className='marg-t-3 marg-b-3 clearfix'
      key={k}>
      <h3>{title} [{api_path}]</h3>
      <p>
        This endpoint's data may be downloaded in zipped JSON files. Records are represented in the same format as API
        calls to this endpoint. Each update to the data in this endpoint could change old records. You need to download
        all the files to ensure you have a complete and up-to-date dataset, not just the newest files. For more
        information about openFDA downloads, see the <Link to='/apis/'>API basics</Link>.
      </p>
      {
        api_path === "/animalandveterinary/event" &&
          <p>
            Animal & Veterinary Adverse Event Reports are not posted in real time. Updates to openFDA are made
            quarterly, but there may be a 3-6 month delay from the time FDA receives reports until they are posted.
          </p>
      }
      <p>There are <strong>{allPartitions.length}</strong> files, last updated on <strong>{api_path === "/animalandveterinary/event" ? '2024-04-04' : updated}</strong>.</p>
      {
        allPartitions.length > 10 &&
        <button
          className={btnCx}
          onClick={() => toggle()}>
          {
            showAllResults ?
              `Hide all ${allPartitions.length} download files`
              :
              `Show all ${allPartitions.length} download files`
          }
        </button>
      }
      <ul className='flex-box flex-wrap'>
        {
          showAllResults &&
          _renderByYear(results, years)
        }
        {
          allPartitions.length <= limit &&
          _renderByLimit(allPartitions, limit)
        }
      </ul>
    </section>
  )
}

Downloads.displayName = 'components/Downloads'
export default DownloadsContainer(Downloads)
