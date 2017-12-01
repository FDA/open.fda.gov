module.exports = {
  siteMetadata: {
    title: `openFDA`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: ["gatsby-remark-copy-linked-files"],
      },
    },
    `gatsby-plugin-stylus`,
    `gatsby-plugin-react-helmet`
  ],
}
