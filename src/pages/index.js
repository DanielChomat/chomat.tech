import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Experiences from "../components/Experiences"
import Projects from "../components/Projects"

const titleClaims = "Why u here?! Wanna hire me?! 🥴 Hit me up on my socials!"

const HomePage = ({ data, location }) => {
  // const posts = data.allMarkdownRemark.edges

  useEffect(() => {
    const titleScroller = text => {
      document.title = text
      setTimeout(function () {
        titleScroller(text.substr(1) + text.substr(0, 1))
      }, 500)
    }

    titleScroller(titleClaims)
  }, [])

  return (
    <Layout location={location} title={titleClaims}>
      <Seo title={titleClaims} />
      <Bio />
      <Experiences />
      <Projects />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
