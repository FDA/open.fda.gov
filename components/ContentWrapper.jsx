/* @flow */

import React from 'react'
import cx from 'classnames'

import EndpointStatus from './EndpointStatus'
import SideBar from './SideBar'
import Content from './Content'
import Hero from './Hero'
import Layout from './Layout'

import SideBarContainer from '../containers/SideBarContainer'
import InfographicContainer from '../containers/InfographicContainer'

import mapFields from '../utils/mapFields'
import flattenFields from '../utils/flattenFields'

type tPROPS = {
  content: Array<Object|string>;
  explorers: Object;
  infographics: Array<Object>;
  fields: Object;
  showMenu: boolean;
  meta: Object;
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
    infographics,
    fields,
    showMenu,
    meta,
  } = props

  let fieldsMapped: Object = {}
  let fieldsFlattened: Object = {}
  if (explorers && fields) {
    fieldsMapped = mapFields(fields.properties)
    fieldsFlattened = flattenFields(fieldsMapped)
  }

  const contentCx = cx({
    'float-r': true,
    'ref-content': showMenu,
  })

  return (
    <Layout
      crumbs={meta.crumbs}
      meta={meta}
      title={meta.documentTitle}>
      <Hero
        {...meta}
      />
      <section className={wrapperCx}>
        {
          showMenu &&
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
          {
            showMenu &&
            <EndpointStatus
              {...meta}
            />
          }
          {
            infographics &&
            <InfographicContainer
              { ...props }
              fieldsFlattened={fieldsFlattened}
            />
          }
          <Content
            { ...props }
          />
        </div>
      </section>
    </Layout>
  )
}

ContentWrapper.displayName = 'components/ContentWrapper'
ContentWrapper.defaultProps = {
  showMenu: false,
}
export default ContentWrapper
