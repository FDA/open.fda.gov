---
title: Drugs API reference - Labeling
layout: default
cover: p_chemist.jpg
endpoint: /drug/label
name: Drug product labeling
datasets:
  - dataset: SPL
    url: /data/spl/
    kind: Structured product labeling.
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/js/min/jquery-xdomainrequest.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/d3/d3.min.js'
  - '/static/bower_components/c3/c3.min.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.min.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      Drugs
    </div>
    <h1><span class="faded">api.fda.gov</span>{{ page.endpoint }} <span class="faded">API field reference</span></h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/event/">Adverse events</a></h2></div>
  <div class="col-sm-4 tab selected"><h2><a href="{{ site.baseurl }}/drug/label/">Labeling</a></h2></div>
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/enforcement/">Enforcement reports</a></h2></div>
</div>
{:/}

<section class="reference">

## About

    https://api.fda.gov/drug/label

{% include api-status-updated.html endpoint="https://api.fda.gov/drug/label.json?" count="effective_time" %}

<small>Note that the `effective_time` of labeling is used to calculate how current data is. Some labeling is dated in the future, and that is reflected in the calculation above.</small>

The openFDA drug product labeling API returns data from the FDA <a href="{{ site.baseurl }}/data/spl/">Structured Product Labeling</a> (SPL) dataset. This dataset contains structured documentation about regulated products, submitted by manufacturers to FDA. OpenFDA uses the latest available bulk downloads, which have the latest version of every structured product labeling document for products that are actively marketed.

### What is structured product labeling?

Drug manufacturers and distributors submit documentation about their products to FDA. Labeling contains a summary of the essential scientific information needed for the safe and effective use of the drug.

The openFDA drug product labeling API returns data from these submissions for both prescription and over-the-counter (OTC) drugs. The labeling is broken into sections, such as <em>indications for use</em> (prescription drugs) or <em>purpose</em> (OTC drugs), <em>adverse reactions,</em> and so forth. There is considerable variation between drug products, since the information required for safe and effective use varies with the unique characteristics of each drug product.

### Downloads

There are no plans for the openFDA initiative to change the SPL release protocols. At this time it is anticipated that SPL data will continue to be available from the same site on the same schedule. OpenFDA is a research project to make access to these datasets easier, not replace the current process. The information available through openFDA is not for clinical or production use and is in beta testing. While FDA makes every effort to ensure the data is accurate, it should be assumed that all results are not validated.

{% include api-download.html endpoint="drug.label" %}

{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching SPL records returned by the API.

Each SPL record consists of three sets of fields:

- Standard SPL fields, including unique identifiers.
- Product-specific fields, the order and contents of which are unique to each product. 
- An **openfda** section: An annotation with additional product identifiers, such as UPC and brand name, of the drug products listed in the labeling.

#### Field variation

Fields vary with the particular product being documented. Some fields are rarely used. Most prescription drug product labeling will feature similar fields, and those fields will contain similar content. Over-the-counter (OTC) drug product labeling will generally feature a different set of fields.

The specific requirements for content of these fields vary from product to product. General descriptions of the fields are provided below, along with notable exceptions or exceptional cases. Expect variation.

FDA regulations describe these fields more thoroughly than this documentation. The following documents may be useful for more information about [prescription drug product labeling](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfCFR/CFRSearch.cfm?fr=201.57) and [over-the-counter (OTC) drug product labeling.](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfCFR/CFRSearch.cfm?fr=201.80)

Some fields are considered by the SPL specification as *subsections* of other fields, but labeling is not always formatted according to the specification. For example, information about prescription drugs' potential teratogenic effects are ordinarily encoded in the `teratogenic_effects` field, found after (as a subsection of) the `pregnancy` field. However, some labels combine all the content into the `pregnancy` field and do not have a `teratogenic_effects` field. Again, expect variation.

Some labeling features data encoded in the wrong fields. These errors may be corrected in subsequent versions of the product labeling.

#### Field order

Fields are ordered naturally, as they were found in the original product labeling. Expect variation in field order from product to product.

#### Tables

Manufacturers sometimes supply product labeling with HTML tables that summarize data, such as adverse reactions. These tables usually accompany other text describing the data. When these tables are encountered, openFDA puts the HTML tables in their own field, with a `_table` suffix.

{% highlight javascript %}
"results": [
  {
    ...
    "how_supplied": "...",
    "how_supplied_table": "<table>...</table>"
    ...
  }
{% endhighlight %}

Here are common examples you may see:

 - `drug_interactions` accompanied by `drug_interactions_table`
 - `adverse_reactions` accompanied by `adverse_reactions_table`
 - `how_supplied` accompanied by `how_supplied_table`

`_table` fields
: **list of strings**
: Each table is encoded as HTML, one table per string.

## Field-by-field reference

Fields and their contents will vary from product to product. There are major differences between prescription drugs and OTC drugs, for example. The following descriptions are as accurate as possible but do not cover all the potential variation among field contents.

This page groups fields conceptually for ease of reference. In API results, fields will be ordered naturally as in the product labeling submission.

There are records with fields that are not documented here and that are not ordinarily part of human drug product labeling, such as `veterinary_indications`. This is usually the result of a data error in the SPL submission.

### ID and version

All drug product labeling records contain these fields, which uniquely identify individual records.

{% highlight javascript %}
"results": [
  {
    "set_id": "e71151ba-f2f4-4e95-9256-3db361d40a54",
    "id": "93321bf0-d58d-4ac1-bfa7-cb033ca9df85",
    "version": "2",
    "effective_time": "20140423"
  }
{% endhighlight %}

`set_id`
: **string**
: The Set ID, A globally unique identifier (GUID) for the labeling, stable across all versions or revisions.

`id`
: **string**
: The document ID, A globally unique identifier (GUID) for the particular revision of a labeling document.

`version`
: **string integer**
: A sequentially increasing number identifying the particular version of a document, starting with `1`.

`effective_time`
: **string date *YYYYmmdd***
: Date reference to the particular version of the labeling document.

### Abuse and overdosage

`drug_abuse_and_dependence`
: **list of strings**
: *prescription*
: Information about whether the drug is a controlled substance, the types of abuse that can occur with the drug, and adverse reactions pertinent to those types of abuse.

`controlled_substance`
: **list of strings**
: *prescription*
: Information about the schedule in which the drug is controlled by the Drug Enforcement Administration, if applicable.

`abuse`
: **list of strings**
: *prescription*
: Information about the types of abuse that can occur with the drug and adverse reactions pertinent to those types of abuse, primarily based on human data. May include descriptions of particularly susceptible patient populations.

`dependence`
: **list of strings**
: *prescription*
: Information about characteristic effects resulting from both psychological and physical dependence that occur with the drug, the quantity of drug over a period of time that may lead to tolerance or dependence, details of adverse effects related to chronic abuse and the effects of abrupt withdrawl, procedures necessary to diagnose the dependent state, and principles of treating the effects of abrupt withdrawal.

`overdosage`
: **list of strings**
: *prescription* / *some OTC*
: Information about signs, symptoms, and laboratory findings of acute ovedosage and the general principles of overdose treatment.

### Adverse effects and interactions

`adverse_reactions`
: **list of strings**
: *prescription* / *some OTC*
: Information about undesirable effects, reasonably associated with use of the drug, that may occur as part of the pharmacological action of the drug or may be unpredictable in its occurrence. Adverse reactions include those that occur with the drug, and if applicable, with drugs in the same pharmacologically active and chemically related class. There is considerable variation in the listing of adverse reactions. They may be categorized by organ system, by severity of reaction, by frequency, by toxicological mechanism, or by a combination of these.

`drug_interactions`
: **list of strings**
: *prescription* / *few OTC*
: Information about and practical guidance on preventing clinically significant drug/drug and drug/food interactions that may occur in people taking the drug.

`drug_and_or_laboratory_test_interactions`
: **list of strings**
: *prescription*
: Information about any known interference by the drug with laboratory tests.

### Clinical pharmacology

`clinical_pharmacology`
: **list of strings**
: *prescription* / *few OTC*
: Information about the clinical pharmacology and actions of the drug in humans.

`mechanism_of_action`
: **list of strings**
: *prescription*
: Information about the established mechanism(s) of the drug's action in humans at various levels (for example receptor, membrane, tissue, organ, whole body). If the mechanism of action is not known, this field contains a statement about the lack of information.

`pharmacodynamics`
: **list of strings**
: *prescription*
: Information about any biochemical or physiologic pharmacologic effects of the drug or active metabolites related to the drug's clinical effect in preventing, diagnosing, mitigating, curing, or treating disease, or those related to adverse effects or toxicity.

`pharmacokinetics`
: **list of strings**
: *prescription*
: Information about the clinically significant pharmacokinetics of a drug or active metabolites, for instance pertinent absorption, distribution, metabolism, and excretion parameters.

### Indications, usage, and dosage

`indications_and_usage`
: **list of strings**
: *prescription* / *OTC*
: A statement of each of the drug product's indications for use, such as for the treatment, prevention, mitigation, cure, or diagnosis of a disease or condition, or of a manifestation of a recognized disease or condition, or for the relief of symptoms associated with a recognized disease or condition. This field may also describe any relevant limitations of use.

`contraindications`
: **list of strings**
: *prescription* / *few OTC*
: Information about situations in which the drug product is contraindicated or should not be used because the risk of use clearly outweighs any possible benefit, including the type and nature of reactions that have been reported.

`dosage_and_administration`
: **list of strings**
: *prescription* / *OTC*
: Information about the drug product's dosage and administration recommendations, including starting dose, dose range, titration regimens, and any other clinically sigificant information that affects dosing recommendations.

`dosage_forms_and_strengths`
: **list of strings**
: *prescription* / *few OTC*
: Information about all available dosage forms and strengths for the drug product to which the labeling applies. This field may contain descriptions of product appearance.

`purpose`
: **list of strings**
: *few prescription* / *OTC*
: Information about the drug product's indications for use.

`description`
: **list of strings**
: *prescription* / *some OTC*
: General information about the drug product, including the proprietary and established name of the drug, the type of dosage form and route of administration to which the label applies, qualitative and quantitative ingredient information, the pharmacologic or therapeutic class of the drug, and the chemical name and structural formula of the drug.

`active_ingredient`
: **list of strings**
: *few prescription* / *OTC*
: A list of the active, medicinal ingredients in the drug product.

`inactive_ingredient`
: **list of strings**
: *few prescription* / *OTC*
: A list of inactive, non-medicinal ingredients in a drug product.

`spl_product_data_elements`
: **list of strings**
: *prescription* / *OTC*
: Usually a list of ingredients in a drug product.

### Patient information

`spl_patient_package_insert`
: **list of strings**
: *prescription* / *few OTC*
: Information necessary for patients to use the drug safely and effectively.

`information_for_patients`
: **list of strings**
: *prescription* / *some OTC*
: Information necessary for patients to use the drug safely and effectively, such as precautions concerning driving or the concomitant use of other substances that may have harmful additive effects.

`information_for_owners_or_caregivers`
: **list of strings**
: *few prescription* / *few OTC*
: Documentation forthcoming.

`instructions_for_use`
: **list of strings**
: *some prescription* / *some OTC*
: Information about safe handling and use of the drug product.

`ask_doctor`
: **list of strings**
: *few prescription* / *many OTC*
: Information about when a doctor should be consulted about existing conditions or sumptoms before using the drug product, including all warnings for persons with certain preexisting conditions (excluding pregnancy) and all warnings for persons experiencing certain symptoms. The warnings under this heading are those intended only for situations in which consumers should not use the product until a doctor is consulted.

`ask_doctor_or_pharmacist`
: **list of strings**
: *very few prescription* / *some OTC*
: Information about when a doctor or pharmacist should be consulted about drug/drug or drug/food interactions before using a drug product.

`do_not_use`
: **list of strings**
: *few prescription* / *many OTC*
: Information about all contraindications for use. These contraindications are absolute and are intended for situations in which consumers should not use the product unless a prior diagnosis has been established by a doctor or for situations in which certain consumers should not use the product under any circumstances regardless of whether a doctor or health professional is consulted.

`keep_out_of_reach_of_children`
: **list of strings**
: *few prescription* / *OTC*
: Information pertaining to whether the product should be kept out of the reach of children, and instructions about what to do in the case of accidental contact or ingestion, if appropriate.

`other_safety_information`
: **list of strings**
: *few prescription* / *some OTC*
: Information about safe use and handling of the product that may not have been specified in another field.

`questions`
: **list of strings**
: *few prescription* / *many OTC*
: A telephone number of a source to answer questions about a drug product. Sometimes available days and times are also noted.

`stop_use`
: **list of strings**
: *few prescription* / *many OTC*
: Information about when use of the drug product should be discontinued immediately and a doctor consulted. Includes information about any signs of toxicity or other reactions that would necessitate immediately discontinuing use of the product.

`when_using`
: **list of strings**
: *few prescription* / *many OTC*
: Information about side effects that people may experience, and the substances (e.g. alcohol) or activities (e.g. operating machinery, driving a car) to avoid while using the drug product.

`patient_medication_information`
: **list of strings**
: *few prescription*
: Information or instructions to patients about safe use of the drug product, sometimes including a reference to a patient medication guide or counseling materials.

`spl_medguide`
: **list of strings**
: *some prescription*
: Information about the patient medication guide that accompanies the drug product. Certain drugs must be dispensed with an accompanying medication guide. This field may contain information about when to consult the medication guide and the contents of the medication guide.

### Special populations

`use_in_specific_populations`
: **list of strings**
: *some prescription* / *very few OTC*
: Information about use of the drug by patients in specific populations, including pregnant women and nursing mothers, pediatric patients, and geriatric patients.

`pregnancy`
: **list of strings**
: *prescription* / *few OTC*
: Information about effects the drug may have on pregnant women or on a fetus. This field may be ommitted if the drug is not absorbed systemically and the drug is not known to have a potential for indirect harm to the fetus. It may contain information about the established pregnancy category classification for the drug. (That information is nominally listed in the `teratogenic_effects` field, but may be listed here instead.)

`teratogenic_effects`
: **list of strings**
: *some prescription*
: *Pregnancy category A:* Adequate and well-controlled studies in pregnant women have failed to demonstrate a risk to the fetus in the first trimester of pregnancy, and there is no evidence of a risk in later trimesters.
: *Pregnancy category B:* Animal reproduction studies have failed to demonstrate a risk to the fetus and there are no adequate and well-controlled studies in pregnant women.
: *Pregnancy category C:* Animal reproduction studies have shown an adverse effect on the fetus, there are no adequate and well-controlled studies in humans, and the benefits from the use of the drug in pregnant women may be acceptable despite its potential risks.
: *Pregnancy category D:* There is positive evidence of human fetal risk based on adverse reaction data from investigational or marketing experience or studies in humans, but the potential benefits from the use of the drug in pregnant women may be acceptable despite its potential risks (for example, if the drug is needed in a life-threatening situation or serious disease for which safer drugs cannot be used or are ineffective).
: *Pregnancy category X:* Studies in animals or humans have demonstrated fetal abnormalities or there is positive evidence of fetal risk based on adverse reaction reports from investigational or marketing experience, or both, and the risk of the use of the drug in a pregnant woman clearly outweighs any possible benefit (for example, safer drugs or other forms of therapy are available).

`nonteratogenic_effects`
: **list of strings**
: *some prescription*
: Other information about the drug's effects on reproduction and the drug's use during pregnancy, if the information is relevant to the safe and effective use of the drug.

`labor_and_delivery`
: **list of strings**
: *some prescription*
: Information about the drug's use during labor or delivery, whether or not the use is stated in the indications section of the labeling, including the effect of the drug on the mother and fetus, on the duration of labor or delivery, on the possibility of delivery-related interventions, and the effect of the drug on the later growth, development, and functional maturation of the child.

`nursing_mothers`
: **list of strings**
: *prescription* / *very few OTC*
: Information about excretion of the drug in human milk and effects on the nursing infant, including pertinent adverse effects observed in animal offspring.

`pregnancy_or_breast_feeding`
: **list of strings**
: *many prescription* / *few OTC*
: Documentation forthcoming.

`pediatric_use`
: **list of strings**
: *prescription* / *very few OTC*
: Information about any limitations on any pediatric indications, needs for specific monitoring, hazards associated with use of the drug in any subsets of the pediatric population (such as neonates, infants, children, or adolescents), differences between pediatric and adult responses to the drug, and other information related to the safe and effective pediatric use of the drug.

`geriatric_use`
: **list of strings**
: *most prescription* / *very few OTC*
: Information about any limitations on any geriatric indications, needs for specific monitoring, hazards associated with use of the drug in the geriatric population.

### Nonclinical toxicology

`nonclinical_toxicology`
: **list of strings**
: *some prescription*
: Information about toxicology in non-human subjects.

`carcinogenesis_and_mutagenesis_and_impairment_of_fertility`
: **list of strings**
: *most prescription* / *very few OTC*
: Information about carcinogenic, mutagenic, or fertility impairment potential revealed by studies in animals. Information from human data about such potential is part of the `warnings` field.

`animal_pharmacology_and_or_toxicology`
: **list of strings**
: *some prescription*
: Information from studies of the drug in animals, if the data were not relevant to nor included in other parts of the labeling. Most labels do not contain this field.

### References

`clinical_studies`
: **list of strings**
: *some prescription* / *few OTC*
: This field may contain references to clinical studies in place of detailed discussion in other sections of the labeling.

`references`
: **list of strings**
: *some prescription* / *few OTC*
: This field may contain references when prescription drug labeling must summarize or otherwise relay on a recommendation by an authoritative scientific body, or on a standardized methodology, scale, or technique, because the information is important to prescribing decisions.

### Supply, storage, and handling

`how_supplied`
: **list of strings**
: *prescription* / *few OTC*
: Information about the available dosage forms to which the labeling applies, and for which the manufacturer or distributor is responsible. This field ordinarily includes the strength of the dosage form (in metric units), the units in which the dosage form is available for prescribing, appropriate information to facilitate identification of the dosage forms (such as shape, color, coating, scoring, and National Drug Code), and special handling and storage condition information.

`storage_and_handling`
: **list of strings**
: *many prescription* / *many OTC*
: Information about safe storage and handling of the drug product.

`safe_handling_warning`
: **list of strings**
: *very few prescription* / *few OTC*
: Documentation forthcoming.

### Warnings and precautions

`boxed_warning`
: **list of strings**
: *some prescription* / *few OTC*
: Information about contraindications or serious warnings, particularly those that may lead to death or serious injury.

`warnings_and_precautions`
: **list of strings**
: *some prescription* / *few OTC*
: Information about clinically significant safety concerns that affect decisions about whether to prescribe the drug product, recommendations for patient monitoring to ensure safe use of the drug, and measure that can be taken to prevent or mitigate harm.

`user_safety_warnings`
: **list of strings**
: *very few prescription* / *very few OTC*
: When a drug can pose a hazard to human health by contact, inhalation, ingestion, injection, or by any exposure, this field contains information which can prevent or decrease the possibility of harm.

`precautions`
: **list of strings**
: *many prescription* / *few OTC*
: Information about any special care to be exercised for safe and effective use of the drug.

`warnings`
: **list of strings**
: *prescription* / *OTC*
: Information about serious adverse reactions and potential safety hazards, including limitations in use imposed by those hazards and steps that should be taken if they occur.

`general_precautions`
: **list of strings**
: *many prescription* / *few OTC*
: Information about any special care to be exercised for safe and effective use of the drug.

### Other fields

`laboratory_tests`
: **list of strings**
: *some prescription*
: Information on laboratory tests helpful in following the patient's response to the drug or in identifying possible adverse reactions. If appropriate, information may be provided on such factors as the range of normal and abnormal values expected in the particular situation and the recommended frequency with which tests should be performed before, during, and after therapy.

`recent_major_changes`
: **list of strings**
: *some prescription*
: A list of the section(s) of the that contain substantive changes that have been approved by FDA in the product labeling. The headings and subheadings, if appropriate, affected by the change are listed together with each section's identifying number and the month and year on which the change was incorporated in the labeling.

`microbiology`
: **list of strings**
: *some prescription*
: Documentation forthcoming.

`package_label_principal_display_panel`
: **list of strings**
: *prescription* / *OTC*
: The content of the principal display panel of the product package, usually including the product's name, dosage forms, and other key information about the drug product.

`spl_unclassified_section`
: **list of strings**
: *some prescription* / *some OTC*
: Information not classified as belonging to one of the other fields. Approximately 40% of labeling with `effective_time` between June 2009 and August 2014 have information in this field.

### openFDA fields

`openfda`
: **dictionary**
: For all fields in the `openfda` section, see the [API basics]({{ site.baseurl }}/api/reference/#openfda-fields).

Different datasets use different drug identifiers—brand name, generic name, NDA, NDC, etc. It can be difficult to find the same drug in different datasets. And some identifiers, like pharmacologic class, are useful search filters but not available in all datasets.

OpenFDA features harmonization of drug identifiers, to make it easier to search drug product labeling by these identifiers, like product type (OTC versus prescription). **The `openfda` section in the result is an annotation with this information.**

The vast majority (about 98%) of drug product labeling records have an `openfda` section.

## Datasets

The following datasets provide data for this endpoint.

{% include api-reference-datasets.html datasets=page.datasets %}

</section>