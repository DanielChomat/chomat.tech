import { defineType } from "@sanity-typed/types";

export const linksSchema = defineType( {
  name: "links",
  title: "Links",
  type: "object",
  fields: [
    {
      name: "live",
      title: "Live site",
      type: "url",
    },
    {
      name: "code",
      title: "Source git site",
      type: "url",
    },
  ],
})
