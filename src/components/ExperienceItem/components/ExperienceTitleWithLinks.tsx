import { ExperienceLinks } from "./ExperienceLinks"

import { Project } from "../../../types"

type Props = {
  experience: Project
}

export const ExperienceTitleWithLinks = ({ experience }: Props) => {
  const { position, company, links } = experience

  const companyLink = company?.link
  const companyName = company?.name
  const companyLogoUrl = company?.logo?.asset?.url

  const companyNameElement = companyLogoUrl ? (
    <img src={companyLogoUrl} alt={companyName ?? ""} />
  ) : undefined

  const getCompanyElement = () => {
    if ((!companyName && !companyLogoUrl) || !companyLink) return undefined

    return (
      <a href={companyLink} target={"_blank"} rel={"noopener noreferrer"}>
        {companyNameElement}
      </a>
    )
  }

  const companyInnerElement = getCompanyElement()

  const companyElement = companyInnerElement ? companyInnerElement : undefined

  return (
    <h3>
      {position}
      {companyElement}
      {links && <ExperienceLinks links={links} />}
    </h3>
  )
}
