import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const { site, allSanityBio } = useStaticQuery(graphql`
    query {
      site {
        ...BioSiteItem
      }
      allSanityBio {
        nodes {
          pageMetadata {
            title
            description
          }
        }
      }
    }
  `)

  const sanityMetadata: Queries.SanityPageMetadata =
    allSanityBio.nodes[0].pageMetadata

  return { gatsbyMetadata: site.siteMetadata, sanityMetadata }
}
