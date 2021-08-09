import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {

    --amethyst: #9b5de5ff;
    --magenta-crayola: #f15bb5ff;
    --minion-yellow: #fee440ff;
    --capri: #00bbf9ff;
    --sea-green-crayola: #00f5d4ff;
    --raisin-black: #212738ff;
    --ghost-white: #f7f7ffff;
    --red-orange-color-wheel: #fb5012ff;
    --orange-soda: #F55D3E;
    --davys-grey: #585C5Fff;

    --color-white: var(--ghost-white);
    --color-black: var(--raisin-black);
    --color-green: var(--sea-green-crayola);
    --color-yellow: var(--minion-yellow);
    --color-blue: var(--capri);
    --color-blue-light: var(--capri);
    --color-red: var(--magenta-crayola);
    --color-purple: var(--amethyst);
    --color-orange: var(--orange-soda);
    --color-grey: var(--davys-grey);

    --baseFontSize: 62.5%;

    @media only screen and (max-width: 969px) {
      --baseFontSize: 50%;
    }

    font-size: var(--baseFontSize, 62.5%);
  }

  body {
    margin: 0;
    min-height: 100vh;
    height: 100%;
    color: var(--color-purple);

    font-family: 'Yanone Kaffeesatz', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 1.6rem;

    background: linear-gradient(195deg, transparent 0%, var(--color-green, #FCD45C) 0%, var(--color-green, #FCD45C) 220px, transparent 221px) no-repeat,
    linear-gradient(145deg, transparent 0%, var(--color-purple, #A25FE4) 0%, var(--color-purple, #A25FE4) 170px, transparent 171px) no-repeat,
    linear-gradient(10deg, transparent 0%, var(--color-yellow, #1CC761) 0%, var(--color-yellow, #1CC761) 170px, transparent 171px) no-repeat,
    linear-gradient(60deg, transparent 0%, var(--color-blue-light, #00D4FF) 0%, var(--color-blue-light, #00D4FF) 230px, transparent 231px) no-repeat,
    linear-gradient(-70deg, transparent 0%, var(--color-red, #FE8280) 0%, var(--color-red, #FE8280) 170px, transparent 171px) no-repeat,
    var(--color-white) no-repeat;


    @media only screen and (max-width: 567px) {
      background: linear-gradient(195deg, transparent 0%, var(--color-green, #FCD45C) 0%, var(--color-green, #FCD45C) 28vw, transparent calc(28vw + 1px)) no-repeat,
      linear-gradient(145deg, transparent 0%, var(--color-purple, #A25FE4) 0%, var(--color-purple, #A25FE4) 20vw, transparent calc(20vw + 1px)) no-repeat,
      linear-gradient(10deg, transparent 0%, var(--color-yellow, #1CC761) 0%, var(--color-yellow, #1CC761) 170px, transparent 171px) no-repeat,
      linear-gradient(60deg, transparent 0%, var(--color-blue-light, #00D4FF) 0%, var(--color-blue-light, #00D4FF) 230px, transparent 231px) no-repeat,
      linear-gradient(-70deg, transparent 0%, var(--color-red, #FE8280) 0%, var(--color-red, #FE8280) 170px, transparent 171px) no-repeat,
      var(--color-white) no-repeat;
    }
  }

  a {
    text-decoration: none;

    &, &:link, &:visited {
      //color: #fdde81;
      //color: #d1efed;
      color: inherit;
    }

    position: relative;

    &:after {
      content: "";

      position: absolute;
      bottom: -.2em;
      right: 0;

      width: 0;
      height: .15em;

      background-color: var(--color-green);
      transition: all 250ms ease-in-out;
      border-radius: .2em;
    }

    &[target="_blank"] {
      &::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1.8rem;
        height: 1.8rem;
        //background-color: red;
        border-radius: 4px;

        opacity: 0;
        visibility: hidden;

        transition: all 250ms ease-in-out;

        background: url(${
          require("../../content/assets/resize.svg").default
        }) no-repeat 65% / 14px 14px, #21273880;
      }

      &:hover {
        &::before {
          opacity: 1;
          visibility: visible;
        }
      }

    }

    &:hover {
      &::after {
        left: 0;
        right: auto;
        width: 100%;

      }
    }
  }

  h1, h2, h3, h4 {
    text-align: center;

    svg {
      height: 1.2em;
      vertical-align: middle;
    }
  }

  h1 {
    font-size: 8.4rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 6.4rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 3.6rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 2.8rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .text-left {
    text-align: left;
  }

  /*svg circle {
    stroke-dasharray: 301.59px 301.59px;
    stroke-dashoffset: 301.59px;
    transition: all 0.8s;
    transition-timing-function: cubic-bezier(.4,.08,0,.97);
  }
  svg:hover circle {
    stroke-dashoffset: 0;
  }*/
`

export default GlobalStyles
