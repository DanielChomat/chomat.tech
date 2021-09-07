import styled from "styled-components"
import { variant } from "styled-system"

export const ExperienceStyle = styled.article`
  flex: 1 1 calc(33% - 2rem);
  background-color: #fff;
  border-radius: 20px;
  padding: 1.6rem 2.4rem;
  position: relative;

  color: var(--color-black);

  --experience-box-shadow: var(--color-green) 0px 7px 29px 0px;

  box-shadow: ${props => props.theme.shadows.default};

  @media only screen and (max-width: 768px) {
    flex-basis: calc(50% - 2rem);
  }

  @media only screen and (max-width: 567px) {
    flex-basis: 100%;
  }

  ${variant({
    prop: "featured",
    variants: {
      true: {
        flexBasis: "100%",
        maxWidth: 960,
        marginLeft: "auto",
        marginRight: "auto",

        boxShadow: "var(--color-green) 0px 7px 29px 0px",

        // animationName: "borderRainbow",
        // animationFillMode: "both",
        // animationDuration: "10000ms",
        // animationDelay: "500ms",
        // animationIterationCount: "infinite",

        overflow: "hidden",

        "@media only screen and (max-width: 768px)": {
          flexBasis: "100%",
        },
        "&::after": {
          content: `"Current"`,
          position: "absolute",
          bottom: -22,
          right: -36,

          padding: "1.6rem 6rem 4rem",

          fontSize: "2.4rem",
          lineHeight: 1.2,
          fontWeight: 600,
          letterSpacing: "0.05em",

          textAlign: "center",
          textTransform: "uppercase",

          transform: "rotate3d(0, 0, 1, -45deg)",
          transformOrigin: "top",

          backgroundColor: "var(--color-green)",
        },
      },
    },
  })};

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
      padding-left: 1.6rem;
      margin-left: auto;
      max-height: 4rem;

      img,
      svg {
        height: ${props => (props.project ? "2.8rem" : "4rem")};
      }
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

  small {
    font-size: 1.4rem;
  }

  a {
    transition: all 750ms cubic-bezier(0.33, 4, 0.3, 0.985);

    img,
    svg {
      filter: invert(40%) sepia(49%) saturate(2045%) hue-rotate(239deg)
        brightness(94%) contrast(91%);

      transition: all 300ms ease-in-out;
      path {
        transition: all 300ms ease-in-out;
      }
    }

    &::after {
      content: none;
    }

    &:hover {
      img,
      svg {
        filter: invert(78%) sepia(59%) saturate(2854%) hue-rotate(118deg)
          brightness(99%) contrast(105%);
        path {
          //fill: var(--color-green);
        }
      }

      transform: scale(1.1);
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
          width: 1.8rem;
          height: 1.8rem;
          transform: rotate(0deg);
        }
      }

      & > div {
        opacity: 1;
      }
    }

    & > div {
      transition: all 1250ms ease-in-out;
      opacity: 0;

      font-size: 1.8rem;
      line-height: 1.2;
      font-weight: 100;
      color: #585c5f;
      padding: 0.8rem 0;

      white-space: pre-wrap;
    }

    summary {
      font-size: 1.8rem;
      line-height: 1.2;
      padding: 0.4rem 0;
      display: flex;
      align-items: center;
      gap: 0.4rem;
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
        width: 1.6rem;
        height: 1.6rem;
        display: block;
        background-image: url(${require("../../content/assets/arrow-sketch.svg")
          .default});
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: 0.4rem;

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
    padding-right: 8rem;
    div {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 0.8rem;

      span {
        color: var(--color-purple);
        background-color: var(--color-yellow);
        border-radius: 5px;
        text-align: center;
        padding: 0.6rem 0.8rem;
      }
    }
  }
`