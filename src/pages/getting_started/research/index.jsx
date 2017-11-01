import React from 'react'

import Hero from '../../../components/Hero/index'
import ResearchBox from '../../../components/ResearchBox'
import tools from './_tools.yaml'


export default () => (
  <section>
    <Hero
      label='Learn'
      title='Research tools'
      description='These sophisticated, interactive, and open-source applications demonstrate how openFDA APIs can be used for epidemiological research.'
    />
    <section className='blog-bg'>
      <h2 className="center-heading" style={{margin: '30px 30px 10px'}}><span>OpenFDA Powered Research Tools</span></h2>
      <div className='blog-container'>
        {
          tools.map((tool, i) => (
            <ResearchBox
              key={i}
              url={tool.url}
              title={tool.title}
              description={tool.description}
            >

            </ResearchBox>
          ))
        }
      </div>
    </section>
  </section>
)
