/**
 * Tests for project configuration files added in this PR:
 *   - .eslintrc.json  (ESLint configuration)
 *   - .prettierrc     (Prettier configuration)
 *   - .eslintignore   (ESLint ignore patterns)
 *   - .prettierignore (Prettier ignore patterns)
 *   - .husky/pre-commit (Husky git hook)
 *
 * These tests validate the structural correctness of the config files and
 * ensure they contain the expected values that the project depends on.
 */

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")

// ---------------------------------------------------------------------------
// .eslintrc.json
// ---------------------------------------------------------------------------

describe(".eslintrc.json", () => {
  let eslintConfig

  beforeAll(() => {
    const raw = fs.readFileSync(path.join(ROOT, ".eslintrc.json"), "utf8")
    eslintConfig = JSON.parse(raw)
  })

  it("is valid JSON", () => {
    expect(eslintConfig).toBeDefined()
    expect(typeof eslintConfig).toBe("object")
  })

  it("has browser environment enabled", () => {
    expect(eslintConfig.env).toBeDefined()
    expect(eslintConfig.env.browser).toBe(true)
  })

  it("has es2021 environment enabled", () => {
    expect(eslintConfig.env.es2021).toBe(true)
  })

  it("extends eslint:recommended", () => {
    expect(eslintConfig.extends).toContain("eslint:recommended")
  })

  it("extends plugin:@typescript-eslint/recommended", () => {
    expect(eslintConfig.extends).toContain("plugin:@typescript-eslint/recommended")
  })

  it("extends universe", () => {
    expect(eslintConfig.extends).toContain("universe")
  })

  it("uses @typescript-eslint/parser", () => {
    expect(eslintConfig.parser).toBe("@typescript-eslint/parser")
  })

  it("includes @typescript-eslint plugin", () => {
    expect(eslintConfig.plugins).toContain("@typescript-eslint")
  })

  it("has parserOptions with JSX support", () => {
    expect(eslintConfig.parserOptions.ecmaFeatures.jsx).toBe(true)
  })

  it("parserOptions ecmaVersion is 2021", () => {
    expect(eslintConfig.parserOptions.ecmaVersion).toBe(2021)
  })

  it("parserOptions sourceType is 'module'", () => {
    expect(eslintConfig.parserOptions.sourceType).toBe("module")
  })

  it("parserOptions project points to tsconfig.json", () => {
    expect(eslintConfig.parserOptions.project).toBe("./tsconfig.json")
  })

  it("has overrides array with at least two entries", () => {
    expect(Array.isArray(eslintConfig.overrides)).toBe(true)
    expect(eslintConfig.overrides.length).toBeGreaterThanOrEqual(2)
  })

  it("TypeScript file override targets *.ts, *.tsx, *.d.ts files", () => {
    const tsOverride = eslintConfig.overrides.find(
      o => Array.isArray(o.files) && o.files.includes("*.ts")
    )
    expect(tsOverride).toBeDefined()
    expect(tsOverride.files).toContain("*.tsx")
    expect(tsOverride.files).toContain("*.d.ts")
  })

  it("TypeScript override turns off import/order rule", () => {
    const tsOverride = eslintConfig.overrides.find(
      o => Array.isArray(o.files) && o.files.includes("*.ts")
    )
    expect(tsOverride.rules["import/order"]).toBe("off")
  })

  it("styles/gatsby-config override turns off @typescript-eslint/no-var-requires", () => {
    const configOverride = eslintConfig.overrides.find(
      o => Array.isArray(o.files) && o.files.includes("./gatsby-config.ts")
    )
    expect(configOverride).toBeDefined()
    expect(configOverride.rules["@typescript-eslint/no-var-requires"]).toBe("off")
  })

  it("styles override also covers ./src/styles/**/*.ts files", () => {
    const configOverride = eslintConfig.overrides.find(
      o => Array.isArray(o.files) && o.files.includes("./gatsby-config.ts")
    )
    expect(configOverride.files).toContain("./src/styles/**/*.ts")
  })
})

// ---------------------------------------------------------------------------
// .prettierrc
// ---------------------------------------------------------------------------

describe(".prettierrc", () => {
  let prettierConfig

  beforeAll(() => {
    const raw = fs.readFileSync(path.join(ROOT, ".prettierrc"), "utf8")
    prettierConfig = JSON.parse(raw)
  })

  it("is valid JSON", () => {
    expect(prettierConfig).toBeDefined()
    expect(typeof prettierConfig).toBe("object")
  })

  it("arrowParens is set to 'avoid'", () => {
    expect(prettierConfig.arrowParens).toBe("avoid")
  })

  it("semi is set to false (no semicolons)", () => {
    expect(prettierConfig.semi).toBe(false)
  })

  it("has exactly the two expected keys (no unexpected options)", () => {
    const keys = Object.keys(prettierConfig)
    expect(keys).toHaveLength(2)
    expect(keys).toContain("arrowParens")
    expect(keys).toContain("semi")
  })
})

// ---------------------------------------------------------------------------
// .eslintignore
// ---------------------------------------------------------------------------

describe(".eslintignore", () => {
  let lines

  beforeAll(() => {
    const raw = fs.readFileSync(path.join(ROOT, ".eslintignore"), "utf8")
    lines = raw
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0)
  })

  it("ignores the dist directory", () => {
    expect(lines).toContain("dist")
  })

  it("ignores node_modules", () => {
    expect(lines).toContain("node_modules")
  })

  it("ignores the public directory", () => {
    expect(lines).toContain("public")
  })

  it("ignores the .cache directory", () => {
    expect(lines).toContain(".cache")
  })

  it("ignores the .sanity directory", () => {
    expect(lines).toContain(".sanity")
  })
})

// ---------------------------------------------------------------------------
// .prettierignore
// ---------------------------------------------------------------------------

describe(".prettierignore", () => {
  let lines

  beforeAll(() => {
    const raw = fs.readFileSync(path.join(ROOT, ".prettierignore"), "utf8")
    lines = raw
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0)
  })

  it("ignores .cache", () => {
    expect(lines).toContain(".cache")
  })

  it("ignores package.json", () => {
    expect(lines).toContain("package.json")
  })

  it("ignores package-lock.json", () => {
    expect(lines).toContain("package-lock.json")
  })

  it("ignores public", () => {
    expect(lines).toContain("public")
  })
})

// ---------------------------------------------------------------------------
// .husky/pre-commit
// ---------------------------------------------------------------------------

describe(".husky/pre-commit", () => {
  let content

  beforeAll(() => {
    content = fs.readFileSync(path.join(ROOT, ".husky", "pre-commit"), "utf8")
  })

  it("file exists and is readable", () => {
    expect(typeof content).toBe("string")
    expect(content.length).toBeGreaterThan(0)
  })

  it("starts with a sh shebang line", () => {
    const firstLine = content.split("\n")[0].trim()
    expect(firstLine).toBe("#!/bin/sh")
  })

  it("sources the husky.sh script", () => {
    expect(content).toContain('. "$(dirname "$0")/_/husky.sh"')
  })

  it("runs lint-staged via npx", () => {
    expect(content).toContain("npx lint-staged")
  })
})

// ---------------------------------------------------------------------------
// .husky/.gitignore
// ---------------------------------------------------------------------------

describe(".husky/.gitignore", () => {
  let content

  beforeAll(() => {
    content = fs.readFileSync(path.join(ROOT, ".husky", ".gitignore"), "utf8")
  })

  it("ignores the underscore (_) directory used by husky internals", () => {
    const lines = content
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0)
    expect(lines).toContain("_")
  })
})