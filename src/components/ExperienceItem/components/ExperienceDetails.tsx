import { ProjectDetails } from "../../../types"
import { FixedPortableText } from "../../FixedPortableText"
import { Content } from "../../../styles/Content"
import { useAnimateDetailsElement } from "../hooks/useAnimateDetailsElement"

type Props = {
  details: ProjectDetails
}

export const ExperienceDetails = ({ details }: Props) => {
  const { detailsRef, summaryRef, contentRef, handleClick } =
    useAnimateDetailsElement()

  const summaryExtended = details?.summaryExtended

  const hasContent = !!details?.content

  if (!hasContent) {
    return (
      <details ref={detailsRef}>
        <summary>
          <Content as={"span"}>
            <FixedPortableText value={summaryExtended} />
          </Content>
        </summary>
      </details>
    )
  }

  return (
    <details ref={detailsRef}>
      <summary
        ref={summaryRef}
        className={"summary--with-content"}
        onClick={handleClick}
      >
        <Content as={"span"}>
          <FixedPortableText value={summaryExtended} />
        </Content>
      </summary>
      <Content ref={contentRef} $isDetails>
        <FixedPortableText value={details.content} />
      </Content>
    </details>
  )
}
