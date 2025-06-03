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

type Meta = {
  type: string;
}
type fieldsType = {
  properties: Array<Object>;
  [key: string]: any;
}
type tPROPS = {
  content: Array<Object | string>;
  explorers: Object;
  infographics: Array<Object>;
  infographicDefinitions: Object;
  fields: fieldsType;
  hideMenu: boolean;
  meta: Meta;
  type: String;
  showMenu: boolean;
  className?: string;
  style?: Object;
  reference: Array<Array<string> | Object>;
};

const wrapperCx = cx({
  'container marg-b-3 relative row content-wrapper': true,
})

// add fixed positioning functinality to reference sidebar
// If SideBarContainer is a higher-order component that passes through props, use a type assertion:
const ComposedSidebar = SideBarContainer(SideBar as React.ComponentType<any>)

// i just exist to render the Sidebar, and
// determine whether we render ref specific
// components or not
const ContentWrapper = (props: tPROPS) => {
  const {
    content,
    explorers,
    fields,
    infographics,
    infographicDefinitions,
    meta
  } = props

  useEffect(() => {
  }, [])

  let fieldsMapped: Record<string, any> = {}
  let fieldsFlattened: Record<string, string> = {}
  if (explorers && fields) {
    fieldsMapped = mapFields(fields.properties)
    fieldsFlattened = flattenFields(fieldsMapped) as Record<string, string>
  }

  const contentCx = cx({
    'float-r': true,
    'ref-content': true,
  })

  return (
    <section>

      <Hero
        path={''} 
        description=''
        htmlDescription={false}
        type={meta.type as "homepage" | "endpoint" | "update" | "dataset" | undefined}
      />
      {
        <EndpointStatus
        endpoint={''} path={''} status={''} fullPath={''} data={null} {...meta}        />
      }
      <section className={wrapperCx}>
        {
          meta.type !== 'update' &&
          <ComposedSidebar
            content={[]} explorers={{}} infographics={[]} infographicDefinitions={{undefined}} fields={{
              properties: []
            }} hideMenu={false} meta={{
              type: ''
            }} type={""} showMenu={false} 
            sidebarProps={{ className: 'm-hide' }}        />
        }
        <div
          className={contentCx}
          style={{
            maxWidth: '100%',
          }}>
          <Content
          examples={[]} 
          {...props}
          meta={{
            ...props.meta,
            start: (props.meta as any).start || '',
            api_path: (props.meta as any).api_path || ''
          }}
          fieldsMapped={fieldsMapped}
          fieldsFlattened={fieldsFlattened}          />
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
