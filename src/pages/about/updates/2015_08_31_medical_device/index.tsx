import React from 'react'

import ContentWrapper from '../../../../components/ContentWrapper'

import content from './_content.yaml'
import meta from './_meta.yaml'

export default () => (
  <ContentWrapper
    content={content}
    meta={meta} explorers={{}} fields={{
      properties: []
    }} infographics={[]} infographicDefinitions={{}} hideMenu={false}  />
)
