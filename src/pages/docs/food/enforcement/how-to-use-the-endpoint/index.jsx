import React from "react"
import Link from "gatsby-link"


class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>How to use the API</h2>
        <p>Getting started with and learning how to use the API is relatively straightforward. Here are some recommended steps:</p>
        <ol>
          <li>If you haven’t already, read the <Link to="/docs/">API Basics</Link> documentation.</li>
          <li>Review the <Link to="/docs/food/enforcement/searchable-fields">list of searchable fields</Link> available in the food enforcement dataset.</li>
          <li>Try out the Food Enforcement API using the <Link to="/docs/food/enforcement/explore-the-api-with-an-interactive-chart/">interactive examples</Link> and tools below.</li>
        </ol>
        <p>Then, when you are ready, obtain an API Key. While you don’t need an API Key to try or use the API, we recommend you get one if you are planning to use the API on a regular basis. For more information on API Keys, see the <Link to="/docs/authentication/">Authentication</Link> documentation.</p>

        <h3>Making a simple API Call</h3>
        <p>You can call the API from a web browser. Simply type a valid API query in your browser’s address bar and press the Enter key.</p>
        <p>In the example below, we are searching the records in the food enforcement report endpoint for matches with <code>nationwide</code> in the <code>distribution_pattern</code> field. We are requesting to see the first 5 records that match.</p>
        <p>placeholder for new image component</p>

        <h3>Some key pointers</h3>
        <ul>
          <li>An openFDA API query always begins with the base endpoint, which in this case is: <code>https://api.fda.gov/food/enforcement.json</code></li>
          <li>Searches have a special syntax: <code>search=field:term</code></li>
          <li>Unless otherwise specified, the API will return only one matching record for a search. You can specify the number of records to be returned by using the limit parameter. The maximum limit allowed is 99 for any single API call. If no limit is set, the API will return one matching record.</li>
        </ul>
        <p>It is possible to construct very complex queries using the openFDA API. Review the <Link to="/docs/query-parameters/">Construct the query</Link> documentation to learn more about all the available query parameters, how to handle quotations, spaces, phrase matches, and groupings, how to search on dates and ranges, and more.</p>
      </section>
    )
  }
}

export default IndexRoute