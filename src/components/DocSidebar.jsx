import React from "react"
import Link from "gatsby-link"
import cx from 'classnames'
import DocSidebarContainer from "../containers/DocSidebarContainer";


const Section = props => (
  <div className="pad-l-1 pad-b-4">
    <h3>
      {props.title}
    </h3>
    <SectionLinks
      {...props}
      title={props.title}
      isTutorial={props.title === `Tutorial`}
    />
  </div>
)

const SectionLinks = props => {

  return (
    <ul>
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
  // If the last character is a * then the doc page is still in draft
  let isDraft = item.title.slice(-1) === `*`
  let title = isDraft ? item.title.slice(0, -1) : item.title

  let isHeader = false
  if (Object.keys(item).indexOf("link") === -1) {
    isHeader = true
  }
  const itemCx = cx({
    'row': true,
    'sidebar-item': !isHeader,
    'sidebar-header': isHeader,
    'depth-2': !props.isChild,
    'depth-3': props.isChild,
  })

  return (
    <li>
      {Object.keys(item).indexOf("link") === -1 ? (
        <span className={itemCx + (props.activeHeader.indexOf(title) > -1 ? ' ': ' collapsed')}
              title={title}
              onClick={props.toggleSection}>
          {title}
        </span>
        ) : item.link.charAt(0) === `#` ? (
          <a href={item.link} className={itemCx}>
            {title}
          </a>
        ) : (
          <Link
            to={item.link}
            key={item.title}
            className={itemCx}
            activeClassName="sidebar-item-active"
            exact
          >
            {title}
          </Link>
        )
      }
      {childnodes ?
        <ul className={item.collapse ? (props.activeHeader.indexOf(title) > -1 ? 'display-block': 'display-none') : ' '}>
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
          <div
            key={index}

          >
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
export default DocSidebarContainer(DocSidebar)