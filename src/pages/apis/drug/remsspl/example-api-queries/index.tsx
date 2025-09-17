import React from "react"

import QueryTour from '../../../../../components/QueryTour'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render () {

    const effectiveTime = explorers['effectiveTime']
    const medicationGuide = explorers['medicationGuide']
    const setID = explorers['setID']
    const sponsorName = explorers['sponsorName']
    const brandName = explorers['brandName']

    return (
      <section className='doc-content'>
        <h2>Example REMS SPL queries</h2>
        <p>To help get you started, we have provided some query examples below. Use the Run query button to call the API and get back results. You can experiment by editing the example queries in the black text box.</p>
        <QueryTour
          desc={effectiveTime.description}
          query={effectiveTime.query}
          params={effectiveTime.params}
          title={effectiveTime.title}
          name={'effectiveTime'}
        />
        <QueryTour
          desc={medicationGuide.description}
          query={medicationGuide.query}
          params={medicationGuide.params}
          title={medicationGuide.title}
          name={'medicationGuide'}
        />
        <QueryTour
          desc={setID.description}
          query={setID.query}
          params={setID.params}
          title={setID.title}
          name={'setID'}
        />
        <QueryTour
          desc={sponsorName.description}
          query={sponsorName.query}
          params={sponsorName.params}
          title={sponsorName.title}
          name={'sponsorName'}
        />
        <QueryTour
          desc={brandName.description}
          query={brandName.query}
          params={brandName.params}
          title={brandName.title}
          name={'brandName'}
        />
      </section>
    )
  }
}

export default IndexRoute
