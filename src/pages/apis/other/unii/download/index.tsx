import React from "react"
import {Link} from 'gatsby'

import Downloads from '../../../../../components/Downloads'
import UpdateStatus from "../../../../../components/UpdateStatus"

import meta from '../_meta.yaml'

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Download the dataset</h2>
        <p>Use the links below to download the dataset manually, or review the <Link to='/apis/downloads/'>Downloads</Link> documentation for more information about other download methods.</p>
        <UpdateStatus
          api_path={meta.api_path}
        />
        <Downloads
          meta={meta}
        />
      </section>
    )
  }
}

export default IndexRoute
