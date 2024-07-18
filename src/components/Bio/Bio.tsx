import { Flex } from "../../styles/Grid"
import { useGetBioData } from "./useGetBioData"
import { FixedPortableText } from "../FixedPortableText"
import { ProfilePicture } from "../../styles/Bio/ProfilePicture"
import { BioContainer } from "../../styles/Bio/BioContainer"
import { SocialLinksContainer } from "../../styles/SocialLinksContainer"
import { IconLink } from "../IconLink"
import { BioContent } from "../../styles/Bio/BioContent"

export const Bio = () => {
  const { bioStuff, prelog, profilePictureUrl, bioSocials, about } =
    useGetBioData()

  const mainHeading = bioStuff?.mainTitle
  const hasBioSocials = !!bioSocials.length

  return (
    <BioContainer>
      <Flex as={"section"} $flexDirection={"column"}>
        {!!mainHeading && <h1>{mainHeading}</h1>}
        {prelog && <FixedPortableText value={prelog} />}

        {hasBioSocials && (
          <SocialLinksContainer>
            {bioSocials?.map(item => (
              <IconLink
                key={item.url}
                link={item.url}
                inverted={item.name === "GitHub"}
                iconUrl={item.iconUrl}
              />
            ))}
          </SocialLinksContainer>
        )}

        {about && (
          <BioContent>
            <FixedPortableText value={about} />
          </BioContent>
        )}
      </Flex>
      {profilePictureUrl && (
        <ProfilePicture>
          <img src={profilePictureUrl} alt={"Profile picture of the author"} />
        </ProfilePicture>
      )}
    </BioContainer>
  )
}
