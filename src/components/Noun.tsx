/* @flow */

import React from 'react'
import {marked} from 'marked'

import Hero from './Hero'

const aCx: string = 'clr-gray font-size-4 weight-400 t-pad-t-2 t-pad-b-2 block reading-width t-marg-b-2'
const endCx: string = 'clr-gray b-b-1 marg-b-1'

type ContentItem = {
  url: string;
  title: string;
  description?: string[];
};

type tPROPS = {
  meta: Object;
  content: Array<ContentItem>;
};

// pages like /drug/ or /food/
const Noun = ({ meta, content, }: tPROPS) => (
  <section>
    <Hero
    path={''} {...meta}    />
    <nav className='container marg-t-3 marg-b-3'>
      {
        content.map((c, i) => (
          <a
            className={aCx}
            key={i}
            href={c.url}>
            <p className={endCx}>api.fda.gov<strong>{c.url}</strong></p>
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
  </section>
)

Noun.displayName = 'components/Noun'
export default Noun
