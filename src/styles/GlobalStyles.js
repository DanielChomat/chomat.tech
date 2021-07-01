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
    --colorMain: purple;

    --colorPrimary: #FFF;

    // Background gradient colors 
    --bgColorGreen: #1CC761;
    --bgColorYellow: #FFDC10;
    --bgColorBlack: #1A1A18;
    --bgColorRed: #FE8280;
    --bgColorBlueLight: #00D4FF;
    --bgColorBlue: #34CEFF;
    --bgColorPurple: #A25FE4;

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
    color: purple;

    font-family: 'Yanone Kaffeesatz', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 1.6rem;

    background: linear-gradient(195deg, transparent 0%, var(--bgColorRed, #FCD45C) 0%, var(--bgColorRed, #FCD45C) 220px, transparent 221px) no-repeat,
    linear-gradient(145deg, transparent 0%, var(--bgColorPurple, #A25FE4) 0%, var(--bgColorPurple, #A25FE4) 170px, transparent 171px) no-repeat,
    linear-gradient(10deg, transparent 0%, var(--bgColorYellow, #1CC761) 0%, var(--bgColorYellow, #1CC761) 170px, transparent 171px) no-repeat,
    linear-gradient(60deg, transparent 0%, var(--bgColorBlueLight, #00D4FF) 0%, var(--bgColorBlueLight, #00D4FF) 230px, transparent 231px) no-repeat,
    linear-gradient(-70deg, transparent 0%, var(--bgColorGreen, #FE8280) 0%, var(--bgColorGreen, #FE8280) 170px, transparent 171px) no-repeat,
    #d1efed no-repeat;
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

      background-color: var(--bgColorGreen);
      transition: all 250ms ease-in-out;
      border-radius: .2em;
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
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 2.4rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
`

export default GlobalStyles
