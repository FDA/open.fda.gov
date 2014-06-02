---
title: Drug adverse events
layout: api
endpoints:
  - endpoint: /drug/event/
    name:  Drug adverse events
    description: 'Adverse events.'
    status: active
    docs:
      - name: Adverse Event Introduction
        url: /drug/#drug-adverse-events
      - name: API Reference
        url: /drug/reference/
---
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      API Endpoints and Examples | <a href="{{ site.baseurl }}/drug/event/reference/">API Reference</a>
    </div>
    <h1>Drugs</h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-4 tab selected"><h2><a href="#">Adverse events</a></h2></div>
  <div class="col-sm-4 tab"><h2>Product labels <span style="font-size: 9px">Coming soon</span></h2></div>
  <div class="col-sm-4 tab"><h2>Recalls <span style="font-size: 9px">Coming soon</span></h2></div>
</div>

<section id="endpoint">

{% include api-demo.html %}

{% include getting-started.html %}

## Introduction

The U.S. Food and Drug Administration (FDA) regulates over-the-counter and prescription drugs in the United States, including biological therapeutics and generic drugs. This work covers more than just medicines. For example, fluoride toothpaste, antiperspirants, dandruff shampoos and sunscreens are all considered drugs.

An adverse event is submitted to the FDA to report any undesirable experience associated with the use of a medical product in a patient. For drugs, this includes serious drug side effects, product use errors, product quality problems, and therapeutic failures for prescription or over-the-counter medicines and medicines administered to hospital patients or at outpatient infusion centers.

### About adverse event reports

This highly simplified schematic illustrates the general nature of an adverse event report. A report may list several drug products, as well as several patient reactions. **When a report lists multiple drugs and multiple reactions, there is no way to conclude from the data therein that a given drug is responsible for a given reaction.**

{% include drug-adverse-event.html %}

Any number of the drugs may be marked as *suspect* if thought to be responsible for one or more of the reactions, but that information is not validated. *Concomitant* drugs are those which are not suspected of causing one or more of the reactions. Many drug products appear frequently in adverse event reports simply because they are commonly taken by many people in the population, not because they are responsible for more adverse events.

Reports contain varying levels of detail about the drug products involved, indications for use, route of administration, and dose.

### Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of adverse event reports.

### How to query the endpoint

`https://api.fda.gov/drug/event.json?`

You can search for adverse events by <a href="{{ site.baseurl }}/api/reference/#drug-adverse-events">fields specific to the `drug/event.json` endpoint</a>. You can also search by other drug identifiers, such as pharmacologic class, NDC (National Drug Code), or even UPC. These identifiers are annotations, not part of the original adverse event report. They are easily identified in <a href="{{ site.baseurl }}/api/reference/#openfda-fields">`openfda` sections</a> of API returns.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One adverse event report</h4>
<div class="query-description">This query searches for all records in a certain date range, and asks for a single one.

 - **search** for all records with **receivedate** between *Jan 01, 2004 and Dec 31, 2008*.
 - **limit** to 1 record.

See the [header fields reference](reference/#header) for more about **receivedate**. Brackets `[ ]` are used to specify a range for date, number, or string fields.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=receivedate:[20040101+TO+20081231]&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One adverse event report with a drug from a certain pharmacologic class</h4>
<div class="query-description">This query searches records listing a drug of a certain pharmacologic class, and returns a single record.

 - **search** for all records where **patient.drug.openfda.pharm_class_epc** (pharmacologic class) contains *nonsteroidal anti-inflammatory drug*.
 - **limit** to 1 record.

A record returned by this query may have multiple drugs listed. At least one of the drugs belongs to the pharmacologic class. See the [openFDA fields reference](reference/#openfda-fields) for more about the kinds of searches they enable.

Double quotation marks `" "` surround phrases that must match exactly. The plus sign `+` is used in place of a space character ` `.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of patient reactions</h4>
<div class="query-description">This query is similar to the prior one, but returns a count of the 1000 most frequently reported patient reactions. Multiple drugs in the records may match this class, and the drugs from this class may not be those which caused the associated adverse patient reactions.

 - **search** for all records where **patient.drug.openfda.pharm_class_epc** (pharmacologic class) contains *nonsteroidal anti-inflammatory drug*.
 - **count** the field **patient.reaction.reactionmeddrapt.exact** (patient reactions).

The suffix **.exact** is required by openFDA to count the unique full phrases in the field **patient.reaction.reactionmeddrapt**. Without it, the API will count each word in that field individually—**difficulty sleeping** would be counted as separate values, **difficulty** *and* **sleeping**.

See the [patient reaction reference](reference/#patient-reaction-data) for more about patient reactions in adverse event records.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact" %}
</div>
</div>

</section>
