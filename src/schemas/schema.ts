import { projectSchema } from "./project";
import { companySchema } from "./Project/company";
import { linksSchema } from "./Project/links";
import { detailsSchema } from "./Project/details";
import { timeOfEmploymentSchema } from "./Project/timeOfEmployment";

export const schemaTypes = [
  projectSchema,
  companySchema,
  linksSchema,
  detailsSchema,
  timeOfEmploymentSchema,
]
