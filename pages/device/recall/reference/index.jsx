import React from 'react'

import ContentWrapper from '../../../../components/ContentWrapper'

import content from './_content.yaml'
import examples from './_examples.json'
import fields from '../_fields.yaml'
import meta from './_meta.yaml'

export default () => (
  <ContentWrapper
    content={content}
    examples={examples}
    fields={fields}
    meta={meta}
    showMenu
  />
)
