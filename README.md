# open.fda.gov

openFDA is a research project to provide open APIs, raw data downloads, documentation and examples, and a developer community for an important collection of FDA public datasets.

*Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our Terms of Service*

# Contents

This repository contains the main open.fda.gov website.

## Running the site

`mkdir -p './src/css/build'`

`npm run dev:css`

`npm run dev:site`

## Running the site in Docker

`docker build -t open.fda.gov .`

`docker run -p 3000:3000  open.fda.gov`

The website will then be available at `http://localhost:3000/` 

## Description of project structure

#### /actions
Redux actions go here. They describe all the possible state changes of the application

#### /aria
Any commonly used aria attributes can go here, like hiding an element from a screen reader

#### /components
Stateless, functional react components go here. A function component should not have any state, and will always render the same thing if provided with a given set of props. Some routes have their own components folders, that provide components only used in that route. Most components should go here though

#### /containers
Container components go here. These react components are reduxified. They communicate with the store and dispatch actions, passing down props to their child components. This way we minify how many components have state, as well as having a tightly controlled, reliable way of describing application state

#### /css
Global css for the entire site goes here. Because we css modules, most of our css is defined in the same folder as the component it is tied to, but we still need a place to put the US web design standards. Colors, type styles, basic grid structure, etc, go here

#### /data
Any hard coded data that is used globally goes here. Some routes have their own data folder that serves the same purpose, but is local to that route

#### /pages
Routes and posts for the page. The folder structure in here determines the routes for the site. All blog posts go in blog. Static assets like images, fonts, etc, should also go here

#### /stores
Our redux stores for the site

#### /styles
Any commonly inlined styles should go here. It really should only be the style reset

#### /types
Flow types that are commonly used should go here

#### /utils
Handy openFDA specific utility functions like fetchQuery or randColor

#### /wrappers
Gatsby uses either a html or md wrapper when rendering content. In our case, we exclusively use the md wrapper

## Other things to note:

See details about testing at ./TESTING.md

config.toml can be used to declare global variables, if needed

The webpack configuration can be tweaked using `gatsby.config.js`, which allows us to override the default gatsby configuration
