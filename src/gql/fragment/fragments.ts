import { graphql } from "gatsby"

export const CompanyItemFragment = graphql`
  fragment CompanyItem on SanityCompany {
    link
    name
    description
    logo {
      asset {
        url
      }
    }
  }
`

export const DetailsItemFragment = graphql`
  fragment DetailsItem on SanityDetails {
    content: _rawContent(resolveReferences: { maxDepth: 5 })
    summary
  }
`

export const OverallExperienceItemFragment = graphql`
  fragment OverallExperienceItem on SanityProject {
    featured
    position
    company {
      ...CompanyItem
    }
    timeOfEmployment {
      end(formatString: "MMMM of YYYY")
      start(formatString: "MMMM of YYYY")
    }
    type
    tags
    tech
    details {
      ...DetailsItem
    }
  }
`

export const WorkExperienceItemFragment = graphql`
  fragment WorkExperienceItem on SanityProject {
    ...OverallExperienceItem
  }
`

export const ProjectItemFragment = graphql`
  fragment ProjectItem on SanityProject {
    ...OverallExperienceItem
    links {
      live
      code
    }
  }
`
