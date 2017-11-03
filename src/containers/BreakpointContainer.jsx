/* @flow */

import React from 'react'
import debounce from 'lodash/debounce'
import matchMedia from 'matchmedia'

type tSTATE = {
  mob: boolean;
  tab: boolean;
  desk: boolean;
  wide: boolean;
};

// a generic state wrapper used all over
// adds a onresize callback to the component, passing down
// breakpoint props so we can render appropriate elements
// on resize or orientation change
/**
 * @description [a generic state wrapper we can use to add]
 *              [breakpoint specific rendering to any component]
 * @param {ReactClass} ComposedComponent [component to add functionality to]
 * @param {Object} props [any static props we want to pass through]
 * @returns {ReactClass} [A Pure Component wrapped in a stateful one]
 */
const BreakpointContainer = function (
  ComposedComponent: ReactClass,
  props: void|Object = {}): ReactClass {

  class HOC extends React.Component {
    state: tSTATE = {
      mob: true,
      tab: false,
      desk: false,
      wide: false,
    };

    constructor (props) {
      super(props)

      const boundResizeCB: Function = this._getBreakpointsOnResize.bind(this)
      this.state = {
        mob: matchMedia('(max-width: 640px)').matches,
        tab: matchMedia('(min-width: 641px)').matches,
        desk: matchMedia('(min-width: 1024px)').matches,
        wide: matchMedia('(min-width: 1400px)').matches,
      }

      // heavily, heavily debounce this
      window.onresize = debounce(boundResizeCB, 100)
    }

    _getBreakpointsOnResize () {
      this.setState({
        mob: matchMedia('(max-width: 640px)').matches,
        tab: matchMedia('(min-width: 641px)').matches,
        desk: matchMedia('(min-width: 1024px)').matches,
        wide: matchMedia('(min-width: 1400px)').matches,
      })
    }

    render (): ?React.Element {
      return (
        <ComposedComponent
          bp={this.state}
          {...props}
        />
      )
    }
  }

  return HOC
}

export default BreakpointContainer
