import { projectSchema } from "./projectSchema"
import { companySchema } from "./Project/companySchema"
import { linksSchema } from "./Project/linksSchema"
import { detailsSchema } from "./Project/detailsSchema"
import { timeOfEmploymentSchema } from "./Project/timeOfEmploymentSchema"
import { bioSchema } from "./bioSchema"
import { pageMetadataSchema } from "./Bio/pageMetadataSchema"
import { bioStuffSchema } from "./Bio/bioStuffSchema"
import { socialsSingularSchema } from "./Bio/socialsSingularSchema"

export const schemaTypes = [
  bioSchema,
  bioStuffSchema,
  socialsSingularSchema,
  pageMetadataSchema,
  projectSchema,
  companySchema,
  linksSchema,
  detailsSchema,
  timeOfEmploymentSchema,
]
