/* @flow */

import React from 'react'
import Link from 'gatsby-link'
import '../../css/components/KeyFacts.scss'
import xhrGET from "../../utils/xhr"
import {API_LINK} from "../../constants/api"

const source = {
  'animalandveterinary': {
    'event': 'Animal Drug Adverse Events (ADAE)'
  },
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
    'udi': 'Global Unique Device Identification Database (GUDID)',
    'covid19serology': 'Independent testing by US Government Laboratories'
  },
  'drug': {
    'event': 'FDA Adverse Event Reporting System (FAERS)',
    'label': 'FDA SPL files',
    'ndc': 'NDC Directory',
    'enforcement': 'FDA Recall Enterprise System (RES)',
    'drugsfda': 'Drugs@FDA',
    'drugshortages': 'Drug Shortages'
  },
  'other': {
    'historicaldocument': 'Historic FDA Press Releases',
    'nsde': 'NDC SPL Data Elements',
    'substance': 'Substance Data Reports',
    'unii': 'Unique Ingredient Identifiers'
  },
  'tobacco': {
    'problem': 'Tobacco Problem Reports'
  }
}

const sourceLink = {
  'animalandveterinary': {
    'event': '/data/adae/'
  },
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
    'enforcement': '/data/res/',
  },
  'drug': {
    'event': '/data/faers/',
    'label': '/data/spl/',
    'ndc': '/data/ndc/',
    'enforcement': '/data/res/',
    'drugsfda': '/data/drugsfda/',
    'drugshortages': '/data/drugshortages'
  },
  'other': {
    'historicaldocument': '/data/historicaldocument/',
    'nsde': '/apis/other/nsde/',
    'substance': '/apis/other/substance/',
    'unii': '/data/unii/'
  },
  'tobacco': {
    'problem': '/data/tobaccoproblem/'
  }
}

const timePeriod = {
  'animalandveterinary': {
    'event': '1987 to'
  },
  'food': {
    'enforcement': '2004 to',
    'event': '2004 to'
  },
  'device': {
    'event': '2009 to',
    'classification': '1976 to',
    '510k': '1976 to',
    'pma': '1976 to',
    'registrationlisting': '2007 to',
    'recall': '2002 to',
    'enforcement': '2004 to',
    'udi': '2013 to',
    'covid19serology': '2020 to'
  },
  'drug': {
    'event': 'Currently, this API includes publically releasable records submitted to the FDA through FAERS from 2004 to',
    'label': 'The bulk of the data is from June 2009 (when labeling was first posted publicly in the SPL format) to the present. However, there are a small number of records from earlier than mid-2009. The last update was on',
    'ndc': 'Last updated on',
    'enforcement': '2004 to',
    'drugsfda': '1939 to',
    'drugshortages': '2012 to'
  },
  'other': {
    'historicaldocument': '1913 to',
    'nsde': '2009 to',
    'substance': 'Last updated',
    'unii': '2006 to'
  },
  'tobacco': {
    'problem': '2017 to'
  }
}

const frequency = {
  'animalandveterinary': {
    'event': 'Quarterly'
  },
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
    'recall': 'Weekly',
    'enforcement': 'Weekly',
    'udi': 'Weekly',
    'covid19serology': 'Monthly'
  },
  'drug': {
    'event': 'Quarterly. However, please be advised that the data in this API may lag by 3 months or more at any given time, depending on when the quarterly FAERS data is released.',
    'label': 'Weekly',
    'ndc': 'Daily',
    'enforcement': 'Weekly',
    'drugsfda': 'Weekly',
    'drugshortages': 'Daily'
  },
  'other': {
    'historicaldocument': 'Infrequently',
    'nsde': 'Daily',
    'substance': 'Every few months',
    'unii': 'Daily'
  },
  'tobacco': {
    'problem': 'Quarterly'
  }
}
class KeyFacts extends React.Component {
  constructor (props: Object) {
    super(props)
    this.state = {
      lastUpdated: null
    }
  }

  componentDidMount () {
    this._getStatus()
  }

  _getStatus () {
    const _handleResponse = data => {
      const lastUpdated = data.find(dataset => dataset.endpoint === this.props.status).last_updated
      console.log(lastUpdated)
      this.setState({
        lastUpdated,
      })
    }

    xhrGET(API_LINK + '/status', _handleResponse)
  }

  render () {
    return (
      <section className='key-facts'>
        <h3>Key Facts</h3>
        <ul>
          <li>
            <i className='fa fa-database'/>
            <div className='label'>Source of the data:</div>
            <div className='value'>
              {
                sourceLink[this.props.noun_name].hasOwnProperty(this.props.endpoint_name) &&
                <Link to={sourceLink[this.props.noun_name][this.props.endpoint_name]}>
                  {source[this.props.noun_name][this.props.endpoint_name]}
                </Link>
              }
              {
                !(sourceLink[this.props.noun_name].hasOwnProperty(this.props.endpoint_name)) &&
                source[this.props.noun_name][this.props.endpoint_name]
              }
            </div>
          </li>
          <li>
            <i className='fa fa-edit'/>
            <div className='label'>Changes to the source data:</div>
            {this.props.harmonized ?
              <div className='value'>openFDA annotates the original records with <Link
                to={`/apis/${this.props.noun_name}/${this.props.endpoint_name}/searchable-fields/`}>special fields </Link>
                and converts the data into JSON, which is a widely used machine readable format.</div> :
              <div className='value'>openFDA may change some <Link
                to={`/apis/${this.props.noun_name}/${this.props.endpoint_name}/searchable-fields/`}>field names </Link>
                and converts the data into JSON, which is a widely used machine readable format.</div>
            }
          </li>
          <li>
            <i className='fa fa-calendar'/>
            <div className='label'>Time period covered in this API:</div>
            <div className='value'>{timePeriod[this.props.noun_name][this.props.endpoint_name] + ' ' + this.state.lastUpdated}</div>
          </li>
          <li>
            <i className='fa fa-refresh'/>
            <div className='label'>Frequency of API updates:</div>
            <div className='value'>{frequency[this.props.noun_name][this.props.endpoint_name]}</div>
          </li>
        </ul>
      </section>
    )
  }
}

KeyFacts.displayName = 'components/KeyFacts'
export default KeyFacts
