import { defineType } from "@sanity-typed/types"

export const companySchema = defineType({
  name: "company",
  title: "Company",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "description",
      title: "Short description",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
    {
      name: "link",
      title: "Website link",
      type: "url",
    },
  ],
})
