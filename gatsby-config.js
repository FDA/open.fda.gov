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
    `gatsby-plugin-stylus`,
    `gatsby-plugin-react-helmet`
  ],
}
