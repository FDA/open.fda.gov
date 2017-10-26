/* @flow */

import React from 'react'
import debounce from 'lodash/debounce'

type tSTATE = {
  bottom: boolean;
  bottomPos: number;
  fixed: boolean;
};

const SideBarContainer = function (ComposedSideBar: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      bottom: false,
      fixed: false,
    };

    // this just gets re-assigned in constructor
    // for flow purposes
    _boundCheckPosition = {};

    constructor (props: Object) {
      super(props)
      // debounce so we're not calling this functions
      // thousands of times a second
      this._boundCheckPosition = debounce(this._checkPosition.bind(this), 10)
    }

    componentDidMount () {
      const boundCB: Function = this._boundCheckPosition

      if (window) {
        window.addEventListener('scroll', boundCB, false)
        window.addEventListener('resize', boundCB)
      }
    }

    componentWillUnmount () {
      const boundCB: Function = this._boundCheckPosition

      if (window) {
        window.removeEventListener('scroll', boundCB, false)
        window.removeEventListener('resize', boundCB)
      }
    }

    _checkPosition () {
      // the entire aside, the height of the height
      const wrap: Object = document.getElementById('sidebarWrap')
      // the actual menu, of variable height, that can be fixed
      const el: Object = document.getElementById('menu')
      // footer height, used for bottom positioning
      const footer: Object = document.getElementById('footer')
      // height of footer with spacing - menu padding
      const bottomPos: number = footer.clientHeight + 50
      // the top position of the wrapper
      const runwayStart: number = this._getPos(wrap)
      // the bottom position of the wrapper, the end of the runway
      const runwayEnd: number = wrap.clientHeight
      // current browser scroll position
      const browser: number = this._getPageScroll()
      // browser position - content above sidebar
      const realPos: number = browser - runwayStart

      // don't do anything if at the top of the page
      if (browser <= (runwayStart) && !this.state.fixed) {
        return
      }


      // we're within the 'runway'
      if (browser > (runwayStart)) {
        // we fix the nav once the browser is past starting point
        let fixed: boolean = true
        // we're at the end of the runway
        let bottom: boolean = false
        const elementBottomPos: number = realPos + (el.clientHeight)

        // browser top position +
        // element menu height +
        // 50 for 25px margin above el and
        // for a 25px spacer at the bottom
        if ((elementBottomPos >= (runwayEnd - 25))) {
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
    _getPos (element: Object): number {
      let absPos: number = 0
      let el: Object = element

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
    _getPageScroll (): number {
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

    render (): React.Element {
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
