/* @flow */

import React from 'react'

// if not on top level page, render breadcrumb nav
const BreadCrumbs = () => {
  if (typeof window === 'undefined') return <span />

  const crumbs: Array<string> = window.location.pathname.split('/').filter(d => d)

  if (crumbs.length === 0) return <span />

  return (
    <div className='row m-pad-t-2 m-pad-b-2 t-pad-t-1 t-pad-b-1' style={{background: 'rgba(0, 0, 0, 0.2)'}}>
      <nav
        aria-label='Breadcrumb navigation.'
        className='container flex-box align-center dir-row clr-gray mob-header font-size-4'>
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
                <i className="fa fa-angle-right clr-white"/>
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
      </nav>
    </div>
  )
}

BreadCrumbs.displayName = 'component/BreadCrumbs'
export default BreadCrumbs
