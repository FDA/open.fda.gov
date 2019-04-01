import React from 'react'

const pdfDownloadMap: Object = Object.freeze({
  'animalandveterinaryevent': '/fields/animalandveterinaryevent_reference.pdf',
  'foodevent': '/fields/foodevent_reference.pdf',
  'foodenforcement': '/fields/foodenforcement_reference.pdf',
  'drugevent': '/fields/drugevent_reference.pdf',
  'druglabel': '/fields/druglabel_reference.pdf',
  'drugenforcement': '/fields/drugenforcement_reference.pdf',
  'deviceevent': '/fields/deviceevent_reference.pdf',
  'devicerecall': '/fields/devicerecall_reference.pdf',
  'deviceclass': '/fields/deviceclass_reference.pdf',
  'devicereglist': '/fields/devicereglist_reference.pdf',
  'deviceclearance': '/fields/deviceclearance_reference.pdf',
  'devicepma': '/fields/devicepma_reference.pdf',
  'deviceudi': '/fields/deviceudi_reference.pdf',
  'deviceenforcement': '/fields/deviceenforcement_reference.pdf'
})

const xlsxDownloadMap: Object = Object.freeze({
  'animalandveterinaryevent': '/fields/animalandveterinaryevent_reference.xlsx',
  'foodevent': '/fields/foodevent_reference.xlsx',
  'foodenforcement': '/fields/foodenforcement_reference.xlsx',
  'drugevent': '/fields/drugevent_reference.xlsx',
  'druglabel': '/fields/druglabel_reference.xlsx',
  'drugenforcement': '/fields/drugenforcement_reference.xlsx',
  'deviceevent': '/fields/deviceevent_reference.xlsx',
  'devicerecall': '/fields/devicerecall_reference.xlsx',
  'deviceclass': '/fields/deviceclass_reference.xlsx',
  'devicereglist': '/fields/devicereglist_reference.xlsx',
  'deviceclearance': '/fields/deviceclearance_reference.xlsx',
  'devicepma': '/fields/devicepma_reference.xlsx',
  'deviceudi': '/fields/deviceudi_reference.xlsx',
  'deviceenforcement': '/fields/deviceenforcement_reference.xlsx'
})

const yamlDownloadMap: Object = Object.freeze({
  'animalandveterinaryevent': '/fields/animalandveterinaryevent.yaml',
  'foodevent': '/fields/foodevent.yaml',
  'foodenforcement': '/fields/foodenforcement.yaml',
  'drugevent': '/fields/drugevent.yaml',
  'druglabel': '/fields/druglabel.yaml',
  'drugenforcement': '/fields/drugenforcement.yaml',
  'deviceevent': '/fields/deviceevent.yaml',
  'devicerecall': '/fields/devicerecall.yaml',
  'deviceclass': '/fields/deviceclass.yaml',
  'devicereglist': '/fields/devicereglist.yaml',
  'deviceclearance': '/fields/deviceclearance.yaml',
  'devicepma': '/fields/devicepma.yaml',
  'deviceudi': '/fields/deviceudi.yaml',
  'deviceenforcement': '/fields/deviceenforcement.yaml'
})


const FieldDownload = (props: tPROPS) => {
  const {
    // key basically. can't pass key as prop
    k,
    meta
  } = props

  return (
    <section className="marg-t-2" key={k}>
      <a href={pdfDownloadMap[meta.status]} className="field-button bg-primary clr-white weight-700" download="fields.pdf">
        <fa className="fa fa-file-pdf-o fa-lg marg-r-1" />Download PDF
      </a>
      <a href={xlsxDownloadMap[meta.status]} className="field-button bg-primary marg-l-2 clr-white weight-700" download="fields.xlsx">
        <fa className="fa fa-file-excel-o fa-lg marg-r-1" />Download XLSX
      </a>
      <a href={yamlDownloadMap[meta.status]} className="field-button bg-primary marg-l-2 clr-white weight-700" download="fields.yaml">
        <fa className="fa fa-file-code-o fa-lg marg-r-1" />Download YAML
      </a>
    </section>
  )
}


FieldDownload.displayName = 'components/FieldDownload'
export default FieldDownload