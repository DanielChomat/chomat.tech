import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Flex } from "../styles/Grid"
import Experience from "../components/Experience"

export const Experiences = () => {
  const {
    allSanityProject: { nodes: data }
  } = useStaticQuery(graphql`
    query AllExperiences {
      allSanityProject(
        filter: { type: { eq: "EXPERIENCE" } }
        sort: { fields: timeOfEmployment___end, order: DESC }
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
    <section>
      <h2 className={"text-left"}>Experiences</h2>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        width={"100%"}
        gap={"30px"}
      >
        {data.map(experience => {
          return <Experience item={experience} />
        })}
      </Flex>
    </section>
  )
}

