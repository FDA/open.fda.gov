import React from "react"
import KeyFacts from "../../../../components/RenderContentObject/KeyFacts"
import meta from "./_meta.yaml"

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Peer Reviewed Journals</h2>
        <p>The information reflects FDA-authored works from September 2023 through September 2025.
          Every effort has been made to identify and include all publications produced within this timeframe.
          However, some publications may not appear in this dataset due to incomplete, inconsistent, or inaccurately
          reported author affiliation information.</p>
        <p>This dataset will be updated on a quarterly basis to maintain accuracy and completeness.
          Over time, historical publication data will also be integrated and made available to users as it becomes verified.</p>

        <h4>Responsible Use of Data</h4>
        <p>This information is provided for reference purposes only and does not constitute legal advice, regulatory
          guidance, or an official position of the U.S. Food and Drug Administration.</p>

        <p><a href='https://openfda-site.preprod.fda.gov/prjtable/'>Search for Peer Reviewed Journals</a></p>
        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />
      </section>
    )
  }
}

export default IndexRoute

