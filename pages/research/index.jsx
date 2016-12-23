import React from 'react'
import marked from 'marked'

import Hero from '../../components/Hero'
import Layout from '../../components/Layout'
import tools from './_tools.yaml'

const aCx: string = 'clr-gray font-size-4 weight-400 t-pad-t-2 t-pad-b-2 block reading-width t-marg-b-2'
const linkCx: string = 'clr-gray b-b-1 marg-b-1'

export default () => (
  <Layout
    crumbs={['openFDA','Research tools']}
    title='openFDA › Research tools'>
    <Hero
      label='Learn'
      title='Research tools'
      description='These sophisticated, interactive, and open-source applications demonstrate how openFDA APIs can be used for epidemiological research.'
    />
    <nav className='container marg-t-3 marg-b-3'>
      {
        tools.map((tool, i) => (
          <a
            className={aCx}
            key={i}
            href={tool.url}>
            <p><span className={linkCx}>{tool.url}</span> {tool.noun && <strong>{tool.noun}</strong>}</p>
            <h2 className='clr-primary-darker'>{tool.title}</h2>
            {
              tool.description &&
              tool.description.map((desc, i) => (
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
