module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`
  ]
}
