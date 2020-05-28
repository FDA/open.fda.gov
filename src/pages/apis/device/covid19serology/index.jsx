import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import InteractiveInfographic from '../../../../components/InteractiveInfographic'
import FieldsHarmonization from '../../../../components/FieldsHarmonization'

import master_harmonization from '../../../../constants/fields/master_harmonization.yaml'
import infographic_definitions from './_infographic_definitions.json'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Independent Evaluations of COVID-19 Serological Tests</h2>
        <p>Serology tests detect the presence of antibodies in the blood when the body is responding to a specific infection, like COVID-19. In other words, the tests detect the body’s immune response to the infection caused by the virus rather than detecting the virus itself. In the early days of an infection when the body’s immune response is still building, antibodies may not be detected. This limits the test’s effectiveness for diagnosing COVID-19, and this is one reason serology tests should not be used as the sole basis to diagnose COVID-19. Serology tests could play a role in the fight against COVID-19 by helping healthcare professionals identify individuals have developed an immune response to SARS-CoV-2. In addition, these test results can aid in determining who may donate a part of their blood called convalescent plasma, which may serve as a possible treatment for those who are seriously ill from COVID-19. However, to use these test properly, it is important to understand their performance characteristics and limitations. Moreover, studies are underway to address questions that will better inform the appropriate use of these tests, such as whether the presence of antibodies conveys a level of immunity that would prevent or minimize the severity of re-infection as well as the duration for which immunity lasts.</p>
        <p>For additional information, please visit the FDA's <a href="https://www.fda.gov/medical-devices/emergency-situations-medical-devices/eua-authorized-serology-test-performance">EUA Authorized Serology Test Performance page</a>.</p>

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.path.split("/")[3]}
        />

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>

        <h2>About this testing program</h2>
        <h3>Introduction</h3>
        <p>The serology tests were tested at the Frederick National Laboratory for Cancer Research (FNLCR), a Federally Funded Research and Development Center (FFRDC) sponsored by the National Cancer Institute (NCI).</p>

        <h3>Panel Composition</h3>
        <h4>Panel 1</h4>
        <p>Each test was evaluated against “Panel 1,” which includes frozen SARS-CoV-2 antibody-positive serum samples (n=30) and frozen antibody-negative serum and plasma samples (n=80). The panel size and composition were chosen to enable a laboratory-based evaluation and to provide reasonable estimates and confidence intervals for test performance in the context of limited sample availability. The sample size is comparable to that of a typical sample size used to support Emergency Use Authorization (EUA) by FDA for tests of this type.</p>

        <h5>Positive samples</h5>
        <p>Positive samples used in Panel 1 were from patients previously confirmed to have SARS-CoV-2 infection with a nucleic acid amplification test (NAAT). Time between symptom onset, NAAT testing, and sample collection is not known for all samples. Both SARS-CoV-2 IgM and IgG antibodies are present in all Panel 1 positive samples. The Centers for Disease Control and prevention (CDC) detected the presence of IgG and IgM antibodies at their laboratory using their SARS-CoV-2 spike enzyme-linked immunosorbent assay (ELISA) tests. (See <a href="https://www.cdc.gov/coronavirus/2019-ncov/lab/serology-testing.html">Serology Testing for COVID-19</a>, which notes “CDC’s serologic test is designed and validated for broad-based surveillance and research that will give us information needed to guide the response to the pandemic and protect the public’s health. The test is not currently designed to test individuals who want to know if they have been previously infected with COVID-19.”) The presence of antibodies was confirmed at FNLCR using CDC’s developed ELISAs (pan-Ig, IgG, and IgM) as well as an IgG Receptor Binding Domain (RBD) ELISA developed by the Krammer Laboratory at the Icahn School of Medicine at Mount Sinai. (An implementation of this test, the COVID-19 ELISA IgG Antibody Test, has been granted an EUA authorization by FDA for use at the Mount Sinai Laboratory (MSL), Center for Clinical Laboratories, a division of the Department of Pathology, Molecular, and Cell-Based Medicine, New York, NY. See this <a href="https://www.fda.gov/media/137029/download">EUA Summary</a>.) The positive samples selected may not reflect the distribution of antibody levels in patient populations that would be evaluated by such a test. Because all samples are positive for both IgM and IgG, this evaluation cannot verify that tests intended to detect IgM and IgG antibodies separately detect these antibodies independently.</p>
        <p>Positive samples were qualitatively assessed at dilutions of 1:100, 1:400, 1:1600, and 1:6400 by CDC on their Pan-Ig assay, their IgM assay, and their IgG assay. Some samples were run at additional dilutions. Any samples tested with a dilution more than 1:6400 that were positive at a dilution of 1:6400 were assigned a titer of 6400 because 1:6400 is the highest dilution at which all Panel 1 positive samples were assessed. Two of these samples, C0107 and C0176, were positive for IgG antibodies at a dilution of 1:25600.</p>

        <h5>Negative Samples</h5>
        <p>All Panel 1 negative samples were collected prior to 2020, before the SARS-CoV-2 virus is known to have circulated in the United States. Panel 1 groups include:</p>
        <ul>
          <li>“Negatives” (n=70): selected without regard for clinical status. This group includes a sample, C0063, that showed reactivity in the pan-Ig CDC spike ELISA at FNLCR. It includes another sample, C0087, that showed reactivity in the IgG RBD ELISA at FNLCR.</li>
          <li>“HIV+” (n=10): selected from banked serum from HIV+ patients. (HIV+ samples were deemed appropriate for inclusion in the panel: (1) to increase the sample size and reduce the confidence interval; and (2) to identify any possibility of cross-reactivity with HIV+ samples. It is anticipated that other types of samples, as they become available, may also be evaluated in any future analyses.) This group includes 3 samples, C0018, C0155, and C0182, that showed reactivity in the IgG RBD ELISA at FNLCR.</li>
        </ul>
        <p>All Panel 1 negative samples were qualitatively assessed at dilutions of 1:100 and 1:400 by CDC on their Pan-Ig assay. A subset were assessed in parallel at additional dilutions and on the CDC IgM and IgG assays. All Panel 1 negative samples were negative at a dilution of 1:100 on the CDC Pan-Ig assay. These samples were assigned an undetectable titer (represented as zero (0) in the line data) for the Pan-Ig assay, the IgM assay, and the IgG assay.</p>

        <h3>Analysis</h3>
        <p>Samples used in this evaluation were not randomly selected, and sensitivity (PPA) and specificity (NPA) estimates shown may not be indicative of the real-world performance of these tests. Sensitivity and specificity were calculated for each antibody (e.g., IgM, IgG, IgA, and Pan Ig, as applicable) separately. In addition, for tests that measure multiple antibodies separately, sensitivity and specificity were estimated in a combined manner, where a positive result for any antibody a test is intended to detect was considered as a positive test result and a negative result meant that a sample tested negative for all antibodies a test is intended to detect. Positive and negative predictive values were calculated for combined sensitivity and specificity for tests that measure multiple antibodies separately and assuming a prevalence of 5%. Cross-reactivity with HIV+ was evaluated, and results are presented separately in the individual test reports. If cross-reactivity was detected, the samples with HIV+ were not included in calculations of specificity.</p>
        <p>In this report, device outputs indicating equivocal results, including outputs such as “borderline” or similar, are referred to as “equivocal.” For ELISA tests that provide equivocal results, for sensitivity and specificity calculations, equivocal results on positive samples were counted as false negative results, and equivocal results on negative samples were counted as false positive results.</p>
        <p>Confidence intervals for sensitivity and specificity were calculated per a score method described in CLSI EP12-A2 (2008). (CLSI. <em>User Protocol for Evaluation of Qualitative Test Performance</em>; Approved Guideline—Second Edition. CLSI document EP12-A2. Wayne, PA: Clinical and Laboratory Standards Institute; 2008. See <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfStandards/detail.cfm?standard__identification_no=31791">Recognized Consensus Standards.</a>) Confidence intervals for PPV and NPV were calculated using the values from the 95% confidence intervals for sensitivity and specificity. For evaluation of cross-reactivity with HIV+, it was evaluated whether an increased false positive rate among antibody negative samples with HIV was statistically higher than the false positive rate among antibody negative samples without HIV (for this, a confidence interval for the difference in false positive rates was calculated per a score method described by Altman. (Statistics with Confidence: Confidence Intervals and Statistical Guidelines. (2013). Wiley.))</p>

        <h3>Important caveats</h3>
        <p>Sensitivity and specificity estimates shown may not be indicative of the real world performance of the tests.</p>
        <p>These results are based on serum and plasma samples only and may not be indicative of performance with other sample types, such as whole blood, including finger stick blood.</p>
        <p>Information about anticoagulants used is not known.</p>
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
        <p>Where the Marketing Status below is shown as “EUA Authorized,” the test has been reviewed by FDA under the Emergency Use Authorization (EUA) process and may be distributed in the United States. Where the Marketing Status below is shown as “Voluntarily withdrawn from the notification list,” the manufacturer has voluntarily stopped distribution and requested FDA to remove their test from the list of commercial manufacturers distributing serology test kits under the policy outlined in Section IV.D of the <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/policy-coronavirus-disease-2019-tests-during-public-health-emergency-revised">Policy for Coronavirus Disease-2019 Tests</a>. Where the Marketing Status below is shown as “Removed,” FDA has determined that an EUA request has not been submitted within a reasonable period of time, or significant problems were identified with the test and cannot be or have not been addressed in a timely manner.</p>
        <h3>EUA Authorized</h3>
        <h4>Cellex, Inc. Cellex qSARs-CoV-2 IgG/IgM Rapid Test</h4>
        <p><strong>Manufacturer:</strong> Cellex, Inc.</p>
        <p><strong>Device:</strong> Cellex qSARs-CoV-2 IgG/IgM Rapid Test</p>
        <p><strong>Date Performed:</strong> 2020-05-08</p>
        <p><strong>Lot Number:</strong> 20200424WI5515C025</p>
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
                6.7% (2/30)
              </td>
              <td style={{textAlign:'left'}}>
                (1.8%; 21.3%)
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
                (40.3%; 100%)
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
        <p><a href="https://www.fda.gov">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov">Data File</a></p>

        <h4>ChemBio DPP COVID-19 IgM/IgG System</h4>
        <p><strong>Manufacturer:</strong> ChemBio</p>
        <p><strong>Device:</strong> DPP COVID-19 IgM/IgG System</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 204IG001Z</p>
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
        <p><a href="https://www.fda.gov">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov">Data File</a></p>

        <h3>Euroimmun SARS-COV-2 ELISA (IgG)</h3>
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
                (46.0%; 100%)
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
        <p><a href="https://www.fda.gov/media/137720/download">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov/media/137719/download">Data File</a></p>

        <h2>Removed</h2>
        <h3>Tianjin Beroni Biotechnology Co., Ltd. SARS-COV-2 IgG/IgM Antibody Detection Kit</h3>
        <p><strong>Manufacturer:</strong> Tianjin Beroni Biotechnology Co., Ltd.</p>
        <p><strong>Device:</strong> SARS-COV-2 IgG/IgM Antibody Detection Kit</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 20200405 (Test Strip)</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Removed</p>
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
                (43.0%; 100%)
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
        <p><a href="https://www.fda.gov">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov">Data File</a></p>

        <h2>Voluntarily withdrawn from the notification list</h2>
        <h3>Biomedomics COVID-19 IgM-IgG Rapid Test kit</h3>
        <p><strong>Manufacturer:</strong> Biomedomics</p>
        <p><strong>Device:</strong> COVID-19 IgM-IgG Rapid Test kit</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 51-200404</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Voluntarily withdrawn from the notification list</p>
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
                63.7%
              </td>
              <td style={{textAlign:'left'}}>
                (30.9%; 86.7%)
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
        <p><a href="https://www.fda.gov">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov">Data File</a></p>

        <h3>Phamatech COVID19 RAPID TEST</h3>
        <p><strong>Manufacturer:</strong> Phamatech</p>
        <p><strong>Device:</strong> COVID19 RAPID TEST</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> NCP20030239</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Voluntarily withdrawn from the notification list</p>
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
                42.4%
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
        <p><a href="https://www.fda.gov">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov">Data File</a></p>

        <h3>TESTSEALABS SARS-COV-2-IgG/IgM Test Cassette</h3>
        <p><strong>Manufacturer:</strong> TESTSEALABS</p>
        <p><strong>Device:</strong> SARS-COV-2-IgG/IgM Test Cassette</p>
        <p><strong>Date Performed:</strong> 2020-04-21</p>
        <p><strong>Lot Number:</strong> 20200320</p>
        <p><strong>Panel:</strong> Panel 1</p>
        <p><strong>Marketing Status:</strong> Voluntarily withdrawn from the notification list</p>
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
                (18.5%; 58.2%)
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
        <p><a href="https://www.fda.gov">NCI’s Independent Evaluation Report</a></p>
        <p><a href="https://www.fda.gov">Data File</a></p>

        <h2>Learn more</h2>
        <p>General information: <a href="https://www.fda.gov/medical-devices/emergency-situations-medical-devices/eua-authorized-serology-test-performance">Learn more about EUA Authorized Serology Test Performance</a></p>







      </section>
    )
  }
}

export default IndexRoute
