/* @flow */

import React from 'react'
import cx from 'classnames'
import BreadCrumbs from '../BreadCrumbs'
import dateFormat from 'dateformat'


type tPROPS = {
  authors: Array<string>;
  date: string;
  description: string;
  htmlDescription: boolean;
  label: string;
  path: string;
  title: React.Element|string;
  type: 'homepage'|'endpoint'|'update';
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
    authors,
    date,
    description,
    htmlDescription,
    label,
    path,
    title,
    type
  } = props

  const heroCx = cx({
    'flex-box dir-column': true,
    'bg-gray': type !== 'dataset' && type !== 'endpoint',
    'bg-primary': type === 'dataset'
  })

  const bg_image_color = {
    food: {background: 'linear-gradient(to bottom right, rgba(81, 161, 22, 1), rgba(143, 209, 100, 1))', backgroundSize: 'contain', backgroundPosition: 'right', height: '240px'},
    device: {background: 'linear-gradient(to right bottom, rgb(232, 92, 44), rgb(236, 169, 6))', backgroundSize: 'contain', backgroundPosition: 'right', height: '240px'},
    drug: {background: 'linear-gradient(to bottom right, rgba(153, 88, 163, 1), rgba(220, 141, 188, 1))', backgroundSize: 'contain', backgroundPosition: 'right', height: '240px'},
    animal_and_veterinary: {background: 'linear-gradient(to bottom right, rgba(249, 157, 28, 1), rgba(252, 215, 112, 1))', backgroundSize: 'contain', backgroundPosition: 'right', height: '240px'},
    other: {backgroundColor: '#5b616b'}
  }
  const bg_image = {
    food: '/img/apple.png',
    device: '/img/stethoscope.png',
    drug: '/img/pill-bottle.png',
    animal_and_veterinary: '/img/dog.png'
  }

  const bg_image_style = {
    food: {height: '300px', mixBlendMode: 'multiply', position: 'absolute', right: 0, zoom: '100%', top: '-20px'},
    device: {height: '300px', mixBlendMode: 'multiply', position: 'absolute', right: 0, zoom: '100%', top: '-30px'},
    drug: {height: '350px', mixBlendMode: 'multiply', position: 'absolute', right: 0, zoom: '120%', top: '-65px'}
  }

  if ('path' in props) {
    let cat_path = path.split( '/' )
    var cat_name = cat_path[2]
  } else {
    var cat_name = 'other'
  }


  const desc: void|string = description && description.trim()

  return (
    <section
      id='hero'>
      <div
        className={heroCx}
        style={bg_image_color[cat_name]}>
        <BreadCrumbs />
        <div className='hero-text-box container flex-row dir-column pad-t-2 pad-b-2'>
          {
            type === 'update' &&
            <span
              tabIndex={0}
              className='clr-white serif weight-700 small'>
              {dateFormat(date, 'mmmm d, yyyy')}
            </span>
          }
          <h2
            tabIndex={label ? -1 : 0}
            className='clr-white weight-700 header-width'>
            {title}
          </h2>
          {
            type != 'update' &&
            <div className="hero-divider-line"/>
          }
          {
            desc && htmlDescription &&
            <p
              tabIndex={0}
              className='subtitle clr-white font-size-4 header-width'
              dangerouslySetInnerHTML={{__html: desc}}>
            </p>
          }
          {
            desc && !htmlDescription &&
            <p tabIndex={0} className='subtitle clr-white font-size-4 header-width'>{desc}</p>
          }
          {
            authors &&
            authors.map((author: string, i: number) => {
              return (
                <p tabIndex={i} key={i} className='subtitle clr-white font-size-4 header-width'>{author}</p>
              )
            })
          }
        </div>
        <img src={bg_image[cat_name]} style={bg_image_style[cat_name]}/>
      </div>
    </section>
  )
}

Hero.displayName = 'components/Hero'
// using defaultProps just because it gets a little unwiedly up there
Hero.defaultProps = {
  description: '',
  type: 'landing',
  htmlDescription: false
}
export default Hero
