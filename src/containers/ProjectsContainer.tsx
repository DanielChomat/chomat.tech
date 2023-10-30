import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Flex } from "../styles/Grid"
import Experience from "../components/Experience"

export const Projects = () => {
  const {
    allSanityProject: { nodes: data },
  } = useStaticQuery(graphql`
      query AllProjects {
          allSanityProject(
              filter: {type: {eq: "project"}}
              sort: {timeOfEmployment: {end: DESC}}
          ) {
              nodes {
                  id
                  featured
                  position
                  company {
                      link
                      name
                      description
                      logo {
                          asset {
                              url
                          }
                      }
                  }
                  links {
                      live
                      code
                  }
                  timeOfEmployment {
                      end(formatString: "MMMM of YYYY")
                      start(formatString: "MMMM of YYYY")
                  }
                  type
                  tags
                  tech
                  id
                  details {
                      content {
                          children {
                              text
                          }
                      }
                      summary
                  }
              }
          }
      }

  `)

  return (
    <>
      <section>
        <h2 className={"text-left"}>Projects to show-off with</h2>
        <Flex
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={"100%"}
          gap={"30px"}
        >
          {data.map(project => {
            return <Experience item={project} project />
          })}
        </Flex>
      </section>
    </>
  )
}
