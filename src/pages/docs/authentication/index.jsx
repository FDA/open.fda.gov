import React from "react"
import Link from "gatsby-link"

import ApiKey from '../../../components/ApiKey'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Authentication</h2>
        <p>An API key is required to make calls to the openFDA API. The key is free of charge. Your use of the API may be subject to certain limitations on access, calls, or use. These limitations are designed to manage load on the system, promote equitable access, and prevent abuse. Here are openFDA's standard limits:</p>
        <ul>
          <li><p><b>With no API key:</b> 40 requests per minute, per IP address. 1000 requests per day, per IP address.</p></li>
          <li><p><b>With an API key:</b> 240 requests per minute, per key. 120000 requests per day, per key.</p></li>
        </ul>
        <p>If you anticipate usage above the limits provided by an API key, please <a href="mailto:open@fda.hhs.gov">contact us</a>. We’ll work with you to figure out a good solution to your requirements. Signing up for an API key means you agree to our <Link to="/terms/">terms of service</Link>.</p>
        <ApiKey/>
        <h3>Using your API key</h3>
        <p>Your API key should be passed to the API as the value of the <code>api_key</code> parameter. Include it before other parameters, such as the <code>search</code> parameter. For example:</p>
        <p><code>https://api_basics.fda.gov/drug/event.json?api_key=yourAPIKeyHere&search=...</code></p>
        <h3>HTTPS requests only</h3>
        <p>OpenFDA requires you to use <code>https://api_basics.fda.gov</code> for all queries to ensure secure communication.</p>
      </section>
    )
  }
}

export default IndexRoute
