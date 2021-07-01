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
      {/*<Image*/}
      {/*  fixed={data.avatar.childImageSharp.fixed}*/}
      {/*  alt={author.name}*/}
      {/*  style={{*/}
      {/*    marginBottom: 0,*/}
      {/*    minWidth: 50,*/}
      {/*    borderRadius: `100%`,*/}
      {/*  }}*/}
      {/*  imgStyle={{*/}
      {/*    borderRadius: `50%`,*/}
      {/*  }}*/}
      {/*/>*/}
      <h1>Hi, I'm Daniel</h1>
      <h2>A front-end Dev based in Prague</h2>
      <h4>
        Currently working{" "}
        <a
          href={"https://refresh.cz/"}
          rel={"noopener noreferrer"}
          target={"_blank"}
        >
          @Refresh.cz
        </a>{" "}
        <br />
        and <OneUp />
        -ping my online presence with{" "}
        <a href={"#projects"}>personal projects</a>.
      </h4>

      <Flex
        style={{ width: "50%", marginTop: "3rem" }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
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
      </Flex>
    </Flex>
  )
}

export default Bio
