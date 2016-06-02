/* @flow */

import React from 'react'
import dateFormat from 'dateformat'
import get from 'lodash/get'
import marked from 'marked'

const Link: ReactClass = require('react-router').Link

const _sortPosts = posts => {
  const filtered = posts.filter(p => p.data.date)

  const sorted = filtered.sort(function (a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateA > dateB ? 1 : -1
  }).reverse()

  return sorted
}

/**
 * @description [reverse chron list of blog posts for home and /updates/]
 */
const BlogRoll = (posts: Object) => {
  // filter out posts without a valid date
  // and also sort them reverse chron
  const sortedPosts: Array<Object> = _sortPosts(posts.posts)

  // increment for every actually rendered post
  // this is useful because not everything in
  // sortedPosts will get rendered. actually,
  // most won't get rendered, since posts
  // are really just any markdown file
  let tally: number = 0 | 0

  return (
    <ul
      aria-label='openFDA updates'
      tabIndex={0}
      className='d-reading-width'>
      {
        sortedPosts.map((post: Object, i: number) => {
          // only render markdown files
          if (get(post, 'file.ext') !== 'md') return

          // showInList is true by default
          // basically, not every post needs to
          // be part of the BlogRoll
          if (post.data.showInList === false) return

          const {
            authors,
            body,
            date,
          } = post.data

          const title: string = get(post, 'data.title') || post.path

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
          const Title: React.Element = React.createElement(
            `h${level}`,
            {
              className: 'font-size-3 marg-b-1',
              tabIndex: 0,
            },
            <Link
              className='font-size-3 clr-primary-darker'
              to={post.path}>
              {title}
            </Link>
          )

          // don't remove me
          // i keep track of the amount
          // of actually rendered blog posts
          tally += 1

          // Cheap way of making post excerpt
          const excerpt = marked(body).substring(0, 255) + '…'

          // Post date, if available
          let formattedDate = ''
          if (date.length > 0) {
            formattedDate = dateFormat(date, 'mmmm d, yyyy')
          }

          // Some posts don’t have authors. If the post has authors,
          // join their names as a string, comma-separated.
          let postAuthors: string = ''
          if (authors) {
            postAuthors = authors.join(', ')
          }

          return (
            <li
              key={i}
              className='marg-b-4'>
              {Title}
              <div
                className='font-size-5'
                dangerouslySetInnerHTML={{__html: excerpt}}
              />
              <p className='small'>{postAuthors.length > 0 && <span>{postAuthors}</span>} <span className='clr-gray'>{formattedDate}</span> </p>
            </li>
          )
        })
      }
    </ul>
  )
}

BlogRoll.displayName = 'component/BlogRoll'
export default BlogRoll
