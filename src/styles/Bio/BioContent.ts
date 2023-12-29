import styled from "styled-components"
import { Content } from "../Content"

export const BioContent = styled(Content)`
  font-size: 2.4rem;
  line-height: 1.4;
  width: 90%;
  max-width: 90rem;

  strong {
    color: var(--typo-color-black, #fff);
  }
`
