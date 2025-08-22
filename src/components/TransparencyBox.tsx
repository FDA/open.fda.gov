/* @flow */

import React from 'react'

import Link from 'gatsby-link'

import '../css/components/EndpointBox.scss'

type NounName = 'transparency'
type EndpointName = 'completeresponseletters'

type tPROPS = {
  noun_name: NounName,
  endpoint_name: EndpointName
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
const TransparencyBox = (props: tPROPS) => {
  const {
    noun_name,
    endpoint_name
  } = props

  const description: Record<NounName, Partial<Record<EndpointName, string>>> = {
    'transparency': {
      'crl': 'Data Explorer for Complete Response Letters (CRLs)'
    }
  }

  const ep_title: Record<NounName, Partial<Record<EndpointName, string>>> = {
    'transparency': {
      'crl': 'Complete Response Letters',
    }
  }
  const bg_color: Record<NounName, React.CSSProperties> = {
    'transparency': {background: "linear-gradient(to right bottom, rgb(241 238 237), rgb(133 133 132))"},
  }

  const icon: Record<NounName, Partial<Record<EndpointName, React.ReactNode>>> = {
    'transparency': {
      'crl': <div className='ep-icon' style={bg_color.transparency}><i className='fa fa-3x fa-book' style={{color: "white"}}/></div>
    }
  }

  const ep_path: Record<NounName, Partial<Record<EndpointName, string>>> = {
    'transparency': {
      'crl': 'https://openfda-site.preprod.fda.gov/apis/transparency/completeresponseletters/'
    }
  }

  return (
    <section id='endpoint_box' className='marg-2 endpoint-card'>
      <a className='ep-box' href={ep_path[noun_name][endpoint_name]}>
        <div className='ep-icon-container'>
          {icon[noun_name][endpoint_name]}
        </div>
        <div className='flex-row dir-column ep-text-box no-flex-wrap'>
          <h3 className='txt-c clr-primary-darker'>{ep_title[noun_name][endpoint_name]}</h3>
          <span className='marg-1 clr-black'>{description[noun_name][endpoint_name]}</span>
        </div>
        <span className='btn btn-icon-right clr-primary weight-700'>LEARN MORE<i className='fa fa-angle-right marg-l-1'/></span>
      </a>
    </section>
  )
}

TransparencyBox.displayName = 'components/TransparencyBox'
export default TransparencyBox
