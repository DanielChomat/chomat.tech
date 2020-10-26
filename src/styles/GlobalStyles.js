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
    --bgColorRed: #D93128;
    --bgColorBlueLight: #00D4FF;
    --bgColorBlue: #0D34B3;
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
    
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    
    font-size: 1.6rem;
    
    background: 
      linear-gradient(115deg, transparent 0%, var(--bgColorBlueLight, #00D4FF) 0%, var(--bgColorBlueLight, #00D4FF) 170px, transparent 171px), 
      linear-gradient(160deg, transparent 0%, var(--bgColorYellow, #FCD45C) 0%, var(--bgColorYellow, #FCD45C) 320px, transparent 321px), 
      linear-gradient(220deg, transparent 0%, var(--bgColorGreen, #1CC761) 0%, var(--bgColorGreen, #1CC761) 170px, transparent 171px), 
      linear-gradient(10deg, transparent 0%, var(--bgColorGreen, #1CC761) 0%, var(--bgColorGreen, #1CC761) 170px, transparent 171px),
      linear-gradient(-70deg, transparent 0%, var(--bgColorRed, #D93128) 0%, var(--bgColorRed, #D93128) 170px, transparent 171px)  
      no-repeat;
  }
  
  a {
    font-size: 3rem;
    text-decoration: none;
    
    &, &:link, &:visited {
      color: rebeccapurple;
    }
    
    position: relative;
    
    &:after {
      content: "";
      
      position: absolute;
      bottom: -10px;
      right: 0;
      
      width: 0;
      height: 5px;
      
      background-color: rebeccapurple;
      transition: all 250ms ease-in-out;
    }
    
    &:hover {
      &::after {
        left: 0;
        right: auto;
        width: 100%;
      
      }
    }
  }
`

export default GlobalStyles
