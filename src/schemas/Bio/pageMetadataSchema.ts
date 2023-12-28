import { defineType } from "@sanity-typed/types"

export const pageMetadataSchema = defineType({
  name: "pageMetadata",
  title: "Page Metadata",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
  ],
})
