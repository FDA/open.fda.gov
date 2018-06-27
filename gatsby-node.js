const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require(`path`)

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /datamaps/,
      loader: "null-loader",
    })
  }
  switch (stage) {
    case "build-javascript":
      const app = config._config.entry.app
      config._config.entry.app = [require.resolve("./polyfill"), app]

      break
    default:
      break
  }

  return config;
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