/* @flow */

import React from 'react'
import cx from 'classnames'

import useBreakpoints from '../../constants/breakpoints'
import type {tMenu} from '../../constants/types/menu'

type PROPS = {
  menu: tMenu;
};

/**
 * @description specific endpoint sidebar menus. used only there
 * @param {Object} [menu] [menu data for interacting with infographics]
 * @returns React.Element
 */
const CustomMenu = ({ menu, }: PROPS) => {
  const { mob, tab, desk, wide } = useBreakpoints()
  if (mob) {
    return (
      <div>
      <label>
        <span>Select data visualization to view</span>
        <div className='select-wrap marg-b-2'>
          <select
            className='marg-t-1'
            value={menu.selected}
            onChange={() => menu.handler}>
            {
              menu.data &&
              menu.data.map((d, i) => (
                <option
                  value={d}
                  key={i}>
                  {d}
                </option>
              ))
            }
          </select>
        </div>
      </label>
      </div>
    )
  }

  return (
    <menu className='dir-column flex-box'>
      <span
        className='visually-hidden'
        tabIndex={0}>
        Click buttons to toggle active visualization
      </span>
      {
        menu.data &&
        menu.data.map((d, i) => {
          const btnCx = cx({
            'menu-item row': true,
            'active': d === menu.selected,
          })

          return (
            <button
              className={btnCx}
              key={i}
              onClick={() => menu.handler}>
              {d}
            </button>
          )
        })
      }
    </menu>
  )
}

CustomMenu.displayName = 'components/SideBar/CustomMenu'
export default CustomMenu
