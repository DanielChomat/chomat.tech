import { PortableTextBlock } from "@portabletext/types"
import { PortableText } from "@portabletext/react"

type Props = {
  value:
    | Queries.Maybe<readonly Queries.Maybe<Queries.SanityBlock>[]>
    | undefined
}

export const FixedPortableText = ({ value }: Props) => {
  // TODO: This could probably be solved migrating to a different framework (Next.JS)
  //@ts-expect-error Eeeek
  const fixedValue: PortableTextBlock[] = value

  return <PortableText value={fixedValue} />
}
