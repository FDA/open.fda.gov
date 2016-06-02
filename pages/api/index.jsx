import React from 'react'

import ContentWrapper from '../../components/ContentWrapper'
import content from './_content.yaml'
import examples from './_examples.json'
import explorers from './_explorers.yaml'
import fields from './_fields.yaml'
import meta from './_meta.yaml'

export default () => (
  <ContentWrapper
    content={content}
    examples={examples}
    explorers={explorers}
    fields={fields}
    meta={meta}
    showMenu
  />
)
