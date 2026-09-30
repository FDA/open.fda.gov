/* @flow */

import React from 'react'

import SideBar from '../../../components/SideBar'
import SideBarContainer from '../../../containers/SideBarContainer'
import ResearchDatasetDownloads from "../../../components/ResearchDatasetsDownloads"


const ComposedSidebar = SideBarContainer(SideBar)


export default () => (
  <section className='relative row content-wrapper'>

    <ComposedSidebar
      researchDatasets={['mSphere']}
    />

    <div className='float-r ref-content' style={{ paddingTop: '30px', maxWidth: '100%' }}>
      <ul id='scientific-dataset-downloads'>
        <li id='mSphere'>
          <section className='marg-b-3 clearfix'>
            <ResearchDatasetDownloads
              datasetTitle='mSphere'
              datasetLink='https://download.open.fda.gov/scientific/mSphere_raw_data.zip'
              dataFile='mSphere_raw_data.zip'
              description='insert description here'
              publisher='insert publisher name here'
              pubArticle='insert article name here'
              pubDate='September 30th, 2026'
              pubLink='insert link here'/>
          </section>
        </li>
      </ul>
    </div>
  </section>
)
