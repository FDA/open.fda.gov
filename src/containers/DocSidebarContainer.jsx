/* @flow */

import React from 'react'

type tSTATE = {
  activeHeader: boolean;
  toggleSection: boolean;
};


const DocSidebarContainer = function (ComposedDocSidebar: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      activeHeader: [" "]
    };

    _toggleSection (e) {
      let activeHeader = this.state.activeHeader.slice()
      let title = e.target.getAttribute('title')
      console.log("title container: ", title, activeHeader)
      if (activeHeader.indexOf(title) === -1) {
        console.log("not in header: ")
        activeHeader.push(title)
        console.log("short push: ", activeHeader)
        this.setState({
          activeHeader: activeHeader
        })
        console.log("after push: ", this.state.activeHeader)
      } else {
        console.log("in header to remove: ")
        this.setState({
          activeHeader: activeHeader.filter(t => t !== title)
        })
      }
    }

    render(): React.Element {
      return (
        <ComposedDocSidebar
          {...this.props}
          {...this.state}
          toggleSection={this._toggleSection.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default DocSidebarContainer