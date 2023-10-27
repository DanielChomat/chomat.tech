import { defineType } from "sanity";
import { defineField } from "@sanity/types/src/schema/define";
import { PreviewValue } from "@sanity/types/src/schema/preview";

enum Emojis {
  EXPERIENCE= "EXPERIENCE",
  PROJECT= "PROJECT",
}

const TYPE_EMOJIS_MAP: Record<Emojis, string> = {
  [Emojis.EXPERIENCE] : '💼',
  [Emojis.PROJECT]: '💻'
}

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
          { title: "Project", value: Emojis.PROJECT  },
          { title: "Work experience", value: Emojis.EXPERIENCE },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    {
      name: "position",
      title: "Position",
      type: "string",
    },
    {
      name: "featured",
      title: "Featured project?",
      type: "boolean",
    },
    {
      name: "company",
      title: "Company",
      type: "company",
    },
    {
      name: "links",
      title: "Links",
      type: "links",
    },
    {
      name: "timeOfEmployment",
      title: "Time Of Employment",
      type: "timeOfEmployment",
    },
    {
      name: "details",
      title: "Details of the position",
      type: "details",
    },
    {
      title: "Projects",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Tech Used",
      name: "tech",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
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

      const preparedPreview: PreviewValue =  Object.assign({}, value, {
        subtitle,
      })

      return preparedPreview
    },
  },
})
