import { defineArrayMember, defineField, defineType } from "@sanity-typed/types"

export const bioStuffSchema = defineType({
  name: "bioStuff",
  title: "Bio Stuff",
  type: "object",
  fields: [
    defineField({
      name: "mainTitle",
      title: "Main Title",
      type: "string",
    }),
    defineField({
      name: "prelog",
      title: "Prelog Section (with headings)",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        }),
      ],
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
    }),
    defineField({
      title: "Socials",
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "socialsSingular",
          title: "Socials",
          name: "socialsSingular",
        }),
      ],
      options: {
        layout: "tags",
      },
    }),
  ],
})
