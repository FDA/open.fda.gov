/* @flow */

import React from 'react'
import cx from 'classnames'
import $ from 'jquery'

import ARIA from '../../constants/aria'
import RenderContentObject from '../RenderContentObject'
import ApiKey from '../ApiKey'

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
  const id: string = e.target.textContent.replace(/(\s|\W)/g, '-').toLowerCase()
  const el: ?Object = document.getElementById(id)
  return el && el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

const _scrollToTop = e => {
  return $('html, body').animate({ scrollTop: 0 }, 'smooth')
}

const ReferenceMenu = (props: Object) => {
  const {
    content,
    isBottom,
    isFixed,
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
        height: 'initial',
        // to account for the gradient overflow
        paddingTop: !isFixed && !isBottom && '85px'
      }}>
      {
        content.map((c: string|Object, i: number) => {
          if (typeof c === 'object') {
            return (
              <RenderContentObject
                key={i}
                i={i}
                obj={c}
                isMenu
                onClick={_scrollIntoView}
              />
            )
          }

          // don't link to examples
          if (c === 'example') return

          // stringified markdown -> html
          // ## About -> About
          const html: string = c.replace(/(#+ )/, '')

          // we're looping over all the content
          // and we just want to pull out the
          // headers to link to, not every line
          if (c.startsWith('#') === false) return

          // get header level from counting '#'
          const level: number = (c.match(/#/g)||[]).length

          const btnCx = cx({
            'menu-item row': true,
            'weight-600': level < 2,
            'depth-2': level === 2,
            'depth-3 display-none': level > 2
          })

          return (
            <button
              key={i}
              className={btnCx}
              onClick={_scrollIntoView}
              dangerouslySetInnerHTML={{__html: html}}
            />
          )
        })
      }
      <ApiKey/>
      <button
        className="menu-item row weight-600"
        onClick={_scrollToTop}>
        <i className="fa fa-arrow-up"/> Back to top
      </button>
      {
        <div
          className={'bottom left right sb-gradient '}
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)',
            height: '85px',
          }}
        />
      }
    </menu>
  )
}

ReferenceMenu.displayName = 'components/SideBar/ReferenceMenu'
export default ReferenceMenu
