/* @flow */

import React from 'react'

type tSTATE = {
  activeHeader: Array;
  toggleSection: boolean;
};

function checkArray(arr, path) {
  let activeHeader = []
  console.log(arr.length)
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
      activeHeader: []
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
        activeHeader: activeHeaders
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
          toggleSection={this._toggleSection.bind(this)}
        />
      )
    }
  }

  return HOC
}

export default DocSidebarContainer