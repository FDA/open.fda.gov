/* @flow */

import React from 'react'
import cx from 'classnames'

import CustomMenu from './CustomMenu'
import ReferenceMenu from './ReferenceMenu'
import type tMenu from '../../constants/types/menu'

type tPROPS = {
  bottom: boolean;
  bottomPos: number;
  bp: Object;
  className: string;
  fixed: boolean;
  menu: tMenu;
  reference: Array<Array<string>|Object>;
  style: Object;
};

/**
 * @description [sidebar for endpoint basics and reference pages]
 *              [important: is not always composed by SidebarContainer]
 *              [this means it can have different functionality]
 *              [depending on it's end use (sticky vs non-sticky)]
 */
const SideBar = (props: tPROPS) => {
  const {
    // for sticky sidebar, are we at the bottom
    bottom,
    // the actual px position of the bottom
    bottomPos,
    // breakpoint object
    bp,
    // pass through prop for applying classes
    className,
    // is the sidebar sticky
    fixed,
    // menu data for rendering infographic menu
    menu,
    // reference data for rendering reference menu
    reference,
    // pass through prop for applying styles
    style,
  } = props

  const sideBarCx = cx({
    'sb-fixed': fixed,
  })

  const wrapCx = cx({
    'relative col sb m-marg-t-3 m-marg-b-2': true,
    [className]: !!className,
  })

  // aside === relative position, holds sidebar in place
  // inner div === if sidebar is sticky, this is what moves

  return (
    <aside
      id='sidebarWrap'
      className={wrapCx}
      style={{
        ...style,
        maxWidth: '300px',
      }}>
      <div className={sideBarCx}>
        {
          menu &&
          <CustomMenu
            bp={bp}
            menu={menu}
          />
        }
        {
          reference &&
          <ReferenceMenu
            bottomPos={bottomPos}
            content={reference}
            isFixed={fixed}
            isBottom={bottom}
          />
        }
      </div>
    </aside>
  )
}

SideBar.displayName = 'components/Sidebar'
export default SideBar
