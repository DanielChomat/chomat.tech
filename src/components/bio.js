/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Github, Instagram, LinkedIn, OneUp } from "./Icons"
import { Flex } from "../styles/Grid"
import LinksContainer from "../styles/LinksContainer"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            linkedin
            github
            instagram
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata
  return (
    <Flex as={"section"} flexDirection={"column"} alignItems={"center"}>
      <h1>Hi, I'm Daniel</h1>
      <h2>A front-end Dev based in Prague</h2>
      <h3>Welcome to my playground!</h3>
      <LinksContainer>
        {social.linkedin && (
          <a
            href={`https://linkedin.com/in/${social.linkedin}/`}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            <LinkedIn width={"4.8rem"} height={"4.8rem"} />
          </a>
        )}
        {social.github && (
          <a
            href={`https://github.com/${social.github}/`}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            <Github width={"4.8rem"} height={"4.8rem"} />
          </a>
        )}
        {social.instagram && (
          <a
            href={`https://instagram.com/${social.instagram}/`}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            <Instagram width={"4.8rem"} height={"4.8rem"} />
          </a>
        )}
      </LinksContainer>
      <h4>
        Currently working @PBK-Tech
        <br />
        and <OneUp />
        -ping my online presence with personal projects.
      </h4>
    </Flex>
  )
}

export default Bio
