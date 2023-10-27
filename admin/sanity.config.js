import { defineConfig, isDev } from "sanity"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas/schema"

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  title: "chomat.tech",
  projectId: "et8ux3we",
  dataset: "chomat",
  plugins: [...(isDev ? devOnlyPlugins : []), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
