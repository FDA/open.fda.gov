/* @flow */

import React from 'react'
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer'
import Link from 'gatsby-link'

const cat_map = {
  'food': {
    'endpoints': {
      'enforcement': {
        'title': 'Recall enforcement reports',
        'url': '/api_endpoints/food/enforcement/'
      },
      'event': {
        'title': 'Food, dietary supplement, and cosmetic adverse event reports',
        'url': '/api_endpoints/food/event/'
      }
    },
    'title': 'Foods ',
    'url': '/api_endpoints/food/'
  },
  'device': {
    'endpoints': {
      'event': {
        'title': 'Adverse Event Reports',
        'url': '/api_endpoints/device/event/'
      },
      'classification': {
        'title': 'Classification',
        'url': '/api_endpoints/device/classification/'
      },
      '510k': {
        'title': '510(k) clearances',
        'url': '/api_endpoints/device/510k/'
      },
      'pma': {
        'title': 'Premarket approval',
        'url': '/api_endpoints/device/pma/'
      },
      'registrationlisting': {
        'title': 'Registrations and listings',
        'url': '/api_endpoints/device/registrationlisting/'
      },
      'recall': {
        'title': 'Recalls',
        'url': '/api_endpoints/device/recall/'
      },
      'enforcement': {
        'title': 'Recall enforcement reports',
        'url': '/api_endpoints/device/enforcement/'
      },
      'udi': {
        'title': 'Unique device identifier',
        'url': '/api_endpoints/device/udi/'
      }
    },
    'title': 'Medical Devices ',
    'url': '/api_endpoints/device/'
  },
  'drug': {
    'endpoints': {
      'enforcement': {
        'title': 'Recall enforcement reports',
        'url': '/api_endpoints/drug/enforcement/'
      },
      'label': {
        'title': 'Product labeling',
        'url': '/api_endpoints/drug/label/'
      },
      'event': {
        'title': 'Adverse events',
        'url': '/api_endpoints/drug/event/'
      }
    },
    'title': 'Drugs ',
    'url': '/api_endpoints/drug/'
  }
}

type tPROPS = {
  toggleDropdownContent: Function;
  hideDropdownContent: Function;
  showDropdownContent: Function;
  activeDropdown: string;
  path: string;
};

// if not on top level page, render breadcrumb nav
const BreadCrumbs = (props: tPROPS) => {
  const {
    hideDropdownContent,
    showDropdownContent,
    toggleDropdownContent,
    activeDropdown,
    path
  } = props
  if (typeof window === 'undefined') return <span />
  var crumbs: Array<string> = path.split('/').filter(d => d)

  if (crumbs.length === 0) return <span />

  return (
    <div className='row' style={{background: 'rgba(0, 0, 0, 0.2)'}}>
      <nav
        aria-label='Breadcrumb navigation.'
        className='container flex-box just-between align-center dir-row clr-gray responsive-header'>
        <div className='breadcrumb'>
          <a
            className='clr-white pad-r-1'
            href='/'>
            openFDA
          </a>
          {
            crumbs.map((crumb: string, i) => {
              const isLast: boolean = i === crumbs.length - 1

              // gotta match the url structure of existing site
              // update => updates
              const safeCrumb: string = crumb === 'update' ? 'updates' : crumb

              // pull url from breadcrumb list
              // if update, /update/ => /updates/
              const url: string = crumbs.slice(0, i + 1).join('/')
              const safeUrl: string = url.replace('update', 'updates')

              return (
                <span key={i}>
                  <span className="clr-white" style={{opacity: '50%'}}>/</span>
                  {
                    !isLast ?
                      <a
                        className='clr-white pad-r-1 pad-l-1'
                        href={`${window.location.origin}/${safeUrl}/`}>
                        {safeCrumb}
                      </a>
                    :
                      <span className='clr-white marg-l-1'>
                      {crumb}
                      </span>
                  }
                </span>
              )
            })
          }
        </div>
        {
          path.includes('api_endpoints') &&
          <nav
            aria-label='Endpoint navigation.'
            className='flex-box align-center just-center dir-row responsive-header' style={{zIndex:1}}>
            {
              Object.keys(cat_map).map((cat, i) => (
                <div className="endpoint-dropdown" key={i} onMouseLeave={hideDropdownContent} onMouseEnter={showDropdownContent}>
                  <span
                    title={cat}
                    className={'cat-menu-item ' + (activeDropdown == cat ? 'clr-white': path.includes(cat) ? 'clr-white ': 'clr-muted-white ')}
                    onTouchStart={toggleDropdownContent}
                  >{cat_map[cat]['title']}<i className="fa fa-angle-down"/></span>
                  <div className={path.includes(cat) ? 'cat-menu-underbar' : 'cat-menu-underbar-hidden'}/>
                  <div className={'dropdown-content ' + (activeDropdown == cat ? 'display-block' : 'display-none')}>
                    <div className='sub-menu-container' role='navigation'>
                      {
                        Object.keys(cat_map[cat]['endpoints']).map((endpoint, ii) => (
                          <Link
                            className='sub-menu-item'
                            key={ii}
                            to={cat_map[cat]['endpoints'][endpoint]['url']}
                          >{cat_map[cat]['endpoints'][endpoint]['title']}</Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </nav>
        }
      </nav>
    </div>
  )
}

BreadCrumbs.displayName = 'component/BreadCrumbs'
export default BreadcrumbsContainer(BreadCrumbs)
