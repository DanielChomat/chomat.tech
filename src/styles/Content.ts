import styled from "styled-components"

interface ContentProps {
  readonly $isDetails?: boolean
}

export const Content = styled.article<ContentProps>`
  font-size: 1.8rem;
  line-height: 1.2;
  font-weight: 100;
  color: ${props => (props.$isDetails ? "var(--typo-color-grey)" : "inherit")};

  white-space: pre-wrap;

  padding-top: ${props => (props.$isDetails ? "1rem" : "0")};

  & > * {
    &:not(:last-child):not(h5) {
      margin-bottom: 1rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  strong {
    font-weight: bold;
  }
`
