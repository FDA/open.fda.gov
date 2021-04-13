/* @flow */

import React from 'react'
import dateFormat from 'dateformat'
import get from 'lodash/get'
import Link from 'gatsby-link'
import updates from '../pages/about/updates/updates.yaml'
import Async from 'react-promise'
import '../css/components/BlogRoll.scss'

const _sortUpdates = updates => {
  const filtered = updates.filter(u => u.date)

  const sorted = filtered.sort(function (a, b) {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA > dateB ? 1 : -1
  }).reverse()

  return sorted
}

type tPROPS = {
  small: boolean
};


const BlogPosts = (props: tPROPS) => {
  const {
    small
  } = props

  // filter out posts without a valid date
  // and also sort them reverse chron
  let sortedUpdates: Array<Object> = _sortUpdates(updates.updates)
  if (small === true) {
    sortedUpdates = sortedUpdates.slice(0, 3)
  }

  return (
    <ul
      aria-label='openFDA updates'
      tabIndex={0}
      className={'blog-container ' + (small === true ?  'overflow-hidden small-blog-container' : '')}>
      {
        sortedUpdates.map((update: Object, i: number) => {
          const {
            desc,
            date
          } = update

          let title = new Promise(function (resolve, reject) {
            if (update.title.length > 40) {
              resolve((get(update, 'title')).substring(0, 40) + '...')
            } else {
              resolve(update.title)
            }
          })

          // Post date, if available
          let formattedDate = ''
          if (date.length > 0) {
            formattedDate = dateFormat(date, 'mmmm d, yyyy').toUpperCase()
          }

          let link_flag = true

          if (update.path.indexOf("http") !== -1) {
            link_flag = false
          }

          return (
            <li
              key={i}
              className='blog-item'>
              {
                link_flag == true &&
                  <Link className='full-height btn-icon-right blog-text-item' to={update.path}>
                    <div>
                      <Async promise={title} then={(val) => <h2 className='blog-header clr-primary-darker'>{val}</h2>}/>
                      <div className='clr-gray-light marg-b-1 t-marg-t-05 time-stamp'>{formattedDate}</div>
                      <p className='smallest txt-overflow-ellipsis'>{desc}</p>
                      {
                        small === false &&
                        <span className='absolute pad-b-2 weight-700 clr-primary'>READ MORE <i
                          className='fa fa-angle-right'/></span>
                      }
                    </div>
                    {
                      small === true &&
                      <i className='fa fa-angle-right fa-2x'/>
                    }
                  </Link>
              }
              {
                !link_flag &&
                  <a className='full-height btn-icon-right blog-text-item' href={update.path}>
                    <div>
                      <Async promise={title} then={(val) => <h2 className='blog-header clr-primary-darker'>{val}</h2>}/>
                      <div className='clr-gray-light marg-b-1 t-marg-t-05 time-stamp'>{formattedDate}</div>
                      <p className='smallest txt-overflow-ellipsis'>{desc}</p>
                      {
                        small === false &&
                        <span className='absolute pad-b-2 weight-700 clr-primary'>READ MORE <i
                          className='fa fa-angle-right'/></span>
                      }
                    </div>
                    {
                      small === true &&
                      <i className='fa fa-angle-right fa-2x'/>
                    }
                  </a>
              }
            </li>
          )
        })
      }
    </ul>
  )
}


/**
 * @description [reverse chron list of blog posts for home and /updates/]
*/
const BlogRoll = (props: tPROPS) => {
  const {
    small
  } = props

  return (
    <section className={'body-bg-offwhite ' + (small === true ? 'blog-list' : 'blog-cards')}>
      <div className='blog-header-container'>
        <h2 className={small === true ? 'clr-primary blog-header' : 'center-heading'}><span>Latest News &amp; Updates</span></h2>
        {
          small === true &&
            <Link
              className='btn-icon-right weight-700'
              to='/about/updates/'>
              VIEW ALL <i className='fa fa-angle-right'/>
            </Link>
        }
      </div>
      <BlogPosts {...props} />
    </section>
  )
}

BlogRoll.displayName = 'component/BlogRoll'
export default BlogRoll
