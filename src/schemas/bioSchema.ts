import { defineArrayMember, defineField, defineType } from "@sanity-typed/types"

export const bioSchema = defineType({
  name: "bio",
  title: "BIO",
  type: "document",
  fields: [
    defineField({
      name: "bioStuff",
      title: "Bio Stuff",
      type: "bioStuff",
    }),
    defineField({
      name: "about",
      title: "About Section",
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
      name: "pageMetadata",
      title: "Page Metadata",
      type: "pageMetadata",
    }),
  ],
})
