import styled from "styled-components"

export const Experience = styled.article`
  max-width: calc(33% - 20px);
  flex: 0 1 calc(33% - 20px);
  background-color: #fff;
  border-radius: 20px;
  padding: 1.6rem 2.4rem;
  position: relative;

  h3,
  h4,
  h5,
  h6 {
    text-align: left;
    margin-bottom: 0;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    svg {
      height: 4rem;
    }
  }

  h4 {
    small {
      font-size: 0.5em;
    }
  }

  details {
    margin-bottom: 0.8rem;

    &[open] > summary {
      &:hover {
        &::before {
          transform: rotate(0deg);
        }
      }

      &:before {
        transform: rotate(0deg);
      }
    }

    .content {
      transition: all 1250ms ease-in-out;
      opacity: 0;

      font-style: italic;
      font-weight: 100;
    }

    &[open] {
      .content {
        opacity: 1;
      }
    }

    summary {
      padding: 4px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;

      &:hover {
        &::before {
          transform: rotate(-55deg) scale(1.2);
        }
      }

      &::before {
        content: "";
        width: 16px;
        height: 16px;
        display: block;
        background-image: url(${require("../../../content/assets/triangle.svg")
          .default});
        background-image: url(${require("../../../content/assets/arrow-sketch.svg")
          .default});
        background-size: contain;
        margin-bottom: 4px;

        transform: rotate(-90deg);
        transition: 0.3s transform ease-in-out;
      }

      &::-webkit-details-marker,
      &::marker {
        display: none;
        content: none;
      }
    }
  }

  section {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 0.8rem;

    span {
      color: #00d4ff;
      background-color: #a25fe4;
      border-radius: 5px;
      text-align: center;
      padding: 6px 8px;
    }
  }
`
