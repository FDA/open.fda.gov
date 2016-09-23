/* @flow */

import React from 'react'
import cx from 'classnames'

import EndpointButtons from './EndpointButtons'

type tPROPS = {
  description: string;
  label: string;
  path: string,
  title: React.Element|string;
  type: 'homepage'|'endpoint';
};

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} label [small text right above the title]
 * @param {string} path [the page route, for endpoint pages]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @param {string} type [endpoint or not, used for styling and tabs]
 * @return {React.Element}
 */
const Hero = (props: tPROPS) => {
  const {
    description,
    label,
    path,
    title,
    type,
  } = props

  const heroCx = cx({
    'flex-box pad-t-2 pad-b-2 overflow-hidden relative': true,
    'bg-gray': type !== 'dataset' && type !== 'endpoint',
    'bg-primary': type === 'dataset',
    'bg-gray-dark': type === 'endpoint',
  })

  const desc: void|string = description && description.trim()

  return (
    <section
      id='hero'
      className={heroCx}>
      <div className='flex-row dir-column m-pad-t-2 m-pad-b-2 pad-t-3 pad-b-3 container'>
        <span
          tabIndex={0}
          className='clr-white serif weight-700 small'>
          {label}
        </span>
        {
          type === 'endpoint' &&
          <h1
            // if we're showing a label we're on an endpoint
            // the endpoint reads weird - so just read the label instead
            tabIndex={label ? -1 : 0}
            className='clr-white marg-b-2 weight-700 m-pad-r-1'
            style={{
              wordBreak: 'break-all'
            }}>
            {
              type === 'endpoint' &&
              <span className='clr-cool-blue-lighter weight-400'>api.fda.gov</span>
            }
            {path}
          </h1>
        }
        {
          type !== 'endpoint' &&
          <h1
            tabIndex={label ? -1 : 0}
            className='clr-white marg-b-2 weight-700 reading-width'>
            {title}
          </h1>
        }
        {
          desc &&
          <p
            tabIndex={0}
            className='clr-white font-size-4 reading-width'
            style={{
              lineHeight: '25px',
              marginBottom: '80px',
            }}>
            {desc}
          </p>
        }
        {
          type === 'endpoint' &&
          <EndpointButtons
            {...props}
          />
        }
      </div>
    </section>
  )
}

Hero.displayName = 'components/Hero'
// using defaultProps just because it gets a little unwiedly up there
Hero.defaultProps = {
  description: '',
  type: 'landing',
}
export default Hero
