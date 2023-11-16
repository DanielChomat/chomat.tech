import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "@portabletext/types"

import { ProjectDetails } from "../../../types"

type Props = {
  details: ProjectDetails
}

export const ExperienceDetails = ({ details }: Props) => {
  const summary = details?.summary

  // TODO: This could probably be solved migrating to a different framework (Next.JS)
  //@ts-expect-error Eeeek
  const content: PortableTextBlock[] = details?.content

  const hasContent = !!content

  return (
    <details>
      <summary title={"Planning to implement WAAPI for smoother opening"}>
        <span>{summary}</span>
      </summary>
      {hasContent && (
        <div className="content">
          <PortableText value={content} />
        </div>
      )}
    </details>
  )
}
