---
title: Drugs - Labeling
layout: api
cover: p_chemist.jpg
endpoint: /drug/label
name: Drug product labeling
docs:
  - name: API reference
    url: /drug/label/reference/
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      Drugs
    </div>
    <h1><span class="faded">api.fda.gov</span>{{ page.endpoint }}</h1>
    <a href="{{ site.baseurl }}{{ page.endpoint }}/reference/" class="api-nav">API field reference »</a>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/event/">Adverse events</a></h2></div>
  <div class="col-sm-4 tab selected"><h2><a href="{{ site.baseurl }}/drug/label/">Labeling</a></h2></div>
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/enforcement/">Enforcement reports</a></h2></div>
</div>
{:/}

{% include api-demo-drug-label.html %}

<section id="endpoint">

## About drug product labeling

Drug manufacturers and distributors submit documentation about their products to FDA in the <a href="http://labels.fda.gov/">Structured Product Labeling (SPL)</a> format. The approved labeling is a &quot;living document&quot; that changes over time to reflect increased knowledge about the safety and effectiveness of the drug.

The openFDA drug product labels API returns data from these submissions for both prescription and over-the-counter (OTC) drugs. The labels are broken into sections, such as <em>indications for use</em> (prescription drugs) or <em>purpose</em> (OTC drugs), <em>adverse reactions,</em> and so forth. There is considerable variation between drug products in terms of these sections and their contents, since the information required for safe and effective use varies with the unique characteristics of each drug product.

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of openFDA drug product label records.

## How to search this endpoint

    https://api.fda.gov/drug/label.json?

You can search for drug product labeling by <a href="reference/">fields specific to the `drug/label.json` endpoint</a>. You can also search by other drug identifiers which may not be part of the original structured product labeling. These identifiers are annotations, not part of the original submission. They are easily identified in the <a href="{{ site.baseurl }}/api/reference/#openfda-fields">`openfda` section</a> of API results.

Because product labeling features a great deal of variation in fields, and substantial natural language content, the structured openFDA fields may be particularly helpful for searching.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One drug product labeling record</h4>
<div class="query-description">This query searches for all records in a certain date range, and asks for a single one.

 - **search** for all records with **effective_time** between *Jun 01, 2011 and Dec 31, 2012*.
 - **limit** to 1 record.

See the [reference](reference/) for more about **effective_time**. Brackets `[ ]` are used to specify a range for date, number, or string fields.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/label.json?search=effective_time:[20110601+TO+20121231]&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Product labeling record with a Boxed Warning</h4>
<div class="query-description">This query searches for labels with a Boxed Warning, and returns one result.

 - **search** for all records with a **boxed_warning** field.
 - **limit** to 1 record.

The `_exists_` search modifier lets you search for records that contain a specific field, no matter what its contents are. See the [API basics]({{ site.baseurl }}/api/reference/#query-modifiers-and-suffixes) page for more details.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/label.json?search=_exists_:boxed_warning" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of drug labeling, by product type</h4>
<div class="query-description">There are more labeling records for over-the-counter (OTC) drugs than prescription drugs. 

 - **count** the field **openfda.product_type** (product type).

The suffix **.exact** is required by openFDA to count the unique full phrases in the field **openfda.product_type**. Without it, the API will count each word in that field individually—**HUMAN OTC DRUG** would be counted as separate values, **HUMAN** *and* **OTC** *and* **DRUG**.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/label.json?count=openfda.product_type.exact" %}
</div>
</div>

</section>