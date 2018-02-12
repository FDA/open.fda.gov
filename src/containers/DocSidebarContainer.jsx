/* @flow */

import React from 'react'

type tSTATE = {
  activeHeader: Array;
  path: string;
  showMobileSidebar: boolean;
};

function checkArray(arr, path) {
  let activeHeader = []
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i].items)) {
      let header = checkObject(arr[i], path)[0]
      if (typeof header != 'undefined') {
        activeHeader.push(header)
      }
    }
    if (path === arr[i].link) {
      return [true, activeHeader]
    }
  }
  return [false, activeHeader]
}

function checkObject(obj, path) {
  const activeHeaders = []
  let active = checkArray(obj.items, path)
  let id = obj.id
  if (active[0] === true) {
    activeHeaders.push(id)
  }
  if (active[1].length > 0) {
    activeHeaders.push(...active[1])
  }
  if (path.includes(obj.link)) {
    activeHeaders.push(id)
  }
  return activeHeaders
}


const DocSidebarContainer = function (ComposedDocSidebar: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      activeHeader: [],
      path: ' ',
      showMobileSidebar: false,
    }

    componentDidMount () {
      let activeHeaders = this.state.activeHeader
      const yaml = this.props.yaml
      let returnedHeaders = []
      for (let i = 0; i < yaml.length; i++) {
        returnedHeaders.push(checkObject(yaml[i], window.location.pathname))
      }
      for (let i = 0; i < returnedHeaders.length; i++ ) {
        returnedHeaders[i].length > 0 && (activeHeaders = activeHeaders.concat(returnedHeaders[i]))
      }
      this.setState({
        activeHeader: activeHeaders,
        path: window.location.pathname
      })
    }

    componentWillUpdate () {
      if (this.state.path !== window.location.pathname) {
        this.setState({
          path: window.location.pathname
        })
      }
    }

    _toggleMobileSidebar () {
      this.setState({
        showMobileSidebar: !this.state.showMobileSidebar
      })
    }

    _toggleSection (e) {
      let activeHeader = this.state.activeHeader.slice()
      let title = e.target.getAttribute('title')
      if (activeHeader.indexOf(title) === -1) {
        activeHeader.push(title)
        this.setState({
          activeHeader: activeHeader
        })
      } else {
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
          toggleMobileSidebar={this._toggleMobileSidebar.bind(this)}
          toggleSection={this._toggleSection.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default DocSidebarContainer