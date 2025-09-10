import React from 'react'
import '../css/components/FieldDownload.scss'

const pdfDownloadMap: Readonly<Record<string, string>> = Object.freeze({
  'animalandveterinarydrugevent': '/fields/animalandveterinaryevent_reference.pdf',
  'foodevent': '/fields/foodevent_reference.pdf',
  'foodenforcement': '/fields/foodenforcement_reference.pdf',
  'cosmeticevent': '/fields/cosmeticevent_reference.pdf',
  'drugevent': '/fields/drugevent_reference.pdf',
  'druglabel': '/fields/druglabel_reference.pdf',
  'drugndc': '/fields/drugndc_reference.pdf',
  'drugenforcement': '/fields/drugenforcement_reference.pdf',
  'drugsfda': '/fields/drugsfda_reference.pdf',
  'drugshortages': '/fields/drugshortages_reference.pdf',
  'deviceevent': '/fields/deviceevent_reference.pdf',
  'devicerecall': '/fields/devicerecall_reference.pdf',
  'deviceclass': '/fields/deviceclass_reference.pdf',
  'devicereglist': '/fields/devicereglist_reference.pdf',
  'deviceclearance': '/fields/deviceclearance_reference.pdf',
  'devicepma': '/fields/devicepma_reference.pdf',
  'deviceudi': '/fields/deviceudi_reference.pdf',
  'deviceenforcement': '/fields/deviceenforcement_reference.pdf',
  'covid19serology': '/fields/devicecovid19serology_reference.pdf',
  'othercrl': '/fields/othercrl_reference.pdf',
  'otherhistoricaldocument': '/fields/otherhistoricaldocument_reference.pdf',
  'othernsde': '/fields/othernsde_reference.pdf',
  'othersubstance': '/fields/othersubstance_reference.pdf',
  'tobaccoproblem': '/fields/tobaccoproblem_reference.pdf'
});

const xlsxDownloadMap: Readonly<Record<string, string>> = Object.freeze({
  'animalandveterinarydrugevent': '/fields/animalandveterinaryevent_reference.xlsx',
  'foodevent': '/fields/foodevent_reference.xlsx',
  'foodenforcement': '/fields/foodenforcement_reference.xlsx',
  'cosmeticevent': '/fields/cosmeticevent_reference.xlsx',
  'drugevent': '/fields/drugevent_reference.xlsx',
  'druglabel': '/fields/druglabel_reference.xlsx',
  'drugndc': '/fields/drugndc_reference.xlsx',
  'drugenforcement': '/fields/drugenforcement_reference.xlsx',
  'drugsfda': '/fields/drugsfda_reference.xlsx',
  'drugshortages': '/fields/drugshortages_reference.xlsx',
  'deviceevent': '/fields/deviceevent_reference.xlsx',
  'devicerecall': '/fields/devicerecall_reference.xlsx',
  'deviceclass': '/fields/deviceclass_reference.xlsx',
  'devicereglist': '/fields/devicereglist_reference.xlsx',
  'deviceclearance': '/fields/deviceclearance_reference.xlsx',
  'devicepma': '/fields/devicepma_reference.xlsx',
  'deviceudi': '/fields/deviceudi_reference.xlsx',
  'deviceenforcement': '/fields/deviceenforcement_reference.xlsx',
  'covid19serology': '/fields/devicecovid19serology_reference.xlsx',
  'othercrl': '/fields/othercrl_reference.xlsx',
  'otherhistoricaldocument': '/fields/otherhistoricaldocument_reference.xlsx',
  'othernsde': '/fields/othernsde_reference.xlsx',
  'othersubstance': '/fields/othersubstance_reference.xlsx',
  'tobaccoproblem': '/fields/tobaccoproblem_reference.xlsx'
});

const yamlDownloadMap: Readonly<Record<string, string>> = Object.freeze({
  'animalandveterinarydrugevent': '/fields/animalandveterinaryevent.yaml',
  'foodevent': '/fields/foodevent.yaml',
  'foodenforcement': '/fields/foodenforcement.yaml',
  'cosmeticevent': '/fields/cosmeticevent.yaml',
  'drugevent': '/fields/drugevent.yaml',
  'druglabel': '/fields/druglabel.yaml',
  'drugndc': '/fields/drugndc.yaml',
  'drugenforcement': '/fields/drugenforcement.yaml',
  'drugsfda': '/fields/drugsfda.yaml',
  'drugshortages': '/fields/drugshortages.yaml',
  'deviceevent': '/fields/deviceevent.yaml',
  'devicerecall': '/fields/devicerecall.yaml',
  'deviceclass': '/fields/deviceclass.yaml',
  'devicereglist': '/fields/devicereglist.yaml',
  'deviceclearance': '/fields/deviceclearance.yaml',
  'devicepma': '/fields/devicepma.yaml',
  'deviceudi': '/fields/deviceudi.yaml',
  'deviceenforcement': '/fields/deviceenforcement.yaml',
  'covid19serology': '/fields/devicecovid19serology.yaml',
  'othercrl': '/fields/othercrl.yaml',
  'otherhistoricaldocument': '/fields/otherhistoricaldocument.yaml',
  'othernsde': '/fields/othernsde.yaml',
  'othersubstance': '/fields/othersubstance.yaml',
  'tobaccoproblem': '/fields/tobaccoproblem.yaml'
});


type tPROPS = {
  k: string | number;
  meta: {
    status: string;
    [key: string]: any;
  };
};

const FieldDownload = (props: tPROPS) => {
  const {
    // key basically. can't pass key as prop
    k,
    meta
  } = props

  return (
    <section className='marg-t-2' key={k}>
      <a href={pdfDownloadMap[meta.status]} className='' download='fields.pdf'>
        <button className='button bg-primary clr-white weight-700'>
          <i className='fa fa-file-pdf-o fa-lg marg-r-1' />Download PDF
        </button>
      </a>
      <a href={xlsxDownloadMap[meta.status]} className='' download='fields.xlsx'>
        <button className='button bg-primary marg-l-2 clr-white weight-700'>
          <i className='fa fa-file-excel-o fa-lg marg-r-1' />Download XLSX
        </button>
      </a>
      <a href={yamlDownloadMap[meta.status]} className='' download='fields.yaml'>
        <button className='button bg-primary marg-l-2 clr-white weight-700'>
          <i className='fa fa-file-code-o fa-lg marg-r-1' />Download YAML
        </button>
      </a>
    </section>
  )
}


FieldDownload.displayName = 'components/FieldDownload'
export default FieldDownload
