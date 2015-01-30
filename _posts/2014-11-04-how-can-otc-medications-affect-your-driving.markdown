---
layout:         post
date:           2014-11-04 14:30:00
title:          "How can over-the-counter (OTC) medications affect your driving?"
authors:
  - "Zhiheng Xu"
  - "Taha Kass-Hout"
summary:				"A recent FDA consumer update cautions the public that some over-the-counter (OTC) drugs may affect your driving. Over-the-counter medicines are those that you can buy without a prescription from a healthcare professional. Each OTC medicine has a Drug Facts label to guide you in your choices and to help keep you safe. OTC drugs are serious medicines and their risks can increase if you don’t choose them carefully and use them exactly as directed on the label. Some of these medicines may cause a variety of reactions that may make it more difficult for you to drive a car safely."
---

A recent FDA consumer update cautions the public that some over-the-counter (OTC) drugs may affect your driving.[^1] Over-the-counter medicines are those that you can buy without a prescription from a healthcare professional. Each OTC medicine has a Drug Facts label to guide you in your choices and to help keep you safe. OTC drugs are serious medicines and their risks can increase if you don’t choose them carefully and use them exactly as directed on the label. Some of these medicines may cause a variety of reactions that may make it more difficult for you to drive a car safely. These reactions[^2] may include:

 - blurred vision
 - dizziness
 - slowed movement
 - fainting
 - inability to focus or pay attention
 - nausea
 - syncope
 - dyspneoa

Products that could make it dangerous to drive include prescription drugs for anxiety, some antidepressants, products containing codeine, some cold remedies and allergy products, tranquilizers, sleeping pills, pain relievers, diet pills, "stay awake" drugs, and other medications with stimulants (e.g. caffeine, ephedrine, pseudoephedrine).[^3] Products that contain stimulants may cause excitability or drowsiness. Also, never combine medication and alcohol while driving.

To further illustrate the trend between OTC medicines and driving, we identified the above adverse reactions which could impact driving in openFDA data[^4] through [researchae.com](http://researchae.com/) {% include external-link.html %} search tools for OTC medicines with any of these active ingredients:[^5]

 - Brompheniramine
 - Cetirizine
 - Chlorcyclizine
 - Chlorpheniramine
 - Codeine
 - Dexbrompheniramine
 - Dexchlorpheniramine
 - Dextromethorphan
 - Dimenhydrinate
 - Diphenhydramine
 - Doxylamine
 - Loperamide
 - Meclizine
 - Naproxen
 - Phenindamine
 - Pheniramine
 - Pyrilamine
 - Thonzylamine
 - Triprolidine

A total of 16,289 adverse event (AE) reports from January 1st, 2004 to October 20, 2014 were identified in association with 19 commonly used generic names for those OTC medicines. Table 1 presents the drug type, active ingredients, common brand name and symptoms to treat for those OTC drugs. Table 2 displays the top ten adverse events reported in the system. Nausea is the most frequently reported adverse event and appears in over half (54.87%) of the reports. 

*Table 1* **Over-the-counter drugs**

|Drug types|Active ingredient|Common brand names|Symptoms to treat|
|----------|-----------------|------------------|-----------------|
|First-generation antihistamine drug|Brompheniramine|Dimetapp Cold and Allergy Elixir|Common cold and allergic rhinitis, such as runny nose, itchy eyes, watery eyes, and sneezing|
| |Chlorpheniramine|Chlor-Trimeton| |
| |Dimenhydrinate|Dramamine| |
| |Diphenhydramine|Benadryl Allergy, Nytol, Sominex| |
| |Doxylamine|Vicks NyQuil, Alka-Seltzer Plus Night-Time Cold Medicine| |
| |Chlorcyclizine|Nasotuss| |
| |Dexbrompheniramine / Dexchlorpheniramine / Dextromethorphan|Chlor-Trimeton, Dimetane, Drixoral and Durahist, Dexall, Panatuss Pediatric DXP, Y-Cof DM, Supress A| |
| |Meclizine|Bonine, Bonamine, Antivert, Postafen, Sea Legs, and Dramamine (Less Drowsy Formulation)| |
| |Phenindamine|Nolahist| |
| |Pheniramine|Theraflu Flu & Sore Throat, Theraflu Cold & Sore Throat, Theraflu Sinus & Cold| |
|Second-generation antihistamine drug|Cetirizine|Zyrtec and Reactine|Hay fever, allergies, angioedema, and urticaria|
|Opiate|Codeine|loperamide|Mild to moderate pain, cough, mild diarrhea|
| |Loperamide|Lopex, Imodium, Dimor, Fortasec, Lopedium, Gastro-Stop and Pepto Diarrhea Control| |
|Nonsteroidal anti-inflammatory drug|Naproxen|Naproxen Sodium|Pain, fever, inflammation, and stiffness|

*Table 2* **Top 10 adverse events reported in openFDA**

|Adverse event|Number of reports|% of reports|
|-------------|-----------------|------------|
|Nausea |8,937|54.87%|
|Dizziness|6,136|37.67%|
|Vomiting|3,843|23.59%|
|Headache|2,701|16.58%|
|Fatigue|2,348|14.41%|
|Diarrhoea|2,328|14.29%|
|Dyspnoea|2,122|13.03%|
|Asthenia|1,963|12.05%|
|Pain|1,784|10.95%|
|Vision blurred|1,727|10.60%|

Figure 1 shows the trends between OTC medicines and selected adverse events which could impact driving. Change point analysis[^6] was used to detect significant change points at which statistical properties of the time series change. Table 2 lists the number of change points detected and identifies the trend in each time interval. The trend went down slightly in August 2006, then in March 2008, it started to go up. After July 2010, the trend kept climbing up and more AE reports for those OTC medicines were received. The final change point was observed in April 2013 when the trend started to go down. Additional data (from September 2013 to present) is needed to further investigate the latest trend.

*Figure 1* **Time series of adverse event reports associated with selected OTC drugs**

![Chart showing adverse event report change points](/assets/img/posts/2014-11-04-figure-01.png)

Table 3 **Detected change points**

|Change point|Count in change point month|P-value|Trend*|
|------------|---------------------------|-------|------|
|August 2006|89|0.001|Downward|
|March 2008|256|0.007|Upward|
|July 2010|480|<0.001|Upward|
|April 2013|151|0.007|Downward|

*Trend is defined as whether the number of monthly adverse event reports goes up or down between the current change point and the next change point.

In the past, triggers of increased adverse event reporting to FDA have included news reports, public FDA alerts, and the approval of new drugs[^7] [^8]. It is hard to know whether downward trends reflect decreased drug use, safer drug use, less interest in reporting, or a combination of such factors. Media reports online and in consumer magazines could be used to compare the dates to the change points. It is also useful to compare change points to the dates when some prescription medicines were reclassified as OTC medicines. To further understand the upward or downward trends between OTC drugs and adverse events which impact driving, injury reports from databases from the [Consumer Product Safety Commission (CPSC)](http://www.cpsc.gov/) and [National Transportation Safety Board (NTSB)](http://www.ntsb.gov/), and [Agency for Healthcare Research & Quality (AHRQ)](http://www.ahrq.gov/) public claims data can be used to determine whether there is a correlation between injuries and these OTC drugs.

Knowing how your individual medications—or any combination of them—affect your ability to drive is clearly a safety measure involving you, your passengers, and others on the road. People should stay informed by checking FDA consumer updates and be mindful in your medication use, for instance by reading the label and understanding the risks of OTC drugs.

## References

[^1]: FDA Consumer Report, [http://www.fda.gov/ForConsumers/ConsumerUpdates/ucm417426.htm](http://www.fda.gov/ForConsumers/ConsumerUpdates/ucm417426.htm), published October 7, 2014.

[^2]: [http://www.fda.gov/Drugs/ResourcesForYou/ucm079514.htm](http://www.fda.gov/Drugs/ResourcesForYou/ucm079514.htm), published August 26, 2013

[^3]: [http://www.fda.gov/ForConsumers/ConsumerUpdates/ucm107894.htm](http://www.fda.gov/ForConsumers/ConsumerUpdates/ucm107894.htm), published December 11, 2008

[^4]: OpenFDA, [https://open.fda.gov/](https://open.fda.gov/)

[^5]: Reseachae.com search tools, [http://www.researchae.com/](http://www.researchae.com/drugevent?from_date=2004-01-01&to_date=2014-10-20&from_age=&to_age=&search=&country=GLOBALLY&patientsex=&manufacturername=&drugbrandname=&druggenericname=Brompheniramine%2BCetirizine%2BChlorcyclizine%2BChlorpheniramine%2BCodeine%2BDexbrompheniramine%2BDexchlorpheniramine%2BDextromethorphan%2BDimenhydrinate%2BDiphenhydramine%2BDoxylamine%2BLoperamide%2BMeclizine%2BNaproxen%2BPhenindamine%2BPheniramine&medicinalproduct=&reactionmeddrapt=sleepiness%2Bblurred%2Bvision%2Bdizziness%2Bslowed%2Bmovement%2Bfainting%2Bfocus%2Battention%2Bnausea%2Bsyncope%2Bdyspneoa&drugclass=&drugindication=&indsubmit=&productndc=&safetyreportid=) {% include external-link.html %}

[^6]: Kass-Hout, T.A., Xu, Z., McMurray, P., Park, S., Buckeridge, D., Brownstein, J., Finelli, L., Groseclose, S.L. [Application of change point analysis to daily influenza-like-illness (ILI) emergency department visits.](http://www.ncbi.nlm.nih.gov/pubmed/22759619) {% include external-link.html %} Journal of American Medical Informatics Association, 2012. doi:10.1136/amiajnl-2011-000793.

[^7]: McAdams M, Staffa J, Dal pan G. [Estimating the extent of reporting to FDA: a case study of statin-associated rhabdomyolysis.](http://www.ncbi.nlm.nih.gov/pubmed/18175291) {% include external-link.html %} Pharmacoepidemiol Drug Safety. 2008 Mar,17(3): 229-39.  

[^8]: Dasgupta N, Mandl KD, Brownstein JS. [Breaking the news or fueling the epidemic? Temporal association between news media report volume and opioid-related mortality.](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0007758) {% include external-link.html %} PLoS One. 2009;4(11):e7758. doi:10.1371/journal.pone.0007758.