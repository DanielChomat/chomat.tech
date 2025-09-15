import test from "node:test";
import assert from "node:assert/strict";
import { loadPackageJson, validateBasicSchema } from "./_packageJson.utils.mjs";

test("package.json exists and parses", async () => {
  const pkg = await loadPackageJson();
  assert.ok(pkg && typeof pkg === "object");
});

test("package.json meets basic schema", async () => {
  const pkg = await loadPackageJson();
  const problems = validateBasicSchema(pkg);
  assert.deepEqual(problems, [], `Schema problems: ${problems.join(", ")}`);
});

test("package.json: core fields are correct", async () => {
  const pkg = await loadPackageJson();
  assert.equal(pkg.name, "chomat.tech");
  assert.equal(pkg.type, "module");
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/, "version must be semver-like");
});

test("package.json: scripts include expected astro/biome/ts checks", async () => {
  const pkg = await loadPackageJson();
  const s = pkg.scripts || {};
  // Happy paths
  assert.equal(s.dev, "astro dev");
  assert.equal(s.build, "astro build");
  assert.equal(s.preview, "astro preview");
  assert.equal(s.astro, "astro");
  assert.equal(s.check, "biome check .");
  assert.equal(s["check:ci"], "biome ci .");
  assert.equal(s["check:fix"], "biome check . --write");
  assert.equal(s["check:ts"], "tsc --noEmit");
  assert.equal(s["check:astro"], "astro check");
  assert.equal(s["check:code"], "yarn check:ts && yarn check && yarn check:astro");
  assert.equal(s.format, "biome format . --write");
  assert.equal(s.lint, "biome lint .");
  assert.equal(s["lint:fix"], "biome lint . --write");

  // Edge: scripts are all strings
  for (const [k, v] of Object.entries(s)) {
    assert.equal(typeof v, "string", `script ${k} must be string`);
    assert.notEqual(v.trim(), "", `script ${k} must not be empty`);
  }
});

test("package.json: dependencies and devDependencies versions are pinned to expected ranges", async () => {
  const pkg = await loadPackageJson();
  const deps = pkg.dependencies || {};
  const dev = pkg.devDependencies || {};
  assert.ok("astro" in deps, "astro must be a dependency");
  assert.match(deps.astro, /^\^5\.\d+\.\d+$/, "astro should be ^5.x.x (per PR diff)");

  assert.match(dev["@astrojs/check"] || "", /^\^0\.\d+\.\d+$/, "@astrojs/check should be ^0.x.x");
  assert.equal(dev["@biomejs/biome"], "2.2.2");
  assert.equal(dev.prettier, "3.3.3");
  assert.match(dev.typescript || "", /^\^5\.\d+\.\d+$/);
});

test("package.json: packageManager field uses yarn 1.x with sha1", async () => {
  const pkg = await loadPackageJson();
  assert.match(
    pkg.packageManager,
    /^yarn@1\.22\.\d+\+sha1\.[0-9a-f]{40}$/i,
    "packageManager must be yarn 1.22.x with sha1"
  );
});

test("package.json: resolutions pin prettier to 3.3.3", async () => {
  const pkg = await loadPackageJson();
  assert.ok(pkg.resolutions && typeof pkg.resolutions === "object");
  assert.equal(pkg.resolutions.prettier, "3.3.3");
});

test("package.json: unexpected inputs are handled by schema validator", async () => {
  // Simulate malformed structures without touching real file
  const bads = [
    [{}, /missing "name"/],
    [{ name: "x", version: 1, type: "module", scripts: {} }, /"version" must be string/],
    [{ name: "x", version: "1.0.0", type: 1, scripts: {} }, /"type" must be string/],
    [{ name: "x", version: "1.0.0", type: "module", scripts: "" }, /"scripts" must be an object/],
    [{ name: "x", version: "1.0.0", type: "module", scripts: {}, dependencies: "" }, /"dependencies" must be an object/],
    [{ name: "x", version: "1.0.0", type: "module", scripts: {}, devDependencies: "" }, /"devDependencies" must be an object/],
  ];
  for (const [obj, regex] of bads) {
    const problems = validateBasicSchema(obj);
    assert.ok(problems.some((p) => regex.test(p)), `Expected ${regex} in ${problems}`);
  }
});

test("package.json: loadPackageJson throws helpful error on invalid JSON", async () => {
  // Create a temporary invalid JSON file and ensure error message is descriptive
  const fs = await import("node:fs/promises");
  const { mkdtemp, writeFile } = fs;
  const os = await import("node:os");
  const path = await import("node:path");
  const tmp = await mkdtemp(path.join(os.tmpdir(), "pkgjson-"));
  const bogus = path.join(tmp, "package.json");
  await writeFile(bogus, "{ invalid json }", "utf8");
  const { loadPackageJson } = await import("./_packageJson.utils.mjs");
  await assert.rejects(() => loadPackageJson(bogus), /Failed to parse .*package\.json/i);
});