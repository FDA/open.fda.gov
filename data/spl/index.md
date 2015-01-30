---
layout:             dataset
cover:              
title:              SPL
title_long:         Structured Product Labeling
slug:               spl
source_url:         http://www.fda.gov/forindustry/datastandards/structuredproductlabeling/default.htm
provider_name:      FDA
provider_url:       http://www.fda.gov/
update_frequency:
time_period:        ~2009-present
record_count:       ~60k records
license:            Public Domain (<a href="http://creativecommons.org/publicdomain/zero/1.0/">CC0</a>)
description:        Structured Product Labeling (SPL) is a document markup standard approved by Health Level Seven (HL7) and adopted by FDA as a mechanism for exchanging product and facility information.
download_url:       http://www.fda.gov/forindustry/datastandards/structuredproductlabeling/
endpoints:
  - area:           Drugs
    endpoint:       /drug/label.json
    docs: 					/drug/label/
    kind:           Drug product labeling.
---

## About SPL

Drug manufacturers and distributors submit documentation about their products to FDA. Labeling contains a summary of the essential scientific information needed for the safe and effective use of the drug. Structured Product Labeling (SPL) is a document markup standard approved by Health Level Seven (HL7) and adopted by FDA as a mechanism for exchanging product and facility information.

The openFDA drug product labeling API returns data from these submissions for both prescription and over-the-counter (OTC) drugs. The labeling is broken into sections, such as indications for use (prescription drugs) or purpose (OTC drugs), adverse reactions, and so forth. There is considerable variation between drug products, since the information required for safe and effective use varies with the unique characteristics of each drug product.

## Downloads

See the [SPL site]({{ page.source_url }}) for download information.
