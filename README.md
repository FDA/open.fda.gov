# open.fda.gov

openFDA is a research project to provide open APIs, raw data downloads, documentation and examples, and a developer community for an important collection of FDA public datasets.

*Please note that openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data and logic are accurate, you should assume all results are unvalidated.*

# Contents

This repository contains the main open.fda.gov website:

* A [Jekyll](http://jekyllrb.com/) static site
* [Grunt](http://gruntjs.com/) is used for building CSS (from LESS) and minified JS

# Running the site

Install Bundler, Jekyll and Grunt:

```bash
npm install -g grunt-cli
gem install bundler
cd /path/to/this/repo
bundle install
```

Get Grunt watching for any changes to assets:

```bash
grunt
```

Get the site running at `http://localhost:4000` with:

```
bundle exec jekyll serve
```

(Optional) You can also manually recompile assets at any time by running:

```bash
grunt less
grunt minified
```

# Prerequisites

* Node 0.10.*
* Python 2.* (because of [pygments](https://github.com/tmm1/pygments.rb) syntax highlighting)