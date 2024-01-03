import { defineArrayMember, defineField, defineType } from "@sanity-typed/types"

export const detailsSchema = defineType({
  name: "details",
  title: "Details of the position",
  type: "object",
  fields: [
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
    }),
    defineField({
      name: "summaryExtended",
      title: "Summary Extended",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
  ],
})
