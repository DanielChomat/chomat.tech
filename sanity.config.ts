import { defineConfig, InferSchemaValues } from "@sanity-typed/types"
import { visionTool } from "@sanity/vision"
import { deskTool, DeskToolOptions } from "sanity/desk"
import { schemaTypes } from "./src/schemas/schema"
import { isDev } from "sanity"
import {
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_TITLE,
} from "./src/environment"

// Resource: https://www.sanity.io/guides/singleton-document
const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletoBioType = "bio"
const singletonTypes = new Set([singletoBioType])

const deskToolPluginOptions: DeskToolOptions = {
  structure: S =>
    S.list()
      .title("Content")
      .items([
        S.listItem()
          .title(singletoBioType.toUpperCase())
          .id(singletoBioType)
          .child(
            S.document()
              .schemaType(singletoBioType)
              .documentId(singletoBioType),
          ),

        // Regular document types
        S.documentTypeListItem("project").title("Project"),
      ]),
}

const deskToolPlugin = () => deskTool(deskToolPluginOptions)

const devOnlyPlugins = [visionTool(), deskToolPlugin()]

const config = defineConfig({
  title: SANITY_STUDIO_TITLE,
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  plugins: [...(isDev ? devOnlyPlugins : [deskToolPlugin()])],

  schema: {
    types: schemaTypes,

    templates: templates =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})

export default config

/** Typescript type of all types! */
export type SanityValues = InferSchemaValues<typeof config>
