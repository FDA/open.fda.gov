const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require(`path`)

exports.onCreateWebpackConfig = ({ stage, actions, getConfig, loaders }) => {
  const config = getConfig()
  if (stage === "build-html") {
    //config.loader("null", {
    //  test: /datamaps/,
    //  loader: "null-loader",
    //})
    config.module.rules = [
      // Omit the default rule where test === /datamaps/
      ...config.module.rules.filter(
          rule => String(rule.test) !== String(/datamaps/)
      ),
      // Recreate it with custom exclude filter
      {
        // Called without any arguments, `loaders.js()` will return an
        // object like:
        // {
        //   options: undefined,
        //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
        // }
        // Unless you're replacing Babel with a different transpiler, you probably
        // want this so that Gatsby will apply its required Babel
        // presets/plugins.  This will also merge in your configuration from
        // `babel.config.js`.
        ...loaders.js(),
        test: /datamaps/
      },
    ]
  }
  switch (stage) {
    case "build-javascript":
      const app = config.entry.app
      config.entry.app = [require.resolve("./polyfill"), app]

      break
    default:
      break
  }

  actions.replaceWebpackConfig(config)
};

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
    ).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/docs-markdown.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
