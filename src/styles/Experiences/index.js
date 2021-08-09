import styled from "styled-components"

const defaultShadow = "#64646f33 0px 7px 29px 0px"

export const Experience = styled.article`
  flex: 1 1 calc(33% - 20px);
  background-color: #fff;
  border-radius: 20px;
  padding: 1.6rem 2.4rem;
  position: relative;

  color: var(--color-black);

  --experience-box-shadow: var(--color-green) 0px 7px 29px 0px;

  box-shadow: #64646f33 0px 7px 29px 0px;

  ${props =>
    props.featured
      ? `
    flex-basis: 100%;

    box-shadow: var(--color-green) 0px 7px 29px 0px;

    // animation-name: boxShadowRainbow;
    animation-name: borderRainbow;
    animation-fill-mode: both;
    animation-duration: 7000ms;
    animation-delay: 500ms;
    animation-iteration-count: infinite;
  `
      : ""} @keyframes boxShadowRainbow {
    0% {
      box-shadow: var(--color-green) 0px 7px 29px 0px;
    }

    33% {
      box-shadow: var(--color-red) 0px 7px 29px 0px;
    }

    66% {
      box-shadow: var(--color-purple) 0px 7px 29px 0px;
    }

    99% {
      box-shadow: var(--color-green) 0px 7px 29px 0px;
    }

    100% {
      box-shadow: var(--color-green) 0px 7px 29px 0px;
    }
  }
  @keyframes borderRainbow {
    0% {
      box-shadow: inset var(--color-green) 0px 0 0 5px, ${defaultShadow};
    }
    16.6667% {
      box-shadow: inset var(--color-yellow) 0px 0 0 5px, ${defaultShadow};
    }

    33.3334% {
      box-shadow: inset var(--color-orange) 0px 0 0 5px, ${defaultShadow};
    }

    50.0001% {
      box-shadow: inset var(--color-red) 0px 0 0 5px, ${defaultShadow};
    }

    66.6668% {
      box-shadow: inset var(--color-purple) 0px 0 0 5px, ${defaultShadow};
    }

    83.3335% {
      box-shadow: inset var(--color-blue) 0px 0 0 5px, ${defaultShadow};
    }

    100% {
      box-shadow: inset var(--color-green) 0px 0 0 5px, ${defaultShadow};
    }
  }
  @media only screen and(max-width: 768 px) {
    flex-basis: calc(50% - 20px);
  }

  @media only screen and (max-width: 567px) {
    flex-basis: 100%;
  }

  h3,
  h4,
  h5,
  h6 {
    text-align: left;
    margin-bottom: 0;
  }

  h3 {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;

    div {
      display: flex;
      gap: 1.6rem;
      margin-left: auto;
    }

    svg {
      height: ${props => (props.project ? "2.4rem" : "4rem")};
    }
  }

  h4 {
    color: var(--color-purple);

    small {
      font-size: 0.55em;
    }
  }

  h5 {
    color: var(--color-purple);
  }

  a {
    svg {
      transition: cubic-bezier(0.33, 4, 0.3, 0.985);
    }
    &:hover {
      transform: scale(1.2);
    }
  }

  details {
    border-bottom: 2px solid var(--color-orange);
    border-top: 2px solid var(--color-orange);
    padding: 0.8rem 0;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;

    &[open] {
      & > summary {
        &:hover {
          &::after {
            transform: rotate(0deg) scale(1.2);
          }
        }

        &:after {
          width: 18px;
          height: 18px;
          transform: rotate(0deg);
        }
      }

      .content {
        opacity: 1;
      }
    }

    .content {
      transition: all 1250ms ease-in-out;
      opacity: 0;

      font-size: 1.8rem;
      line-height: 1.2;
      font-weight: 100;
      color: #585c5f;
      padding: 0.8rem 0;
    }

    summary {
      font-size: 1.8rem;
      line-height: 1.2;
      padding: 4px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;

      color: var(--color-purple);

      justify-content: space-between;

      &:hover {
        &::after {
          transform: rotate(-55deg) scale(1.2);
        }
      }

      &::after {
        content: "";
        width: 16px;
        height: 16px;
        display: block;
        background-image: url(${require("../../../content/assets/arrow-sketch.svg")
          .default});
        background-repeat: no-repeat;
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
      color: var(--color-purple);
      background-color: var(--color-yellow);
      border-radius: 5px;
      text-align: center;
      padding: 6px 8px;
    }
  }
`
