---
 title: Query parameters
---
The API supports five query parameters. The basic building block of queries is the `search` parameter. Use it to "filter" requests to the API by looking in specific fields for matches. Each endpoint has its own unique fields that can be searched.
- `search`: What to search for, in which fields. If you don’t specify a field to search, the API will search in every field.
- `sort`: Sort the results of the `search` by the specified field in ascending or descending order by using the `:asc` or `:desc` modifier.
- `count`: Count the number of unique values of a certain field, for all the records that matched the `search` parameter. By default, the API returns the 1000 most frequent values.
- `limit`: Return up to this number of records that match the `search` parameter. Currently, the largest allowed value for the `limit` parameter is 100.   
- `skip`: Skip this number of records that match the `search` parameter, then return the matching records that follow. Use in combination with `limit` to paginate results. 
Currently, the largest allowed value for the `skip` parameter is 25000. See [Paging](/apis/paging/) if you require paging through larger result sets.
