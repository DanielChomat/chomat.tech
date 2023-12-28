import { graphql } from "gatsby"

export const ImageItemFragment = graphql`
  fragment ImageItem on SanityImage {
    asset {
      url
    }
  }
`

export const CompanyItemFragment = graphql`
  fragment CompanyItem on SanityCompany {
    link
    name
    description
    logo {
      ...ImageItem
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

export const BioItemFragment = graphql`
  fragment BioItem on SanityBio {
    id
    bioStuff {
      mainTitle
      socials {
        icon {
          ...ImageItem
        }
        url
        name
      }
      prelog: _rawPrelog(resolveReferences: { maxDepth: 5 })
    }
    about: _rawAbout(resolveReferences: { maxDepth: 5 })
    pageMetadata {
      title
      description
    }
  }
`

export const BioSiteItemFragment = graphql`
  fragment BioSiteItem on Site {
    siteMetadata {
      title
      description
      siteUrl
      author {
        name
        summary
      }
      social {
        linkedin
        github
        instagram
      }
    }
  }
`
