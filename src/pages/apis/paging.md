---
 title: Paging 
---
openFDA is designed primarily for real-time queries. Using combinations of the `skip`/`limit` 
[parameters](/apis/query-parameters/) you can page through a result set that has up to `25,100` hits.
This limit is in place to protect openFDA infrastructure and is sufficient in most cases;
however, sometimes it is desirable to navigate through a result set that exceeds `25,100` search matches.
If you are unable to narrow your search criteria to decrease the number of hits, consider the following strategies
to obtain large result sets:

### Downloads 

[Download](/apis/downloads/) the entire dataset in JSON format and use tools such as [jq](https://stedolan.github.io/jq/)
to extract the results you need or write custom code to do so.

### Search-After

Use the "Search After" feature that permits scrolling through a result set of unlimited size, up
to the size of the dataset itself. The following are the basic steps you need to follow.

- Execute your initial query that produces a large number of matches. Make sure **not** to include the
`skip` parameter, because `skip` and `search_after` do not work together (technical explanation [here](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-search-after.html)).
The initial query will return your first page of data. Example:

    `https://api.fda.gov/drug/event.json?search=patient.drug.openfda.product_type.exact:%22HUMAN%20PRESCRIPTION%20DRUG%22&limit=100&sort=receivedate:asc`
- Extract the `Link` HTTP header contained in the response. Detailed information about the purpose and structure
of the `Link` header can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link). 
In short, this header will contain only one `rel="Next"` URL representing the query you need to use to obtain next page of data. Missing
header indicates you are already on the last page. Example of extracting the header value using `curl`:
    
    ```shell script
    bash-3.2$ curl -sIg 'https://api.fda.gov/drug/event.json?search=patient.drug.openfda.product_type.exact:%22HUMAN%20PRESCRIPTION%20DRUG%22&limit=100&sort=receivedate:asc' | grep "Link: "
    
    Link: <https://api.fda.gov/drug/event.json?search=patient.drug.openfda.product_type.exact%3A%22HUMAN%20PRESCRIPTION%20DRUG%22&limit=100&sort=receivedate%3Aasc&skip=100>; rel="next"
    ```
- Use the extracted URL to obtain next page of data. Note it includes the `search_after` query parameter.
- Repeat the cycle until the `Link` header is no longer present in the response, which indicates you are on the last page.



  
  
  
