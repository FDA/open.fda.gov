/* @flow */

import React from 'react'

type tSTATE = {
  showMobileNav: boolean;
  toggleDropdownContent: boolean;
  activeDropdown: string;
};

const NavContainer = function (ComposedNav: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      showMobileNav: false,
      activeDropdown: ' '
    };

    _toggleMobileNav () {
      this.setState({
        showMobileNav: !this.state.showMobileNav,
      })
    }

    _toggleDropdownContent (e) {
      let title = e.target.getAttribute('title')
      if (this.state.activeDropdown != title) {
        this.setState({
          activeDropdown: title
        })
      } else {
        this.setState({
          activeDropdown: ' '
        })
      }
    }

    _hideDropdownContent () {
      this.setState({
        activeDropdown: ' '
      })
    }

    _showDropdownContent (e) {
      let title = e.target.getAttribute('title')
      this.setState({
        activeDropdown: title
      })
    }

    render (): React.Element {
      return (
        <ComposedNav
          {...this.props}
          {...this.state}
          toggleMobileNav={this._toggleMobileNav.bind(this)}
          toggleDropdownContent={this._toggleDropdownContent.bind(this)}
          hideDropdownContent={this._hideDropdownContent.bind(this)}
          showDropdownContent={this._showDropdownContent.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default NavContainer
