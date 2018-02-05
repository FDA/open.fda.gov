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
          isInline={props.isInline}
          toggleSection={props.toggleSection}
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
      <SectionLink key={index} node={childnode} children={childnode.items} isChild />
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
        <a href={link} className={itemCx}>
          {title}
        </a>
      ) : (
        <Link
          to={link}
          key={link}
          className={itemCx}
          activeClassName='sidebar-item-active'
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

class DocSidebar extends React.Component {
  render() {
    const menu = this.props.yaml
    const isInline = this.props.inline

    return (
      <div className="doc-sidebar">
        {menu.map((section, index) => (
          <div key={index}>
            <Section
              {...section}
              title={section.title}
              index={index}
              isInline={isInline}
              activeHeader={this.props.activeHeader}
              toggleSection={this.props.toggleSection}
            />
          </div>
        ))}
      </div>
    )
  }
}

DocSidebar.displayName = 'components/DocSidebar'
export default ComposedDocSidebar(DocSidebar)