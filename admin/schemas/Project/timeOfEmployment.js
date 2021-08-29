export default {
  name: "timeOfEmployment",
  title: "Time Of Employment",
  type: "object",
  fields: [
    {
      name: "start",
      title: "Start",
      type: "date",
      options: {
        dateFormat: "YYYY-MM",
      },
    },
    {
      name: "end",
      title: "End",
      type: "date",
      options: {
        dateFormat: "YYYY-MM",
      },
    },
  ],
}
