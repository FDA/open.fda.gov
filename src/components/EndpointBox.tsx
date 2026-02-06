/* @flow */

import React from 'react'

import Link from 'gatsby-link'

import '../css/components/EndpointBox.scss'
import { NounName, EndpointName, endpointBoxProps } from '../types'
import { ep_title, description, ep_path, bg_color } from '../constants'

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} label [small text right above the title]
 * @param {string} path [the page route, for endpoint pages]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @param {string} type [endpoint or not, used for styling and tabs]
 * @return {React.Element}
 */
const EndpointBox = (props: endpointBoxProps) => {
  const {
    noun_name,
    endpoint_name
  } = props

  const icon: Record<NounName, Partial<Record<EndpointName, React.ReactNode>>> = {
    'animalandveterinary': {
      'event': <div className='ep-icon' style={bg_color.animalandveterinary}><i className='fa fa-3x fa-warning' style={{ color: "white" }} /></div>
    },
    'food': {
      'enforcement': <div className='ep-icon' style={bg_color.food}><i className='fa fa-3x fa-rotate-left' style={{ color: "white" }} /></div>,
      'event': <div className='ep-icon' style={bg_color.food}><i className='fa fa-3x fa-warning' style={{ color: "white" }} /></div>
    },
    'cosmetic': {
      'event': <div className='ep-icon' style={bg_color.cosmetic}><i className='fa fa-3x fa-warning' style={{ color: "white" }} /></div>
    },
    'device': {
      'event': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-warning' style={{ color: "white" }} /></div>,
      'classification': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-certificate' style={{ color: "white" }} /></div>,
      '510k': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-shield' style={{ color: "white" }} /></div>,
      'pma': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-check' style={{ color: "white" }} /></div>,
      'registrationlisting': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-book' style={{ color: "white" }} /></div>,
      'recall': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-rotate-left' style={{ color: "white" }} /></div>,
      'enforcement': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-bar-chart' style={{ color: "white" }} /></div>,
      'udi': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-barcode' style={{ color: "white" }} /></div>,
      'covid19serology': <div className='ep-icon' style={bg_color.device}><i className='fa fa-3x fa-bar-chart' style={{ color: "white" }} /></div>
    },
    'drug': {
      'event': <div className='ep-icon' style={bg_color.drug}><i className='fa fa-3x fa-warning' style={{ color: "white" }} /></div>,
      'label': <div className='ep-icon' style={bg_color.drug}><i className='fa fa-3x fa-barcode' style={{ color: "white" }} /></div>,
      'ndc': <div className='ep-icon' style={bg_color.drug}><i className='fa fa-3x fa-database' style={{ color: "white" }} /></div>,
      'enforcement': <div className='ep-icon' style={bg_color.drug}><i className='fa fa-3x fa-rotate-left' style={{ color: "white" }} /></div>,
      'drugsfda': <div className='ep-icon' style={bg_color.drug}><i className='fa fa-3x fa-at' style={{ color: "white" }} /></div>,
      'drugshortages': <div className='ep-icon' style={bg_color.drug}><i className='fa fa-3x fa-at' style={{ color: "white" }} /></div>
    },
    'other': {
      'historicaldocument': <div className="ep-icon" style={bg_color['other']}><i className="fa fa-3x fa-history" style={{ color: "white" }} /></div>,
      'nsde': <div className="ep-icon" style={bg_color['other']}><i className="fa fa-3x fa-database" style={{ color: "white" }} /></div>,
      'substance': <div className="ep-icon" style={bg_color['other']}><i className="fa fa-3x fa-flask" style={{ color: "white" }} /></div>,
      'unii': <div className="ep-icon" style={bg_color['other']}><i className="fa fa-3x fa-barcode" style={{ color: "white" }} /></div>
    },
    'tobacco': {
      'problem': <div className='ep-icon' style={bg_color.tobacco}><i className='fa fa-3x fa-leaf' style={{ color: "white" }} /></div>,
      'researchpreventionads': <div className='ep-icon' style={bg_color.tobacco}><i className='fa fa-3x fa-book' style={{ color: "white" }} /></div>,
      'researchdigitalads': <div className='ep-icon' style={bg_color.tobacco}><i className='fa fa-3x fa-book' style={{ color: "white" }} /></div>
    },
    'transparency': {
      'crl': <div className='ep-icon' style={bg_color.transparency}><i className='fa fa-3x fa-book' style={{ color: "white" }} /></div>
    }
  }

  return (
    <section id='endpoint_box' className="marg-2 endpoint-card">
      <Link className="ep-box" to={ep_path[noun_name][endpoint_name]}>
        <div className="ep-icon-container">
          {icon[noun_name][endpoint_name]}
        </div>
        <div className='flex-row dir-column ep-text-box no-flex-wrap'>
          <h3 className="txt-c clr-primary-darker">{ep_title[noun_name][endpoint_name]}</h3>
          <span className="marg-1 clr-black">{description[noun_name][endpoint_name]}</span>
        </div>
        <span className="btn btn-icon-right clr-primary weight-700">LEARN MORE<i className="fa fa-angle-right marg-l-1" /></span>
      </Link>
    </section>
  )
}

EndpointBox.displayName = 'components/EndpointBox'
export default EndpointBox
