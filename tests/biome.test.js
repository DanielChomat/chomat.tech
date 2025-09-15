/** ESM project detected; tests use ESM imports. Jest/Vitest-style APIs (describe/test/expect) are assumed. */
import fs from "node:fs";
import path from "node:path";

/**
 * Biome configuration tests
 *
 * Testing library/framework: No explicit runner was found. Tests use Jest/Vitest compatible APIs.
 * - If using Jest (ESM-aware config required), run as usual.
 * - If using Vitest, it should work out of the box.
 *
 * These tests validate the Biome configuration with emphasis on formatter, linter rules, overrides,
 * include globs, and JS formatter settings.
 */
function readBiomeConfig(configPath) {
  const abs = path.resolve(configPath);
  if (\!fs.existsSync(abs)) {
    throw new Error(`Biome config not found at ${abs}`);
  }
  let raw = fs.readFileSync(abs, "utf8");
  raw = raw
    .replace(/\/\*[^]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error("Failed to parse Biome configuration as JSON/JSONC: " + e.message);
  }
}

const BIOME_PATH = process.env.BIOME_PATH || "biome.json";

describe("Biome configuration: presence and basic shape", () => {
  test("config file exists", () => {
    expect(typeof BIOME_PATH).toBe("string");
    expect(BIOME_PATH).not.toBe("");
    expect(fs.existsSync(path.resolve(BIOME_PATH))).toBe(true);
  });

  test("parses as valid JSON/JSONC and has top-level keys", () => {
    const cfg = readBiomeConfig(BIOME_PATH);
    const keys = Object.keys(cfg);
    expect(keys).toEqual(expect.arrayContaining([
      "$schema",
      "vcs",
      "files",
      "formatter",
      "linter",
      "overrides",
      "javascript",
    ]));
    expect(typeof cfg.$schema).toBe("string");
  });
});

describe("vcs configuration", () => {
  const cfg = (() => readBiomeConfig(BIOME_PATH))();

  test("vcs settings as expected", () => {
    expect(cfg.vcs).toBeTruthy();
    expect(cfg.vcs.enabled).toBe(true);
    expect(cfg.vcs.clientKind).toBe("git");
    expect(cfg.vcs.useIgnoreFile).toBe(true);
  });
});

describe("files configuration", () => {
  const cfg = (() => readBiomeConfig(BIOME_PATH))();

  test("ignoreUnknown is false", () => {
    expect(cfg.files).toBeTruthy();
    expect(cfg.files.ignoreUnknown).toBe(false);
  });

  test("includes contain expected globs and no obvious duplicates", () => {
    const inc = cfg.files.includes || [];
    expect(Array.isArray(inc)).toBe(true);

    const expected = [
      "src/**/*.{js,ts,jsx,tsx,astro}",
      "*.{js,ts,mjs,cjs,cts,mts}",
      "public/**/*.js",
    ];
    expected.forEach((p) => expect(inc).toContain(p));

    const set = new Set(inc);
    expect(set.size).toBe(inc.length);
  });
});

describe("formatter: global", () => {
  const cfg = (() => readBiomeConfig(BIOME_PATH))();

  test("formatter is enabled with specified indentation and line width", () => {
    expect(cfg.formatter).toBeTruthy();
    expect(cfg.formatter.enabled).toBe(true);
    expect(cfg.formatter.indentStyle).toBe("space");
    expect(cfg.formatter.indentWidth).toBe(4);
    expect(cfg.formatter.lineWidth).toBe(100);
  });
});

describe("linter: rules and severities", () => {
  const cfg = (() => readBiomeConfig(BIOME_PATH))();

  test("recommended rules enabled", () => {
    expect(cfg.linter?.rules?.recommended).toBe(true);
  });

  test("style.noNonNullAssertion is off globally", () => {
    expect(cfg.linter?.rules?.style?.noNonNullAssertion).toBe("off");
  });

  test("suspicious rules severities", () => {
    const suspicious = cfg.linter?.rules?.suspicious || {};
    expect(suspicious.noExplicitAny).toBe("warn");
    expect(suspicious.noConfusingVoidType).toBe("error");
  });
});

describe("overrides for TypeScript files", () => {
  const cfg = (() => readBiomeConfig(BIOME_PATH))();

  test("includes patterns target TS/TSX files", () => {
    const overrides = cfg.overrides || [];
    expect(Array.isArray(overrides)).toBe(true);
    const tsOv = overrides.find((o) => Array.isArray(o.includes) && o.includes.some((p) =>
      p.includes("src/**/*.ts") || p.includes("src/**/*.tsx")
    ));
    expect(tsOv).toBeTruthy();
  });

  test("override bumps noNonNullAssertion severity to warn for TS", () => {
    const overrides = cfg.overrides || [];
    const tsOv = overrides.find((o) => Array.isArray(o.includes) && o.includes.some((p) =>
      p.includes("src/**/*.ts") || p.includes("src/**/*.tsx")
    ));
    const style = tsOv?.linter?.rules?.style || {};
    expect(style.noNonNullAssertion).toBe("warn");
  });
});

describe("javascript formatter settings", () => {
  const cfg = (() => readBiomeConfig(BIOME_PATH))();

  test("JS formatter uses double quotes, semicolons always, and es5 trailing commas", () => {
    const jsFmt = cfg.javascript?.formatter || {};
    expect(jsFmt.quoteStyle).toBe("double");
    expect(jsFmt.semicolons).toBe("always");
    expect(jsFmt.trailingCommas).toBe("es5");
  });
});

describe("$schema URL", () => {
  test("matches expected Biome schema 2.2.2", () => {
    const cfg = readBiomeConfig(BIOME_PATH);
    expect(cfg.$schema).toBe("https://biomejs.dev/schemas/2.2.2/schema.json");
  });
});

describe("defensive checks and edge cases", () => {
  test("config is not empty and key toggles are enabled", () => {
    const cfg = readBiomeConfig(BIOME_PATH);
    expect(Object.keys(cfg).length).toBeGreaterThan(3);
    expect(cfg.linter?.enabled).toBe(true);
    expect(cfg.formatter?.enabled).toBe(true);
  });

  test("JSON parses even with trailing whitespace/newlines", () => {
    const abs = path.resolve(BIOME_PATH);
    const raw = fs.readFileSync(abs, "utf8");
    expect(() => JSON.parse(raw.trim().replace(/\/\*[^]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1"))).not.toThrow();
  });
});