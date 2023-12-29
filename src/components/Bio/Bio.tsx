import { IconLink } from "../IconLink"

import { Flex } from "../../styles/Grid"
import { SocialLinksContainer } from "../../styles/SocialLinksContainer"
import { useGetBioData } from "./useGetBioData"
import { FixedPortableText } from "../FixedPortableText"
import { BioContent } from "../../styles/Bio/BioContent"

export const Bio = () => {
  const { bioStuff, prelog, bioSocials, about } = useGetBioData()

  return (
    <Flex as={"section"} $flexDirection={"column"} $alignItems={"center"}>
      <h1>{bioStuff?.mainTitle}</h1>
      <FixedPortableText value={prelog} />

      <SocialLinksContainer>
        {bioSocials?.map(item => (
          <IconLink
            link={item.url}
            inverted={item.name === "GitHub"}
            iconUrl={item.iconUrl}
          />
        ))}
      </SocialLinksContainer>

      <BioContent className={"text-center"}>
        <FixedPortableText value={about} />
      </BioContent>
    </Flex>
  )
}
