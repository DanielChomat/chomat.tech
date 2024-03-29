import { ProjectLinks } from "../../../types"
import { IconLink } from "../../IconLink"
import { CodeIcon, WebsiteIcon } from "../../../icons"

type Props = {
  links: ProjectLinks
}

export const ExperienceLinks = ({ links }: Props) => {
  const codeLink = links.code
  const websiteLink = links.live

  return (
    <div>
      {codeLink && <IconLink link={codeLink} Icon={CodeIcon} />}
      {websiteLink && <IconLink link={websiteLink} Icon={WebsiteIcon} />}
    </div>
  )
}
