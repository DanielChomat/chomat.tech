import { defineConfig, InferSchemaValues } from "@sanity-typed/types";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/schema";
import { isDev } from "sanity";

const devOnlyPlugins = [visionTool()]

const config = defineConfig({
  title: "chomat.tech",
  projectId: "et8ux3we",
  dataset: "chomat",
  plugins: [...(isDev ? devOnlyPlugins : []), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

export default config;

/** Typescript type of all types! */
export type SanityValues = InferSchemaValues<typeof config>;
