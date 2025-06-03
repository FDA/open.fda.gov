/* @flow */

import React from 'react'
import {marked} from 'marked'

import Hero from './Hero'

const boxCx: string = 'clr-gray b-b-1 marg-b-2'

type MetaSource = {
  name: string;
  nameLong?: string;
  link: string;
  linkDownload?: string;
};

type MetaProvider = {
  name: string;
  link: string;
};

type MetaLicense = {
  name: string;
  link: string;
};

type MetaTime = {
  frequency?: string;
  delay?: string;
  start?: string;
  current?: string;
};

type Meta = {
  title: string;
  description: string;
  type: string;
  additionalContent?: string[];
  source?: MetaSource;
  provider?: MetaProvider;
  license?: MetaLicense;
  time?: MetaTime;
};

type tPROPS = {
  meta: Meta;
};

// pages like /data/faers/
const Dataset = ({ meta }: tPROPS) => (
  <section>
    <Hero
      label='Dataset that supplies data to openFDA'
      title={meta.title}
      description={meta.description}
      type="dataset" path={''}    />
    <div className='container marg-t-3 marg-b-3'>
      <div className='flex-row'>
        <div className='t-4 pad-r-3'>
          <div className='reading-width'>
            {
              meta.additionalContent && meta.source &&
              <h2>About {meta.source.name}</h2>
            }
            {
              meta.additionalContent &&
              meta.additionalContent.map((para, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{__html: marked(para)}}
                />
              ))
            }
            {
              meta.source &&
              <div>
                <h2>Learn more</h2>
                <p>
                  General information<br />
                  <a href={meta.source.link}>Learn more about {meta.source.nameLong}</a>
                </p>
                {
                  meta.source.linkDownload &&
                  <p>
                    Original dataset downloads<br />
                    <a href={meta.source.linkDownload}>{meta.source.name} download information</a>
                  </p>
                }
              </div>
            }
          </div>
        </div>
        <div className='t-2'>
          {
            meta.provider &&
            <div className={boxCx}>
              <h3>Provider</h3>
              <p><a href={meta.provider.link}>{meta.provider.name}</a></p>
            </div>
          }
          {
            meta.license &&
            <div className={boxCx}>
              <h3>License</h3>
              <p><a href={meta.license.link}>{meta.license.name}</a></p>
            </div>
          }
          {
            meta.time && (meta.time.frequency || meta.time.delay) &&
            <div className={boxCx}>
              <h3>Updates</h3>
              {meta.time.frequency && <p>Frequency <strong>{meta.time.frequency}</strong></p>}
              {meta.time.delay && <p>Lag in data updates <strong>{meta.time.delay}</strong></p>}
            </div>
          }
          {
            meta.time && (meta.time.start || meta.time.current) &&
            <div className={boxCx}>
              <h3>Time period</h3>
              {meta.time.start && <p>Earliest data <strong>{meta.time.start}</strong></p>}
              {meta.time.current && <p>Current through <strong>{meta.time.current}</strong></p>}
            </div>
          }
        </div>
      </div>
    </div>
  </section>
)

Dataset.displayName = 'components/Dataset'
export default Dataset
