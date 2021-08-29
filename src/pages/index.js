import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Experiences from "../components/Experiences"
import Projects from "../components/Projects"

const titleClaims =
  "Hi there! Welcome! Please be patient, this page is still a WIP. Thank you! "

const HomePage = ({ data, location }) => {
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
  }
`
