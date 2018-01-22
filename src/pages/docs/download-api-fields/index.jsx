import React from "react"
import Highlight from 'react-highlight'

import Fields from '../../../components/RenderContentObject/Fields'
import fields from '../openfda-fields/_fields.yaml'
import examples from './_examples.json'

class IndexRoute extends React.Component {
  render() {
    const example: string = JSON.stringify(examples["downloadQuery"], null, '  ') || ''

    const meta_fields = [
      "meta",
      "results"
    ]

    const endpoint_fields = [
      "total_records",
      "export_date",
      "partition"
    ]

    const partitions_fields = [
      "size_mb",
      "records",
      "file"
    ]

    return (
      <section className="doc-content">
        <h2>Download API fields</h2>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
        <Fields
          data={meta_fields}
          fields={fields}
        />
        <h3>Endpoint</h3>
        <p>The following fields are present for each <b>endpoint</b>—e.g. <code>results.device.event</code>.</p>
        <Fields
          data={endpoint_fields}
          fields={fields}
        />
        <h3>Partitions</h3>
        <p>The following fields are present for each object in the <code>partitions</code> list. Remember that each object represents a single file available for download.</p>
        <Fields
          data={partitions_fields}
          fields={fields}
        />
      </section>
    )
  }
}

export default IndexRoute
