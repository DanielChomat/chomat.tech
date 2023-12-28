export type Project = Queries.SanityProject

export type ProjectCompany = Queries.CompanyItemFragment
export type ProjectLinks = Queries.SanityLinks
export type ProjectTimeOfEmployment = Project["timeOfEmployment"]
export type ProjectDetails = Project["details"]

export type ProjectType = Project["type"]

export type BioContent = Queries.SanityBio
export type BioStuff = Queries.SanityBioStuff
export type BioSocialItem = Queries.SanitySocialsSingular
export type BioSocialItemLocal = { iconUrl: string; name: string; url: string }
