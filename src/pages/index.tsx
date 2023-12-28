import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { WorkExperiencesSection } from "../containers/WorkExperiencesSection"
import { ProjectsSection } from "../containers/ProjectsSection"
import { Seo } from "../components/Seo/Seo"
import { Bio } from "../components/Bio/Bio"

const titleClaims = "Daniel Chomat | 📱 Front End Dev | chomat.tech"

const HomePage = () => {
  return (
    <Layout>
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
