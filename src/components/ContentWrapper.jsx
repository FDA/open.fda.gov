/* @flow */

import React from 'react'
import cx from 'classnames'

import EndpointStatus from './EndpointStatus'
import SideBar from './SideBar'
import Content from './Content'
import Hero from './Hero'

import SideBarContainer from '../containers/SideBarContainer'

import mapFields from '../utils/mapFields'
import flattenFields from '../utils/flattenFields'

type tPROPS = {
  content: Array<Object|string>;
  explorers: Object;
  infographics: Array<Object>;
  fields: Object;
  hideMenu: boolean;
  meta: Object;
  type: String;
};

const wrapperCx = cx({
  'container t-marg-t-3 marg-b-3 relative row content-wrapper': true,
})

// add fixed positioning functinality to reference sidebar
const ComposedSidebar: ReactClass = SideBarContainer(SideBar)

// i just exist to render the Sidebar, and
// determine whether we render ref specific
// components or not
const ContentWrapper = (props: tPROPS) => {
  const {
    content,
    explorers,
    fields,
    meta
  } = props

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
        {...meta}
      />
      {
        <EndpointStatus
          {...meta}
        />
      }
      <section className={wrapperCx}>
        {
          meta.type != 'update' &&
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
            { ...props }
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
