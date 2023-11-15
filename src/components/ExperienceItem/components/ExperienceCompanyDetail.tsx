import { ProjectCompany } from "../../../types"

type Props = {
  company: ProjectCompany
}

export const ExperienceCompanyDetail = ({
  company: { name, description },
}: Props) => (
  <h4>
    {name} {description && <small>({description})</small>}
  </h4>
)
