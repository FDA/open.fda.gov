import React from "react"

import QueryExplorer from '../../../components/QueryExplorer'
import explorers from '../_explorers.yaml'

class IndexRoute extends React.Component {
  render() {

    const searchSingleTerm = explorers['searchSingleTerm']
    const searchAll = explorers['searchAll']
    const searchAny = explorers['searchAny']
    const count = explorers['count']

    return (
      <section className="doc-content">
        <h2>Query syntax</h2>
        <p>Queries to the openFDA API are made up of <strong>parameters</strong> joined by an ampersand <code>&</code>. Each parameter is followed by an equals sign <code>=</code> and an argument.</p>
        <p>Searches have a special syntax: <code>search=field:term</code>. Note that there is only one equals sign <code>=</code> and there is a colon <code>:</code> between the field to search, and the term to search for.</p>
        <p>Here are a few syntax patterns that may help if you’re new to this API.</p>
        <ul>
          <li><p><code>search=field:term</code>: Search within a specific <code>field</code> for a <code>term</code>.</p></li>
          <li><p><code>search=field:term+AND+field:term</code>: Search for records that match <strong>both</strong> terms.</p></li>
          <li><p><code>search=field:term+field:term</code>: Search for records that match <strong>either</strong> of two terms.</p></li>
          <li><p><code>sort=report_date:desc</code>: Sort records by a specific <code>field</code> in descending order.</p></li>
          <li><p><code>search=field:term&count=another_field</code>: Search for matching records. Then within that set of records, count the number of times that the unique values of a field appear. Instead of looking at individual records, you can use the <code>count</code> parameter to count how often certain terms (like drug names or patient reactions) appear in the matching set of records.</p></li>
        </ul>
        <p>Here are some example queries that demonstrate how these searches and the <code>count</code> parameter work, all using the drug adverse events endpoint.</p>
        <QueryExplorer
          desc={searchSingleTerm.description}
          originalQuery={searchSingleTerm.query}
          params={searchSingleTerm.params}
          title={searchSingleTerm.title}
        />
        <QueryExplorer
          desc={searchAll.description}
          originalQuery={searchAll.query}
          params={searchAll.params}
          title={searchAll.title}
        />
        <QueryExplorer
          desc={searchAny.description}
          originalQuery={searchAny.query}
          params={searchAny.params}
          title={searchAny.title}
        />
        <QueryExplorer
          desc={count.description}
          originalQuery={count.query}
          params={count.params}
          title={count.title}
        />
        <QueryExplorer
          desc={count.description}
          originalQuery={count.query}
          params={count.params}
          title={count.title}
        />
      </section>
    )
  }
}

export default IndexRoute
