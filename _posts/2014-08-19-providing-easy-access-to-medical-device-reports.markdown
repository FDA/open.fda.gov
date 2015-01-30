---
layout:         post
date:           2014-08-19 14:30:00
title:          "Providing easy access to medical device reports submitted to FDA since the early 1990s"
authors:
  - "Taha Kass-Hout"
  - "Jeffrey Shuren"
---

In addition to food and drugs, FDA has regulatory oversight of tens of thousands of medical devices ranging from bandages and prosthetics to heart valves and robotics. These products are used by millions of Americans, and they are essential, well-performing tools of modern healthcare, but occasionally they present a safety issue due to risks not identified in prior studies, a malfunction, a problem with manufacturing, or misuse. 

These incidents are collected in a publicly available FDA database called MAUDE - short for Manufacturer and User Facility Device Experience. As part of the openFDA project, there is now an Application Programming Interface (API) for this dataset, which provides a way for software to interact directly with the data. This API will allow developers and researchers to easily query thousands of reports dating back to the early 1990s.

The API can be a powerful tool for generating hypotheses for further investigation or inquiry and can inform the development of safer, more effective technologies. For example, it can help identify new, potential safety signals as well as which classes of devices may be associated with particular adverse events.

There are some necessary caveats to this API. The dataset is a record of reports submitted to FDA, and not a definitive accounting of every incident with every device. It may contain incomplete, inaccurate, unverified, or biased data. Thus, it cannot be used to determine incidence. And the appearance of a device in a report does not mean that cause-and-effect has been determined. Therefore, these data should be used in the context of other available information. It’s also important to note that the data made available under this initiative do not contain anything that potentially could be used to identify individuals or reveal other private information.

This API is the latest in a series of openFDA releases that have made publicly available data more easily accessed and queried. We believe that these tools can be used by developers and researchers to make insights that fuel new, innovative products (such as mobile apps and websites), and that help protect and promote the public’s health. Over the last two months, openFDA has released several APIs related to drugs, food, and devices. Together, they help provide perspective on the work FDA is doing, and make the public health data the agency is developing easier to access and utilize.

By design, openFDA is a research and development project that draws on community involvement. We are actively involved in the openFDA communities on [GitHub](http://github.com/FDA/) {% include external-link.html %} and [StackExchange](http://opendata.stackexchange.com/search?q=openFDA) {% include external-link.html %}, and encourage people interested in the project to participate in those communities. Together, we can make openFDA into a more useful, more powerful resource for the protection and advancement of the public health.

In addition to providing datasets, openFDA encourages innovative use of the agency’s publicly available data by highlighting potential data applications, and providing a place for communities to interact with one another and with FDA domain experts.

(Cross-posted from the FDA blog, where this was published on August 19, 2014.)