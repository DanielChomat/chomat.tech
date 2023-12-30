import styled from "styled-components"
import { Flex } from "./Grid"

export const SocialLinksContainer = styled(Flex)`
  min-width: 260px;
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
  width: 30%;

  align-items: center;

  gap: 30px;

  a {
    img {
      width: 100%;
      max-width: 4.8rem;
    }
  }
`
