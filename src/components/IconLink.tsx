import { ComponentType } from "react"

type WithIconComponent = {
  iconUrl?: string
  Icon: ComponentType
}

type WithIconUrl = {
  iconUrl: string
  Icon?: ComponentType
}

type Props = {
  link: string
  inverted?: boolean
} & (WithIconComponent | WithIconUrl)

export const IconLink = ({ link, inverted = false, iconUrl, Icon }: Props) => {
  const iconLinkElement = Icon ? (
    <Icon />
  ) : (
    <img src={iconUrl} alt={link} className={inverted ? "inverted" : ""} />
  )

  return (
    <a
      href={link}
      className={"link--icon"}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      {iconLinkElement}
    </a>
  )
}
