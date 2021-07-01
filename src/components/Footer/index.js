import React from "react"
import styled from "styled-components"

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 1rem 2.4rem 1rem 0;
`

const Footer = () => {
  return (
    <FooterContainer>
      Built with{" "}
      <a
        href="https://www.gatsbyjs.org"
        rel={"noopener noreferrer"}
        target={"_blank"}
      >
        Gatsby
      </a>
      , heavily inspired by{" "}
      <a
        href={"https://github.com/EmaSuriano/gatsby-starter-mate"}
        rel={"noopener noreferrer"}
        target={"_blank"}
      >
        Gatsby Mate Starter
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

export default Footer
