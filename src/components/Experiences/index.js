import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import dayjs from "dayjs"

import { Flex } from "../../styles/Grid"
import { Experience } from "../../styles/Experiences"

const Experiences = () => {
  const {
    allSanityProject: { nodes: data },
  } = useStaticQuery(graphql`
    query AllExperiences {
      allSanityProject(
        filter: { type: { eq: "experience" } }
        sort: { fields: timeOfEmployment___start, order: DESC }
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
      <Flex justifyContent={"space-between"} width={"100%"} gap={"30px"}>
        {data.map(experience => {
          const startTime = dayjs(experience.timeOfEmployment.start)
          const endTime = dayjs(experience.timeOfEmployment.end ?? undefined)

          const diff = Math.round(
            endTime.diff(startTime) / 1000 / 60 / 60 / 24 / 30
          )
          // TODO: FIX the import of dayjs and it's "duration" function (likely to be fixed with TypeScript)
          let duration

          switch (diff) {
            case 12:
              duration = "1 year"
              break
            case 9:
              duration = "9 months"
              break
            default:
              duration = "2 years and counting"
              break
          }
          return (
            <Experience featured={experience.featured} key={experience.id}>
              <h3>
                {experience.position}
                {(experience.company?.link || experience.company?.logo) && (
                  <div>
                    <a
                      href={experience.company?.link ?? "#"}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <img src={experience.company.logo.asset.url} alt="" />
                    </a>
                  </div>
                )}
              </h3>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                {experience.company ? (
                  <h4>
                    {experience.company?.name}{" "}
                    {experience.company?.description ? (
                      <small>({experience.company.description})</small>
                    ) : (
                      ""
                    )}
                  </h4>
                ) : (
                  ""
                )}

                {experience.timeOfEmployment ? (
                  <h5>
                    {experience.timeOfEmployment.start} -{" "}
                    {experience.timeOfEmployment.end ?? "..."}{" "}
                    <small>({duration})</small>
                  </h5>
                ) : (
                  ""
                )}
              </Flex>

              <details>
                <summary
                  title={"Planning to implement WAAPI for smoother openning"}
                >
                  {experience.details.summary}
                </summary>
                <div className="content">
                  {experience.details.content[0].children[0].text}
                </div>
              </details>

              <section>
                <h5>Projects</h5>
                <div>
                  {experience?.tags?.map(project => (
                    <span>{project}</span>
                  ))}
                </div>

                <h5>Tech used</h5>
                <div>
                  {experience?.tech.map(tech => (
                    <span>{tech}</span>
                  ))}
                </div>
              </section>
            </Experience>
          )
        })}
      </Flex>
    </section>
  )
}

export default Experiences
