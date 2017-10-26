/* @flow */

import React from 'react'
import dateFormat from 'dateformat'

import Hero from '../components/Hero'
import Layout from '../components/Layout'
import type tTEMPLATE from '../constants/types/template'

const MD = ({ route }: tTEMPLATE) => {
  const post: Object = route.page.data

  // Some posts don’t have authors. If the post has authors,
  // join their names as a string, comma-separated.
  let postAuthors: string = ''
  if (post.authors) {
    postAuthors = post.authors.join(', ')
  }

  return (
    <Layout
      crumbs={[post.title]}
      title={post.title}>
      <Hero
        label={dateFormat(post.date, 'mmmm d, yyyy')}
        title={post.title}
        description={postAuthors}
      />
      <section className='container dir-column marg-t-2'>
        <article
          className={`font-size-5 reading-width marg-t-3 marg-b-3 update-post`}
          dangerouslySetInnerHTML={{__html: post.body}}
        />
      </section>
    </Layout>
  )
}

MD.displayName = 'wrappers/md'
module.exports = MD
