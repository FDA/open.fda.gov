/* @flow */

import React from 'react'

import Link from 'gatsby-link'

type tPROPS = {
  noun_name: string,
  endpoint_name: string
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
const EndpointBox = (props: tPROPS) => {
  const {
    noun_name,
    endpoint_name
  } = props

  const description = {
    'food': {
      'enforcement': 'Food product recall enforcement reports.',
      'event': 'Food, dietary supplement, and cosmetic adverse event reports.'
    },
    'device': {
      'event': 'Reports of serious injuries, deaths, malfunctions, and other undesirable effects associated with the use of medical devices.',
      'classification': 'Medical device names, their associated product codes, their medical specialty areas (panels) and their classification.',
      '510k': 'A 510(k) is a premarket submission made to FDA to demonstrate that the device to be marketed is at least  as safe and effective, that is,  substantially equivalent, to a legally marketed device.',
      'pma': 'Premarket approval (PMA) is the FDA process of scientific and regulatory review to evaluate the safety and effectiveness of Class III medical devices.',
      'registrationlisting': 'The registration and listing dataset contains the location of medical device establishments and the devices manufactured at those establishments.',
      'recall': 'A recall is an action taken to address a problem with a medical device that violates FDA law. Recalls occur when a medical device is defective, when it could be a risk to health, or when it is both defective and a risk to health.',
      'enforcement': 'Medical device product recall enforcement reports.',
      'udi': 'Global Unique Device Identification Database (GUIDID) Device Identification dataset.'
    },
    'drug': {
      'event': 'Reports of drug side effects, product use errors, product quality problems, and therapeutic failures.',
      'label': 'Structured product information, including prescribing information, for approved drug products.',
      'enforcement': 'Drug product recall enforcement reports.'
    },
  }

  const ep_title = {
    'food': {
      'enforcement': 'Recall enforcement reports',
      'event': 'CAERS reports'
    },
    'device': {
      'event': 'Adverse event reports',
      'classification': 'Classification',
      '510k': '510(k) clearances',
      'pma': 'Premarket approval',
      'registrationlisting': 'Registrations and listings',
      'recall': 'Recalls',
      'enforcement': 'Recall enforcement reports',
      'udi': 'Unique device identifier'
    },
    'drug': {
      'event': 'Adverse events',
      'label': 'Product labeling',
      'enforcement': 'Recall enforcement reports'
    },
  }
  const bg_color = {
    'food': {background: "linear-gradient(to right bottom, rgb(143, 209, 100), rgb(81, 161, 22))"},
    'device': {background: "linear-gradient(to right bottom, rgb(255, 198, 59), rgb(243, 117, 73))"},
    'drug': {background: "linear-gradient(to right bottom, rgb(220, 141, 188), rgb(153, 88, 163))"}
  }

  const icon = {
    'food': {
      'enforcement': <div className="ep-icon" style={bg_color['food']}><i className="fa fa-3x fa-rotate-left absolute" style={{color: "white"}}/></div>,
      'event': <div className="ep-icon" style={bg_color['food']}><i className="fa fa-3x fa-warning absolute" style={{color: "white"}}/></div>
    },
    'device': {
      'event': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-warning" style={{color: "white"}}/></div>,
      'classification': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-certificate" style={{color: "white"}}/></div>,
      '510k': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-shield" style={{color: "white"}}/></div>,
      'pma': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-check" style={{color: "white"}}/></div>,
      'registrationlisting': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-book" style={{color: "white"}}/></div>,
      'recall': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-rotate-left" style={{color: "white"}}/></div>,
      'enforcement': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-bar-chart" style={{color: "white"}}/></div>,
      'udi': <div className="ep-icon" style={bg_color['device']}><i className="fa fa-3x fa-barcode" style={{color: "white"}}/></div>
    },
    'drug': {
      'event': <div className="ep-icon" style={bg_color['drug']}><i className="fa fa-3x fa-warning absolute" style={{color: "white"}}/></div>,
      'label': <div className="ep-icon" style={bg_color['drug']}><i className="fa fa-3x fa-barcode" style={{color: "white"}}/></div>,
      'enforcement': <div className="ep-icon" style={bg_color['drug']}><i className="fa fa-3x fa-rotate-left absolute" style={{color: "white"}}/></div>
    },
  }

  const ep_path = {
    'food': {
      'enforcement': '/api_endpoints/food/enforcement/',
      'event': '/api_endpoints/food/enforcement'
    },
    'device': {
      'event': '/api_endpoints/device/event/',
      'classification': '/api_endpoints/device/classification',
      '510k': '/api_endpoints/device/510k/',
      'pma': '/api_endpoints/device/pma/',
      'registrationlisting': '/api_endpoints/device/registrationlisting/',
      'recall': '/api_endpoints/device/recall/',
      'enforcement': '/api_endpoints/device/enforcement/',
      'udi': '/api_endpoints/device/udi/'
    },
    'drug': {
      'event': '/api_endpoints/drug/event/',
      'label': '/api_endpoints/drug/label/',
      'enforcement': '/api_endpoints/drug/enforcement/'
    },
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
        <span className="btn clr-primary weight-700">LEARN MORE<i className="fa fa-angle-right marg-l-1"/></span>
      </Link>
    </section>
  )
}

EndpointBox.displayName = 'components/EndpointBox'
export default EndpointBox
