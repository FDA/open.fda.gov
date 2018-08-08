import React from "react"
import Link from "gatsby-link"

import APIUseSteps from "../../../../../components/APIUseSteps"
import APIQueryBreakdown from "../../../../../components/APIQueryBreakdown"


class IndexRoute extends React.Component {
  render() {

    return (
      <section className='doc-content'>
        <h2>How to use the Endpoint</h2>
        <p>Getting started with and learning how to use the Application Programming Interface is relatively straightforward. Here are some recommended steps:</p>
        <APIUseSteps endpoint_name='Drug NDC' endpoint_path='/apis/drug/ndc/'/>
        <p>Then, when you are ready, obtain an Application Programming Interface Key. While you don’t need an Application Programming Interface Key to try or use the Application Programming Interface, we recommend you get one if you are planning to use the Application Programming Interface on a regular basis. For more information on Application Programming Interface Keys, see the <Link to="/apis/authentication/">Authentication</Link> documentation.</p>

        <h3>Making a simple Application Programming Interface Call</h3>
        <p>You can call the Application Programming Interface from a web browser. Simply type a valid query in your browser’s address bar and press the Enter key.</p>
        <p>In the example below, we are searching the records in the drug recall enforcement report endpoint for matches with <code>Class III</code> in the <code>classification</code> field. We are requesting to see the first 5 records that match."</p>
        <APIQueryBreakdown endpoint_path='/drug/ndc.json' query='dea_schedule:"CIV"'/>

        <h3>Some key pointers</h3>
        <ul>
          <li>An openFDA query always begins with the base endpoint, which in this case is: <code>https://api.fda.gov/drug/ndc.json</code></li>
          <li>Searches have a special syntax: <code>search=field:term</code></li>
          <li>Unless otherwise specified, the Application Programming Interface will return only one matching record for a search. You can specify the number of records to be returned by using the limit parameter. The maximum limit allowed is 99 for any single Application Programming Interface call. If no limit is set, the Application Programming Interface will return one matching record.</li>
        </ul>
        <p>It is possible to construct very complex queries using the openFDA Application Programming Interface. Review the <Link to="/apis/query-parameters/">Construct the query</Link> documentation to learn more about all the available query parameters, how to handle quotations, spaces, phrase matches, and groupings, how to search on dates and ranges, and more.</p>
      </section>
    )
  }
}

export default IndexRoute
