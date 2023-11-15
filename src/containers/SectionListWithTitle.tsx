import { ReactNode } from "react"
import { Flex } from "../styles/Grid"

type Props = {
  title: string
  children: ReactNode
}

export const SectionListWithTitle = ({ title, children }: Props) => {
  return (
    <section>
      <h2 className={"text-left"}>{title}</h2>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        gap={"30px"}
      >
        {children}
      </Flex>
    </section>
  )
}
