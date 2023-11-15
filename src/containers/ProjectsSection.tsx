import { graphql, useStaticQuery } from "gatsby";
import { SectionListWithTitle } from "./SectionListWithTitle";
import { ExperienceItem } from "../components/ExperienceItem/ExperienceItem";
import { Project } from "../types";

export const ProjectsSection = () => {
  const {
    allSanityProject: { nodes: data },
  } = useStaticQuery(getProjectsGraphQLQuery)

  const projectsListElement = data.map((project: Project) =>
    <ExperienceItem key={project.id} item={project} />
  )

  return (
      <SectionListWithTitle title={"Projects to show-off with"}>
        {projectsListElement}
      </SectionListWithTitle>
  )
}

const getProjectsGraphQLQuery = graphql`
    query getProjects {
        allSanityProject(
            filter: {type: {eq: "PROJECT"}}
            sort: {timeOfEmployment: {end: DESC}}
        ) {
            nodes {
                id
                ...ProjectItem
            }
        }
    }
`
