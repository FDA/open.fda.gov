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
const ComposedSidebar: React.ComponentType<tPROPS> = SideBarContainer(SideBar)

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

  let fieldsMapped: Object = {}
  let fieldsFlattened: Object = {}
  if (explorers && fields) {
    fieldsMapped = mapFields(fields.properties)
    fieldsFlattened = flattenFields(fieldsMapped)
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
        {...meta}      />
      {
        <EndpointStatus
        endpoint={''} path={''} status={''} fullPath={''} data={null} {...meta}        />
      }
      <section className={wrapperCx}>
        {
          meta.type !== 'update' &&
          <ComposedSidebar
            className='m-hide'
            reference={content} content={[]} explorers={{}} infographics={[]} infographicDefinitions={{undefined}} fields={{
              properties: []
            }} hideMenu={false} meta={{
              type: ''
            }} type={""} showMenu={false}          />
        }
        <div
          className={contentCx}
          style={{
            maxWidth: '100%',
          }}>
          <Content
          examples={[]} showMenu={false} {...props}
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
