/* @flow */

import React from 'react'

type tSTATE = {
  showMobileNav: boolean;
};

const NavContainer = function (ComposedNav: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      showMobileNav: false
    };

    _toggleMobileNav () {
      this.setState({
        showMobileNav: !this.state.showMobileNav,
      })
    }

    render (): React.Element {
      return (
        <ComposedNav
          {...this.props}
          {...this.state}
          toggleMobileNav={this._toggleMobileNav.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default NavContainer
