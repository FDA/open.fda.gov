---
title: API status
layout: default
cover: p_computer.jpg
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/js/min/jquery-xdomainrequest.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="{% if page.cover %}background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');{% endif %}">
  <div class="content-heading-text">
    <div class="content-heading-title">
      API
    </div>
    <h1>Current API status</h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/api/reference">Basics</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a>Status</a></h2></div>
</div>
{:/}

<section class="reference">

## Drugs
<section class="statuses">
{% include api-status.html endpoint="/drug/event.json" name="Drugs › Adverse events" %}
{% include api-status.html endpoint="/drug/label.json" name="Drugs › Labeling" %}
{% include api-status.html endpoint="/drug/enforcement.json" name="Drugs › Enforcement reports" %}
</section>

## Devices
<section class="statuses">
{% include api-status.html endpoint="/device/event.json" name="Devices › Adverse events" %}
{% include api-status.html endpoint="/device/enforcement.json" name="Devices › Enforcement reports" %}
{% include api-status.html endpoint="/device/classification.json" name="Devices › Classification" %}
{% include api-status.html endpoint="/device/510k.json" name="Devices › 510(k)" %}
{% include api-status.html endpoint="/device/pma.json" name="Devices › PMA" %}
{% include api-status.html endpoint="/device/recall.json" name="Devices › Recalls" %}
</section>

## Foods
<section class="statuses">
{% include api-status.html endpoint="/food/enforcement.json" name="Foods › Enforcement reports" %}
</section>

</section>
