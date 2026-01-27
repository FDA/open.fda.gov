/* @flow */

import React from 'react'
import debounce from 'lodash/debounce'
import type { sidebarState } from '../types/sidebar.types'

/**
 * @description [HOC container for sidebar to make it sticky on scroll]
 */

const SideBarContainer = function (ComposedSideBar: any): React.ComponentType {
  class HOC extends React.Component {
    state: sidebarState = {
      bottom: false,
      fixed: false,
      bottomPos: 0
    };

    // this just gets re-assigned in constructor
    // for flow purposes
    _boundCheckPosition: () => void;
    private boundCB!: (event: Event) => void;

    constructor(props: Object) {
      super(props)
      // debounce so we're not calling this functions
      // thousands of times a second
      this._boundCheckPosition = debounce(this._checkPosition.bind(this), 10)
    }

    componentDidMount() {
      this.boundCB = this._boundCheckPosition

      if (window) {
        window.addEventListener('scroll', this.boundCB, false)
        window.addEventListener('resize', this.boundCB)
      }
    }

    componentWillUnmount() {
      this.boundCB = this._boundCheckPosition

      if (window) {
        window.removeEventListener('scroll', this.boundCB, false)
        window.removeEventListener('resize', this.boundCB)
      }
    }

    _checkPosition() {
      // the entire aside, the height of the height
      const wrap = document.getElementById('sidebarWrap') as HTMLElement | null
      // the actual menu, of variable height, that can be fixed
      const el = document.getElementById('menu') as HTMLElement | null
      // footer height, used for bottom positioning
      const footer = document.getElementById('footer') as HTMLElement | null
      // height of footer with spacing - menu padding
      const bottomPos: number = (footer?.clientHeight ?? 0) + 50
      // the top position of the wrapper
      const runwayStart: number = this._getPos(wrap)
      // the bottom position of the wrapper, the end of the runway
      const runwayEnd: number = wrap ? wrap.clientHeight : 0
      // current browser scroll position
      const browser: number = this._getPageScroll()
      // browser position - content above sidebar
      const realPos: number = browser - runwayStart

      // don't do anything if at the top of the page
      if (browser <= (runwayStart - 45) && !this.state.fixed) {
        return
      }


      // we're within the 'runway'
      if (browser > (runwayStart - 45)) {
        // we fix the nav once the browser is past starting point
        let fixed: boolean = true
        // we're at the end of the runway
        let bottom: boolean = false
        const elementBottomPos: number = el ? realPos + el.clientHeight : realPos


        // account for the 85px spacer at the bottom
        if ((elementBottomPos >= (runwayEnd - 85))) {
          bottom = true
          fixed = false
        }

        return this.setState({
          bottomPos,
          bottom,
          fixed,
        })
      }

      this.setState({
        fixed: false,
      })
    }

    // findPos() by quirksmode.org
    // Finds the absolute position of an element on a page
    _getPos(element: HTMLElement | null): number {
      if (!element) return 0;
      let absPos: number = 0
      let el: any = element

      while (el.offsetParent) {
        absPos += el.offsetTop

        if (el === document.getElementsByTagName('body')[0]) {
          break
        }
        else {
          el = el.offsetParent
        }
      }

      return absPos
    }

    // getPageScroll() by quirksmode.org
    // Finds the scroll position of a page
    _getPageScroll(): number {
      let browserPos: number = 0

      if (self.pageYOffset) {
        browserPos = self.pageYOffset
      }
      else if (document.documentElement && document.documentElement.scrollTop) {
        browserPos = document.documentElement.scrollTop
      }
      // all other Browsers
      else if (document.body) {
        browserPos = document.body.scrollTop
      }

      return browserPos
    }

    render() {
      return (
        <ComposedSideBar
          {...this.props}
          {...this.state}
        />
      )
    }
  }

  return HOC
}

export default SideBarContainer
