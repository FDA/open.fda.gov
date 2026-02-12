import React from 'react'
import '../css/components/FieldDownload.scss'
import type { DownloadProps } from '../types/download.types'
import { pdfDownloadMap, xlsxDownloadMap, yamlDownloadMap } from '../constants/file_download'

const FieldDownload = (props: DownloadProps) => {
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
