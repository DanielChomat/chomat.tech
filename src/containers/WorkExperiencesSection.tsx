import React from "react";
import { Project } from "../types";
import { SectionListWithTitle } from "./SectionListWithTitle";
import { ExperienceItem } from "../components/ExperienceItem/ExperienceItem";
import { graphql, useStaticQuery } from "gatsby";

export const WorkExperiencesSection = () => {
  const {
    allSanityProject: { nodes: data },
  } = useStaticQuery(getWorkExperiencesQuery)

  const workExperiencesListElement = data.map((experience: Project) =>
    <ExperienceItem item={experience} />
  )

  return (
    <SectionListWithTitle title={"Experiences"}>
      {workExperiencesListElement}
    </SectionListWithTitle>
  )
}

const getWorkExperiencesQuery = graphql`
    query getWorkExperiences {
        allSanityProject(
            filter: {type: {eq: "EXPERIENCE"}}
            sort: {timeOfEmployment: {end: DESC}}
        ) {
            nodes {
                id
                ...WorkExperienceItem
            }
        }
    }
`

