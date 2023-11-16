import { graphql, useStaticQuery } from "gatsby"

import { GithubIcon, InstagramIcon, LinkedInIcon, OneUpIcon } from "../icons"
import { IconLink } from "./IconLink"

import { Flex } from "../styles/Grid"
import { LinksContainer } from "../styles/LinksContainer"

export const Bio = () => {
  // TODO: Dissect this query into more constants
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

  const linkedInLink = `https://linkedin.com/in/${social.linkedin}/`
  const githubLink = `https://github.com/${social.github}/`
  const instagramLink = `https://instagram.com/${social.instagram}/`

  return (
    <Flex as={"section"} $flexDirection={"column"} $alignItems={"center"}>
      <h1>Hi, I'm Daniel</h1>
      <h2>A front-end Dev based in Prague</h2>
      <h3>Welcome to my playground!</h3>
      <LinksContainer>
        {social.linkedin && (
          <IconLink link={linkedInLink} Icon={LinkedInIcon} />
        )}
        {social.github && <IconLink link={githubLink} Icon={GithubIcon} />}
        {social.instagram && (
          <IconLink link={instagramLink} Icon={InstagramIcon} />
        )}
      </LinksContainer>
      <h4>
        Currently <OneUpIcon />
        -ing my online presence with personal projects.
      </h4>
    </Flex>
  )
}
