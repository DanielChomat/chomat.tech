import { GatsbyNode } from "gatsby"

export const onCreateBabelConfig: GatsbyNode["onCreateBabelConfig"] = ({
  actions,
}) => {
  actions.setBabelPreset({
    name: "babel-preset-gatsby",
    options: {
      reactRuntime: "automatic",
    },
  })
}
