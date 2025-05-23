import React from 'react'
import Link from 'gatsby-link'
import '../css/components/BreadCrumbs.scss'
import { Location } from '@reach/router'

// if not on top level page, render breadcrumb nav
const BreadCrumbs = (props: { location: {pathname: string}}) => {

  const crumbs = props.location.pathname.split('/').filter(d => d)
  let prevurl = ''
  const urls = crumbs.map(crumb => {
    const result = prevurl + "/" + crumb
    prevurl = result
    return result
  })

  if (crumbs.length === 0) return <span />

  return (
    <div className='row' style={{background: 'rgba(0, 0, 0, 0.2)'}}>
      <nav
        aria-label='Breadcrumb navigation.'
        className='container flex-box just-between align-center dir-row clr-gray responsive-header'>
        <div className='breadcrumb'>
          <Link
            className='clr-white pad-r-1'
            to='/'>
            openFDA
          </Link>
          {
            crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1

              return (
                <span key={i}>
                  <span className='clr-white' style={{opacity: '50%'}}>/</span>
                  {
                    !isLast ?
                      <Link
                        className='clr-white pad-r-1 pad-l-1'
                        to={urls[i]}>
                        {crumb}
                      </Link>
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
      </nav>
    </div>
  )
}

BreadCrumbs.displayName = 'component/BreadCrumbs'

export default (props: any) => (
  <Location>
    {locationProps => <BreadCrumbs {...locationProps} {...props} />}
  </Location>
)
