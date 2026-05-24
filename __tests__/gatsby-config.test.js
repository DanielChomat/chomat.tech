/**
 * Tests for gatsby-config.ts
 *
 * Validates the shape, required fields, and plugin configuration of the
 * exported Gatsby config object.
 */

const path = require("path")

// Mock dotenv so config loads without a real .env file
jest.mock("dotenv", () => ({
  config: jest.fn(),
}))

// Re-require after mocking to get the fresh module
let gatsbyConfig

beforeEach(() => {
  jest.resetModules()
  jest.mock("dotenv", () => ({
    config: jest.fn(),
  }))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  gatsbyConfig = require("../gatsby-config").default
})

// ---------------------------------------------------------------------------
// siteMetadata
// ---------------------------------------------------------------------------

describe("gatsby-config siteMetadata", () => {
  it("exports a default config object", () => {
    expect(gatsbyConfig).toBeDefined()
    expect(typeof gatsbyConfig).toBe("object")
  })

  it("has a siteMetadata property", () => {
    expect(gatsbyConfig.siteMetadata).toBeDefined()
    expect(typeof gatsbyConfig.siteMetadata).toBe("object")
  })

  it("siteMetadata has the correct author name", () => {
    expect(gatsbyConfig.siteMetadata.author).toBeDefined()
    expect(gatsbyConfig.siteMetadata.author.name).toBe("Daniel Chomat")
  })

  it("siteMetadata author has a summary", () => {
    expect(typeof gatsbyConfig.siteMetadata.author.summary).toBe("string")
    expect(gatsbyConfig.siteMetadata.author.summary.length).toBeGreaterThan(0)
  })

  it("siteMetadata has a description", () => {
    expect(typeof gatsbyConfig.siteMetadata.description).toBe("string")
    expect(gatsbyConfig.siteMetadata.description.length).toBeGreaterThan(0)
  })

  it("siteMetadata has the correct siteUrl", () => {
    expect(gatsbyConfig.siteMetadata.siteUrl).toBe("https://chomat.tech")
  })

  it("siteMetadata.social has expected network keys", () => {
    const { social } = gatsbyConfig.siteMetadata
    expect(social).toBeDefined()
    expect(social).toHaveProperty("linkedin")
    expect(social).toHaveProperty("github")
    expect(social).toHaveProperty("instagram")
  })

  it("siteMetadata.social.linkedin is 'danielchomat'", () => {
    expect(gatsbyConfig.siteMetadata.social.linkedin).toBe("danielchomat")
  })

  it("siteMetadata.social.github is 'DanielChomat'", () => {
    expect(gatsbyConfig.siteMetadata.social.github).toBe("DanielChomat")
  })

  it("siteMetadata.social.instagram is an empty string (not yet configured)", () => {
    expect(gatsbyConfig.siteMetadata.social.instagram).toBe("")
  })
})

// ---------------------------------------------------------------------------
// graphqlTypegen
// ---------------------------------------------------------------------------

describe("gatsby-config graphqlTypegen", () => {
  it("has graphqlTypegen set to true", () => {
    expect(gatsbyConfig.graphqlTypegen).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// plugins
// ---------------------------------------------------------------------------

describe("gatsby-config plugins", () => {
  let plugins

  beforeEach(() => {
    plugins = gatsbyConfig.plugins
  })

  it("plugins is an array", () => {
    expect(Array.isArray(plugins)).toBe(true)
  })

  it("plugins array is non-empty", () => {
    expect(plugins.length).toBeGreaterThan(0)
  })

  it("includes gatsby-plugin-google-fonts with correct font options", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-google-fonts"
    )
    expect(plugin).toBeDefined()
    expect(plugin.options.fonts).toContain(
      "Yanone Kaffeesatz: 200, 300, 400, 500, 600, 700, 800, 900"
    )
    expect(plugin.options.display).toBe("swap")
  })

  it("includes gatsby-source-sanity with graphqlTag 'default'", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-source-sanity"
    )
    expect(plugin).toBeDefined()
    expect(plugin.options.graphqlTag).toBe("default")
  })

  it("gatsby-source-sanity options expose projectId and dataset (from env)", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-source-sanity"
    )
    expect(plugin).toBeDefined()
    // Keys must exist even if env values are undefined during testing
    expect("projectId" in plugin.options).toBe(true)
    expect("dataset" in plugin.options).toBe(true)
  })

  it("includes gatsby-source-filesystem pointing at content/assets", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-source-filesystem"
    )
    expect(plugin).toBeDefined()
    expect(plugin.options.name).toBe("assets")
    expect(plugin.options.path).toMatch(/content[/\\]assets/)
  })

  it("gatsby-source-filesystem path is an absolute path", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-source-filesystem"
    )
    expect(path.isAbsolute(plugin.options.path)).toBe(true)
  })

  it("includes 'gatsby-plugin-image' as a string plugin", () => {
    expect(plugins).toContain("gatsby-plugin-image")
  })

  it("includes 'gatsby-plugin-sharp' as a string plugin", () => {
    expect(plugins).toContain("gatsby-plugin-sharp")
  })

  it("includes 'gatsby-transformer-sharp' as a string plugin", () => {
    expect(plugins).toContain("gatsby-transformer-sharp")
  })

  it("includes 'gatsby-plugin-styled-components' as a string plugin", () => {
    expect(plugins).toContain("gatsby-plugin-styled-components")
  })

  it("includes gatsby-plugin-manifest with correct app name", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-manifest"
    )
    expect(plugin).toBeDefined()
    expect(plugin.options.name).toBe("chomat.tech Blog")
    expect(plugin.options.short_name).toBe("chomat.tech")
  })

  it("gatsby-plugin-manifest start_url is '/'", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-manifest"
    )
    expect(plugin.options.start_url).toBe("/")
  })

  it("gatsby-plugin-manifest display is 'minimal-ui'", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-manifest"
    )
    expect(plugin.options.display).toBe("minimal-ui")
  })

  it("gatsby-plugin-manifest icon references the shaka-emoji asset", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-manifest"
    )
    expect(plugin.options.icon).toBe("content/assets/shaka-emoji.png")
  })

  it("gatsby-plugin-manifest theme_color is '#663399'", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-manifest"
    )
    expect(plugin.options.theme_color).toBe("#663399")
  })

  it("gatsby-plugin-manifest background_color is '#000'", () => {
    const plugin = plugins.find(
      p => typeof p === "object" && p.resolve === "gatsby-plugin-manifest"
    )
    expect(plugin.options.background_color).toBe("#000")
  })

  it("does NOT include gatsby-plugin-offline (commented out)", () => {
    const offlinePlugin = plugins.find(
      p =>
        p === "gatsby-plugin-offline" ||
        (typeof p === "object" && p.resolve === "gatsby-plugin-offline")
    )
    expect(offlinePlugin).toBeUndefined()
  })

  it("each object plugin has a 'resolve' string property", () => {
    const objectPlugins = plugins.filter(p => typeof p === "object" && p !== null)
    objectPlugins.forEach(plugin => {
      expect(typeof plugin.resolve).toBe("string")
    })
  })
})

// ---------------------------------------------------------------------------
// dotenv integration
// ---------------------------------------------------------------------------

describe("gatsby-config dotenv integration", () => {
  it("calls dotenv.config with path derived from NODE_ENV", () => {
    const dotenv = require("dotenv")
    expect(dotenv.config).toHaveBeenCalledWith(
      expect.objectContaining({ path: expect.stringContaining(".env.") })
    )
  })
})