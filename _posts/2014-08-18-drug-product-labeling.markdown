---
layout:         post
date:           2014-08-18 14:30:00
title:          "Providing easy public access to prescription drug, over-the-counter drug, and biological product labeling"
authors:        
  - "Taha Kass-Hout"
---

Every prescription drug (including biological drug products) approved by FDA for human use comes with FDA-approved labeling.  The labeling contains information necessary to inform healthcare providers about the safe and effective use of the drug for its approved use(s). Once a prescription drug is approved, the labeling may be updated as new information becomes available, including, for example, new approved uses, new dosing recommendations, and new safety information. Thus, the approved labeling is a “living document” that changes over time to reflect increased knowledge about the safety and effectiveness of the drug.

In some cases, the approved labeling for a prescription drug can be extensive, consisting of 20,000 words or more. This amount of information, while important to guide safe and effective use of the drug, can present formidable challenges. For example, it can be a daunting task to study more than one labeling to better understand a class of drugs, or to compare drugs, and to keep up with their regular changes. Although it has been publicly available for many years on FDA’s website, now this labeling is available on [openFDA](https://open.fda.gov) through an Application Programming Interface (API), which provides a way for software to interact directly with the data.

For several years, the labeling have been posted publicly in Structured Product Labeling (SPL) format at [http://labels.fda.gov/](http://labels.fda.gov/). The SPL format enhances the ability to electronically access, search, and sort information in the labeling. The SPL files are also available at the National Library of Medicine’s DailyMed site and can be downloaded. We’ve created an API for the data to supplement (not replace) these resources, and to provide easy and timely access to changes or updates to the labeling.

The openFDA drug product label API provides access to the data for nearly 60,000 prescription and over-the-counter (OTC) drug labeling. The prescription labeling includes sections such as the “Indications and Usage” and “Adverse Reactions” sections and the OTC labeling includes “Purpose” and “Uses” headings and so forth.

This API can be used, for instance, to identify those medications that have a [Boxed Warning](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfCFR/CFRSearch.cfm?fr=201.57), to identify those medications that [have lactose](https://api.fda.gov/drug/label.json?search=effective_time:%5b20090601+TO+20140801%5d+AND+inactive_ingredient:lactose) listed as an inactive ingredient, to help identify those medications that have a known interaction with [grapefruit juice](http://www.fda.gov/forconsumers/consumerupdates/ucm292276.htm) (or other fruit juices), and to answer other queries.

This API is just one more example of how openFDA is helping make publicly available data more accessible and useful. Since the first API for adverse events was posted on June 2, 2014, there have been more than 2.6 million API accesses with approximately 20,000 internet devices connected to the adverse events API alone, and more than 30,000 unique visitors to the site.

It’s very important to note that the labeling for prescription drugs is proposed by the applicant, reviewed by FDA, and approved by FDA. The labeling for OTC medications is also either approved by FDA or must conform to applicable regulations that govern the content and format of OTC drug labeling that are not pre-approved by FDA.

As a research and development project, openFDA is a work in progress (Beta phase), and we are eager to learn from the developer and research communities what possible uses these data might have. We are also interested in hearing from the community about other publicly available FDA datasets for which an API might prove useful.

We are actively involved in the openFDA communities on [GitHub](http://github.com/FDA/openfda) {% include external-link.html %} and [StackExchange](https://opendata.stackexchange.com/questions/tagged/openfda) {% include external-link.html %}, and encourage people interested in the project to participate in those communities. In addition to providing access to datasets, openFDA encourages innovative use of the agency’s publicly available data by highlighting potential data applications, and providing a place for community interaction with one another and with FDA domain experts.

Over time, we hope that openFDA can become an important resource where developers, researchers, and the public at large will learn about the medications and other FDA-regulated products that protect and promote the health of Americans.

(Cross-posted from the FDA blog, where this was published on August 18, 2014.)