import { defineConfig, InferSchemaValues } from "@sanity-typed/types";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/schemas/schema";
import { isDev } from "sanity";
import { SANITY_STUDIO_DATASET, SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_TITLE } from "./src/environment";

const devOnlyPlugins = [visionTool()]

console.log({SANITY_STUDIO_TITLE});
console.log(process.env);

const config = defineConfig({
  title: SANITY_STUDIO_TITLE,
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  plugins: [...(isDev ? devOnlyPlugins : []), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

export default config;

/** Typescript type of all types! */
export type SanityValues = InferSchemaValues<typeof config>;
