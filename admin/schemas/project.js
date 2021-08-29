export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Project", value: "project" },
          { title: "Work experience", value: "experience" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
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
    prepare(selection) {
      const EMOJIS = {
        experience: "💼",
        project: "💻",
      }
      const { type, company } = selection
      return Object.assign({}, selection, {
        subtitle: `${type ? EMOJIS[type] + ` | ` : ""}${
          company ? "@ " + company : ""
        }`,
      })
    },
  },
}
