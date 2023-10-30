import { SANITY_STUDIO_DATASET, SANITY_STUDIO_PROJECT_ID } from "./src/environment";
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET,
  },
})
