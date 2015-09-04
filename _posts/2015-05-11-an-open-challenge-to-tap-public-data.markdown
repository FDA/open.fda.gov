---
layout:         post
date:           2015-05-11
title:          "Announcing the OpenFDA Developer Challenge - An open call to tap public data and improve public health"
authors:
  - "Taha Kass-Hout"
---

The FDA is launching its very first openFDA challenge to the developer community to take advantage of the following datasets and explore the range and extent of its impact for research.

* **Adverse events data.** FDA’s publicly available drug adverse event and medication error reports, and medical device adverse event reports.

* **Recalls data.** Enforcement report data, containing information gathered from public notices about certain recalls of FDA-regulated products.

* **Labeling data.** Structured Product Labeling (SPL) data for FDA-regulated human prescription drug, OTC drug and biological product labeling.

Below you can learn more about our challenges and how to get started. Choose to focus on Adverse Events & Spikes OR Structured Product Labeling & Language. Starting with Level 1, see how far you can get. For more detailed instructions, see “How to Participate” section below.

Background on openFDA
---------------------

OpenFDA is an <a href="https://www.elastic.co/">Elasticsearch-based</a> <a href="http://apievangelist.com">API</a> that serves public FDA data about drugs, devices, and foods. It was created by FDA’s Chief Health Informatics officer, <a href="http://www.fda.gov/AboutFDA/CentersOffices/ucm349836.htm">Taha Kass-Hout, MD, MS</a> and launched in Beta mode in June 2014 to facilitate easy access to public data, to ensure the security of public FDA data, and ultimately to educate the public and save lives.

The concept is to index high-value public-access data, format and document that data in developer and consumer-friendly standards, and make it available via a public-access portal that enables developers to quickly and easily use it in applications. <a href="https://open.fda.gov/about/">Learn more about openFDA</a>.

Research Challenge
------------------

_**Option 1: Adverse Events & Spikes**_

_Start with level 1 and see how far you can get._

* **Level 1: Identify it.** Find a spike for a given drug query in the Adverse Events dataset and attempt explain it. For example, was there a recall or an enforcement report issued? Try bucketing by the following variables over time: weight, gender, or drug pairs (further broken down by drug characterization).

* **Level 2: Normalize it.** Using publicly-available health-related data (medical care claims, discharge data, emergency room data) as a normalization method —  how does the spike in the adverse event series change, if at all?

* **Level 3: Automate it.** Is there an algorithm that could be used to automatically identify such spikes?

_**Option 2: Structured Product Labeling & Language**_

_Start with level 1 and see how far you can get._

* **Level 1: Visualize it.** Create a word cloud visualization of black box warnings on /drug/label. This will allow you to explore the strength of tone used and variability across warnings.

* **Level 2: Model it.** Develop a language model to categorize the language in the warning sections of SPLs as mild, moderate or severe. Note: This model does not have to be exhaustive. Be sure to give each SPL a tonal score based on the language model you’ve created.

* **Level 3: Analyze it.** Based on openFDA section, does your language model change across drug classes? (e.g., do HIV drugs or anti-inflammatories ‘speak’ differently?)

How to Participate
------------------

1. Choose option you’re most interested in, from above.
1. Tweet <a href="http://twitter.com/openfda">@openFDA</a> with the challenge you’ll be working on, using #openFDAchallenge. To level up your competition, invite your friends.
1. Start working on a solution to the challenge either by flying solo or with a team.
1. When you’ve got something to show, submit a link to your project on the <a href="http://www.reddit.com/r/openfda">openFDA subreddit</a>, and vote or comment on your favorites.

That’s it!

_Remember: You can always post questions to StackExchange about the challenge or the data, using the tag: openFDA_

Frequently Asked Questions
--------------------------

**Question**: Why is FDA offering openFDA challenges? <br/>

**Answer**:
These challenges are meant to be open-ended and to spark creative responses by two communities: the community that develops apps or software that use openFDA, and the community that does research using openFDA.

**Question**: Who is expected to benefit from these challenges? <br/>

**Answer**:
Although the direct beneficiaries are expected to be the public, it’s possible that an outcome could be useful for FDA work.  For example, the community initially developed the code to connect the R library (a group of open source statistical analysis packages) to openFDA; we found it so useful that we provided additional links and functionality for using R on openFDA data, which can be found at <a href="https://github.com/rOpenHealth/openfda">Convenient access to the OpenFDA API</a>.

**Question**:  What do you see as the benefits for researchers and developers participating in the challenges? Are there any rewards you are offering to those who do get involved? <br/>

**Answer**:
FDA is issuing the challenge to encourage creative use of openFDA, including uses we haven’t thought of.  So far, the community has already contributed more than seven major changes to openFDA's platform open source code, demonstrating that the top developers are out in the public.
Contributors receive recognition by the open source community, whether or not their contributions become formally integrated into openFDA.

**Question**:  How do the challenges reflect the sorts of new directions that are now possible with openFDA's APIs? <br/>

**Answer**:
There are two types of challenges: enhancing the data and integrating the platform with other sources.
The specific options are options meant to spark ideas. As stated above, FDA expects that there are people with great ideas we didn’t think of for using openFDA.  The example options also don’t mean anything about FDA’s regulatory or research priorities, or FDA’s ideas about the public’s priorities for using openFDA.

**Question**: Are the challenges open-ended, i.e., is there a deadline? How long do you expect them to take for participants to start submitting? <br/>

**Answer**:
The openFDA developer challenges are meant to be open-ended and to spark creative responses, as explained above. Being open-ended, there is no set beginning or ending date.  The responses are expected to appear in <a href="http://www.reddit.com/r/openfda">openFDA subreddit</a> whenever responders feel ready.  In the meantime, questions or discussions may appear in the openFDA section of StackExchange.

**Question**: What’s next? <br/>

**Answer**:
What comes next depends on all of you!  The larger community will comment and vote on the challenge responses as they get posted in <a href="http://www.reddit.com/r/openfda">openFDA subreddit</a>.  FDA will evaluate them and decide what to do next.  Meanwhile, other members of the community may also decide to take further action on any of the challenges.
