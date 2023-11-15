import { ComponentType } from "react"

type Props = {
  link: string
  Icon: ComponentType
}

export const IconLink = ({ link, Icon }: Props) => {
  return (
    <a href={link} target={"_blank"} rel={"noopener noreferrer"}>
      <Icon />
    </a>
  )
}
