/* @flow */

import React from 'react'
import Link from 'gatsby-link'

type tPROPS = {
  noun_name: string,
  endpoint_name: string
};

const KeyFacts = (props: tPROPS) => {
  const {
    noun_name,
    endpoint_name
  } = props

  const source = {
    'food': {
      'enforcement': 'FDA Recall Enterprise System (RES)',
      'event': 'Center for Food Safety and Applied Nutrition Adverse Event Reporting System (CAERS)'
    },
    'device': {
      'event': 'Manufacturer and User Facility Device Experience (MAUDE)',
      'classification': 'Product Classification Database',
      '510k': '510(k) Clearances',
      'pma': 'Premarket Approval (PMA) decisions',
      'registrationlisting': 'Registration and Listing',
      'recall': 'Medical Device Recalls',
      'enforcement': 'FDA Recall Enterprise System (RES)',
      'udi': 'Global Unique Device Identification Database (GUDID)'
    },
    'drug': {
      'event': 'FDA Adverse Event Reporting System (FAERS)',
      'label': 'FDA SPL files',
      'enforcement': 'FDA Recall Enterprise System (RES)'
    },
  }

  const source_link = {
    'food': {
      'enforcement': '/data/res/',
      'event': '/data/caers/'
    },
    'device': {
      'event': '/data/maude/',
      'classification': '/data/product-classification/',
      '510k': '/data/510k/',
      'pma': '/data/pma/',
      'registrationlisting': '/data/registrationlisting/',
      'recall': '/data/device-recall/',
      'enforcement': '/data/res/'
    },
    'drug': {
      'event': '/data/faers/',
      'label': '/data/spl/',
      'enforcement': '/data/res/'
    },
  }

  const time_period = {
    'food': {
      'enforcement': '2004 to present',
      'event': '2004 to present'
    },
    'device': {
      'event': '2009 to present',
      'classification': '1976 to present',
      '510k': '1976 to present',
      'pma': '1976 to present',
      'registrationlisting': '2007 to present',
      'recall': '2002 to present',
      'enforcement': '2004 to present',
      'udi': '2013 to present'
    },
    'drug': {
      'event': 'Currently, this API includes publically releasable records submitted to the FDA through FAERS since 2004',
      'label': 'The bulk of the data is from June 2009 (when labeling was first posted publicly in the SPL format) to the present. However, there are a small number of records from earlier than mid-2009.',
      'enforcement': '2004 to present'
    },
  }

  const frequency = {
    'food': {
      'enforcement': 'Weekly',
      'event': 'Quarterly'
    },
    'device': {
      'event': 'Weekly',
      'classification': 'Monthly',
      '510k': 'Monthly',
      'pma': 'Monthly',
      'registrationlisting': 'Monthly',
      'recall': 'Monthly',
      'enforcement': 'Weekly',
      'udi': 'Weekly'
    },
    'drug': {
      'event': 'Quarterly. However, please be advised that the data in this API may lag by 3 months or more at any given time, depending on when the quarterly FAERS data is released.',
      'label': 'Weekly',
      'enforcement': 'Weekly'
    },
  }

  return (
    <section className="key-facts">
      <h3>Key Facts</h3>
      <ul>
        <li>
          <i className="fa fa-database"/>
          <div className="label">Source of the data:</div>
          <div className="value">
            {
              source_link[noun_name].hasOwnProperty(endpoint_name) &&
              <Link to={source_link[noun_name][endpoint_name]}>
                {source[noun_name][endpoint_name]}
              </Link>
            }
            {
              !(source_link[noun_name].hasOwnProperty(endpoint_name)) &&
              source[noun_name][endpoint_name]
            }
          </div>
        </li>
        <li>
          <i className="fa fa-edit"/>
          <div className="label">Changes to the source data:</div>
          <div className="value">OpenFDA annotates the original records with <a href="#searchable-fields">special fields </a>
            and converts the data into JSON, which is a widely used machine readable format.</div>
        </li>
        <li>
          <i className="fa fa-calendar"/>
          <div className="label">Time period covered in this API:</div>
          <div className="value">{time_period[noun_name][endpoint_name]}</div>
        </li>
        <li>
          <i className="fa fa-refresh"/>
          <div className="label">Frequency of API updates:</div>
          <div className="value">{frequency[noun_name][endpoint_name]}</div>
        </li>
      </ul>
    </section>
  )
}

KeyFacts.displayName = 'components/KeyFacts'
export default KeyFacts