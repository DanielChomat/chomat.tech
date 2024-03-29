import type { GatsbyConfig } from "gatsby"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: process.env.SANITY_STUDIO_TITLE,
    author: {
      name: `Daniel Chomat`,
      summary: `Overall playground for all things code and web development`,
    },
    description: `Developer's personal website and public playground to try new & cool stuff`,
    siteUrl: `https://chomat.tech`,
    social: {
      linkedin: "danielchomat",
      github: "DanielChomat",
      instagram: ``,
    },
  },
  graphqlTypegen: true,
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
        projectId: process.env.SANITY_STUDIO_PROJECT_ID,
        dataset: process.env.SANITY_STUDIO_DATASET,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

export default config
