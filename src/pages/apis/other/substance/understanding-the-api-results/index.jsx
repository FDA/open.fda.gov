import React from "react"
import Highlight from 'react-highlight.js'

import examples from './_examples.json'

class IndexRoute extends React.Component {
  render () {
    const example: string = JSON.stringify(examples.count, null, '  ') || ''

    return (
      <section className='doc-content'>
        <h2>Understanding the API Results</h2>
        <p>For <code>search</code> queries (such as: <a href='https://oapi.fda.gov/other/substance.json?search=definition_type:"PRIMARY"'>https://api.fda.gov/other/substance.json?search=definition_type:"PRIMARY"</a>), the <code>results</code> section includes matching adverse event reports returned by the API.</p>
        <p>Each substance result consists of these major sections:</p>
        <ul>
          <li><code>Substance:</code>The top level fields of each record.</li>
          <li><code>Codes:</code>A list of codes used for this record, containing external identifiers, external classification designations, and external link-outs.</li>
          <li><code>Mixture:</code>A container for the mixture information necessary to define a mixture substance. This includes the mixture components and an optioanl source material reference.</li>
          <li><code>Modifications:</code>A container for the set of physical, structural and agent modifications on the substance record.</li>
          <li><code>Moieties:</code>A list of the important component chemical structures which comprise a chemical substance, as well as their relative ratios to each other (especially important in the case of non-stoichiometric chemical substances). These "moieties" are typically the unique set of disconnected covalent structures found in the substance.</li>
          <li><code>Names:</code>The list of names associated with a record. These include scientific, common, generic and brand names for substances and concepts. Name objects include both the name as a string, as well as other information.</li>
          <li><code>Notes:</code>A list of notes and general comments for the record.</li>
          <li><code>Nucleic Acid:</code>The definitional information of a nucleic acid substance. Contains information about the nucleic acid sequence as well as the sugars and linkages used.</li>
          <li><code>Polymer:</code>The definitional information of a polymer substance. Contains information about the monomers, structural repeat units, amounts, connectivity and idealized structural form of the polymer.</li>
          <li><code>Protein:</code>The definitional information of a protein substance. Contains information about the amino acid sequence, gylcosylation, classification, disulfide links and other links.</li>
          <li><code>References:</code>A list of reference uuids, which refer back to the root record's references, essentially acting as footnotes.</li>
          <li><code>Relationships:</code>A list of related records which share some known relationship with this record (e.g. salt forms, metabolites, impurities, etc).</li>
          <li><code>Structurally Diverse:</code>The definitional information of a structurally diverse substance. This includes information about the source of the material (e.g. taxonomy for organisms) as well as the state, form and part of the source material used.</li>
          <li><code>Structure:</code>Chemical structure of a chemical substance.</li>
        </ul>
        <p>For count queries (such as: <a href='https://api.fda.gov/other/substance.json?count=substance_class'>https://api.fda.gov/other/substance.json?count=substance_class</a>), the results section will look something like the following:</p>
        <Highlight
          className='javascript'>
          {example}
        </Highlight>
      </section>
    )
  }
}

export default IndexRoute
