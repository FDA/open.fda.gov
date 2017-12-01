import React from 'react'
import foodeventpdf from '../../static/fields/foodevent_reference.pdf'

const endpointDownloadMap: Object = Object.freeze({
  'foodevent': foodeventpdf,
  'foodenforcement': 'food/enforcement',
  'drugevent': 'drug/event',
  'druglabel': 'drug/label',
  'drugenforcement': 'drug/enforcement',
  'deviceevent': 'device/event',
  'devicerecall': 'device/recall',
  'deviceclass': 'device/classification',
  'devicereglist': 'device/registrationlisting',
  'deviceclearance': 'device/510k',
  'devicepma': 'device/pma',
  'deviceudi': 'device/udi',
  'deviceenforcement': 'device/enforcement'
})


const FieldDownload = (props: tPROPS) => {
  const {
    // key basically. can't pass key as prop
    k,
    meta
  } = props

  return (
    <section>
      <a href={endpointDownloadMap[meta.status]} download="fields.pdf" key={k}>Download</a>
    </section>
  )
}


FieldDownload.displayName = 'components/FieldDownload'
export default FieldDownload