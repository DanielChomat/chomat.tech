// We import object and document schemas
import blockContent from "./blockContent"
import project from "./project"
import company from "./Project/company"
import links from "./Project/links"
import details from "./Project/details"
import timeOfEmployment from "./Project/timeOfEmployment"

// Then we give our schema to the builder and provide the result to Sanity

export const schemaTypes = [
  blockContent,
  project,
  company,
  links,
  details,
  timeOfEmployment,
]
