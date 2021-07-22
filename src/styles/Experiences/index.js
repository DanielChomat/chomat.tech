import styled from "styled-components"

export const Experience = styled.article`
  flex: 1 1 calc(33% - 20px);
  background-color: #fff;
  border-radius: 20px;
  padding: 1.6rem 2.4rem;
  position: relative;

  color: var(--color-black);

  box-shadow: #64646f33 0px 7px 29px 0px;

  &:first-of-type {
    flex-basis: 100%;

    animation-name: boxShadowRainbow;
    animation-fill-mode: both;
    animation-duration: 7000ms;
    animation-delay: 500ms;
    animation-iteration-count: infinite;
  }

  @keyframes boxShadowRainbow {
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

  @media only screen and (max-width: 768px) {
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
    justify-content: space-between;
    flex-wrap: nowrap;

    svg {
      height: 4rem;
    }
  }

  h4 {
    color: var(--color-purple);

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

      color: var(--color-purple);

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
      color: var(--color-purple);
      background-color: var(--color-yellow);
      border-radius: 5px;
      text-align: center;
      padding: 6px 8px;
    }
  }
`
