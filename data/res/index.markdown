---
layout:             dataset
cover:              
title:              RES
title_long:         FDA Recall Enterprise System
slug:               res
source_url:         http://www.fda.gov/ICECI/ComplianceManuals/RegulatoryProceduresManual/ucm177308.htm
provider_name:      FDA
provider_url:       http://www.fda.gov/
update_frequency:   Weekly
time_period:        ~2004-present
record_count:       ~20k
license:            Public Domain (<a href="http://creativecommons.org/publicdomain/zero/1.0/">CC0</a>)
description:        The FDA Adverse Event Reporting System (FAERS) is a database that contains information on adverse event and medication error reports submitted to FDA.
download_url:       http://www.fda.gov/%20Safety/Recalls/EnforcementReports/default.htm
endpoints:
  - area:           Drugs
    endpoint:       /drug/enforcement.json
    docs:           /drug/enforcement/
    kind:           Drug recall enforcement reports.
  - area:           Devices
    endpoint:       /device/enforcement.json
    docs:           /device/enforcement/
    kind:           Device recall enforcement reports.
  - area:           Foods
    endpoint:       /food/enforcement.json
    docs:           /food/enforcement/
    kind:           Food recall enforcement reports.
---

## About RES

The Recall Enterprise System (RES) is an electronic data system used by FDA recall personnel to submit, update, classify, and terminate recalls.

Recalls are an appropriate alternative method for removing or correcting marketed consumer products, their labeling, and/or promotional literature that violate the laws administered by the Food and Drug Administration (FDA). Recalls afford equal consumer protection but generally are more efficient and timely than formal administrative or civil actions, especially when the product has been widely distributed.

Manufacturers and/or distributors may initiate a recall at any time to fulfill their responsibility to protect the public health from products that present a risk of injury or gross deception, or are otherwise defective. Firms may also initiate a recall following notification of a problem by FDA or a state agency, in response to a formal request by FDA, or as ordered by FDA.

## Downloads

See the [RES site]({{ page.source_url }}) for download information.
