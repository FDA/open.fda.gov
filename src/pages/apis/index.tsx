import React from "react"
import {Link} from 'gatsby'

class IndexRoute extends React.Component {
  render () {
    return (
      <section className='doc-content'>
        <h2>About the openFDA API</h2>
        <p>openFDA is an <a href='http://www.elasticsearch.org/'>Elasticsearch-based</a> API that serves public <a href='http://www.fda.gov/'>FDA</a> data about nouns like <Link to='/apis/drug/'>drugs</Link>, <Link to='/apis/device/'>devices</Link>, and <Link to='/apis/food/'>foods</Link>.</p>
        <p>Each of these nouns has one or more categories, which serve unique data-such as data about recall enforcement reports, or about adverse events. Every query to the API must go through one endpoint for one kind of data.</p>
        <p>Not all data in openFDA has been validated for clinical or production use. And because openFDA only serves publicly available data, it does not contain data with Personally Identifiable Information about patients or other sensitive information.</p>
        <p>"API" is an acronym for Application Programming Interface. An API call is any request sent to the API. Requests are typically sent to the API in one of two ways: 1. Manually using a web browser (such as navigating to the URL <a href='https://api.fda.gov/drug/label.json'>https://api.fda.gov/drug/label.json</a>) or 2. Programmatically sending the request via executing code that sends the API call and processes the response. Continue reading this documentation for more details on how to compose an API call for openFDA specifically.</p>
        <p>The API returns individual results as <a href='http://www.json.org/'>JSON</a> by default. The JSON object has two sections:</p>
        <ul>
          <li><p><code>meta</code>: Metadata about the query, including a disclaimer, link to data license, last-updated date, and total matching records, if applicable.</p></li>
          <li><p><code>results</code>: An array of matching results, dependent on which endpoint was queried.</p></li>
        </ul>
      </section>
    )
  }
}

export default IndexRoute
