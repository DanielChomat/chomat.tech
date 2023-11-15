import { Project } from "../../types";
import { ExperienceTitleWithLinks } from "./components/ExperienceTitleWithLinks";
import { ExperienceCompanyDetail } from "./components/ExperienceCompanyDetail";
import { ExperienceStyle } from "../../styles/ExperienceStyle";
import { Flex } from "../../styles/Grid";
import { Emojis } from "../../schemas/constants";
import { ExperienceEmploymentDuration } from "./components/ExperienceEmploymentDuration";
import { LabelsSection } from "../Labels/LabelsSection";
import { ExperienceDetails } from "./components/ExperienceDetails";


type Props = {
  item: Project
}

export const ExperienceItem = ({ item }: Props) => {
  const isItemProject = item.type === Emojis.PROJECT

  const {
    featured: isItemFeatured,
    company,
    timeOfEmployment,
    details,
    tags,
    tech
  } = item

  const showCompanySection = !!company
  const showEmploymentTimeSection = !isItemProject && !!timeOfEmployment
  const showEmploymentInfoSection = showCompanySection || showEmploymentTimeSection

  const tagsFiltered: string[] = tags?.filter((item): item is string => Boolean(item))  ?? [];
  const hasTags = !!tagsFiltered?.length

  const techFiltered: string[] = tech?.filter((item): item is string => Boolean(item))  ?? [];
  const hasTech = !!techFiltered?.length
  const showLabelsSection = hasTags || hasTech

  return (
    <ExperienceStyle key={item.id} isFeatured={!!isItemFeatured} isProject={isItemProject}>
      <ExperienceTitleWithLinks experience={item} />

      {showEmploymentInfoSection &&
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          {showCompanySection && <ExperienceCompanyDetail company={company} /> }
          {showEmploymentTimeSection && <ExperienceEmploymentDuration timeOfEmployment={timeOfEmployment} />}
        </Flex>
      }

      {details &&
        <ExperienceDetails details={details} />
      }

      {showLabelsSection && (
        <section>
          {hasTags && <LabelsSection title={"Projects"} labels={tagsFiltered} />}
          {hasTech && <LabelsSection title={"Tech used"} labels={techFiltered} />}
        </section>
      )}
    </ExperienceStyle>
  )
}
