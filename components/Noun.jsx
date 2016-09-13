/* @flow */

import React from 'react'
import marked from 'marked'

import Layout from './Layout'
import Hero from './Hero'

const aCx: string = 'clr-gray font-size-4 weight-400 t-pad-t-2 t-pad-b-2 block reading-width t-marg-b-2'
const endCx: string = 'clr-gray b-b-1 marg-b-1'

type tPROPS = {
  meta: Object;
  content: Array<Object>;
};

// pages like /drug/ or /food/
const Noun = ({ meta, content, }: tPROPS) => (
  <Layout
    crumbs={meta.crumbs}
    title={meta.documentTitle}>
    <Hero
      {...meta}
    />
    <nav className='container marg-t-3 marg-b-3'>
      {
        content.map((c, i) => (
          <a
            className={aCx}
            key={i}
            href={c.url}>
            <p className={endCx}>8c0523f2.ngrok.io<strong>{c.url}</strong></p>
            <h2 className='clr-primary-darker'>{c.title}</h2>
            {
              c.description &&
              c.description.map((desc, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{__html: marked(desc)}}
                />
              ))
            }
          </a>
        ))
      }
    </nav>
  </Layout>
)

Noun.displayName = 'components/Noun'
export default Noun
