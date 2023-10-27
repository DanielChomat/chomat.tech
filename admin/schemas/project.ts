import { defineArrayMember, defineField, defineType } from "@sanity-typed/types";
import { Emojis, TYPE_EMOJIS_MAP } from "./constants";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Project", value: Emojis.PROJECT,   },
          { title: "Work experience", value: Emojis.EXPERIENCE },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured project?",
      type: "boolean",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "company",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "links",
    }),
    defineField({
      name: "timeOfEmployment",
      title: "Time Of Employment",
      type: "timeOfEmployment",
    }),
    defineField({
      name: "details",
      title: "Details of the position",
      type: "details",
    }),
    defineField({
      title: "Projects",
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      title: "Tech Used",
      name: "tech",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
    }),
  ],

  preview: {
    select: {
      media: "company.logo",
      title: "position",
      type: "type",
      company: "company.name",
    },
    prepare(value,) {
      const { type, company } = value
      const typeEmojiGuarded = type && Object.keys(Emojis).includes(type) ? type as Emojis : undefined;
      const emojiSubtitle = typeEmojiGuarded ? TYPE_EMOJIS_MAP[typeEmojiGuarded] + ' | ' : ''
      const companySubtitle = company ? "@ " + company : ''

      const subtitle = `${emojiSubtitle}${companySubtitle}`

      const preparedPreview =  Object.assign({}, value, {
        subtitle,
      })

      return preparedPreview
    },
  },
})
