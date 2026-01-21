import React from "react"
import Link, { GatsbyLinkProps } from "gatsby-link"
import cx from 'classnames'
import ComposedDocSidebar from "../containers/DocSidebarContainer"
import '../css/components/DocSidebar.scss'
import { JSX } from "react/jsx-runtime"
import { SectionLinkProps, sectionProps, BreadcrumbItem, BreadcrumbSection, BreadcrumbSubItem, docSidebarProps } from "../types"

const itemCx = (props: any, isHeader: boolean) => cx({
    'row': true,
    'sidebar-item': !isHeader,
    'sidebar-header sidebar-cross': isHeader,
    'depth-2': !props.isChild,
    'depth-3': props.isChild,
  })

const Section = (props: sectionProps) => {

  let isHeader = false
  const long_title = props.id

  if (props.collapse === true) {
    isHeader = true
  }

  return (
    <div className='pad-l-1 pad-b-2'>
      <h3 className={isHeader ? ("row sidebar-cross" + (props.activeHeader.indexOf(long_title ?? "") > -1 ? ' ' : ' collapsed')) : ' '}
        title={long_title}
        onClick={props.toggleSection}>
        {props.title}
      </h3>
      <SectionLinks
        items={[]}
        {...props}
        id={props.id ?? ""}
        isTutorial={long_title === `Tutorial`}
      />
    </div>
  )
}


const SectionLinks = (props: SectionLinkProps) => {

  return (
    <ul className={props.collapse ? (props.activeHeader.indexOf(props.id) > -1 ? 'display-block' : 'display-none') : ' '}>
      {props.items.map((item: { items: any }, index: any) => (
        <SectionLink
          node={item}
          children={item.items}
          key={index}
          toggleSection={props.toggleSection}
          toggleMobileSidebar={props.toggleMobileSidebar}
          activeHeader={props.activeHeader} isChild={undefined} />
      ))}
    </ul>
  )
}

const APINavLink = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Link<unknown>> & Readonly<GatsbyLinkProps<unknown>>) => {

  const isActive = typeof window !== "undefined" ? window.location.href.endsWith(props.to) : false
  const className = isActive ? props.className + " sidebar-item-active" : props.className

  return (
    <Link {...props} className={className}> {props.title}</Link>
  )
}

const SectionLink = (props: { children: any[]; toggleSection: React.MouseEventHandler<HTMLSpanElement> | undefined; toggleMobileSidebar: React.MouseEventHandler<HTMLAnchorElement> | undefined; activeHeader: string | any[]; node: any; isChild: any }) => {

  let childnodes = null

  const item = props.node
  const title = item.title
  const link = item.link
  let long_title = title
  let isHeader = false

  if (props.children) {
    childnodes = props.children.map((childnode: { items: any }, index: any) => (
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

  if (Object.keys(item).indexOf("link") === -1) {
    isHeader = true
    long_title = item.id
  }
  else {
    long_title = link.split('/').slice(2, -1).join('_')
  }

  return (
    <li>
      {Object.keys(item).indexOf("link") === -1 ? (
        <span className={itemCx(props, isHeader) + (props.activeHeader.indexOf(long_title) > -1 ? ' ' : ' collapsed')}
          title={long_title}
          onClick={props.toggleSection}>
          {title}
        </span>
      ) : link.charAt(0) === `#` ? (
        <a href={link} className={itemCx(props, isHeader)} onClick={props.toggleMobileSidebar}>
          {title}
        </a>
      ) : (
        <APINavLink
          to={link}
          key={link}
          className={itemCx(props, isHeader)}
          activeClassName='sidebar-item-active'
          onClick={props.toggleMobileSidebar}
          title={title}
        />
      )
      }
      {childnodes ?
        <ul className={item.collapse ? (props.activeHeader.indexOf(long_title) > -1 ? 'display-block' : 'display-none') : ' '}>
          {childnodes}
        </ul> : null}
    </li>
  )
}

const DocBreadcrumbs = (props: { yaml: BreadcrumbSection[]; path: any }) => {
  let breadcrumb = "Choose a field"

  if (typeof window === 'undefined') return <span>{breadcrumb}</span>

  props.yaml.map((section, i) => {
    section.items.map((item, j) => {
      if (item.items) {
        item.items.map((subItem, k) => {
          if (subItem.link === props.path) {
            breadcrumb = subItem.title || breadcrumb
          }
        })
      }
      if (item.link === props.path) {
        breadcrumb = item.title || breadcrumb
      }
    })
  })
  return (
    <span>{breadcrumb}</span>
  )
}

const DocSidebar = (props: docSidebarProps) => {
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
      <div className='doc-sidebar-mobile' onClick={() => toggleMobileSidebar()}>
        <DocBreadcrumbs path={path} yaml={yaml} />
        <i className='fa fa-angle-down fa-2x' />
      </div>
      <div className={sidebarCx}>
        {yaml.map((section: { title: any }, index: React.Key | null | undefined) => (
          <div key={index}>
            <Section
              {...section}
              title={section.title}
              index={(index as number)}
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
