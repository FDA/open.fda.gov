/* @flow */

import React from 'react'


type tPROPS = {
  url: string,
  title: string,
  description: string
};

/**
 * @description [renders meta data (yaml usually) as the hero el below breadcrumbs]
 * @param {string|React.Element} description [paragraph below title]
 * @param {string} title [the title, used on non-endpoint pages (posts, etc)]
 * @return {React.Element}
 */
const ResearchBox = (props: tPROPS) => {
  const {
    url,
    title,
    description
  } = props

  return (
    <div id='research_box' className="marg-l-1 marg-r-1 marg-t-2 marg-b-2 research-item">
      <a className='relative full-height' href={url}>
        <h2 className='clr-primary-darker'>{title}</h2>
        <div className='clr-gray-light marg-b-1 t-marg-t-05'>{url}</div>
        <p className="smallest">{description}</p>
      </a>
    </div>
  )
}

ResearchBox.displayName = 'components/ResearchBox'
export default ResearchBox
