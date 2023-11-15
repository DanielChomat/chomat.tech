import { PortableText } from "@portabletext/react";

import { ProjectDetails } from "../../../types";
import { PortableTextBlock } from "@portabletext/types";

type Props = {
  details: ProjectDetails
}

export const ExperienceDetails = ({details}: Props) => {
  const summary = details?.summary
  // TODO: This could probably be solved migrating to a different framework (Next.JS)
  //@ts-ignore Eeeek
  const content: PortableTextBlock[]  = details?.content

  const hasContent = !!content;


  return (
    <details>
      <summary title={"Planning to implement WAAPI for smoother opening"}>
        {summary}
      </summary>
      {hasContent &&
        <div className="content">
          <PortableText value={content} />
        </div>
      }
    </details>
  )
}