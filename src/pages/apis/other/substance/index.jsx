import React from "react"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'

import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Substance Data Overview</h2>
        <p>FDA is a key source for substance information that is precise to the molecular level for use internally and externally (where appropriate).  FDA’s Health Informatics program defines these substances, assigns unique identifiers (UNIIs), and collaborates with internal and external stakeholders worldwide to define requirements and provides content for the ISO compliant Global Substance Registration System (GSRS) currently in development at NIH.</p>
        <p>The overall purpose of the joint FDA/USP Substance Registration System (SRS) is to support health information technology initiatives by generating unique ingredient identifiers (UNIIs) for substances in drugs, biologics, foods, and devices. The UNII is a non- proprietary, free, unique, unambiguous, non semantic, alphanumeric identifier based on a substance’s molecular structure and/or descriptive information.</p>
        <p>The UNII is:</p>
        <ul>
          <li>One of the core components of the United States Federal Medication Terminology.</li>
          <li>Used in the FDA's Structured Product Labeling.</li>
          <li>Used to assist in the generation of the National Library of Medicine's (NLM's) RxNorm.</li>
          <li>A US government standard for drug ingredient and food allergen identifiers.</li>
          <li>A component of the Environmental Protection Agency's Substance Registry System (future).</li>
        </ul>
        <p>The openFDA Substance Data endpoint provides a wealth of information which is primarily designed for machine reading. For more information about Substance Data and a more human-readable format, please see the following NIH website: <a href="https://tripod.nih.gov/ginas/#/">The Ginas Project</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />
      </section>
    )
  }
}

export default IndexRoute



