import React from "react"
import styled from "styled-components"

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 1rem 2.4rem 1rem 0;
`

export const Footer = () => {
  return (
    <FooterContainer>
      Built with{" "}
      <a
        href="https://www.gatsbyjs.org"
        rel={"noopener noreferrer"}
        
      >
        Gatsby
      </a>
      , heavily inspired by{" "}
      <a
        href={"https://github.com/EmaSuriano/gatsby-starter-mate"}
        rel={"noopener noreferrer"}
        
      >
        Gatsby Mate Starter
      </a>
      , connected to{" "}
      <a
        href={"https://www.sanity.io/studio"}
        rel={"noopener noreferrer"}
        
      >
        Sanity Studio
      </a>
      .
      <div>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons"
        >
          Smashicons
        </a>
        ,{" "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{" "}
        and{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </FooterContainer>
  )
}
