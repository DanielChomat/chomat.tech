export default {
  name: "company",
  title: "Company",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
    {
      name: "link",
      title: "Website link",
      type: "url",
    },
    {
      name: "description",
      title: "Short description",
      type: "string",
    },
  ],
}