import React from "react"
import Link from "gatsby-link"
import cx from 'classnames'
import ComposedDocSidebar from "../containers/DocSidebarContainer";


const Section = props => {
  let isHeader = false
  let long_title = props.id
  if (props.collapse === true) {
    isHeader = true
  }
  return (
    <div className='pad-l-1 pad-b-2'>
      <h3 className={isHeader ? ("row sidebar-cross" + (props.activeHeader.indexOf(long_title) > -1 ? ' ': ' collapsed')): ' '}
        title={long_title}
        onClick={props.toggleSection}>
        {props.title}
      </h3>
      <SectionLinks
        {...props}
        isTutorial={long_title === `Tutorial`}
      />
    </div>
  )
}


const SectionLinks = props => {

  return (
    <ul className={props.collapse ? (props.activeHeader.indexOf(props.id) > -1 ? 'display-block': 'display-none') : ' '}>
      {props.items.map((item, index) => (
        <SectionLink
          node={item}
          children={item.items}
          key={index}
          toggleSection={props.toggleSection}
          toggleMobileSidebar={props.toggleMobileSidebar}
          activeHeader={props.activeHeader}
        />
      ))}
    </ul>
  )
}


const SectionLink = props => {

  let childnodes = null
  if (props.children) {
    childnodes = props.children.map((childnode, index) => (
      <SectionLink
        key={index}
        node={childnode}
        children={childnode.items}
        toggleSection={props.toggleSection}
        toggleMobileSidebar={props.toggleMobileSidebar}
        activeHeader={props.activeHeader}
        isChild />
    ))
  }

  let item = props.node
  let title =  item.title
  let link = item.link
  let long_title = title

  let isHeader = false
  if (Object.keys(item).indexOf("link") === -1) {
    isHeader = true
    long_title = item.id
  } else {
    long_title = link.split('/').slice(2, -1).join('_')
  }
  const itemCx = cx({
    'row': true,
    'sidebar-item': !isHeader,
    'sidebar-header sidebar-cross': isHeader,
    'depth-2': !props.isChild,
    'depth-3': props.isChild,
  })

  return (
    <li>
      {Object.keys(item).indexOf("link") === -1 ? (
        <span className={itemCx + (props.activeHeader.indexOf(long_title) > -1 ? ' ': ' collapsed')}
          title={long_title}
          onClick={props.toggleSection}>
          {title}
        </span>
      ) : link.charAt(0) === `#` ? (
        <a href={link} className={itemCx} onClick={props.toggleMobileSidebar}>
          {title}
        </a>
      ) : (
        <Link
          to={link}
          key={link}
          className={itemCx}
          activeClassName='sidebar-item-active'
          onClick={props.toggleMobileSidebar}
          exact
        >
          {title}
        </Link>
      )
      }
      {childnodes ?
        <ul className={item.collapse ? (props.activeHeader.indexOf(long_title) > -1 ? 'display-block': 'display-none') : ' '}>
          {childnodes}
        </ul> : null}
    </li>
  )
}


const DocBreadcrumbs = props => {
  let breadcrumb = "Choose a field"

  if (typeof window === 'undefined') return <span>{breadcrumb}</span>

  props.yaml.map((section: object, i) => {
    section.items.map((item: object, j) => {
      if (Object.keys(item).indexOf("items") > -1) {
        item.items.map((subItem: object, k) => {
          if (subItem.link === props.path) {
            breadcrumb = subItem.title
          }
        })
      }
      if (item.link === props.path) {
        breadcrumb = item.title
      }
    })
  })
  return (
    <span>{breadcrumb}</span>
  )
}


type tPROPS = {
  activeHeader: string;
  path: string;
  isSticky: boolean;
  style: object;
  yaml: object;
  showMobileSidebar: boolean;
  toggleSection: Function;
  toggleMobileSidebar: Function;
};


const DocSidebar = (props: tPROPS) => {
  const {
    activeHeader,
    path,
    yaml,
    showMobileSidebar,
    toggleSection,
    toggleMobileSidebar
  } = props

  const sidebarCx = cx({
    'doc-sidebar': true,
    'tab-hide': !showMobileSidebar
  })

  return (
    <section id='doc-sidebar'>
      <div className='doc-sidebar-mobile' onClick={toggleMobileSidebar}>
        <DocBreadcrumbs path={path} yaml={yaml}/>
        <i className='fa fa-angle-down fa-2x'/>
      </div>
      <div className={sidebarCx}>
        {yaml.map((section, index) => (
          <div key={index}>
            <Section
              {...section}
              title={section.title}
              index={index}
              activeHeader={activeHeader}
              toggleSection={toggleSection}
              toggleMobileSidebar={toggleMobileSidebar}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

DocSidebar.displayName = 'components/DocSidebar'
export default ComposedDocSidebar(DocSidebar)