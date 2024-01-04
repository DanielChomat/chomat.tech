import { ProjectDetails } from "../../../types"
import { FixedPortableText } from "../../FixedPortableText"
import { Content } from "../../../styles/Content"

type Props = {
  details: ProjectDetails
}

export const ExperienceDetails = ({ details }: Props) => {
  const summaryExtended = details?.summaryExtended

  const hasContent = !!details?.content

  return (
    <details>
      <summary title={"Planning to implement WAAPI for smoother opening"}>
        <Content as={"span"}>
          <FixedPortableText value={summaryExtended} />
        </Content>
      </summary>
      {hasContent && (
        <Content $isDetails>
          <FixedPortableText value={details?.content} />
        </Content>
      )}
    </details>
  )
}
