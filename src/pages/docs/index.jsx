import React from "react"
import Link from "gatsby-link"

class IndexRoute extends React.Component {
  render() {
    return (
      <section className="doc-content">
        <h2>About the openFDA API</h2>
        <p>OpenFDA is an <a href="http://www.elasticsearch.org/">Elasticsearch-based</a> <a href="http://apievangelist.com/index.html">API</a> that serves public <a href="http://www.fda.gov/">FDA</a> data about nouns like <Link to="/drug/">drugs</Link>, <Link to="/device/">devices</Link>, and <Link to="/food/">foods</Link>.</p>
        <p>Each of these nouns has one or more categories, which serve unique data-such as data about recall enforcement reports, or about adverse events. Every query to the API must go through one endpoint for one kind of data.</p>
        <p>Not all data in openFDA has been validated for clinical or production use. And because openFDA only serves publicly available data, it does not contain data with Personally Identifiable Information about patients or other sensitive information.</p>
        <p>The API returns individual results as <a href="http://www.json.org/">JSON</a> by default. The JSON object has two sections:</p>
        <ul>
          <li><p><code>meta</code>: Metadata about the query, including a disclaimer, link to data license, last-updated date, and total matching records, if applicable.</p></li>
          <li><p><code>results</code>: An array of matching results, dependent on which endpoint was queried.</p></li>
        </ul>
      </section>
    )
  }
}

export default IndexRoute
