import { defineType } from "sanity";

export const detailsSchema =  defineType({
  name: "details",
  title: "Details of the position",
  type: "object",
  fields: [
    {
      name: "summary",
      title: "Summary",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
  ],
})
