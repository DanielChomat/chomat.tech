const {
  SANITY_STUDIO_TITLE,
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
} = require("./src/environment")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: SANITY_STUDIO_TITLE,
    author: {
      name: `Daniel Chomat`,
      summary: `Overall playground for all things code and web development`,
    },
    description: `This is a blog with quick tips, information about it's creator and his journey through the world. Also his playground to try stuff.`,
    siteUrl: `https://chomat.tech`,
    social: {
      linkedin: "danielchomat",
      github: "DanielChomat",
      instagram: ``,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Yanone Kaffeesatz: 200, 300, 400, 500, 600, 700, 800, 900`],
        display: `swap`,
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: SANITY_STUDIO_PROJECT_ID,
        dataset: SANITY_STUDIO_DATASET,
        // apiVersion: "2021-03-25",
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",

        watchMode: process.env.SANITY_WATCH_MODE,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `chomat.tech Blog`,
        short_name: `chomat.tech`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/shaka-emoji.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
