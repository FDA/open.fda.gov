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

type FieldsType = {
  properties: Record<string, any>;
  [key: string]: any;
};

type tPROPS = {
  content: Array<Object | string>;
  explorers: Object;
  infographics: Array<Object>;
  infographicDefinitions: Object;
  fields: FieldsType;
  className?: string;
  hideMenu: boolean;
  meta: { type?: string; start?: string | undefined; api_path?: string; [key: string]: any };
  type: String;
};

const wrapperCx = cx({
  'container marg-b-3 relative row content-wrapper': true,
})

// add fixed positioning functinality to reference sidebar
const ComposedSidebar = SideBarContainer(SideBar)

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
  }, []);

  let fieldsMapped: Record<string, string> = {}
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
      authors={[]} date={''} label={''} path={''} title={''} 
      {...meta}
      type={meta.type as 'homepage' | 'endpoint' | 'update' | undefined}
      />
      {
        <EndpointStatus
        endpoint={''} path={''} status={''} fullPath={''} data={null} {...meta}        />
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
