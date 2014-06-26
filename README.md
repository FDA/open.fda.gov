# open.fda.gov

openFDA is a research project to provide open APIs, raw data downloads, documentation and examples, and a developer community for an important collection of FDA public datasets.

*Please note that openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data and logic are accurate, you should assume all results are unvalidated.*

# Contents

This repository contains the main open.fda.gov website:

* A [Jekyll](http://jekyllrb.com/) static site
* [Grunt](http://gruntjs.com/) is used for building CSS (from LESS) and minified JS

# Running the site

Install Jekyll and Grunt:

```bash
gem install jekyll
npm install -g grunt-cli
```

Get Grunt watching for any changes to assets:

```bash
grunt
```

Get the site running at `http://localhost:4000` with:

```
jekyll serve --baseurl=""
```

(Optional) You can also manually recompile assets at any time by running:

```bash
grunt less
grunt minified
```

# Prerequisites

* Jekyll 1.x/2.x
* Grunt 0.4.x
* Python 2.x (because of [pygments](https://github.com/tmm1/pygments.rb) syntax highlighting)
