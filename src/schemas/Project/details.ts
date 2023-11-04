import { defineType } from "@sanity-typed/types";

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
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ]
        }
      ]
    },
  ],
})
