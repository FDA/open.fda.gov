---
layout:         post
date:           2014-06-02 07:30:00
title:          "Ten things to know about drug adverse events"
authors:
  - "Sean Herron"
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/d3/d3.min.js'
  - '/static/bower_components/c3/c3.min.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.min.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
  - '/static/js/min/api-demo.js'
---

We're incredibly excited by today's launch of openFDA, and in particular around the first publicly available dataset that has been published, [FDA's drug adverse reaction and medication error reports]({{ site.baseurl }}/drug/event/). The dataset is huge, covering nearly 4 million records from 2004 to 2013. The openFDA team has put a ton of work in to creating a great developer experience around this dataset, and we hope you find it a valuable tool in creating application that help preserve and protect the public health.

With such a large and complicated dataset, it's inevitable that things can be a bit overwhelming. Here's ten important things to consider that can hopefully help you use openFDA's first dataset more effectively:

## 1. Start with the examples
We've created a number of [fantastic interactive examples]({{ site.baseurl }}/drug/event/) to help you get some perspective on the data at large. As you change settings on the example, you can both see a graph representing your query as well as see the API endpoint the graph is receiving data from. Lower on in the page, we provide a number of example scenarios with queries to help you learn how to perform different types of searches on the data.

## 2. Know the limitations
The data within the openFDA drug adverse event endpoint does have limitations. The reports within the dataset do not undergo extensive screening or validation. There is no certainty that the reported event (adverse event or medication error) was actually due to the product. FDA does not require that a causal relationship between a product and event be proven, and reports do not always contain enough detail to properly evaluate an event.

As we rely on voluntary reports for adverse events, FDA does not receive reports for every adverse event or medication error that occurs with a product. Many factors can influence whether or not an event will be reported, such as the time a product has been marketed and publicity about an event. Therefore, the data cannot be used to calculate the incidence of an adverse event or medication error in the U.S. population.

Due to these limitations, it's best to consider drug adverse event reports as potential insights on trends rather than as cases from which you can determine the circumstances of an individual event.

## 3. Know why the data is sometimes messy
Due to the nature of how drug adverse events are collected, the data is sometimes a bit messy. You may encounter things you wouldn't expect to see or data that doesn't quite make sense. Reports are submitted to the FDA by consumers, industry, and medical professionals through a variety of means, including [MedWatch](http://www.fda.gov/Safety/MedWatch/default.htm), an online reporting portal. Some records even come in via paper and must be transcribed by hand. 

## 4. Make sure you check out the reference
In addition to the main endpoint page, we provide an extensive [reference page]({{ site.baseurl }}/drug/event/reference/) that gives you detailed field-by-field interpretations of what you can expect from each API call.

## 5. Learn the Lucene query syntax
openFDA queries are based on the [Lucene query syntax](https://lucene.apache.org/core/3_6_1/queryparsersyntax.html). While we don't support the full range of Lucene queries (such as wildcard searches, which are resource-intensive for us to provide over such a large database), it can be useful to get a good understanding of how Lucene queries work. The interactive examples within the openFDA documentation provide a good overview of various scenarios that use different query constructs.

## 6. Don't forget about `count`
In addition to `search`, which return the entire contents of every adverse event report that matches your query, you can append `count` to your query URLs to get an overall count of the time something has occured. Take the following example:

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Reports containing a drug of the **nonsteroidal anti-inflammatory** pharmacologic class</h4>
<div class="query-description">This query searches for records with the **nonsteroidal anti-inflammatory drug** phamacologic class.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"" %}
</div>
</div>

<br><br>
We can very easily find the top 1,000 reactions associated with this query by adding `count=patient.reaction.reactionmeddrapt.exact` to the query:
<br><br>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Top reactions in reports containing a drug of the **nonsteroidal anti-inflammatory** pharmacologic class</h4>
<div class="query-description">This query searches for the top 1,000 reactions associated with the **nonsteroidal anti-inflammatory drug** phamacologic class.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact" %}
</div>
</div>

## 7. Use the `openfda` fields!
Perhaps the most innovative part of openFDA is the extensive work we've done to harmonize data and provide additional identifiers and information about products. A good number of entries in the drug adverse event dataset contain an `openfda` section, which is able to provide you a huge number of additional data fields, including:

- `unii` [Unique Ingredient Identifier (UNII)](http://www.fda.gov/ForIndustry/DataStandards/SubstanceRegistrationSystem-UniqueIngredientIdentifierUNII/default.htm)
- [Structured Product Labeling](http://www.fda.gov/ForIndustry/DataStandards/StructuredProductLabeling/default.htm), including:
  - `spl_id` Structured Product Label ID
  - `spl_set_id` Structured Product Label Set ID
- `product_ndc` [National Drug Code](http://www.fda.gov/Drugs/InformationOnDrugs/ucm142438.htm)
- `substance_name`
- `rxcui` [RxNorm Concept Unique Identifier](https://www.nlm.nih.gov/research/umls/rxnorm/overview.html)
- `product_type`
- `pharm_class_cs` Pharmacologic Class Chemical Structure
- `manufacturer_name`
- `brand_name`
- `route` Route of Administration
- `nui` Numeric Unique Identifier
- `pharm_class_moa` Pharmacologic Class Mechanism of Action
- `package_ndc` Packaging [National Drug Code](http://www.fda.gov/Drugs/InformationOnDrugs/ucm142438.htm)
- `pharm_class_epc` FDA Established Pharmacologic Class
- `generic_name`
- `application_number` [New Drug Application Number](http://www.fda.gov/Drugs/DevelopmentApprovalProcess/HowDrugsareDevelopedandApproved/ApprovalApplications/NewDrugApplicationNDA/default.htm)

## 8. Use `.exact` to count for phrases
When using `count` in a query, it's important to include `.exact` at the end of the parameter (eg. `&count=patient.drug.openfda.pharm_class_epc.exact`). By including `.exact`, openFDA counts complete phrases rather than just individual words. Take the example of trying to find a list of the top pharmacologic classes associated with the patient reporting pain:


<div class="api-explorer">
<div class="query">
<h4 class="query-title">Top reactions associated with "nonsteroidal anti-inflammatory drug"</h4>
<div class="query-description">This query searches for the top 1,000 reactions associated with the "nonsteroidal anti-inflammatory drug" phamacologic class.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.reaction.reactionmeddrapt:pain&count=patient.drug.openfda.pharm_class_epc.exact" %}
</div>
</div>
<br><br>

If we remove the `.exact` from the end of the `count` parameter, however, the results look very different:

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Top reactions associated with "nonsteroidal anti-inflammatory drug"</h4>
<div class="query-description">This query searches for the top 1,000 reactions associated with the "nonsteroidal anti-inflammatory drug" phamacologic class.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/event.json?search=patient.reaction.reactionmeddrapt:pain&count=patient.drug.openfda.pharm_class_epc" %}
</div>
</div>
<br><br>

In the second example, removing `.exact` meant that openFDA simply took a top list of words and counted them individually.

## 9. Beware of `null` values
Due to the nature of how we receive the data (and wanting to pass on the most accurate representation possible), fields which do not have a value either don't show up at all in a result or may appear with a `null` value. Your application logic should ensure that it can account for both.

## 10. Watch for changes
The drug adverse events API is openFDA's first product, and so will be evolving over time. We'll be announcing changes on the website and via the [listserv](https://list.nih.gov/cgi-bin/wa.exe?A0=openfda). Changes that are backwards-compatible will go directly in to the existing endpoint. If we must break compatibility, we'll issue a new version of the endpoint and deprecate the old one.

We'll be adding additional data to this endpoint whenever a new [Quarterly Data File](http://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/ucm082193.htm) is posted. 
