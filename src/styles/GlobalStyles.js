import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  
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
  }

  body {
    min-height: 100vh;
    height: 100%;
    color: purple;
    
    background: 
      linear-gradient(115deg, transparent 0%, var(--bgColorBlueLight, #00D4FF) 0%, var(--bgColorBlueLight, #00D4FF) 170px, transparent 171px), 
      linear-gradient(160deg, transparent 0%, var(--bgColorYellow, #FCD45C) 0%, var(--bgColorYellow, #FCD45C) 320px, transparent 321px), 
      linear-gradient(220deg, transparent 0%, var(--bgColorGreen, #1CC761) 0%, var(--bgColorGreen, #1CC761) 170px, transparent 171px), 
      linear-gradient(10deg, transparent 0%, var(--bgColorGreen, #1CC761) 0%, var(--bgColorGreen, #1CC761) 170px, transparent 171px),
      linear-gradient(-70deg, transparent 0%, var(--bgColorRed, #D93128) 0%, var(--bgColorRed, #D93128) 170px, transparent 171px)  
      no-repeat;
  }
`

export default GlobalStyles
