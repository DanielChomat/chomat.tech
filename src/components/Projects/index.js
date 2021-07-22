import React from "react"
import { Flex } from "../../styles/Grid"
import { Experience } from "../../styles/Experiences"
import Refresh from "../Icons/assets/Refresh"
import { Unicorn } from "../Icons"

const projectsData = [
  {
    position: "Front-End Web Developer",
    company: {
      name: "Refresh",
      logo: <Refresh />,
      description: "Prague Digital Agency",
    },
    time: {
      start: 2019,
      end: null,
    },
    details: {
      summary: "Great team. Loooads of progress and experience!",
      content:
        "Started as an HTML/CSS coder during my studies. Working with a great team in interesting technologies on some nice projects.",
    },
    projects: ["Intranet React application", "Presentation websites"],
    tech: ["React", "GatsbyJS", "CSS Modules", "Styled Components", "Docker"],
  },
  {
    position: "Freelance Web Developer",
    company: {
      name: "SocialSharks",
    },
    time: {
      start: 2018,
      end: 2019,
    },
    details: {
      summary: "The beginnings of freelance are fun!",
      content: "Wordpress projects for digital agencies",
    },
    projects: ["LPs for digital agencies", "Train seat booking system"],
    tech: ["SCSS", "CSS Grid", "Bootstrap", "Vanilla JS", "Wordpress plugins"],
  },
  {
    position: "Developer",
    company: {
      name: "Unicorn",
      logo: <Unicorn />,
      description: "🇨🇿 International Software Company",
    },
    time: {
      start: 2017,
      end: 2018,
    },
    details: {
      summary: "Gotta start somewhere!",
      content:
        "Mainly administrating and developing plugins for Atlassian products",
    },
    projects: ["Implementation of Bamboo and Bitbucket"],
    tech: ["Java", "JIRA", "Confluence", "Bitbucket", "Bamboo"],
  },
]

const Projects = () => {
  return (
    <section>
      <h2 className={"text-left"}>Projects to show-off with</h2>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        width={"100%"}
        gap={"30px"}
      >
        {projectsData.map(experience => (
          <Experience>
            <h3>
              {experience.position} {experience.company?.logo}
            </h3>
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

            <h5>
              {experience.time.start} - {experience.time.end ?? "..."}
            </h5>

            <details>
              <summary
                title={"Planning to implement WAAPI for smoother openning"}
              >
                {experience.details.summary}
              </summary>
              <div className="content">{experience.details.content}</div>
            </details>

            <h5>Projects</h5>
            <section>
              {experience.projects.map(project => (
                <span>{project}</span>
              ))}
            </section>

            <h5>Tech used</h5>
            <section>
              {experience.tech.map(tech => (
                <span>{tech}</span>
              ))}
            </section>
          </Experience>
        ))}
      </Flex>
    </section>
  )
}

export default Projects
