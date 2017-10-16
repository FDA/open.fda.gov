/* @flow */

import React from 'react'

type tSTATE = {
  showMobileNav: boolean;
  showModal: boolean;
  toggleDropdownContent: boolean;
  activeDropdown: string;
  path: string;
};

const NavContainer = function (ComposedNav: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      showMobileNav: false,
      showModal: true,
      activeDropdown: ' ',
      path: ' '
    };

    componentDidMount () {
      this.setState({
        path: window.location.pathname
      })
    }

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
      if (this.state.showMobileNav == false) {
        this.setState({
          activeDropdown: ' '
        })
      }
    }

    _showDropdownContent (e) {
      if (this.state.showMobileNav == false) {
        let title = e.target.getAttribute('title')
        this.setState({
          activeDropdown: title
        })
      }
    }

    _handleOpenModal () {
      this.setState({
        showModal: true
      })
    }

    _handleCloseModal () {
      this.setState({
        showModal: false
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
          handleOpenModal={this._handleOpenModal.bind(this)}
          handleCloseModal={this._handleCloseModal.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default NavContainer
