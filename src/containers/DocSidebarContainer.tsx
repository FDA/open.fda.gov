/* @flow */

import React from 'react'
import type { sidebarContainerState as tSTATE } from '../types'

function checkArray(arr: any[], path: string): [boolean, Array<string>] {
  const activeHeader: Array<string> = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i].items)) {
      const header = checkObject(arr[i], path)[0]
      if (typeof header !== 'undefined') {
        activeHeader.push(header)
      }
    }
    if (path === arr[i].link) {
      return [true, activeHeader]
    }
  }
  return [false, activeHeader]
}

function checkObject(obj: any, path: string): Array<string> {
  const activeHeaders: Array<string> = []
  const active: [boolean, Array<string>] = checkArray(obj.items, path)
  const id = obj.id
  if (active[0] === true) {
    activeHeaders.push(id)
  }
  if (active[1].length > 0) {
    activeHeaders.push(...active[1])
  }
  if (path.indexOf(obj.link) >= 0) {
    activeHeaders.push(id)
  }
  return activeHeaders
}


const DocSidebarContainer = function (ComposedDocSidebar: React.ComponentType<any>): React.ComponentType<any> {
  class HOC extends React.Component<any, tSTATE> {
    state: tSTATE = {
      activeHeader: [],
      path: ' ',
      showMobileSidebar: false,
    }

    componentDidMount() {
      let activeHeaders = this.state.activeHeader
      const yaml = this.props.yaml
      const returnedHeaders = []
      for (let i = 0; i < yaml.length; i++) {
        returnedHeaders.push(checkObject(yaml[i], window.location.pathname))
      }
      for (let i = 0; i < returnedHeaders.length; i++) {
        returnedHeaders[i].length > 0 && (activeHeaders = activeHeaders.concat(returnedHeaders[i]))
      }
      this.setState({
        activeHeader: activeHeaders,
        path: window.location.pathname
      })
    }

    componentWillUpdate(nextProps: any) {
      if (this.state.path !== window.location.pathname) {
        let activeHeaders = this.state.activeHeader
        const yaml = this.props.yaml
        const returnedHeaders = []
        for (let i = 0; i < yaml.length; i++) {
          returnedHeaders.push(checkObject(yaml[i], window.location.pathname))
        }
        for (let i = 0; i < returnedHeaders.length; i++) {
          returnedHeaders[i].length > 0 && (activeHeaders = activeHeaders.concat(returnedHeaders[i]))
        }
        this.setState({
          activeHeader: activeHeaders,
          path: window.location.pathname
        })
      }
      if (this.props.isSticky !== nextProps.isSticky) {
        this.props.toggleFixed(nextProps.isSticky)
      }
    }

    _toggleMobileSidebar() {
      this.setState({
        showMobileSidebar: !this.state.showMobileSidebar
      })
    }

    _toggleSection(e: React.MouseEvent<HTMLElement>) {
      const activeHeader = this.state.activeHeader.slice()
      const title = (e.target as HTMLElement).getAttribute('title') || ''
      if (activeHeader.indexOf(title) === -1) {
        activeHeader.push(title)
        this.setState({
          activeHeader: activeHeader
        })
      }
      else {
        this.setState({
          activeHeader: activeHeader.filter(t => t !== title)
        })
      }
    }

    render() {
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
