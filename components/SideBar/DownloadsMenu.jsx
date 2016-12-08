/* @flow */

import React from 'react'
import marked from 'marked'
import cx from 'classnames'

import ARIA from '../../constants/aria'
import RenderContentObject from '../RenderContentObject'

/**
 * @description [semantic menu means no links. we don't leave the page]
 *              [so, use buttons and scroll els into view using ids]
 * @param  {Object} e [event object]
 * @return {void} [if element not null, scroll into view]
 */
const _scrollIntoView = e => {
  if (typeof document === 'undefined') return
  // ### Responsible use of the data -> responsible-use-of-the-data
  // some cases like 'What are enforcement reports?' result in an
  // extra - at the end because the ? gets replaced with a -
  // but, it works and is easy, and isn't visible to the user
  //const id: string = e.target.textContent.replace(/(\s|\W)/g, '-').toLowerCase()
  const el: ?Object = document.getElementById(e.target.textContent)
  return el && el.scrollIntoView({
    behavior: 'smooth',
  })
}

const DownloadsMenu = (props: Object) => {
  const {
    bottomPos,
    content,
    isBottom,
  } = props

  const menuCx = cx({
    'flex-box dir-column m-hide': true,
    'sb-bottom': isBottom,
  })

  return (
    <menu
      {...ARIA.hide}
      id='menu'
      className={menuCx}
      style={{
        // stick to bottom if near footer
        bottom: isBottom && `${bottomPos}px`,
        height: isBottom && 'initial',
        // to account for the gradient overflow
        paddingBottom: !isBottom && '75px',
      }}>
      {
        content.map((c: string|Object, i: number) => {
          let header: number = 0
          if (c === 'Animal Drug' || c === 'Food' || c === 'Human Drug' || c === 'Medical Device' ){
            header = 1
          }

          const btnCx = cx({
            'menu-item row': true,
            'depth-2': header === 0,
            'weight-600': header === 1
          })

          return (
            <button
              key={i}
              className={btnCx}
              onClick={_scrollIntoView}
              dangerouslySetInnerHTML={{__html: c}}
            />
          )
        })
      }
      {
        props.isFixed &&
        !props.isBottom &&
        <span
          className='fixed bottom left right sb-gradient'
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)',
            height: '100px',
          }}
        />
      }
    </menu>
  )
}

DownloadsMenu.displayName = 'components/SideBar/DownloadsMenu'
export default DownloadsMenu
