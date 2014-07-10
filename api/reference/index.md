---
title: API basics
layout: default
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="{% if page.cover %}background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');{% endif %}">
  <div class="content-heading-text">
    <div class="content-heading-title">
      &nbsp;
    </div>
    <h1>{{ page.title }}</h1>
  </div>
</section>
{:/}

<section id="reference">

## About the API

OpenFDA is an [Elasticsearch-based](http://www.elasticsearch.org/) [API](http://apievangelist.com/index.html) that serves [Food and Drug Administration](http://www.fda.gov/) publically accessible data about three *nouns:*

 - Drugs
 - Devices *(coming soon)*
 - Foods *(coming soon)*

All three have several *endpoints,* each of which serves unique data. Every query to the API must go through one endpoint.

OpenFDA is a beta research project and not for clinical or production use. As all data within the system is publically available, openFDA does not contain data with Personally Identifiable Information or other sensitive information.

### Result format

The API returns results as [JSON](http://www.json.org/) by default. The JSON object has two sections:

| Section | Description |
|-|-|
| `meta` | Metadata about the query, including a disclaimer, link to data license, last-updated date, and total matching records, if applicable. |
| `results` | List of matching results, dependent on which endpoint was queried. |
{: class="table"}

### Authentication

An API key is required to make calls to the openFDA API. The key is free of charge. Your use of the API may be subject to certain limitations on access, calls, or use. These limitations are designed to manage load on the system, promote equitable access, and prevent abuse.

Signing up for an API key means you agree to our [terms of service.]({{site.baseurl}}/terms/)

{::nomarkdown}
<div class="getting-started" id="getting-started">
  <div class="step-content">
      <form id="api-key-form" class="form-inline slight">
        <div class="form-group">
          <label for="email" class="sr-only">Email address</label>
          <input class="form-control input-sm" id="email" placeholder="Email address" type="email">
        </div>
        <button class="btn btn-default btn-sm" id="api-key-signup">Get API key</button>
      </form>
    </div>
</div>
{:/}

Your API key should be passed to the API as the value of the `api_key` parameter. Include it before other parameters, such as the `search` parameter. For example:

    https://api.fda.gov/drug/event.json?api_key=yourAPIKeyHere&search= …

<br />The table below shows our standard API limits.

| Authentication method | Per minute limit | Per day limit |
|-|-|-|
| No API Key | 40 requests per minute *(per IP Address)* | 1000 requests per day *(per IP Address)* |
| API Key | 240 requests per minute *(per key)* | 120000 requests per day *(per key)* |
{: class="table table-code"}

If you anticipate usage above the limits provided by an API key, please [contact us](mailto:open@fda.hhs.gov). We'll work with you to figure out a good solution to your requirements.

### HTTPS Access

We encourage you to use `https://api.fda.gov` for all queries to ensure secure communication. We use [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication) to support SSL. As [not all clients support SNI](https://en.wikipedia.org/wiki/Server_Name_Indication#No_support), we do not enforce HTTPS access. If your application does not support SNI, you can use `http://api.fda.gov`. 

### Query parameters

The API supports four query parameters. The basic building block of queries is the `search` parameter. Use it to "filter" requests to the API by looking in specific fields for matches. Each endpoint has its own unique fields that can be searched.

| Parameter | Description | Example |
|-|-|-|
| `search` | What to search for, in which fields. If you don't specify a field to search, the API will search in every field. | `search=patient.drug.drugindication:"multiple+myeloma"` |
| `count` | Count the number of unique values of a certain field, for all the records that matched the `search` parameter. By default, the API returns the 1000 most frequent values. | `count=patient.drug.drugindication` |
| `limit` | Return *up to* this number of records that match the `search` parameter. Large numbers (above 100) could take a very long time, or crash your browser. | `limit=25` |
| `skip` | Skip this number of records that match the `search` parameter, then return the matching records that follow. Use in combination with `limit` to paginate results. | To get 25 records at a time, use:<br /><br />`limit=25&skip=0` to get the first 25,<br />`limit=25&skip=25` to get the next 25,<br />`limit=25&skip=50` to get the next 25, and so on. |
{: class="table table-code"}

### Query syntax

Queries to the openFDA API are made up of *parameters* joined by an ampersand `&`. Each parameter is followed by an equals sign `=` and an argument.

Searches have a special syntax: `search=field:term`. Note that there is only one equals sign `=` and there is a colon `:` between the field to search, and the term to search for.

Here are a few syntax patterns that may help if you're new to this API.

| Pattern | Description |
|-|-|
| `search=field:term` | Search within a specific `field` for a `term`. |
| `search=field:term+AND+field:term` | Search for records that match two terms. |
| `search=field:term+field:term` | Search for records that match either of two terms. |
| `search=field:term&count=field.exact` | Search for matching records, then count within that set the number of records that match the unique values of a field. |
{: class="table table-code"}

#### Spaces

Queries use the plus sign `+` in place of the space character. Wherever you would use a space character, use a plus sign instead.

#### Exact matches

For exact matches, use double quotation marks `" "` around the words. For example, `"multiple+myeloma"`.

#### Grouping

To group several terms together, use parentheses `(` `)`. For example, `(patient.drug.medicinalproduct:cetirizine+loratadine+diphenhydramine)`. Terms separated by plus signs `+` are treated as in a boolean OR.

To join terms as in a boolean AND, use the term `+AND+`. For example, `(patient.drug.medicinalproduct:cetirizine+loratadine+diphenhydramine)+AND+serious:2` requires that *any* of the drug names match *and* that the field `serious` also match.

#### Dates and ranges

The openFDA API supports searching by *range* in date, numeric, or string fields.

 - Specify an *inclusive* range by using square brackets `[min+TO+max]`. These include the values in the range. For example, `[1+TO+5]` will match **1** through **5**.
 - Dates are simple to search by via range. For instance, `[2004-01-01+TO+2005-01-01]` will search for records between Jan 1, 2004 and Jan 1, 2005.

#### Query modifiers and suffixes

There are several modifiers and suffixes which change the way records are returned by the API.

| Modifier or suffix | Description | Example |
|-|-|-|
| `.json` | Endpoint suffix that tells the API to return results as JSON. If omitted, the API defaults to returning results as JSON. | `/drug/event.json` |
| `_missing_` | `search` modifier that matches when a field has no value (is empty). | `search=_missing_:companynumb` |
| `_exists_` | `search` modifier that matches when a field has a value (is not empty). | `search=_exists_:companynumb` |
| `.exact` | `count` modifier that ensures counting of the full unique string values of a field. If not specified, individual words in a field will be counted. | `count=patient.drug.medicinalproduct.exact` |
{: class="table table-code"}

### Timeseries

The API supports `count` on date fields, which produces a timeseries at the granularity of day. The API returns a complete timeseries.

### Example query

Here is an example query, which searches for adverse events in the `drug/event` endpoint. A breakdown of its parts follows.

This query searches for records listing a **nonsteroidal anti-inflammatory drug** and returns a count of the most frequently reported patient reactions.

<div class="api-explorer" style="margin: 5ex 0 7ex 0">
<div class="query">
<div class="query-description">
 - **search** for records where **openfda.pharm_class_epc** (pharmacologic class) contains **nonsteroidal anti-inflammatory drug**.
 - **count** the field **patient.reaction.reactionmeddrapt** (patient reactions).
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact" %}
</div>
</div>

| Part | Description | Cumulative return results |
|-|-|-|
| `https://api.fda.gov/` | Open a request to the API. | |
| `/drug/event` | Search the `/drug/event` endpoint. | |
| `.json` | Return results in JSON format. | All records. |
| `?` | Begin the query | " |
| `search=` | Begin the `search` parameter | " |
| `openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"` | Search the openFDA pharmacologic class field for **nonsteroidal anti-inflammatory drug**. | Records where the pharmacologic class field contains **nonsteroidal anti-inflammatory drug**. |
| `&` | Signals a new parameter. | |
| `count=` | Begin the `count` parameter. | |
| `patient.reaction.reactionmeddrapt.exact` | Count the number of times each unique value of field `patient.reaction.reactionmeddrapt` occurs in records matching the `search` parameters. | Finds records where the pharmacologic class field contains **nonsteroidal anti-inflammatory drug**..<br /><br />Returns the 100 most frequent patient reactions with the number of times each appeared. |
{: class="table table-code"}

## openFDA fields

Different datasets use different drug identifiers—brand name, generic name, NDA, NDC, etc. It can be difficult to find the same drug in different datasets. And some identifiers, like pharmacologic class, are useful search filters but not available in all datasets.

OpenFDA features harmonization on drug identifiers, to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all endpoints, if applicable.

When you query an endpoint, you can search:

 - Fields native to records served by that endpoint.
 - Harmonized `openfda` fields.

OpenFDA does not rewrite original record data. These additional fields are annotations, in an `openfda` section. Each annotated field is a dictionary of values.

{% include panel.html title="Limits of openFDA harmonization" text="Not all records have harmonized fields. Because the harmonization process requires an exact match, some drug products cannot be harmonized in this fashion—for instance, if the drug name is misspelled. Some drug products will have <strong>openfda</strong> sections, while others will never, if there was no match during the harmonization process.  Conversely, searching in these fields will only return a subset of records from a given endpoint." %}

The documentation below describes fields that you may find in an `openfda` section of an API result. They are organized by the dataset from which they originate.

### NDC

NDC stands for [National Drug Code.](http://www.fda.gov/Drugs/InformationOnDrugs/ucm142438.htm) The Drug Listing Act of 1972 requires registered drug establishments to provide the FDA with a current list of all drugs manufactured, prepared, propagated, compounded, or processed by it for commercial distribution. (See Section 510 of the Federal Food, Drug, and Cosmetic Act (Act) (21 U.S.C. § 360)).

Drug products are identified and reported using a unique, three-segment number, called the National Drug Code (NDC), which serves as a universal product identifier for drugs.

Several NDC dataset fields are used to annotate records in openFDA.

`application_number`
: **string**
: This corresponds to the NDA, ANDA, or BLA number reported by the labeler for products which have the corresponding Marketing Category designated. If the designated Marketing Category is OTC Monograph Final or OTC Monograph Not Final, then the application number will be the CFR citation corresponding to the appropriate Monograph (e.g. “part 341”). For unapproved drugs, this field will be null.

`brand_name`
: **string**
: The brand or trade name of the product.

`dosage_form`
: **string**
: The [dosage form](http://www.fda.gov/ForIndustry/DataStandards/StructuredProductLabeling/ucm162038.htm) of the drug product.

`generic_name`
: **string**
: The generic name of the drug product.

`manufacturer_name`
: **string**
: Name of company corresponding to the labeler code segment of the NDC.

`product_ndc`
: **string**
: The labeler manufacturer code and product code segments of the NDC number, separated by a hyphen.

`product_type`
: **string**
: The [type of drug product.](http://www.fda.gov/ForIndustry/DataStandards/StructuredProductLabeling/ucm162063.htm)

`route`
: **string**
: The [route of administration](http://www.fda.gov/ForIndustry/DataStandards/StructuredProductLabeling/ucm162034.htm) of the drug product.

`substance_name`
: **string**
: The list of active ingredients of a drug product.

### SPL

SPL stands for the [Structured Product Labeling](http://www.fda.gov/forindustry/datastandards/structuredproductlabeling/default.htm) standard approved by Health Level Seven (HL7) and adopted by FDA as a mechanism for exchanging product and facility information. Drug products have associated labels that confirm to the SPL format.

To come.

### UNII

UNII stands for [Unique Ingredient Identifier.](http://www.fda.gov/forindustry/datastandards/substanceregistrationsystem-uniqueingredientidentifierunii/default.htm) The overall purpose of the joint FDA/USP Substance Registration System (SRS) is to support health information technology initiatives by generating unique ingredient identifiers (UNIIs) for substances in drugs, biologics, foods, and devices. The UNII is a non- proprietary, free, unique, unambiguous, non semantic, alphanumeric identifier based on a substance’s molecular structure and/or descriptive information.

`unii`
: **string**
: The Unique Ingredient Identifier of the drug.

### RxNorm

[RxNorm](http://www.nlm.nih.gov/research/umls/rxnorm/overview.html) is a normalized naming system for generic and branded drugs; and a tool for supporting semantic interoperation between drug terminologies and pharmacy knowledge base systems. The [National Library of Medicine](http://www.nlm.nih.gov/) (NLM) produces RxNorm.

`rxcui`
: **string**
: The RxNorm Concept Unique Identifier. RxCUI is a unique number that describes a semantic concept about the drug product, including its ingredients, strength, and dose forms.

## Downloads

OpenFDA uses public FDA datasets, but processes the data further before supplying it through the API. During our beta, we are investigating the best ways to offer direct downloads of data provided by the API. 

</section>
