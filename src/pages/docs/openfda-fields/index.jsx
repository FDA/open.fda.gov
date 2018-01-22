import React from "react"

import Fields from '../../../components/RenderContentObject/Fields'
import fields from './_fields.yaml'

class IndexRoute extends React.Component {
  render() {

    const field_list = {
      'NDC': [
        "application_number",
        "brand_name",
        "dosage_form",
        "generic_name",
        "manufacturer_name",
        "product_ndc",
        "product_type",
        "route",
        "substance_name"
      ],
      'SPL': [
        "spl_id",
        "spl_set_id",
        "pharm_class_moa",
        "pharm_class_cs",
        "pharm_class_pe",
        "pharm_class_epc",
        "upc"
      ],
      'UNII': [
        "unii"
      ],
      'RxNorm': [
        "rxcui"
      ]
    }

    return (
      <section className="doc-content">
        <h2>OpenFDA fields</h2>
        <p>Different datasets use different drug identifiers—brand name, generic name, NDA, NDC, etc. It can be difficult to find the same drug in different datasets. And some identifiers, like pharmacologic class, are useful search filters but not available in all datasets.</p>
        <p>OpenFDA features harmonization on drug identifiers, to make it easier to both search for and understand the drug products returned by API queries. These additional fields are attached to records in all categories, if applicable.</p>
        <p>When you query an endpoint, you can search by:</p>
        <ul>
          <li><p>Fields native to records served by that endpoint.</p></li>
          <li><p>Harmonized <code>openFDA</code> fields, if they exist.</p></li>
        </ul>
        <p>OpenFDA does not rewrite original records. These additional fields are annotations, in special <code>openfda</code> dictionary of values.</p>
        <div className="bg-secondary-lightest marg-t-2 marg-b-2 pad-2 pad-b-1">
          <h2>Limits of openFDA harmonization</h2>
          <p>Not all records have harmonized fields. Because the harmonization process requires an exact match, some drug products cannot be harmonized in this fashion—for instance, if the drug name is misspelled. Some drug products will have <strong>openfda</strong> sections, while others will never, if there was no match during the harmonization process.  Conversely, searching in these fields will only return a subset of records from a given endpoint.</p>
        </div>
        <p>The documentation below describes fields that you may find in an <code>openfda</code> section of an API result. They are organized by the dataset from which they originate.</p>
        <div>
          <h2>NDC</h2>
          <p>NDC stands for <a href="http://www.fda.gov/Drugs/InformationOnDrugs/ucm142438.htm">National Drug Code</a>. The Drug Listing Act of 1972 requires registered drug establishments to provide the FDA with a current list of all drugs manufactured, prepared, propagated, compounded, or processed by it for commercial distribution. (See Section 510 of the Federal Food, Drug, and Cosmetic Act (Act) (21 U.S.C. § 360)).</p>
          <p>Drug products are identified and reported using a unique, three-segment number, called the National Drug Code (NDC), which serves as a universal product identifier for drugs.</p>
          <p>Several NDC dataset fields are used to annotate records in openFDA.</p>
          <Fields
            data={field_list['NDC']}
            fields={fields}
          />
        </div>
        <div>
          <h2>SPL</h2>
          <p>SPL stands for the <a href="http://www.fda.gov/forindustry/datastandards/structuredproductlabeling/default.htm">Structured Product Labeling</a> standard approved by Health Level Seven (HL7) and adopted by FDA as a mechanism for exchanging product and facility information. Drug products have associated labels that confirm to the SPL format.</p>
          <p>Several SPL dataset fields are used to annotate records in openFDA.</p>
          <Fields
            data={field_list['SPL']}
            fields={fields}
          />
        </div>
        <div>
          <h2>UNII</h2>
          <p>UNII stands for <a href="http://www.fda.gov/forindustry/datastandards/substanceregistrationsystem-uniqueingredientidentifierunii/default.htm">Unique Ingredient Identifier</a>. The overall purpose of the joint FDA/USP Substance Registration System (SRS) is to support health information technology initiatives by generating unique ingredient identifiers (UNIIs) for substances in drugs, biologics, foods, and devices. The UNII is a non- proprietary, free, unique, unambiguous, non semantic, alphanumeric identifier based on a substance’s molecular structure and/or descriptive information.</p>
          <Fields
            data={field_list['UNII']}
            fields={fields}
          />
        </div>
        <div>
          <h2>RxNorm</h2>
          <p><a href="http://www.nlm.nih.gov/research/umls/rxnorm/overview.html">RxNorm</a> is a normalized naming system for generic and branded drugs; and a tool for supporting semantic interoperation between drug terminologies and pharmacy knowledge base systems. The <a href="http://www.nlm.nih.gov/">National Library of Medicine (NLM)</a> produces RxNorm.</p>
          <Fields
            data={field_list['RxNorm']}
            fields={fields}
          />
        </div>
      </section>
    )
  }
}

export default IndexRoute
