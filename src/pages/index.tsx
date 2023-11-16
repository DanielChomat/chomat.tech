import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { Bio } from "../components/Bio"
import { WorkExperiencesSection } from "../containers/WorkExperiencesSection"
import { ProjectsSection } from "../containers/ProjectsSection"
import { Seo } from "../components/Seo/Seo"

const titleClaims = "Daniel Chomat | 📱 Front End Dev | chomat.tech"

const HomePage = () => {
  return (
    <Layout>
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

export const Head = () => <Seo title={titleClaims} />

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
