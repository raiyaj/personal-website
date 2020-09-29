module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Yantramanav`
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src`,
        name: `src`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`
  ]
}
