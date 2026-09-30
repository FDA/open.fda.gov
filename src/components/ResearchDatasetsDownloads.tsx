/* @flow */

import React from 'react'
import '../css/components/KeyFacts.scss'

interface DownloadsProps {
  datasetTitle: string,
  datasetLink: string,
  description: string,
  publisher: string,
  pubArticle: string,
  pubDate: string,
  pubLink: string
}

class ResearchDatasetDownloads extends React.Component<DownloadsProps> {
  constructor (props: DownloadsProps) {
    super(props)
  }

  render () {
    return (
      <section className='key-facts'>
        <h3>{this.props.datasetTitle}</h3>
        <ul>
          <li>
            <i className='fa fa-sticky-note-o'/>
            <div className='label'>Research Article:</div>
            <div className='value'><a href={this.props.pubLink}>{this.props.pubArticle}</a></div>
          </li>
          <li>
            <i className='fa fa-newspaper-o'/>
            <div className='label'>Publisher:</div>
            <div className='value'>{this.props.publisher}</div>
          </li>
          <li>
            <i className='fa fa-calendar'/>
            <div className='label'>Date of publication:</div>
            <div className='value'>{this.props.pubDate}</div>
          </li>
          <li>
            <i className='fa fa-pencil'/>
            <div className='label'>Description:</div>
            <div className='value'>{this.props.description}</div>
          </li>
          <li>
            <i className='fa fa-database'/>
            <div className='label'>Dataset Download:</div>
            <div className='value'><a>{this.props.datasetLink}</a></div>
          </li>
        </ul>
      </section>
    )
  }
}

export default ResearchDatasetDownloads
