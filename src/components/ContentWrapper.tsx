/* @flow */

import React, { useEffect } from 'react'
import cx from 'classnames'

import EndpointStatus from './EndpointStatus'
import SideBar from './SideBar'
import Content from './Content'
import Hero from './Hero'

import SideBarContainer from '../containers/SideBarContainer'

import mapFields from '../utils/mapFields'
import flattenFields from '../utils/flattenFields'
import '../css/components/ContentWrapper.scss'
import type { contentWrapperProps, FieldsType } from '../types'

const wrapperCx = cx({
  'container marg-b-3 relative row content-wrapper': true,
})

const contentCx = cx({
  'float-r': true,
  'ref-content': true,
})

// add fixed positioning functinality to reference sidebar
const ComposedSidebar: React.ComponentType<any> = SideBarContainer(SideBar)

// i just exist to render the Sidebar, and
// determine whether we render ref specific
// components or not
const ContentWrapper = (props: contentWrapperProps) => {
  const {
    content,
    explorers,
    fields,
    infographics,
    infographicDefinitions,
    meta
  } = props

  let fieldsMapped: Record<string, string> = {}
  let fieldsFlattened: Record<string, string> = {}
  if (explorers && fields) {
    fieldsMapped = mapFields(fields.properties)
    fieldsFlattened = flattenFields(fieldsMapped) as Record<string, string>
  }

  return (
    <section>
      <Hero
        authors={[]} date={''} label={''} path={''} title={''}
        {...meta}
        type={meta.type as 'homepage' | 'endpoint' | 'update' | undefined}
      />
      {
        <EndpointStatus
          endpoint={''} path={''} status={''} fullPath={''} data={null} {...meta} />
      }
      <section className={wrapperCx}>
        {
          meta.type !== 'update' &&
          <ComposedSidebar
            className='m-hide'
            reference={content}
          />
        }
        <div
          className={contentCx}
          style={{
            maxWidth: '100%',
          }}>
          <Content
            examples={[]} showMenu={false} {...props}
            fieldsMapped={fieldsMapped}
            fieldsFlattened={fieldsFlattened}
            meta={{ ...meta, start: meta.start || '', api_path: meta.api_path || '' }}
          />
        </div>
      </section>
    </section>
  )
}

ContentWrapper.displayName = 'components/ContentWrapper'
ContentWrapper.defaultProps = {
  showMenu: false,
}
export default ContentWrapper
