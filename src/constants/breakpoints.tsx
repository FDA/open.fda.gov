/* @flow */

let isMob: boolean = true
let isTab: boolean = false
let isDesk: boolean = false
let isWide: boolean = false

if (typeof window !== 'undefined') {
  const _getBreakpointsOnResize = function () {
    isMob = window.matchMedia('(max-width: 640px)').matches
    isTab = window.matchMedia('(min-width: 641px)').matches
    isDesk = window.matchMedia('(min-width: 1024px)').matches
    isWide = window.matchMedia('(min-width: 1400px)').matches
  }

  _getBreakpointsOnResize()
  window.onresize = _getBreakpointsOnResize
}

export default {
  mob: isMob,
  tab: isTab,
  desk: isDesk,
  wide: isWide,
}
