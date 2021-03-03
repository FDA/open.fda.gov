import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Independent Evaluations of COVID-19 Serological Tests</h2>
        <p>Serology tests detect the presence of antibodies in the blood when the body is responding to a specific infection, like COVID-19. In other words, the tests detect the body’s immune response to the infection caused by the virus rather than detecting the virus itself. In the early days of an infection when the body’s immune response is still building, antibodies may not be detected. This limits the test’s effectiveness for diagnosing COVID-19, and this is one reason serology tests should not be used as the sole basis to diagnose COVID-19. Serology tests could play a role in the fight against COVID-19 by helping healthcare professionals identify individuals who may have developed an immune response to SARS-CoV-2. In addition, these test results can aid in determining who may donate a part of their blood called convalescent plasma, which may serve as a possible treatment for those who are seriously ill from COVID-19. However, to use serology tests properly, it is important to understand their performance characteristics and limitations. Moreover, studies are underway to address questions that will better inform the appropriate use of these tests, such as whether the presence of antibodies conveys a level of immunity that would prevent or reduce the severity of re-infection as well as the duration for which immunity lasts.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.path.split("/")[3]}
          harmonized={false}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>

        <h2>About this testing program</h2>
        <h3>Introduction</h3>
        <p>The serology tests were tested at the Frederick National Laboratory for Cancer Research (FNLCR), a Federally Funded Research and Development Center (FFRDC) sponsored by the National Cancer Institute (NCI) or by the Hemostasis Laboratory Branch, Division of Blood Disorders, National Center on Birth Defects and Developmental Disabilities, Centers for Disease Control and Prevention (CDC).</p>

        <h3>Panel Composition</h3>
        <p>Each test was evaluated against "Panel 1", "Panel 2", or "Panel 3", each of
          which include frozen SARS-CoV-2 antibody-positive serum samples (<span className="math inline">\(n=30\)</span>)
          and frozen antibody-negative serum and Anticoagulant Citrate Dextrose Solution Formula A (ACD-A) plasma
          samples (<span className="math inline">\(n=80\)</span>). While ACD-A plasma may not be commonly used in clinical practice for serological testing, ACD-A plasma samples were used here because these pre-pandemic samples were most easily acquired from blood banks. The panel size and composition were chosen to enable a laboratory-based evaluation and to provide reasonable estimates and confidence intervals for test performance in the context of limited sample availability. The sample size is comparable to that of a typical sample size used to support Emergency Use Authorization (EUA) by FDA for tests of this type.</p>

        <h5>Positive samples</h5>
        <p>Positive samples used were from patients previously confirmed to have SARS-CoV-2 infection with a nucleic acid amplification test (NAAT). Time between symptom onset, NAAT testing, and sample collection is not known for all samples. Both SARS-CoV-2 IgM and IgG antibodies are present in all positive samples used. The Centers for Disease Control and Prevention (CDC) detected the presence of IgG and IgM antibodies at their laboratory using their SARS-CoV-2 spike enzyme-linked immunosorbent assay (ELISA) tests. (See <a href="https://www.cdc.gov/coronavirus/2019-ncov/lab/serology-testing.html">Serology Testing for COVID-19</a>, which notes "CDC's serologic test has been designed and validated for surveillance and research purposes. It is designed to estimate the percentage of the U.S. population previously infected with the virus -- information needed to guide the response to the pandemic and protect the public's health. The CDC test is not currently designed to test individuals who want to know if they have been previously infected with SARS-CoV-2. Commercial tests are available to provide test results to individuals.") The presence of antibodies was confirmed at FNLCR using CDC's developed ELISAs (Pan-Ig, IgG, and IgM) as well as an IgG Receptor Binding Domain (RBD) ELISA developed by the Krammer Laboratory at the Icahn School of Medicine at Mount Sinai. (An implementation of this test, the COVID-19 ELISA IgG Antibody Test, has been granted an EUA authorization by FDA for use at the Mount Sinai Laboratory (MSL), Center for Clinical Laboratories, a division of the Department of Pathology, Molecular, and Cell-Based Medicine, New York, NY. See this <a href="https://www.fda.gov/media/137029/download">EUA Summary</a>.) The positive samples selected may not reflect the distribution of antibody levels in patient populations that would be evaluated by such a test. Because all samples are positive for both IgM and IgG, this evaluation cannot verify that tests intended to detect IgM and IgG antibodies separately detect these antibodies independently.</p>
        <p>Positive samples were assessed at dilutions of 1:100, 1:400, 1:1600, and 1:6400 by CDC on their Pan-Ig assay, their IgM assay, and their IgG assay. Some samples were run at additional dilutions. Any samples that were positive at a dilution greater than 1:6400 were assigned a titer of 6400 because 1:6400 was the highest dilution at which all positive samples were assessed. Two of these samples, C0107 and C0176, were positive for IgG antibodies at a dilution of 1:25600.</p>

        <h5>Negative Samples</h5>
        <p>All negative samples used were collected prior to 2020, before the SARS-CoV-2 virus is known to have circulated in the United States. Negative sample groups include:</p>
        <ul>
          <li><p>“Negatives” (<em>n</em>=70): selected without regard for clinical status. This group includes a sample, C0063, that showed reactivity in the Pan-Ig CDC spike ELISA at FNLCR. It includes another sample, C0087, that showed reactivity in the IgG RBD ELISA at FNLCR.</p></li>
          <li><p>“HIV+” (<em>n</em>=10): selected from banked plasma from HIV+ patients. (HIV+ samples were deemed appropriate for inclusion in the panel: (1) to increase the sample size and reduce the confidence interval; and (2) to identify any possibility of cross-reactivity with HIV+ samples. It is anticipated that other types of samples, as they become available, may also be evaluated in any future analyses.) This group includes 3 samples, C0018, C0155, and C0182, that showed reactivity in the IgG RBD ELISA at FNLCR.</p></li>
        </ul>
        <p>All negative samples were assessed at dilutions of 1:100 and 1:400 by CDC on their Pan-Ig assay. A subset of samples was assessed in parallel at additional dilutions and on the CDC IgM and IgG assays. All negative samples were negative at a dilution of 1:100 on the CDC Pan-Ig assay. These samples were assigned an undetectable titer (represented as zero (0) in the line data) for the Pan-Ig assay, the IgM assay, and the IgG assay.</p>

        <h3>Analysis</h3>
        <p>Samples used in this evaluation were not randomly selected, and sensitivity (PPA) and specificity (NPA) estimates shown may not be indicative of the real-world performance of these tests. Sensitivity and specificity were calculated for each antibody (e.g., IgM, IgG, IgA, and Pan Ig, as applicable) separately. In addition, for tests that measure multiple antibodies separately, sensitivity and specificity were estimated in a combined manner, where a positive result for any antibody a test is intended to detect was considered as a positive test result and a negative result meant that a sample tested negative for all antibodies a test is intended to detect. Positive and negative predictive values were calculated for combined sensitivity and specificity for tests that measure multiple antibodies separately and assuming a prevalence of 5%. Cross-reactivity with HIV+ was evaluated, and results are presented separately in the individual test reports. If cross-reactivity was detected, the samples with HIV+ were not included in calculations of specificity.</p>
        <p>In this report, device outputs indicating equivocal results, including outputs such as “borderline” or similar, are referred to as “equivocal.” For ELISA tests that provide equivocal results, for sensitivity and specificity calculations, equivocal results on positive samples were counted as false negative results, and equivocal results on negative samples were counted as false positive results.</p>
        <p>Confidence intervals for sensitivity and specificity were calculated per a score method described in CLSI EP12-A2 (2008). (CLSI. <em>User Protocol for Evaluation of Qualitative Test Performance</em>; Approved Guideline—Second Edition. CLSI document EP12-A2. Wayne, PA: Clinical and Laboratory Standards Institute; 2008. See <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfStandards/detail.cfm?standard__identification_no=31791">Recognized Consensus Standards.</a>) Confidence intervals for PPV and NPV were calculated using the values from the 95% confidence intervals for sensitivity and specificity. For evaluation of cross-reactivity with HIV+, it was evaluated whether an increased false positive rate among antibody negative samples with HIV was statistically higher than the false positive rate among antibody negative samples without HIV (for this, a confidence interval for the difference in false positive rates was calculated per a score method described by Altman. (Statistics with Confidence: Confidence Intervals and Statistical Guidelines. (2013). Wiley.))</p>

        <h3>Important caveats</h3>
        <p>Sensitivity and specificity estimates shown may not be indicative of the real world performance of the tests.</p>
        <p>These results are based on serum and plasma samples only and may not be indicative of performance with other sample types, such as whole blood, including finger stick blood.</p>
        <p>The number of samples in the panel is a minimally viable sample size that still provides reasonable estimates and confidence intervals for test performance, and the samples used may not be representative of the antibody profile observed in patient populations.</p>

        <h3>Notes about the evaluation procedure</h3>
        <ul>
          <li>The tests were used per the manufacturers’ package inserts.</li>
          <li>Devices were tested within any expiration dates provided.</li>
          <li>Devices were not obviously defective / compromised.</li>
          <li>Devices were stored at FNLCR within their labeled conditions.</li>
          <li>For lateral flow tests, a single operator conducted and read the test.</li>
          <li>For ELISA tests, a single operator conducted the test.</li>
          <li>For lateral flow tests, the operator trained on the test with positive and negative controls prior to testing.</li>
          <li>For ELISA tests, each test was run with positive and negative controls.</li>
          <li>The personnel who performed the testing were blinded to the identity / code of the sample and the expected results.</li>
          <li>The testing was performed in a non-clinical laboratory environment.</li>
          <li>Negative and positive samples were ordered randomly and then tested serially.</li>
        </ul>
        <p>See the individual test reports for more specific information on the evaluation of each test.</p>

        <h2>Summary test results</h2>
        <p>Where the Marketing Status below is shown as “EUA Authorized,” FDA has reviewed data generated by the developer and the independent evaluation and determined, among other things, that based on the totality of the evidence available, that the test may be effective in identifying the presence of antibodies to SARS-CoV-2 as described in the Letters of Authorization for each test, and that the known and potential benefits of the test when so used outweigh the known and potential risks. Such tests are authorized by FDA under Emergency Use Authorizations (EUA) and may be distributed and used as set forth in the EUA. Where the Marketing Status below is shown as “Should not be distributed - Voluntarily withdrawn,” the manufacturers have voluntarily stopped distribution and requested FDA to remove their test from the list of commercial manufacturers distributing serology test kits under the policy outlined in Section IV.D of the <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/policy-coronavirus-disease-2019-tests-during-public-health-emergency-revised">Policy for Coronavirus Disease-2019 Tests</a>. Where the Marketing Status below is shown as “Should not be distributed - Removed,” either an EUA request has not been submitted within a reasonable period of time as outlined in the <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/policy-coronavirus-disease-2019-tests-during-public-health-emergency-revised">Policy for Coronavirus Disease-2019 Tests</a> or FDA has determined not to issue an EUA for the test. Where the Marketing Status below is shown as “Should not be distributed –- No notification or EUA authorization”, the test was evaluated prior to any planned distribution in the United States and is not known to have been marketed here.</p>

        <h3>EUA Authorized</h3>
        <h4>Abbott Architect i1000 SARS-CoV-2 IgG</h4>
        <p><strong>Manufacturer:</strong> Abbott</p>
        <p><strong>Device:</strong> Architect i1000 SARS-CoV-2 IgG</p>
        <p><strong>Date Performed:</strong> 2020-05-20</p>
        <p><strong>Lot Number:</strong> 15016M800</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (46.1%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.5%
            </td>
            <td style={{textAlign:'left'}}>
              (98.6%; 99.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3305-a001.pdf">CDC’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3305-a001.csv">Data File</a></p>

        <h4>Access Bio Inc. CareStart COVID-19 IgM/IgG Rapid Diagnostic Test for the Detection of SARS-CoV-2 IgM/IgG
          Ab</h4>
        <p><strong>Manufacturer:</strong> Access Bio Inc.</p>
        <p><strong>Device:</strong> CareStart COVID-19 IgM/IgG Rapid Diagnostic Test for the Detection of SARS-CoV-2
          IgM/IgG Ab</p>
        <p><strong>Date Performed:</strong> 2020-06-02</p>
        <p><strong>Lot Number:</strong> C120E68</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.8%
            </td>
            <td style={{textAlign:'left'}}>
              (35.0%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3299-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3299-a001.csv">Data File</a></p>

        <h4>Acon Biotech (Hangzhou) Co., LTD Acon SARS-CoV2 IgG/IgM Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Acon Biotech (Hangzhou) Co., LTD</p>
        <p><strong>Device:</strong> Acon SARS-CoV2 IgG/IgM Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-11-02</p>
        <p><strong>Lot Number:</strong> COV0109007</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              58.4%
            </td>
            <td style={{textAlign:'left'}}>
              (30.9%; 80.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3396-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3396-a001.csv">Data File</a></p>

        <h4>Advaite Inc. Advaite RapCov Rapid COVID-19 Test</h4>
        <p><strong>Manufacturer:</strong> Advaite Inc.</p>
        <p><strong>Device:</strong> Advaite RapCov Rapid COVID-19 Test</p>
        <p><strong>Date Performed:</strong> 2020-11-02</p>
        <p><strong>Lot Number:</strong> P0904</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              79.7%
            </td>
            <td style={{textAlign:'left'}}>
              (38.0%; 95.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3397-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3397-a001.csv">Data File</a></p>

        <h4>Advaite Inc. ADVAITE RapCOV Rapid COVID-19 Test</h4>
        <p><strong>Manufacturer:</strong> Advaite Inc.</p>
        <p><strong>Device:</strong> ADVAITE RapCOV Rapid COVID-19 Test</p>
        <p><strong>Date Performed:</strong> 2020-10-06</p>
        <p><strong>Lot Number:</strong> P0904</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              78.5%
            </td>
            <td style={{textAlign:'left'}}>
              (35.4%; 95.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.3%
            </td>
            <td style={{textAlign:'left'}}>
              (98.4%; 99.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3382-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3382-a001.csv">Data File</a></p>

        <h4>Advaite Inc. Advaite RapCov Rapid COVID-19 Test (combined evaluations)</h4>
        <p><strong>Manufacturer:</strong> Advaite Inc.</p>
        <p><strong>Device:</strong> Advaite RapCov Rapid COVID-19 Test (combined evaluations)</p>
        <p><strong>Date Performed:</strong> 2020-10-06, 2020-11-02</p>
        <p><strong>Lot Number:</strong> P0904</p>
        <p><strong>Panel:</strong> Panel 3, Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              89.7% (52/58)
            </td>
            <td style={{textAlign:'left'}}>
              (79.2%; 95.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.9% (95/97)
            </td>
            <td style={{textAlign:'left'}}>
              (92.8%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              69.6%
            </td>
            <td style={{textAlign:'left'}}>
              (36.6%; 89.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.4%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3397-a002.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3397-a002.csv">Data File</a></p>

        <h4>Assure Tech. (Hangzhou) Co., Ltd. FaStep Rapid Diagnostic Test Coronavirus Disease 2019/ (COVID-2019) IgG/IgM Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Assure Tech. (Hangzhou) Co., Ltd.</p>
        <p><strong>Device:</strong> FaStep Rapid Diagnostic Test Coronavirus Disease 2019/ (COVID-2019) IgG/IgM Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-06-10</p>
        <p><strong>Lot Number:</strong> I2003183</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              80.8%
            </td>
            <td style={{textAlign:'left'}}>
              (40.9%; 96.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3289-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3289-a001.csv">Data File</a></p>

        <h4>Beijing Wantai Biological Pharmacy Enterprise Co., Ltd. WANTAI SARS-CoV-2 Ab ELISA</h4>
        <p><strong>Manufacturer:</strong> Beijing Wantai Biological Pharmacy Enterprise Co., Ltd.</p>
        <p><strong>Device:</strong> WANTAI SARS-CoV-2 Ab ELISA</p>
        <p><strong>Date Performed:</strong> 2020-07-02</p>
        <p><strong>Lot Number:</strong> NCOA20200401</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.1%
            </td>
            <td style={{textAlign:'left'}}>
              (33.6%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3319-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3319-a001.csv">Data File</a></p>

        <h4>Beijing Wantai Biological Pharmacy Enterprise Co., Ltd. WANTAI SARS-CoV-2 Ab Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Beijing Wantai Biological Pharmacy Enterprise Co., Ltd.</p>
        <p><strong>Device:</strong> WANTAI SARS-CoV-2 Ab Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-06-16</p>
        <p><strong>Lot Number:</strong> JNB20200406</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              80.8%
            </td>
            <td style={{textAlign:'left'}}>
              (40.9%; 96.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3308-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3308-a001.csv">Data File</a></p>

        <h4>Biocan Diagnostics Inc biocan Tell Me Fast Novel Coronavirus (COVID-19) IgG/IgM Antibody Test</h4>
        <p><strong>Manufacturer:</strong> Biocan Diagnostics Inc</p>
        <p><strong>Device:</strong> biocan Tell Me Fast Novel Coronavirus (COVID-19) IgG/IgM Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-06-03</p>
        <p><strong>Lot Number:</strong> B251CB170320</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.7% (78/79)
            </td>
            <td style={{textAlign:'left'}}>
              (93.2%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (76/79)
            </td>
            <td style={{textAlign:'left'}}>
              (89.4%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (76/79)
            </td>
            <td style={{textAlign:'left'}}>
              (89.4%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              56.4%
            </td>
            <td style={{textAlign:'left'}}>
              (28.1%; 79.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3290-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3290-a001.csv">Data File</a></p>

        <h4>Biohit Healthcare (Hefei) Co., Ltd. SARS-CoV-2 IgM/IgG Antibody Test Kit</h4>
        <p><strong>Manufacturer:</strong> Biohit Healthcare (Hefei) Co., Ltd.</p>
        <p><strong>Device:</strong> SARS-CoV-2 IgM/IgG Antibody Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-05-28</p>
        <p><strong>Lot Number:</strong> SA200301</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              50.4%
            </td>
            <td style={{textAlign:'left'}}>
              (26.5%; 72.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3260-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3260-a001.csv">Data File</a></p>

        <h4>Euroimmun SARS-COV-2 ELISA (IgG)</h4>
        <p><strong>Manufacturer:</strong> Euroimmun</p>
        <p><strong>Device:</strong> SARS-COV-2 ELISA (IgG)</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> E200330DT</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>
                Antibody
              </th>
              <th style={{textAlign:'left'}}>
                Performance Measure
              </th>
              <th style={{textAlign:'left'}}>
                Estimate of Performance
              </th>
              <th style={{textAlign:'left'}}>
                95% Confidence Interval
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                90.0% (27/30)
              </td>
              <td style={{textAlign:'left'}}>
                (74.4%; 96.5%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                100% (80/80)
              </td>
              <td style={{textAlign:'left'}}>
                (95.4%; 100%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                PPV at prevalence = 5%
              </td>
              <td style={{textAlign:'left'}}>
                100%
              </td>
              <td style={{textAlign:'left'}}>
                (46.1%; 100%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                NPV at prevalence = 5%
              </td>
              <td style={{textAlign:'left'}}>
                99.5%
              </td>
              <td style={{textAlign:'left'}}>
                (98.6%; 99.8%)
              </td>
            </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3246-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3246-a001.csv">Data File</a></p>

        <h4>Fisher Diagnostics OmniPATH COVID-19 Total Antibody ELISA Test</h4>
        <p><strong>Manufacturer:</strong> Fisher Diagnostics</p>
        <p><strong>Device:</strong> OmniPATH COVID-19 Total Antibody ELISA Test</p>
        <p><strong>Date Performed:</strong> 2020-09-01</p>
        <p><strong>Lot Number:</strong> 20200523</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.1%
            </td>
            <td style={{textAlign:'left'}}>
              (33.6%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3362-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3362-a001.csv">Data File</a></p>

        <h4>Hangzhou Biotest Biotech, Co., Ltd. Covid-19 IgG/IgM Rapid Test Cassette</h4>
        <p><strong>Manufacturer:</strong> Hangzhou Biotest Biotech, Co., Ltd.</p>
        <p><strong>Device:</strong> Covid-19 IgG/IgM Rapid Test Cassette</p>
        <p><strong>Date Performed:</strong> 2020-04-27</p>
        <p><strong>Lot Number:</strong> COV20030071</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (50.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3252-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3252-a001.csv">Data File</a></p>

        <h4>Hangzhou Laihe Biotech Co., Ltd. Novel Coronavirus (2019-nCoV) IgM/IgG Antibody Combo Test Kit (Colloidal Gold)</h4>
        <p><strong>Manufacturer:</strong> Hangzhou Laihe Biotech Co., Ltd.</p>
        <p><strong>Device:</strong> Novel Coronavirus (2019-nCoV) IgM/IgG Antibody Combo Test Kit (Colloidal Gold)</p>
        <p><strong>Date Performed:</strong> 2020-06-10</p>
        <p><strong>Lot Number:</strong> 2005037</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              80.8%
            </td>
            <td style={{textAlign:'left'}}>
              (40.9%; 96.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3291-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3291-a001.csv">Data File</a></p>

        <h4>Healgen COVID-19 IgG/IgM Rapid Test Cassette</h4>
        <p><strong>Manufacturer:</strong> Healgen</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Rapid Test Cassette</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 2003292</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.8%
            </td>
            <td style={{textAlign:'left'}}>
              (35.0%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3247-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3247-a001.csv">Data File</a></p>

        <h4>InBios International Inc. SCoV-2 Detect™ IgG ELISA</h4>
        <p><strong>Manufacturer:</strong> InBios International Inc.</p>
        <p><strong>Device:</strong> SCoV-2 Detect™ IgG ELISA</p>
        <p><strong>Date Performed:</strong> 2020-06-16</p>
        <p><strong>Lot Number:</strong> DFT1172</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (50.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3315-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3315-a001.csv">Data File</a></p>

        <h4>InBios International Inc. SCoV-2 Detect™ IgM ELISA</h4>
        <p><strong>Manufacturer:</strong> InBios International Inc.</p>
        <p><strong>Device:</strong> SCoV-2 Detect™ IgM ELISA</p>
        <p><strong>Date Performed:</strong> 2020-06-16</p>
        <p><strong>Lot Number:</strong> DFT1170</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              80.3%
            </td>
            <td style={{textAlign:'left'}}>
              (39.4%; 96.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.1%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3316-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3316-a001.csv">Data File</a></p>

        <h4>Innovita (Tangshan) Biological Technology Co., Ltd. One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole Blood/Serum/Plasma Combo</h4>
        <p><strong>Manufacturer:</strong> Innovita (Tangshan) Biological Technology Co., Ltd.</p>
        <p><strong>Device:</strong> One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole Blood/Serum/Plasma Combo</p>
        <p><strong>Date Performed:</strong> 2020-06-02</p>
        <p><strong>Lot Number:</strong> 20200405</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.8%
            </td>
            <td style={{textAlign:'left'}}>
              (35.0%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3282-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3282-a001.csv">Data File</a></p>

        <h4>Innovita (Tangshan) Biological Technology Co., Ltd. One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold)
          IgM/IgG Whole Blood/Serum/Plasma Combo</h4>
        <p><strong>Manufacturer:</strong> Innovita (Tangshan) Biological Technology Co., Ltd.</p>
        <p><strong>Device:</strong> One Step Rapid Test 2019-nCoV Ab Test (Colloidal Gold) IgM/IgG Whole
          Blood/Serum/Plasma Combo</p>
        <p><strong>Date Performed:</strong> 2020-06-02</p>
        <p><strong>Lot Number:</strong> 20200405</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.8%
            </td>
            <td style={{textAlign:'left'}}>
              (35.0%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3282-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3282-a001.csv">Data File</a></p>

        <h4>Jiangsu Well Biotech Co, Ltd. COVID-19 IgM/IgG Rapid Test (Colloidal gold)</h4>
        <p><strong>Manufacturer:</strong> Jiangsu Well Biotech Co, Ltd.</p>
        <p><strong>Device:</strong> COVID-19 IgM/IgG Rapid Test (Colloidal gold)</p>
        <p><strong>Date Performed:</strong> 2020-06-23</p>
        <p><strong>Lot Number:</strong> 2005202</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              45.7%
            </td>
            <td style={{textAlign:'left'}}>
              (25.3%; 66.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3313-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3313-a001.csv">Data File</a></p>

        <h4>Jiangsu Well Biotech Co., Ltd. COVID-19 IgM/IgG Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Jiangsu Well Biotech Co., Ltd.</p>
        <p><strong>Device:</strong> COVID-19 IgM/IgG Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-09-04</p>
        <p><strong>Lot Number:</strong> 2005202</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (50.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3356-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3356-a001.csv">Data File</a></p>

        <h4>Jiangsu Well Biotech Co., Ltd. COVID-19 IgM/IgG Rapid Test (combined evaluations)</h4>
        <p><strong>Manufacturer:</strong> Jiangsu Well Biotech Co., Ltd.</p>
        <p><strong>Device:</strong> COVID-19 IgM/IgG Rapid Test (combined evaluations)</p>
        <p><strong>Date Performed:</strong> 2020-06-23, 2020-09-04</p>
        <p><strong>Lot Number:</strong> 2005202</p>
        <p><strong>Panel:</strong> Panel 2, Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.1% (54/58)
            </td>
            <td style={{textAlign:'left'}}>
              (83.6%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.9% (93/97)
            </td>
            <td style={{textAlign:'left'}}>
              (89.9%; 98.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (58/58)
            </td>
            <td style={{textAlign:'left'}}>
              (93.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              99.0% (96/97)
            </td>
            <td style={{textAlign:'left'}}>
              (94.4%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (58/58)
            </td>
            <td style={{textAlign:'left'}}>
              (93.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              94.8% (92/97)
            </td>
            <td style={{textAlign:'left'}}>
              (88.5%; 97.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              50.5%
            </td>
            <td style={{textAlign:'left'}}>
              (30.0%; 70.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.6%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3356-a002.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3356-a002.csv">Data File</a></p>

        <h4>MedMira Inc. REVEALCOVID-19 Total Antibody Test</h4>
        <p><strong>Manufacturer:</strong> MedMira Inc.</p>
        <p><strong>Device:</strong> REVEALCOVID-19 Total Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-11-17</p>
        <p><strong>Lot Number:</strong> RVE0004-2108</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (29.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              97.6%
            </td>
            <td style={{textAlign:'left'}}>
              (96.6%; 98.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3401-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3401-a001.csv">Data File</a></p>

        <h4>Megna Health Inc. Megna Rapid COVID-19 IgM/IgG Combo Test Kit</h4>
        <p><strong>Manufacturer:</strong> Megna Health Inc.</p>
        <p><strong>Device:</strong> Megna Rapid COVID-19 IgM/IgG Combo Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-06-24</p>
        <p><strong>Lot Number:</strong> NA</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              51.3%
            </td>
            <td style={{textAlign:'left'}}>
              (27.7%; 72.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3321-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3321-a001.csv">Data File</a></p>

        <h4>NanoEntek Inc FREND™ COVID-19 IgG/IgM Duo test</h4>
        <p><strong>Manufacturer:</strong> NanoEntek Inc</p>
        <p><strong>Device:</strong> FREND™ COVID-19 IgG/IgM Duo test</p>
        <p><strong>Date Performed:</strong> 2020-08-19</p>
        <p><strong>Lot Number:</strong> 730023</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              80.3%
            </td>
            <td style={{textAlign:'left'}}>
              (39.4%; 96.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.1%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3351-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3351-a001.csv">Data File</a></p>

        <h4>Nirmidas Biotech, Inc COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit</h4>
        <p><strong>Manufacturer:</strong> Nirmidas Biotech, Inc</p>
        <p><strong>Device:</strong> COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit</p>
        <p><strong>Date Performed:</strong> 2020-06-24</p>
        <p><strong>Lot Number:</strong> 15038</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (44.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.7%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3314-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3314-a001.csv">Data File</a></p>

        <h4>Nirmidas Biotech, Inc COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit</h4>
        <p><strong>Manufacturer:</strong> Nirmidas Biotech, Inc</p>
        <p><strong>Device:</strong> COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit</p>
        <p><strong>Date Performed:</strong> 2020-09-04</p>
        <p><strong>Lot Number:</strong> 15038</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.1%
            </td>
            <td style={{textAlign:'left'}}>
              (33.6%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3354-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3354-a001.csv">Data File</a></p>

        <h4>Nirmidas Biotech, Inc COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit (combined evaluations)</h4>
        <p><strong>Manufacturer:</strong> Nirmidas Biotech, Inc</p>
        <p><strong>Device:</strong> COVID-19 (SARS-CoV-2) IgM/IgG Antibody Detection Kit (combined evaluations)</p>
        <p><strong>Date Performed:</strong> 2020-06-24, 2020-09-04</p>
        <p><strong>Lot Number:</strong> 15038</p>
        <p><strong>Panel:</strong> Panel 2, Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.1% (54/58)
            </td>
            <td style={{textAlign:'left'}}>
              (83.6%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.9% (95/97)
            </td>
            <td style={{textAlign:'left'}}>
              (92.8%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              87.9% (51/58)
            </td>
            <td style={{textAlign:'left'}}>
              (77.1%; 94.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (97/97)
            </td>
            <td style={{textAlign:'left'}}>
              (96.2%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.6% (56/58)
            </td>
            <td style={{textAlign:'left'}}>
              (88.3%; 99.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.9% (95/97)
            </td>
            <td style={{textAlign:'left'}}>
              (92.8%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              71.1%
            </td>
            <td style={{textAlign:'left'}}>
              (39.2%; 90.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3354-a002.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3354-a002.csv">Data File</a></p>

        <h4>Nirmidas Biotech, Inc. MidaSpot COVID-19 Antibody Combo Detection Kit (NBPC-0007)</h4>
        <p><strong>Manufacturer:</strong> Nirmidas Biotech, Inc.</p>
        <p><strong>Device:</strong> MidaSpot COVID-19 Antibody Combo Detection Kit (NBPC-0007)</p>
        <p><strong>Date Performed:</strong> 2020-12-10</p>
        <p><strong>Lot Number:</strong> 15916</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              58.4%
            </td>
            <td style={{textAlign:'left'}}>
              (30.9%; 80.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3411-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3411-a001.csv">Data File</a></p>

        <h4>Ortho-Clinical Diagnostics, Inc. VITROS Immunodiagnostic Products Anti-SARS-CoV-2 IgG Reagent Pack</h4>
        <p><strong>Manufacturer:</strong> Ortho-Clinical Diagnostics, Inc.</p>
        <p><strong>Device:</strong> VITROS Immunodiagnostic Products Anti-SARS-CoV-2 IgG Reagent Pack</p>
        <p><strong>Date Performed:</strong> 2020-09-17</p>
        <p><strong>Lot Number:</strong> 0130</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (50.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3371-a001.pdf">Independent Evaluation
          Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3371-a001.csv">Data File</a></p>

        <h4>Roche Diagnostic Corporation Elecsys Anti-SARS-CoV-2</h4>
        <p><strong>Manufacturer:</strong> Roche Diagnostic Corporation</p>
        <p><strong>Device:</strong> Elecsys Anti-SARS-CoV-2</p>
        <p><strong>Date Performed:</strong> 2020-08-26</p>
        <p><strong>Lot Number:</strong> 50726001</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (48.9%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.1%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3358-a001.pdf">NIH's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3358-a001.csv">Data File</a></p>

        <h4>Salofa Oy Sienna COVID-19 IgG/IgM Rapid Test Cassette (whole blood/serum/plasma)</h4>
        <p><strong>Manufacturer:</strong> Salofa Oy</p>
        <p><strong>Device:</strong> Sienna COVID-19 IgG/IgM Rapid Test Cassette (whole blood/serum/plasma)</p>
        <p><strong>Date Performed:</strong> 2020-06-09</p>
        <p><strong>Lot Number:</strong> 20052003</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              79.7%
            </td>
            <td style={{textAlign:'left'}}>
              (38.0%; 95.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3293-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3293-a001.csv">Data File</a></p>

        <h4>Sugentech, Inc. SGTi-flex COVID-19 IgG</h4>
        <p><strong>Manufacturer:</strong> Sugentech, Inc.</p>
        <p><strong>Device:</strong> SGTi-flex COVID-19 IgG</p>
        <p><strong>Date Performed:</strong> 2020-08-19</p>
        <p><strong>Lot Number:</strong> COGT20104</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (48.9%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.1%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3348-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3348-a001.csv">Data File</a></p>

        <h4>TBG Biotechnology Corp SARS-CoV-2 IgG/IgM Rapid Test Kit</h4>
        <p><strong>Manufacturer:</strong> TBG Biotechnology Corp</p>
        <p><strong>Device:</strong> SARS-CoV-2 IgG/IgM Rapid Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-06-16</p>
        <p><strong>Lot Number:</strong> FRS20051K</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              49.6%
            </td>
            <td style={{textAlign:'left'}}>
              (25.4%; 72.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.7%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3307-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3307-a001.csv">Data File</a></p>

        <h4>United Biomedical, Inc. SARS-COV-2 ELISA</h4>
        <p><strong>Manufacturer:</strong> United Biomedical, Inc.</p>
        <p><strong>Device:</strong> SARS-COV-2 ELISA</p>
        <p><strong>Date Performed:</strong> 2020-06-17</p>
        <p><strong>Lot Number:</strong> 0153004</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (44.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.3%
            </td>
            <td style={{textAlign:'left'}}>
              (98.4%; 99.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3317-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3317-a001.csv">Data File</a></p>

        <h4>United Biomedical, Inc. SARS-COV-2 ELISA</h4>
        <p><strong>Manufacturer:</strong> United Biomedical, Inc.</p>
        <p><strong>Device:</strong> SARS-COV-2 ELISA</p>
        <p><strong>Date Performed:</strong> 2020-09-01</p>
        <p><strong>Lot Number:</strong> 0153004</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (46.1%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.5%
            </td>
            <td style={{textAlign:'left'}}>
              (98.6%; 99.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3359-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3359-a001.csv">Data File</a></p>

        <h4>United Biomedical, Inc. SARS-COV-2 ELISA (combined evaluations)</h4>
        <p><strong>Manufacturer:</strong> United Biomedical, Inc.</p>
        <p><strong>Device:</strong> SARS-COV-2 ELISA (combined evaluations)</p>
        <p><strong>Date Performed:</strong> 2020-06-17, 2020-09-01</p>
        <p><strong>Lot Number:</strong> 0153004</p>
        <p><strong>Panel:</strong> Panel 2, Panel 3</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              89.7% (52/58)
            </td>
            <td style={{textAlign:'left'}}>
              (79.2%; 95.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (97/97)
            </td>
            <td style={{textAlign:'left'}}>
              (96.2%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (52.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.5%
            </td>
            <td style={{textAlign:'left'}}>
              (98.9%; 99.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3359-a002.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3359-a002.csv">Data File</a></p>

        <h4>Xiamen Biotime Biotechnology Co., Ltd. Biotime SARS-CoV-2 IgG/IgM Rapid Qualitative Test</h4>
        <p><strong>Manufacturer:</strong> Xiamen Biotime Biotechnology Co., Ltd.</p>
        <p><strong>Device:</strong> Biotime SARS-CoV-2 IgG/IgM Rapid Qualitative Test</p>
        <p><strong>Date Performed:</strong> 2020-05-29</p>
        <p><strong>Lot Number:</strong> X2003602</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              58.4%
            </td>
            <td style={{textAlign:'left'}}>
              (30.9%; 80.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3262-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3262-a001.csv">Data File</a></p>

        <h4>Zeus Scientific, Inc. SARS-CoV-2 IgG Test System</h4>
        <p><strong>Manufacturer:</strong> Zeus Scientific, Inc.</p>
        <p><strong>Device:</strong> SARS-CoV-2 IgG Test System</p>
        <p><strong>Date Performed:</strong> 2020-07-02</p>
        <p><strong>Lot Number:</strong> 20060295</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> EUA Authorized</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (44.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.7%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3327-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3327-a001.csv">Data File</a></p>

        <h3>Should not be Used</h3>
        <h4>Abacus Pharma International SARS-CoV-2 IgM/IgG AB Antibody Rapid Test (Immunochromatography)</h4>
        <p><strong>Manufacturer:</strong> Abacus Pharma International</p>
        <p><strong>Device:</strong> SARS-CoV-2 IgM/IgG AB Antibody Rapid Test (Immunochromatography)</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> COV1252003C</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              76.3%
            </td>
            <td style={{textAlign:'left'}}>
              (31.6%; 95.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.7%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3257-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3257-a001.csv">Data File</a></p>

        <h4>Abbexa COVID-19 IgG/IgM Rapid Test Kit</h4>
        <p><strong>Manufacturer:</strong> Abbexa</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Rapid Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-06-04</p>
        <p><strong>Lot Number:</strong> L20Z4852X</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              92.5% (74/80)
            </td>
            <td style={{textAlign:'left'}}>
              (84.6%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              40.4%
            </td>
            <td style={{textAlign:'left'}}>
              (22.2%; 60.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3284-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3284-a001.csv">Data File</a></p>

        <h4>Abbott Rapid Diagnostics Jena GmbH COVID-19 IgG Rapid Test Device</h4>
        <p><strong>Manufacturer:</strong> Abbott Rapid Diagnostics Jena GmbH</p>
        <p><strong>Device:</strong> COVID-19 IgG Rapid Test Device</p>
        <p><strong>Date Performed:</strong> 2020-07-20</p>
        <p><strong>Lot Number:</strong> COV0062057</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (43.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.1%
            </td>
            <td style={{textAlign:'left'}}>
              (98.2%; 99.6%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3329-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3329-a001.csv">Data File</a></p>

        <h4>Accel Diagnostics, LLC Rapid C2T Total Antibodies (IgG/IgM) Card</h4>
        <p><strong>Manufacturer:</strong> Accel Diagnostics, LLC</p>
        <p><strong>Device:</strong> Rapid C2T Total Antibodies (IgG/IgM) Card</p>
        <p><strong>Date Performed:</strong> 2020-09-25 through 2020-09-28</p>
        <p><strong>Lot Number:</strong> 07.20.005</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              70.0% (21/30)
            </td>
            <td style={{textAlign:'left'}}>
              (52.1%; 83.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              60.0% (48/80)
            </td>
            <td style={{textAlign:'left'}}>
              (49.0%; 70.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              8.4%
            </td>
            <td style={{textAlign:'left'}}>
              (5.1%; 12.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgG)
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              97.4%
            </td>
            <td style={{textAlign:'left'}}>
              (95.1%; 98.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3375-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3375-a001.csv">Data File</a></p>

        <h4>Accudiagnostics Covid-19 IgM/IgG Test Kit</h4>
        <p><strong>Manufacturer:</strong> Accudiagnostics</p>
        <p><strong>Device:</strong> Covid-19 IgM/IgG Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-04-27</p>
        <p><strong>Lot Number:</strong> NA</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –- No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              87.5% (70/80)
            </td>
            <td style={{textAlign:'left'}}>
              (78.5%; 93.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              92.5% (74/80)
            </td>
            <td style={{textAlign:'left'}}>
              (84.6%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              82.5% (66/80)
            </td>
            <td style={{textAlign:'left'}}>
              (72.7%; 89.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              23.1%
            </td>
            <td style={{textAlign:'left'}}>
              (14.6%; 32.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.2%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3254-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3254-a001.csv">Data File</a></p>

        <h4>Alfa Scientific Designs Inc. Covid-19 IgG/IgM Antibody Test</h4>
        <p><strong>Manufacturer:</strong> Alfa Scientific Designs Inc.</p>
        <p><strong>Device:</strong> Covid-19 IgG/IgM Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-04-30</p>
        <p><strong>Lot Number:</strong> PD200420A</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              80.0% (24/30)
            </td>
            <td style={{textAlign:'left'}}>
              (62.7%; 90.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              45.7%
            </td>
            <td style={{textAlign:'left'}}>
              (25.3%; 66.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3255-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3255-a001.csv">Data File</a></p>

        <h4>Arbor Vita Corporation CoVisa™ IgG Test</h4>
        <p><strong>Manufacturer:</strong> Arbor Vita Corporation</p>
        <p><strong>Device:</strong> CoVisa™ IgG Test</p>
        <p><strong>Date Performed:</strong> 2020-06-17</p>
        <p><strong>Lot Number:</strong> RD20060803</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (40.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.8%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3312-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3312-a001.csv">Data File</a></p>

        <h4>Artron Laboratories, Inc. OTO-Artron COVID-19 IgG/IgM Antibody Test</h4>
        <p><strong>Manufacturer:</strong> Artron Laboratories, Inc.</p>
        <p><strong>Device:</strong> OTO-Artron COVID-19 IgG/IgM Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-10-21</p>
        <p><strong>Lot Number:</strong> 200606</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (47.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.7%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3390-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3390-a001.csv">Data File</a></p>

        <h4>Artron Laboratories, Inc. OTO-Artron COVID-19 IgG/IgM Antibody Test</h4>
        <p><strong>Manufacturer:</strong> Artron Laboratories, Inc.</p>
        <p><strong>Device:</strong> OTO-Artron COVID-19 IgG/IgM Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-10-21</p>
        <p><strong>Lot Number:</strong> 200606</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (47.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.7%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3390-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3390-a001.csv">Data File</a></p>

        <h4>Atlas-Link (Beijing) Nova COVID-19 IgG/IgM Antibody Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Atlas-Link (Beijing)</p>
        <p><strong>Device:</strong> Nova COVID-19 IgG/IgM Antibody Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-04-27</p>
        <p><strong>Lot Number:</strong> 20200305</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              32.1%
            </td>
            <td style={{textAlign:'left'}}>
              (17.5%; 49.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.4%
            </td>
            <td style={{textAlign:'left'}}>
              (98.4%; 99.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3272-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3272-a001.csv">Data File</a></p>

        <h4>Aurora Biomed Inc COVID-19 IgG/IgM Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Aurora Biomed Inc</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> COVID20200424</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (40.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.8%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3258-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3258-a001.csv">Data File</a></p>

        <h4>AutoBio Diagnostics Co., LTD Anti-SARS-CoV-2 Rapid Test</h4>
        <p><strong>Manufacturer:</strong> AutoBio Diagnostics Co., LTD</p>
        <p><strong>Device:</strong> Anti-SARS-CoV-2 Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-06-24</p>
        <p><strong>Lot Number:</strong> 20E22-J01</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Removed – EUA Revoked</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              50.0% (15/30)
            </td>
            <td style={{textAlign:'left'}}>
              (33.2%; 66.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              79.7%
            </td>
            <td style={{textAlign:'left'}}>
              (38.0%; 95.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3306-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3306-a001.csv">Data File</a></p>

        <h4>Beijing Kewei Clinical Diagnostic Reagent Inc. Genonto Rapid Test10 COVID-19 IgG/IgM Rapid Test Kit</h4>
        <p><strong>Manufacturer:</strong> Beijing Kewei Clinical Diagnostic Reagent Inc.</p>
        <p><strong>Device:</strong> Genonto Rapid Test10 COVID-19 IgG/IgM Rapid Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-08-06</p>
        <p><strong>Lot Number:</strong> 202004004</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              36.0%
            </td>
            <td style={{textAlign:'left'}}>
              (19.6%; 54.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.7%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3338-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3338-a001.csv">Data File</a></p>

        <h4>Biolidics Ltd 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold)</h4>
        <p><strong>Manufacturer:</strong> Biolidics Ltd</p>
        <p><strong>Device:</strong> 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold)</p>
        <p><strong>Date Performed:</strong> 2020-05-28</p>
        <p><strong>Lot Number:</strong> V5020041352A</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              33.3% (10/30)
            </td>
            <td style={{textAlign:'left'}}>
              (19.2%; 51.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (77/79)
            </td>
            <td style={{textAlign:'left'}}>
              (91.2%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (76/79)
            </td>
            <td style={{textAlign:'left'}}>
              (89.4%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (76/79)
            </td>
            <td style={{textAlign:'left'}}>
              (89.4%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              57.3%
            </td>
            <td style={{textAlign:'left'}}>
              (29.3%; 80.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3261-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3261-a001.csv">Data File</a></p>

        <h4>Biomedomics COVID-19 IgM-IgG Rapid Test kit</h4>
        <p><strong>Manufacturer:</strong> Biomedomics</p>
        <p><strong>Device:</strong> COVID-19 IgM-IgG Rapid Test kit</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 51-200404</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>
                Antibody
              </th>
              <th style={{textAlign:'left'}}>
                Performance Measure
              </th>
              <th style={{textAlign:'left'}}>
                Estimate of Performance
              </th>
              <th style={{textAlign:'left'}}>
                95% Confidence Interval
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign:'left'}}>
                IgM
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                86.7% (26/30)
              </td>
              <td style={{textAlign:'left'}}>
                (70.3%; 94.7%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgM
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                97.1% (68/70)
              </td>
              <td style={{textAlign:'left'}}>
                (90.2%; 99.2%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                73.3% (22/30)
              </td>
              <td style={{textAlign:'left'}}>
                (55.6%; 85.8%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                100% (70/70)
              </td>
              <td style={{textAlign:'left'}}>
                (94.8%; 100%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                96.7% (29/30)
              </td>
              <td style={{textAlign:'left'}}>
                (83.3%; 99.4%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                97.1% (68/70)
              </td>
              <td style={{textAlign:'left'}}>
                (90.2%; 99.2%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                PPV at prevalence = 5%
              </td>
              <td style={{textAlign:'left'}}>
                64.0%
              </td>
              <td style={{textAlign:'left'}}>
                (30.8%; 86.9%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                NPV at prevalence = 5%
              </td>
              <td style={{textAlign:'left'}}>
                99.8%
              </td>
              <td style={{textAlign:'left'}}>
                (99.0%; 100%)
              </td>
            </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3248-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3248-a001.csv">Data File</a></p>

        <h4>BioMedomics, Inc. BioMedomics COVID-19 IgM-IgG Rapid Test</h4>
        <p><strong>Manufacturer:</strong> BioMedomics, Inc.</p>
        <p><strong>Device:</strong> BioMedomics COVID-19 IgM-IgG Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-06-02</p>
        <p><strong>Lot Number:</strong> 51-200511</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              92.5% (74/80)
            </td>
            <td style={{textAlign:'left'}}>
              (84.6%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              41.2%
            </td>
            <td style={{textAlign:'left'}}>
              (23.2%; 60.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3328-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3328-a001.csv">Data File</a></p>

        <h4>Boditech Med Incorporated iChroma COVID-19 Ab</h4>
        <p><strong>Manufacturer:</strong> Boditech Med Incorporated</p>
        <p><strong>Device:</strong> iChroma COVID-19 Ab</p>
        <p><strong>Date Performed:</strong> 2020-08-21</p>
        <p><strong>Lot Number:</strong> WHQEA88</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              13.3% (4/30)
            </td>
            <td style={{textAlign:'left'}}>
              (5.3%; 29.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              50.4%
            </td>
            <td style={{textAlign:'left'}}>
              (26.5%; 72.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3349-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3349-a001.csv">Data File</a></p>

        <h4>BTNX Inc COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)</h4>
        <p><strong>Manufacturer:</strong> BTNX Inc</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)</p>
        <p><strong>Date Performed:</strong> 2020-06-12</p>
        <p><strong>Lot Number:</strong> I2004027</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.8%
            </td>
            <td style={{textAlign:'left'}}>
              (35.0%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3303-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3303-a001.csv">Data File</a></p>

        <h4>BTNX Inc COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma) (combined evaluations)</h4>
        <p><strong>Manufacturer:</strong> BTNX Inc</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma) (combined evaluations)
        </p>
        <p><strong>Date Performed:</strong> 2020-05-08, 2020-06-12</p>
        <p><strong>Lot Number:</strong> I2004027</p>
        <p><strong>Panel:</strong> Panel 1, Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              98.0% (49/50)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 99.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              99.1% (116/117)
            </td>
            <td style={{textAlign:'left'}}>
              (95.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              92.0% (46/50)
            </td>
            <td style={{textAlign:'left'}}>
              (81.2%; 96.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (117/117)
            </td>
            <td style={{textAlign:'left'}}>
              (96.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (50/50)
            </td>
            <td style={{textAlign:'left'}}>
              (92.9%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              99.1% (116/117)
            </td>
            <td style={{textAlign:'left'}}>
              (95.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              86.0%
            </td>
            <td style={{textAlign:'left'}}>
              (51.1%; 97.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.6%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3303-a002.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3303-a002.csv">Data File</a></p>

        <h4>BTNX, Inc. COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)</h4>
        <p><strong>Manufacturer:</strong> BTNX, Inc.</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Test Cassettes (Whole Blood/Serum/Plasma)</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> I2004027</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (47.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3263-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3263-a001.csv">Data File</a></p>

        <h4>Changzhou Confucius Biotechnology Co Ltd COVID-19 IgG/IgM Rapid Test Cassette (WB/S/P)</h4>
        <p><strong>Manufacturer:</strong> Changzhou Confucius Biotechnology Co Ltd</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Rapid Test Cassette (WB/S/P)</p>
        <p><strong>Date Performed:</strong> 2020-08-10</p>
        <p><strong>Lot Number:</strong> 20200313</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              13.3% (4/30)
            </td>
            <td style={{textAlign:'left'}}>
              (5.3%; 29.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              92.5% (74/80)
            </td>
            <td style={{textAlign:'left'}}>
              (84.6%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              40.4%
            </td>
            <td style={{textAlign:'left'}}>
              (22.2%; 60.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3341-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3341-a001.csv">Data File</a></p>

        <h4>ChemBio DPP COVID-19 IgM/IgG System</h4>
        <p><strong>Manufacturer:</strong> ChemBio</p>
        <p><strong>Device:</strong> DPP COVID-19 IgM/IgG System</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 204IG001Z</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed – EUA Revoked</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              57.1% (16/28)
            </td>
            <td style={{textAlign:'left'}}>
              (39.1%; 73.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              86.2% (69/80)
            </td>
            <td style={{textAlign:'left'}}>
              (77.0%; 92.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              78.6% (22/28)
            </td>
            <td style={{textAlign:'left'}}>
              (60.5%; 89.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              82.1% (23/28)
            </td>
            <td style={{textAlign:'left'}}>
              (64.4%; 92.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              81.2% (65/80)
            </td>
            <td style={{textAlign:'left'}}>
              (71.3%; 88.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              18.7%
            </td>
            <td style={{textAlign:'left'}}>
              (10.6%; 29.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.9%
            </td>
            <td style={{textAlign:'left'}}>
              (97.4%; 99.5%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3265-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3265-a001.csv">Data File</a></p>

        <h4>Chemtron Biotech, Inc. Rapid COVID-19 IgM/IgG Antibody Screen Test</h4>
        <p><strong>Manufacturer:</strong> Chemtron Biotech, Inc.</p>
        <p><strong>Device:</strong> Rapid COVID-19 IgM/IgG Antibody Screen Test</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> DA05507401</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              20.0% (6/30)
            </td>
            <td style={{textAlign:'left'}}>
              (9.5%; 37.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              63.3% (19/30)
            </td>
            <td style={{textAlign:'left'}}>
              (45.5%; 78.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              73.7%
            </td>
            <td style={{textAlign:'left'}}>
              (27.6%; 95.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.3%
            </td>
            <td style={{textAlign:'left'}}>
              (97.2%; 99.0%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3266-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3266-a001.csv">Data File</a></p>

        <h4>CTK Biotech, Inc. OnSite COVID-19 IgG/IgM Rapid Test</h4>
        <p><strong>Manufacturer:</strong> CTK Biotech, Inc.</p>
        <p><strong>Device:</strong> OnSite COVID-19 IgG/IgM Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-07-21</p>
        <p><strong>Lot Number:</strong> F0507R1C00</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              80.8%
            </td>
            <td style={{textAlign:'left'}}>
              (40.9%; 96.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3355-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3355-a001.csv">Data File</a></p>

        <h4>Doctorspot Technologies Inc, COVID-19 SARS-CoV-2 IgM/IgG Antibody Rapid Test Kit (Colloidal Gold)</h4>
        <p><strong>Manufacturer:</strong> Doctorspot Technologies Inc.</p>
        <p><strong>Device:</strong> COVID-19 SARS-CoV-2 IgM/IgG Antibody Rapid Test Kit (Colloidal Gold)</p>
        <p><strong>Date Performed:</strong> 2020-10-02</p>
        <p><strong>Lot Number:</strong> S060012010</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              16.7% (5/30)
            </td>
            <td style={{textAlign:'left'}}>
              (7.3%; 33.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              26.7% (8/30)
            </td>
            <td style={{textAlign:'left'}}>
              (14.2%; 44.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              33.3% (10/30)
            </td>
            <td style={{textAlign:'left'}}>
              (19.2%; 51.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (18.1%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              96.6%
            </td>
            <td style={{textAlign:'left'}}>
              (95.7%; 97.5%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3383-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3383-a001.csv">Data File</a></p>

        <h4>EUROIMMUN Medizinische Labordiagnostika AG Anti-SARS-CoV-2-NCP ELISA (IgM)</h4>
        <p><strong>Manufacturer:</strong> EUROIMMUN Medizinische Labordiagnostika AG</p>
        <p><strong>Device:</strong> Anti-SARS-CoV-2-NCP ELISA (IgM)</p>
        <p><strong>Date Performed:</strong> 2020-09-18</p>
        <p><strong>Lot Number:</strong> E200703AO</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              30.0% (9/30)
            </td>
            <td style={{textAlign:'left'}}>
              (16.7%; 47.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (14.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              96.4%
            </td>
            <td style={{textAlign:'left'}}>
              (95.6%; 97.3%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3377-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3377-a001.csv">Data File</a></p>

        <h4>Euroimmun SARS-COV-2 ELISA (IgA)</h4>
        <p><strong>Manufacturer:</strong> Euroimmun</p>
        <p><strong>Device:</strong> SARS-COV-2 ELISA (IgA)</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> E200330AS</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgA
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgA
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgA
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              36.0%
            </td>
            <td style={{textAlign:'left'}}>
              (19.6%; 54.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgA
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.7%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3268-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3268-a001.csv">Data File</a></p>

        <h4>GenBody Inc. GenBody COVID-19 IgM/IgG</h4>
        <p><strong>Manufacturer:</strong> GenBody Inc.</p>
        <p><strong>Device:</strong> GenBody COVID-19 IgM/IgG</p>
        <p><strong>Date Performed:</strong> 2020-06-11</p>
        <p><strong>Lot Number:</strong> FJFB30201</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              40.0% (12/30)
            </td>
            <td style={{textAlign:'left'}}>
              (24.6%; 57.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              56.7% (17/30)
            </td>
            <td style={{textAlign:'left'}}>
              (39.2%; 72.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              60.0% (18/30)
            </td>
            <td style={{textAlign:'left'}}>
              (42.3%; 75.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              71.6%
            </td>
            <td style={{textAlign:'left'}}>
              (24.8%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              97.9%
            </td>
            <td style={{textAlign:'left'}}>
              (96.8%; 98.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3300-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3300-a001.csv">Data File</a></p>

        <h4>Genobio Pharmaceutical Co. Ltd Virusee® COVID-19 IgM/IgG Lateral Flow Assay</h4>
        <p><strong>Manufacturer:</strong> Genobio Pharmaceutical Co. Ltd</p>
        <p><strong>Device:</strong> Virusee® COVID-19 IgM/IgG Lateral Flow Assay</p>
        <p><strong>Date Performed:</strong> 2020-07-09</p>
        <p><strong>Lot Number:</strong> VMG200331</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              56.7% (17/30)
            </td>
            <td style={{textAlign:'left'}}>
              (39.2%; 72.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              76.2% (61/80)
            </td>
            <td style={{textAlign:'left'}}>
              (65.9%; 84.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              63.3% (19/30)
            </td>
            <td style={{textAlign:'left'}}>
              (45.5%; 78.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              80.0% (24/30)
            </td>
            <td style={{textAlign:'left'}}>
              (62.7%; 90.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              76.2% (61/80)
            </td>
            <td style={{textAlign:'left'}}>
              (65.9%; 84.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              15.1%
            </td>
            <td style={{textAlign:'left'}}>
              (8.8%; 23.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.6%
            </td>
            <td style={{textAlign:'left'}}>
              (97.1%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3323-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3323-a001.csv">Data File</a></p>

        <h4>GP Getein Biotech, Inc. One Step Test for Novel Coronavirus (2019-nCoV) IgM/IgG antibody (Colloidal Gold)</h4>
        <p><strong>Manufacturer:</strong> GP Getein Biotech, Inc.</p>
        <p><strong>Device:</strong> One Step Test for Novel Coronavirus (2019-nCoV) IgM/IgG antibody (Colloidal Gold)</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> PGGM20015W</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              56.7% (17/30)
            </td>
            <td style={{textAlign:'left'}}>
              (39.2%; 72.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              76.3%
            </td>
            <td style={{textAlign:'left'}}>
              (31.6%; 95.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.7%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3270-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3270-a001.csv">Data File</a></p>

        <h4>Guangzhou Fenghua Bioengineering Co., Ltd. SARS-COV-2 IgM/IgG Combo Rapid Test Kit</h4>
        <p><strong>Manufacturer:</strong> Guangzhou Fenghua Bioengineering Co., Ltd.</p>
        <p><strong>Device:</strong> SARS-COV-2 IgM/IgG Combo Rapid Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-06-04</p>
        <p><strong>Lot Number:</strong> 20200508</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              70.0% (21/30)
            </td>
            <td style={{textAlign:'left'}}>
              (52.1%; 83.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              65.0% (52/80)
            </td>
            <td style={{textAlign:'left'}}>
              (54.1%; 74.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              70.0% (21/30)
            </td>
            <td style={{textAlign:'left'}}>
              (52.1%; 83.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              80.0% (24/30)
            </td>
            <td style={{textAlign:'left'}}>
              (62.7%; 90.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              62.5% (50/80)
            </td>
            <td style={{textAlign:'left'}}>
              (51.5%; 72.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              10.1%
            </td>
            <td style={{textAlign:'left'}}>
              (6.4%; 14.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.3%
            </td>
            <td style={{textAlign:'left'}}>
              (96.3%; 99.3%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3281-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3281-a001.csv">Data File</a></p>

        <h4>H-Guard (China) Co., Ltd. Novel Coronavirus COVID-19 IgM/IgG Test Kit (colloidal gold)</h4>
        <p><strong>Manufacturer:</strong> H-Guard (China) Co., Ltd.</p>
        <p><strong>Device:</strong> Novel Coronavirus COVID-19 IgM/IgG Test Kit (colloidal gold)</p>
        <p><strong>Date Performed:</strong> 2020-06-09</p>
        <p><strong>Lot Number:</strong> 20200406</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              44.9%
            </td>
            <td style={{textAlign:'left'}}>
              (24.1%; 66.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3292-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3292-a001.csv">Data File</a></p>

        <h4>Hangzhou AllTest Biotech Co. Ltd 2019-nCoV IgG/IgM Rapid Test Cassette(Whole Blood/Serum/Plasma)</h4>
        <p><strong>Manufacturer:</strong> Hangzhou AllTest Biotech Co. Ltd</p>
        <p><strong>Device:</strong> 2019-nCoV IgG/IgM Rapid Test Cassette(Whole Blood/Serum/Plasma)</p>
        <p><strong>Date Performed:</strong> 2020-07-09</p>
        <p><strong>Lot Number:</strong> NCP20050100U</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              58.4%
            </td>
            <td style={{textAlign:'left'}}>
              (30.9%; 80.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3322-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3322-a001.csv">Data File</a></p>

        <h4>Hangzhou Realy Tech Co., LTD COVID-19 IgG/IgM Rapid Device Test</h4>
        <p><strong>Manufacturer:</strong> Hangzhou Realy Tech Co., LTD</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Rapid Device Test</p>
        <p><strong>Date Performed:</strong> 2020-06-12</p>
        <p><strong>Lot Number:</strong> N01G17T</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              94.9% (75/79)
            </td>
            <td style={{textAlign:'left'}}>
              (87.7%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (77/79)
            </td>
            <td style={{textAlign:'left'}}>
              (91.2%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.7% (74/79)
            </td>
            <td style={{textAlign:'left'}}>
              (86.0%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              44.6%
            </td>
            <td style={{textAlign:'left'}}>
              (23.9%; 65.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3325-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3325-a001.csv">Data File</a></p>

        <h4>InBios International, Inc. InBios SCoV-2 Detect IgM/IgG Rapid Test</h4>
        <p><strong>Manufacturer:</strong> InBios International, Inc.</p>
        <p><strong>Device:</strong> InBios SCoV-2 Detect IgM/IgG Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-10-09 through 2020-10-29</p>
        <p><strong>Lot Number:</strong> ZH5314</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (50.5%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.4%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3393-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3393-a001.csv">Data File</a></p>

        <h4>Invenio Medical Inc. COVID-19 IgG/IgM Ab Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Invenio Medical Inc.</p>
        <p><strong>Device:</strong> COVID-19 IgG/IgM Ab Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-05-06</p>
        <p><strong>Lot Number:</strong> COVID20200424</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed -- Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              80.0% (24/30)
            </td>
            <td style={{textAlign:'left'}}>
              (62.7%; 90.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              80.0% (24/30)
            </td>
            <td style={{textAlign:'left'}}>
              (62.7%; 90.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (41.9%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.0%
            </td>
            <td style={{textAlign:'left'}}>
              (98.0%; 99.5%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3259-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3259-a001.csv">Data File</a></p>

        <h4>Jiangsu Dablood Pharmaceutical Co. Ltd COVID-19 IgM/IgG One Step Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Jiangsu Dablood Pharmaceutical Co. Ltd</p>
        <p><strong>Device:</strong> COVID-19 IgM/IgG One Step Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-06-04</p>
        <p><strong>Lot Number:</strong> NA</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              82.5% (66/80)
            </td>
            <td style={{textAlign:'left'}}>
              (72.7%; 89.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              81.2% (65/80)
            </td>
            <td style={{textAlign:'left'}}>
              (71.3%; 88.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              21.9%
            </td>
            <td style={{textAlign:'left'}}>
              (14.0%; 31.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.2%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3297-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3297-a001.csv">Data File</a></p>

        <h4>Jiangsu Superbio Biomedical (Nanjing) Co Ltd SARS-CoV-2 (COVID-19) IgM/IgG Antibody Fast Detection Kit
          (Colloidal Gold)</h4>
        <p><strong>Manufacturer:</strong> Jiangsu Superbio Biomedical (Nanjing) Co Ltd</p>
        <p><strong>Device:</strong> SARS-CoV-2 (COVID-19) IgM/IgG Antibody Fast Detection Kit (Colloidal Gold)</p>
        <p><strong>Date Performed:</strong> 2020-06-23</p>
        <p><strong>Lot Number:</strong> SYG202027</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              40.0% (12/30)
            </td>
            <td style={{textAlign:'left'}}>
              (24.6%; 57.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              85.0% (68/80)
            </td>
            <td style={{textAlign:'left'}}>
              (75.6%; 91.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              83.8% (67/80)
            </td>
            <td style={{textAlign:'left'}}>
              (74.2%; 90.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              24.5%
            </td>
            <td style={{textAlign:'left'}}>
              (15.3%; 35.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.2%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3318-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3318-a001.csv">Data File</a></p>

        <h4>LumiQuick Diagnostics Quick Profile 2019-nCoV IgG/IgM Test Card</h4>
        <p><strong>Manufacturer:</strong> LumiQuick Diagnostics</p>
        <p><strong>Device:</strong> Quick Profile 2019-nCoV IgG/IgM Test Card</p>
        <p><strong>Date Performed:</strong> 2020-06-03</p>
        <p><strong>Lot Number:</strong> 20042919</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              33.7%
            </td>
            <td style={{textAlign:'left'}}>
              (19.2%; 50.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (98.9%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3320-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3320-a001.csv">Data File</a></p>

        <h4>MEDsan GmbH MEDsan biological health solutions, MEDsan COVID-19 IgM/IgG Rapid Test</h4>
        <p><strong>Manufacturer:</strong> MEDsan GmbH</p>
        <p><strong>Device:</strong> MEDsan biological health solutions, MEDsan COVID-19 IgM/IgG Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-06-01</p>
        <p><strong>Lot Number:</strong> NA</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              92.5% (74/80)
            </td>
            <td style={{textAlign:'left'}}>
              (84.6%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              38.7%
            </td>
            <td style={{textAlign:'left'}}>
              (20.3%; 59.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.4%
            </td>
            <td style={{textAlign:'left'}}>
              (98.4%; 99.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3283-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3283-a001.csv">Data File</a></p>

        <h4>MOKOBIO Biotechnology R&amp;D Center, INC. SARS-CoV-2 IgM &amp; IgG Quantum Dot Immunoassay</h4>
        <p><strong>Manufacturer:</strong> MOKOBIO Biotechnology R&amp;D Center, INC.</p>
        <p><strong>Device:</strong> SARS-CoV-2 IgM &amp; IgG Quantum Dot Immunoassay</p>
        <p><strong>Date Performed:</strong> 2020-08-03 through 2020-08-07</p>
        <p><strong>Lot Number:</strong> 20200324</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              73.8% (59/80)
            </td>
            <td style={{textAlign:'left'}}>
              (63.2%; 82.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              72.5% (58/80)
            </td>
            <td style={{textAlign:'left'}}>
              (61.9%; 81.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              16.1%
            </td>
            <td style={{textAlign:'left'}}>
              (10.9%; 21.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3339-a001.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3339-a001.csv">Data File</a></p>

        <h4>MP Biomedicals Asia Pacific Pte. Ltd. MP Diagnostics Assure SARS-CoV-2 IgG/IgM Rapid Test</h4>
        <p><strong>Manufacturer:</strong> MP Biomedicals Asia Pacific Pte. Ltd.</p>
        <p><strong>Device:</strong> MP Diagnostics Assure SARS-CoV-2 IgG/IgM Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-10-29</p>
        <p><strong>Lot Number:</strong> DC0005</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              88.7% (71/80)
            </td>
            <td style={{textAlign:'left'}}>
              (80.0%; 94.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              31.1%
            </td>
            <td style={{textAlign:'left'}}>
              (18.0%; 46.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (98.9%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3398-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3398-a001.csv">Data File</a></p>

        <h4>Nanjing Vazyme Medical Technology Co. LTD Vazyme 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold-Based)</h4>
        <p><strong>Manufacturer:</strong> Nanjing Vazyme Medical Technology Co. LTD</p>
        <p><strong>Device:</strong> Vazyme 2019-nCoV IgG/IgM Detection Kit (Colloidal Gold-Based)</p>
        <p><strong>Date Performed:</strong> 2020-05-29</p>
        <p><strong>Lot Number:</strong> 5020042252B</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              77.5% (62/80)
            </td>
            <td style={{textAlign:'left'}}>
              (67.2%; 85.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              68.8% (55/80)
            </td>
            <td style={{textAlign:'left'}}>
              (57.9%; 77.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              14.0%
            </td>
            <td style={{textAlign:'left'}}>
              (9.4%; 19.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.7%
            </td>
            <td style={{textAlign:'left'}}>
              (98.5%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3278-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3278-a001.csv">Data File</a></p>

        <h4>PCL, Inc. PCL COVID19 IgG/IgM Rapid Gold</h4>
        <p><strong>Manufacturer:</strong> PCL, Inc.</p>
        <p><strong>Device:</strong> PCL COVID19 IgG/IgM Rapid Gold</p>
        <p><strong>Date Performed:</strong> 2020-06-04</p>
        <p><strong>Lot Number:</strong> COV03-200325</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              80.0% (24/30)
            </td>
            <td style={{textAlign:'left'}}>
              (62.7%; 90.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (45.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.1%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3286-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3286-a001.csv">Data File</a></p>

        <h4>Phamatech COVID19 RAPID TEST</h4>
        <p><strong>Manufacturer:</strong> Phamatech</p>
        <p><strong>Device:</strong> COVID19 RAPID TEST</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> NCP20030239</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>
                Antibody
              </th>
              <th style={{textAlign:'left'}}>
                Performance Measure
              </th>
              <th style={{textAlign:'left'}}>
                Estimate of Performance
              </th>
              <th style={{textAlign:'left'}}>
                95% Confidence Interval
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign:'left'}}>
                IgM
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                26.7% (8/30)
              </td>
              <td style={{textAlign:'left'}}>
                (14.2%; 44.4%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgM
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                97.5% (78/80)
              </td>
              <td style={{textAlign:'left'}}>
                (91.3%; 99.3%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                86.7% (26/30)
              </td>
              <td style={{textAlign:'left'}}>
                (70.3%; 94.7%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                IgG
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                96.2% (77/80)
              </td>
              <td style={{textAlign:'left'}}>
                (89.5%; 98.7%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                Sensitivity
              </td>
              <td style={{textAlign:'left'}}>
                86.7% (26/30)
              </td>
              <td style={{textAlign:'left'}}>
                (70.3%; 94.7%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                Specificity
              </td>
              <td style={{textAlign:'left'}}>
                93.8% (75/80)
              </td>
              <td style={{textAlign:'left'}}>
                (86.2%; 97.3%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                PPV at prevalence = 5%
              </td>
              <td style={{textAlign:'left'}}>
                42.2%
              </td>
              <td style={{textAlign:'left'}}>
                (21.1%; 64.9%)
              </td>
            </tr>
            <tr>
              <td style={{textAlign:'left'}}>
                Combined
              </td>
              <td style={{textAlign:'left'}}>
                NPV at prevalence = 5%
              </td>
              <td style={{textAlign:'left'}}>
                99.3%
              </td>
              <td style={{textAlign:'left'}}>
                (98.2%; 99.7%)
              </td>
            </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3249-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3249-a001.csv">Data File</a></p>

        <h4>Plexense, Inc. ACCEL ELISA COVID-19</h4>
        <p><strong>Manufacturer:</strong> Plexense, Inc.</p>
        <p><strong>Device:</strong> ACCEL ELISA COVID-19</p>
        <p><strong>Date Performed:</strong> 2020-10-09</p>
        <p><strong>Lot Number:</strong> PXCOV061820</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (39.0%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Pan Ig
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.6%
            </td>
            <td style={{textAlign:'left'}}>
              (97.6%; 99.3%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3387-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3387-a001.csv">Data File</a></p>

        <h4>Polymedco, Inc. Polystat SARS-CoV-2 Antibody Test</h4>
        <p><strong>Manufacturer:</strong> Polymedco, Inc.</p>
        <p><strong>Device:</strong> Polystat SARS-CoV-2 Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-08-06</p>
        <p><strong>Lot Number:</strong> 20200303</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              60.0% (18/30)
            </td>
            <td style={{textAlign:'left'}}>
              (42.3%; 75.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgA)
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              50.0% (15/30)
            </td>
            <td style={{textAlign:'left'}}>
              (33.2%; 66.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              (IgM / IgA)
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              91.2% (73/80)
            </td>
            <td style={{textAlign:'left'}}>
              (83.0%; 95.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              31.6%
            </td>
            <td style={{textAlign:'left'}}>
              (15.5%; 51.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.7%
            </td>
            <td style={{textAlign:'left'}}>
              (97.5%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3350-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3350-a001.csv">Data File</a></p>

        <h4>Predictive Laboratories, Inc. Assurance AB COVID-19 IgM/IgG Rapid Antibody Test</h4>
        <p><strong>Manufacturer:</strong> Predictive Laboratories, Inc.</p>
        <p><strong>Device:</strong> Assurance AB COVID-19 IgM/IgG Rapid Antibody Test</p>
        <p><strong>Date Performed:</strong> 2020-08-21</p>
        <p><strong>Lot Number:</strong> 2020AB12</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              50.0% (15/30)
            </td>
            <td style={{textAlign:'left'}}>
              (33.2%; 66.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (46.1%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.5%
            </td>
            <td style={{textAlign:'left'}}>
              (98.6%; 99.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3347-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3347-a001.csv">Data File</a></p>

        <h4>RayBiotech Novel Coronavirus (SARS-CoV-2) IgM and IgG Dual Combined Antibody Detection Kit (Colloidal Gold
          Method)</h4>
        <p><strong>Manufacturer:</strong> RayBiotech</p>
        <p><strong>Device:</strong> Novel Coronavirus (SARS-CoV-2) IgM and IgG Dual Combined Antibody Detection Kit
          (Colloidal Gold Method)</p>
        <p><strong>Date Performed:</strong> 2020-06-01</p>
        <p><strong>Lot Number:</strong> 0505202977</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              60.0% (18/30)
            </td>
            <td style={{textAlign:'left'}}>
              (42.3%; 75.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              57.5% (46/80)
            </td>
            <td style={{textAlign:'left'}}>
              (46.6%; 67.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              46.7% (14/30)
            </td>
            <td style={{textAlign:'left'}}>
              (30.2%; 63.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              70.0% (21/30)
            </td>
            <td style={{textAlign:'left'}}>
              (52.1%; 83.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              57.5% (46/80)
            </td>
            <td style={{textAlign:'left'}}>
              (46.6%; 67.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              8.0%
            </td>
            <td style={{textAlign:'left'}}>
              (4.9%; 12.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              97.3%
            </td>
            <td style={{textAlign:'left'}}>
              (94.9%; 98.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3287-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3287-a001.csv">Data File</a></p>

        <h4>SD BIOSENSOR, Inc. STANDARD Q COVID-19 IgM/IgG Duo</h4>
        <p><strong>Manufacturer:</strong> SD BIOSENSOR, Inc.</p>
        <p><strong>Device:</strong> STANDARD Q COVID-19 IgM/IgG Duo</p>
        <p><strong>Date Performed:</strong> 2020-05-06 through 2020-05-13</p>
        <p><strong>Lot Number:</strong> QC01020007/sub : A-2</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              76.3%
            </td>
            <td style={{textAlign:'left'}}>
              (31.6%; 95.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.7%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3274-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3274-a001.csv">Data File</a></p>

        <h4>Shanghai Fosun Long March Medical Science Co., Ltd. Fosun COVID-19 IgG/IgM Rapid Antibody Detection Kit</h4>
        <p><strong>Manufacturer:</strong> Shanghai Fosun Long March Medical Science Co., Ltd.</p>
        <p><strong>Device:</strong> Fosun COVID-19 IgG/IgM Rapid Antibody Detection Kit</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> 20200302</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              10.0% (3/30)
            </td>
            <td style={{textAlign:'left'}}>
              (3.5%; 25.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              36.7% (11/30)
            </td>
            <td style={{textAlign:'left'}}>
              (21.9%; 54.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              36.7% (11/30)
            </td>
            <td style={{textAlign:'left'}}>
              (21.9%; 54.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              95.0% (76/80)
            </td>
            <td style={{textAlign:'left'}}>
              (87.8%; 98.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              27.8%
            </td>
            <td style={{textAlign:'left'}}>
              (8.6%; 59.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              96.6%
            </td>
            <td style={{textAlign:'left'}}>
              (95.5%; 97.6%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3269-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3269-a001.csv">Data File</a></p>


        <h4>Shenzhen JetMay Care Limited COVID-19 IgM & IgG Test</h4>
        <p><strong>Manufacturer:</strong> Shenzhen JetMay Care Limited</p>
        <p><strong>Device:</strong> COVID-19 IgM & IgG Test</p>
        <p><strong>Date Performed:</strong> 2020-09-25</p>
        <p><strong>Lot Number:</strong> 20200401</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              56.7% (17/30)
            </td>
            <td style={{textAlign:'left'}}>
              (39.2%; 72.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
                (35.9%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.3%
            </td>
            <td style={{textAlign:'left'}}>
              (97.3%; 99.0%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3373-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3373-a001.csv">Data File</a></p>


        <h4>Sugentech, Inc. Sugentech SGTi-flex COVID-19 IgM/IgG</h4>
        <p><strong>Manufacturer:</strong> Sugentech, Inc.</p>
        <p><strong>Device:</strong> Sugentech SGTi-flex COVID-19 IgM/IgG</p>
        <p><strong>Date Performed:</strong> 2020-05-28</p>
        <p><strong>Lot Number:</strong> COVT20906</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              34.5%
            </td>
            <td style={{textAlign:'left'}}>
              (20.1%; 50.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3275-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3275-a001.csv">Data File</a></p>

        <h4>SurExam Bio-Tech Co. Ltd. Surplex COVID-19 IgM/IgG Rapid Test</h4>
        <p><strong>Manufacturer:</strong> SurExam Bio-Tech Co. Ltd.</p>
        <p><strong>Device:</strong> Surplex COVID-19 IgM/IgG Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-10-21</p>
        <p><strong>Lot Number:</strong> 20052901</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (40.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.8%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3391-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3391-a001.csv">Data File</a></p>

        <h4>TESTSEALABS SARS-COV-2-IgG/IgM Test Cassette</h4>
        <p><strong>Manufacturer:</strong> TESTSEALABS</p>
        <p><strong>Device:</strong> SARS-COV-2-IgG/IgM Test Cassette</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 20200320</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              40.0% (12/30)
            </td>
            <td style={{textAlign:'left'}}>
              (24.6%; 57.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              92.5% (74/80)
            </td>
            <td style={{textAlign:'left'}}>
              (84.6%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              36.9%
            </td>
            <td style={{textAlign:'left'}}>
              (18.5%; 58.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.1%
            </td>
            <td style={{textAlign:'left'}}>
              (98.0%; 99.6%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3277-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3277-a001.csv">Data File</a></p>

        <h4>Tianjin Beroni Biotechnology Co., Ltd. SARS-COV-2 IgG/IgM Antibody Detection Kit</h4>
        <p><strong>Manufacturer:</strong> Tianjin Beroni Biotechnology Co., Ltd.</p>
        <p><strong>Device:</strong> SARS-COV-2 IgG/IgM Antibody Detection Kit</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 20200405 (Test Strip)</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              30.0% (9/30)
            </td>
            <td style={{textAlign:'left'}}>
              (16.7%; 47.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (70/70)
            </td>
            <td style={{textAlign:'left'}}>
              (94.8%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (42.9%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.5%
            </td>
            <td style={{textAlign:'left'}}>
              (98.6%; 99.8%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3251-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3251-a001.csv">Data File</a></p>

        <h4>Tianjin New Bay Bioresearch C. #1 Quik Pac II COVID-19 IgG &amp; IgM Test</h4>
        <p><strong>Manufacturer:</strong> Tianjin New Bay Bioresearch C. #1</p>
        <p><strong>Device:</strong> Quik Pac II COVID-19 IgG &amp; IgM Test</p>
        <p><strong>Date Performed:</strong> 2020-06-10</p>
        <p><strong>Lot Number:</strong> 2005059</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              73.3% (22/30)
            </td>
            <td style={{textAlign:'left'}}>
              (55.6%; 85.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              67.1%
            </td>
            <td style={{textAlign:'left'}}>
              (33.6%; 88.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (99.0%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3298-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3298-a001.csv">Data File</a></p>

        <h4>Top Biotech Sdn. Bhd. Top Rapid COVID-19 Rapid Antibody IgG/IgM Test Kit</h4>
        <p><strong>Manufacturer:</strong> Top Biotech Sdn. Bhd.</p>
        <p><strong>Device:</strong> Top Rapid COVID-19 Rapid Antibody IgG/IgM Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-09-28 through 2020-10-02</p>
        <p><strong>Lot Number:</strong> TBCV04007001T</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              34.5%
            </td>
            <td style={{textAlign:'left'}}>
              (20.1%; 50.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3378-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3378-a001.csv">Data File</a></p>

        <h4>Vincitek LLC Vincitek S2-AB Test Card</h4>
        <p><strong>Manufacturer:</strong> Vincitek LLC</p>
        <p><strong>Device:</strong> Vincitek S2-AB Test Card</p>
        <p><strong>Date Performed:</strong> 2020-10-29</p>
        <p><strong>Lot Number:</strong> S2AB200914</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              53.3% (16/30)
            </td>
            <td style={{textAlign:'left'}}>
              (36.1%; 69.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              83.3% (25/30)
            </td>
            <td style={{textAlign:'left'}}>
              (66.4%; 92.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (43.3%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.1%
            </td>
            <td style={{textAlign:'left'}}>
              (98.2%; 99.6%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3394-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3394-a001.csv">Data File</a></p>

        <h4>W.H.P.M, Inc. Covisure Covid-19 IgM/IgG Rapid Test</h4>
        <p><strong>Manufacturer:</strong> W.H.P.M, Inc.</p>
        <p><strong>Device:</strong> Covisure Covid-19 IgM/IgG Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-04-27</p>
        <p><strong>Lot Number:</strong> P0406203922</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Removed from Notification List</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.1% (68/70)
            </td>
            <td style={{textAlign:'left'}}>
              (90.2%; 99.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              70.0% (21/30)
            </td>
            <td style={{textAlign:'left'}}>
              (52.1%; 83.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.1% (68/70)
            </td>
            <td style={{textAlign:'left'}}>
              (90.2%; 99.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              76.7% (23/30)
            </td>
            <td style={{textAlign:'left'}}>
              (59.1%; 88.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.1% (68/70)
            </td>
            <td style={{textAlign:'left'}}>
              (90.2%; 99.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              58.5%
            </td>
            <td style={{textAlign:'left'}}>
              (24.0%; 85.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              98.8%
            </td>
            <td style={{textAlign:'left'}}>
              (97.7%; 99.4%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3267-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3267-a001.csv">Data File</a></p>

        <h4>Wuhan Easy Diagnosis Biomedicine Co. Ltd. COVID-19 (SARS-CoV-2) IgM/IgG Antibody Test Kit</h4>
        <p><strong>Manufacturer:</strong> Wuhan Easy Diagnosis Biomedicine Co. Ltd.</p>
        <p><strong>Device:</strong> COVID-19 (SARS-CoV-2) IgM/IgG Antibody Test Kit</p>
        <p><strong>Date Performed:</strong> 2020-06-11</p>
        <p><strong>Lot Number:</strong> 20030401</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              88.8% (71/80)
            </td>
            <td style={{textAlign:'left'}}>
              (80.0%; 94.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              87.5% (70/80)
            </td>
            <td style={{textAlign:'left'}}>
              (78.5%; 93.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              29.6%
            </td>
            <td style={{textAlign:'left'}}>
              (17.8%; 43.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.2%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3304-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3304-a001.csv">Data File</a></p>

        <h4>Xiamen AmonMed Biotechnology Co., Ltd COVID-19 IgM/IgG Test Kit (colloidal gold)</h4>
        <p><strong>Manufacturer:</strong> Xiamen AmonMed Biotechnology Co., Ltd</p>
        <p><strong>Device:</strong> COVID-19 IgM/IgG Test Kit (colloidal gold)</p>
        <p><strong>Date Performed:</strong> 2020-07-20</p>
        <p><strong>Lot Number:</strong> 3120200501</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed – Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              70.0% (21/30)
            </td>
            <td style={{textAlign:'left'}}>
              (52.1%; 83.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.8% (79/80)
            </td>
            <td style={{textAlign:'left'}}>
              (93.3%; 99.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              79.7%
            </td>
            <td style={{textAlign:'left'}}>
              (38.0%; 95.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.6%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3333-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3333-a001.csv">Data File</a></p>

        <h4>ZEUS Scientific, Inc. ZEUS SARS-CoV-2 IgM/IgG Lateral Flow Immunoassay</h4>
        <p><strong>Manufacturer:</strong> ZEUS Scientific, Inc.</p>
        <p><strong>Device:</strong> ZEUS SARS-CoV-2 IgM/IgG Lateral Flow Immunoassay</p>
        <p><strong>Date Performed:</strong> 2020-12-01</p>
        <p><strong>Lot Number:</strong> 20100474</p>
        <p><strong>Panel:</strong> Panel 3</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (27/30)
            </td>
            <td style={{textAlign:'left'}}>
              (74.4%; 96.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              93.8% (75/80)
            </td>
            <td style={{textAlign:'left'}}>
              (86.2%; 97.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              96.2% (77/80)
            </td>
            <td style={{textAlign:'left'}}>
              (89.5%; 98.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              100% (30/30)
            </td>
            <td style={{textAlign:'left'}}>
              (88.7%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              90.0% (72/80)
            </td>
            <td style={{textAlign:'left'}}>
              (81.5%; 94.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              34.5%
            </td>
            <td style={{textAlign:'left'}}>
              (20.1%; 50.5%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (99.3%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3407-a001.pdf">NCI’s Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3407-a001.csv">Data File</a></p>

        <h4>Zhongshan Bio-Tech Co LTD SARS-CoV-2 IgM-IgG (GICA)</h4>
        <p><strong>Manufacturer:</strong> Zhongshan Bio-Tech Co LTD</p>
        <p><strong>Device:</strong> SARS-CoV-2 IgM-IgG (GICA)</p>
        <p><strong>Date Performed:</strong> 2020-06-03</p>
        <p><strong>Lot Number:</strong> 2020007</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed –– No notification or EUA authorization</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              50.0% (15/30)
            </td>
            <td style={{textAlign:'left'}}>
              (33.2%; 66.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              85.0% (68/80)
            </td>
            <td style={{textAlign:'left'}}>
              (75.6%; 91.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              96.7% (29/30)
            </td>
            <td style={{textAlign:'left'}}>
              (83.3%; 99.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              83.8% (67/80)
            </td>
            <td style={{textAlign:'left'}}>
              (74.2%; 90.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              23.8%
            </td>
            <td style={{textAlign:'left'}}>
              (14.5%; 34.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.8%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 100%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3288-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3288-a001.csv">Data File</a></p>

        <h4>Zhuhai Livzon Diagnostic Inc. IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronavirus (SARS-COV-2)</h4>
        <p><strong>Manufacturer:</strong> Zhuhai Livzon Diagnostic Inc.</p>
        <p><strong>Device:</strong> IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronavirus (SARS-COV-2)</p>
        <p><strong>Date Performed:</strong> 2020-05-06</p>
        <p><strong>Lot Number:</strong> CK2004240410</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              63.3% (19/30)
            </td>
            <td style={{textAlign:'left'}}>
              (45.5%; 78.1%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              93.3% (28/30)
            </td>
            <td style={{textAlign:'left'}}>
              (78.7%; 98.2%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              100%
            </td>
            <td style={{textAlign:'left'}}>
              (47.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.7%
            </td>
            <td style={{textAlign:'left'}}>
              (98.8%; 99.9%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3280-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3280-a001.csv">Data File</a></p>

        <h4>Zhuhai Livzon Diagnostics Inc Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2) Lateral Flow</h4>
        <p><strong>Manufacturer:</strong> Zhuhai Livzon Diagnostics Inc</p>
        <p><strong>Device:</strong> Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2) Lateral Flow</p>
        <p><strong>Date Performed:</strong> 2020-06-03</p>
        <p><strong>Lot Number:</strong> CK2004350410</p>
        <p><strong>Panel:</strong> Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed" style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              66.7% (20/30)
            </td>
            <td style={{textAlign:'left'}}>
              (48.8%; 80.8%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (80/80)
            </td>
            <td style={{textAlign:'left'}}>
              (95.4%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              86.7% (26/30)
            </td>
            <td style={{textAlign:'left'}}>
              (70.3%; 94.7%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              97.5% (78/80)
            </td>
            <td style={{textAlign:'left'}}>
              (91.3%; 99.3%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              64.6%
            </td>
            <td style={{textAlign:'left'}}>
              (29.9%; 87.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.3%
            </td>
            <td style={{textAlign:'left'}}>
              (98.3%; 99.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3285-a001.pdf">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3285-a001.csv">Data File</a></p>

        <h4>Zhuhai Livzon Diagnostics Inc Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2)
          Lateral Flow (combined evaluations)</h4>
        <p><strong>Manufacturer:</strong> Zhuhai Livzon Diagnostics Inc</p>
        <p><strong>Device:</strong> Livzon IgM/IgG Diagnostic Kit for IgM/IgG Antibody to Coronovirus (SARS-Cov-2)
          Lateral Flow (combined evaluations)</p>
        <p><strong>Date Performed:</strong> 2020-05-06, 2020-06-03</p>
        <p><strong>Lot Number:</strong> CK2004240410, CK2004350410</p>
        <p><strong>Panel:</strong> Panel 1, Panel 2</p>
        <p><strong>Marketing Status:</strong> Should not be distributed - Voluntarily withdrawn</p>
        <table className="table table-striped table-hover table-condensed"
               style={{marginLeft:'auto', marginRight:'auto'}}>
          <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              Antibody
            </th>
            <th style={{textAlign:'left'}}>
              Performance Measure
            </th>
            <th style={{textAlign:'left'}}>
              Estimate of Performance
            </th>
            <th style={{textAlign:'left'}}>
              95% Confidence Interval
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              88.0% (44/50)
            </td>
            <td style={{textAlign:'left'}}>
              (76.2%; 94.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgM
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.4% (125/127)
            </td>
            <td style={{textAlign:'left'}}>
              (94.4%; 99.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              64.0% (32/50)
            </td>
            <td style={{textAlign:'left'}}>
              (50.1%; 75.9%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              IgG
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              100% (127/127)
            </td>
            <td style={{textAlign:'left'}}>
              (97.1%; 100%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Sensitivity
            </td>
            <td style={{textAlign:'left'}}>
              88.0% (44/50)
            </td>
            <td style={{textAlign:'left'}}>
              (76.2%; 94.4%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              Specificity
            </td>
            <td style={{textAlign:'left'}}>
              98.4% (125/127)
            </td>
            <td style={{textAlign:'left'}}>
              (94.4%; 99.6%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              PPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              74.6%
            </td>
            <td style={{textAlign:'left'}}>
              (41.9%; 92.0%)
            </td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>
              Combined
            </td>
            <td style={{textAlign:'left'}}>
              NPV at prevalence = 5%
            </td>
            <td style={{textAlign:'left'}}>
              99.4%
            </td>
            <td style={{textAlign:'left'}}>
              (98.7%; 99.7%)
            </td>
          </tr>
          </tbody>
        </table>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3285-a002.pdf">NCI's Independent
          Evaluation Report</a></p>
        <p><a href="https://www.accessdata.fda.gov/cdrh_docs/presentations/maf/maf3285-a002.csv">Data File</a></p>

        <h2>Learn more</h2>
        <p>General information: <a href="https://www.fda.gov/medical-devices/emergency-situations-medical-devices/eua-authorized-serology-test-performance">Learn more about EUA Authorized Serology Test Performance</a></p>
      </section>
    )
  }
}

export default IndexRoute
