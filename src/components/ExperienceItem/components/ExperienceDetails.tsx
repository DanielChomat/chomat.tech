import { ProjectDetails } from "../../../types"
import { FixedPortableText } from "../../FixedPortableText"

type Props = {
  details: ProjectDetails
}

export const ExperienceDetails = ({ details }: Props) => {
  const summary = details?.summary

  const hasContent = !!details?.content

  return (
    <details>
      <summary title={"Planning to implement WAAPI for smoother opening"}>
        <span>{summary}</span>
      </summary>
      {hasContent && (
        <div className="content">
          <FixedPortableText value={details?.content} />
        </div>
      )}
    </details>
  )
}
