import styled from "styled-components"

export const ExperienceGrid = styled.div`
  display: grid;

  align-items: start;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 30px;
  column-gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
    //row-gap: 20px;
  }

  & > * {
    grid-column: span 2;

    @media (min-width: 768px) {
      &:first-child {
        grid-column: span 4;
      }

      &:nth-child(2) {
        grid-column: span 2;
      }
    }

    @media (min-width: 1200px) {
      grid-column: span 2;

      &:first-child,
      &:nth-child(2) {
        grid-column: span 3;
      }
    }
  }
`
