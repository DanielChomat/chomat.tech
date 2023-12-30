import styled from "styled-components"
import { Flex } from "../Grid"

export const BioContainer = styled(Flex)`
  gap: 1.6rem;
  justify-content: space-between;

  flex-wrap: nowrap;

  @media only screen and (max-width: 567px) {
    flex-wrap: wrap;
  }

  & > *:first-child {
    flex: 0 1 75%;

    @media only screen and (max-width: 567px) {
      order: 1;
      flex-grow: 1;
    }
  }

  & > div:nth-child(2n) {
    flex: 1 0 25%;

    @media only screen and (max-width: 567px) {
      order: 0;
    }
  }
`
