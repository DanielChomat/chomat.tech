import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { Bio } from "../components/Bio";
import { WorkExperiencesSection } from "../containers/WorkExperiencesSection";
import { ProjectsSection } from "../containers/ProjectsSection";

// const _titleClaims =
//   "Hi there! Welcome! Please be patient, this page is still a WIP. Thank you! "

const HomePage = () => {

  return (
    <Layout >
      {/*
        // TODO: Refactor the Seo component using new approach with Gatsby and Head component
        <Seo title={titleClaims} />
      */}
      <Bio />
      <WorkExperiencesSection />
      <ProjectsSection />
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
