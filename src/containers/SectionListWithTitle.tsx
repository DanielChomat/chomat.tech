import { ReactNode } from "react"
import { ExperienceGrid } from "../styles/Grid/ExperienceGrid"

type Props = {
  title: string
  children: ReactNode
}

export const SectionListWithTitle = ({ title, children }: Props) => {
  return (
    <section>
      <h2 className={"text-left"}>{title}</h2>
      <ExperienceGrid>{children}</ExperienceGrid>
    </section>
  )
}
