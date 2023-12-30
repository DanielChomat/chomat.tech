import { graphql, useStaticQuery } from "gatsby"
import {
  BioContent,
  BioSocialItem,
  BioSocialItemLocal,
  BioStuff,
} from "../../types"

export const useGetBioData = () => {
  const data = useStaticQuery(getBioGraphQLQuery)

  const bioContent: BioContent = data.allSanityBio.nodes[0]

  const bioStuff: BioStuff | null = bioContent.bioStuff

  const prelog = bioStuff?.prelog
  const profilePictureUrl = bioStuff?.profilePicture?.asset?.url

  const maybeSocials: (BioSocialItem | null | undefined)[] = [
    ...(bioStuff?.socials ?? []),
  ]
  const bioSocials: BioSocialItemLocal[] = maybeSocials
    ?.map(social => {
      if (!social || !social.icon?.asset?.url) return undefined

      return {
        name: social.name,
        url: social.url,
        iconUrl: social.icon.asset.url,
      }
    })
    .filter((item): item is BioSocialItemLocal => item !== undefined)

  const about = bioContent?.about

  return {
    bioStuff,
    prelog,
    profilePictureUrl,
    bioSocials,
    about,
  }
}

const getBioGraphQLQuery = graphql`
  query BioQuery {
    allSanityBio(limit: 10) {
      nodes {
        ...BioItem
      }
    }
  }
`
