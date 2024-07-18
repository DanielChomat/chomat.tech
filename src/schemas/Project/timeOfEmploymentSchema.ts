import { defineType } from "@sanity-typed/types"

const SHOWN_DATE_FORMAT = "MMMM of YYYY"

export const timeOfEmploymentSchema = defineType({
  name: "timeOfEmployment",
  title: "Time Of Employment",
  type: "object",
  fields: [
    {
      name: "start",
      title: "Start",
      type: "date",
      options: {
        dateFormat: SHOWN_DATE_FORMAT,
      },
    },
    {
      name: "end",
      title: "End",
      type: "date",
      options: {
        dateFormat: SHOWN_DATE_FORMAT,
      },
    },
  ],
})
