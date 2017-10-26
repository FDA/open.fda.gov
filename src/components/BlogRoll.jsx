/* @flow */

import React from 'react'
import dateFormat from 'dateformat'
import get from 'lodash/get'
import marked from 'marked'

import Link from 'gatsby-link'

const _sortPosts = posts => {
  const filtered = posts.filter(p => p.data.date)

  const sorted = filtered.sort(function (a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateA > dateB ? 1 : -1
  }).reverse()

  return sorted
}

type tPROPS = {
  posts: Object,
  small: boolean
};

/**
 * @description [reverse chron list of blog posts for home and /updates/]
 */
const BlogRoll = (props: tPROPS) => {
  const {
    posts,
    small
  } = props

  // filter out posts without a valid date
  // and also sort them reverse chron
  const sortedPosts: Array<Object> = _sortPosts(posts)

  // increment for every actually rendered post
  // this is useful because not everything in
  // sortedPosts will get rendered. actually,
  // most won't get rendered, since posts
  // are really just any markdown file
  let tally: number = 0 | 0

  return (
    <section className='blog-bg'>
      <h2 className="center-heading" style={{margin: '30px 30px 10px'}}><span>Latest News & Updates</span></h2>
      <ul
        aria-label='openFDA updates'
        tabIndex={0}
        className={'container blog-container ' + (small === true ?  'overflow-hidden small-blog-container' : '')}>
        {
          sortedPosts.map((post: Object, i: number) => {
            // only render markdown files
            if (get(post, 'file.ext') !== 'md') return

            // showInList is true by default
            // basically, not every post needs to
            // be part of the BlogRoll
            if (post.data.showInList === false) return

            const {
              body,
              date,
            } = post.data

            const title: string = (get(post, 'data.title') || post.path).substring(0, 40) + '...'

            // level refers to header level. h1, h2, etc
            // we start at 2, because h1 is the hero section
            // and then we proceed from there
            // we do this so we have a logical order of headers
            // h1 -> h2 -> h3 and so on til we get to h6
            let level: number = tally === 0 ? 2 : (tally + 2)
            // cheap way to keep capped at h6
            if (level > 6) {
              level = 6
            }

            // WE DO THIS FOR ACCESSIBILITY
            // IT MAY SEEM UNNECESSARY, BUT DO NOT CHANGE
            // $FlowIgnore
            let Title: React.Element = React.createElement(
              `h${level}`,
              {
                className: 'font-size-3',
                tabIndex: 0,
              },
              <Link
                className='font-size-3 clr-primary-darker'
                style={{fontSize: '18px', lineHeight: '22px'}}
                to={post.path}>
                {title}
              </Link>
            )


            // don't remove me
            // i keep track of the amount
            // of actually rendered blog posts
            tally += 1

          // Cheap way of making post excerpt
          const excerpt = body.substring(3, body.search("</p>")).replace(/<(?:.|\n)*?>/gm, '').substring(0, 120) + '...'

            // Post date, if available
            let formattedDate = ''
            if (date.length > 0) {
              formattedDate = dateFormat(date, 'mmmm d, yyyy').toUpperCase()
            }


            return (
              <li
                key={i}
                className='marg-l-1 marg-r-1 marg-t-2 marg-b-2 blog-item'>
                <Link className='pad-3 relative full-height blog-text-item' style={{paddingTop: "30px"}}to={post.path}>
                  <h2 className='blog-header clr-primary-darker'>{title}</h2>
                  <div className='clr-gray-light marg-b-1 t-marg-t-05'>{formattedDate}</div>
                  <p className="smallest txt-overflow-ellipsis">{excerpt}</p>
                  <span className="absolute bottom pad-b-2 weight-700 clr-primary">READ MORE <i className="fa fa-angle-right"/></span>
                </Link>
              </li>
            )
          })
        }
      </ul>
      {small === true &&
        <Link
        className='pad-b-3 weight-700 clr-primary'
        to='/about/updates/'>
        VIEW ALL <i className="fa fa-angle-right"/>
        </Link>}
    </section>
  )
}

BlogRoll.displayName = 'component/BlogRoll'
export default BlogRoll
