import React from 'react'

type tSTATE = {
  showMobileNav: boolean;
  showModal: boolean;
  toggleDropdownContent: boolean;
  activeDropdown: string;
  path: string;
  validated: boolean;
};

const NavContainer = function (ComposedNav: React.ComponentType<any>): React.ComponentType {
  class HOC extends React.Component<any> {
    state: tSTATE = {
      showMobileNav: false,
      showModal: false,
      activeDropdown: ' ',
      path: ' ',
      validated: false,
      toggleDropdownContent: false
    };

    componentDidMount () {
      this.setState({
        path: window.location.pathname,
        showModal: true,
        validated: !!sessionStorage.getItem('nav.disclaimer.accepted')
      })
    }



    componentWillUpdate () {
      if (this.state.path !== window.location.pathname) {
        this.setState({
          path: window.location.pathname
        })
      }
    }

    _toggleMobileNav () {
      this.setState({
        showMobileNav: !this.state.showMobileNav,
      })
    }

    _closeMobileNav() {
      this.setState({
        showMobileNav: false
      })
    }

    _toggleDropdownContent (e: any) {
      const title = (e.target as HTMLElement).getAttribute('title')
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
      if (this.state.showMobileNav === false) {
        this.setState({
          activeDropdown: ' '
        })
      }
    }

    _showDropdownContent (e: React.MouseEvent<HTMLDivElement>) {
      if (this.state.showMobileNav === false) {
        const title = (e.target as HTMLElement).getAttribute('title')
        this.setState({
          activeDropdown: title
        })
      }
    }

    _handleOpenModal () {
      // Force immediate update for better responsiveness
      sessionStorage.removeItem('nav.disclaimer.accepted')
      sessionStorage.removeItem('validated')
      sessionStorage.removeItem('hasSeenDisclaimer')
      setTimeout(() => {
      this.setState({
        validated: false,
        showModal: true
      }, () => {
        // Clear any existing validation to ensure modal opens
        
      })
    }, 0)
    }

    _handleCloseModal () {
      this.setState({
        validated: true,
        showModal: false
      })
      sessionStorage.setItem('nav.disclaimer.accepted', 'true')
    }

    render (): React.ReactElement {
      return (
        <ComposedNav
          {...this.props}
          {...this.state}
          toggleMobileNav={this._toggleMobileNav.bind(this)}
          closeMobileNav={this._closeMobileNav.bind(this)}
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

