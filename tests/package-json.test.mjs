/**
 * Testing library/framework: Node.js built-in test runner (node:test) + assert/strict.
 * Rationale: No existing test framework detected; avoids adding new dependencies.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const pkgPath = path.resolve(process.cwd(), 'package.json');

async function loadPkg() {
  const raw = await readFile(pkgPath, 'utf8');
  return JSON.parse(raw);
}

test('package.json: basic metadata is valid', async () => {
  const pkg = await loadPkg();
  assert.equal(pkg.name, 'chomat.tech', 'name should be "chomat.tech"');
  assert.equal(pkg.type, 'module', 'type should be "module"');
  assert.match(pkg.version, /^\d+\.\d+\.\d+(?:[-+].*)?$/, 'version should be semver-like');
  assert.ok(typeof pkg.packageManager === 'string', 'packageManager must be a string');
  assert.match(
    pkg.packageManager,
    /^yarn@1\.22\.22/,
    'packageManager should pin yarn 1.22.22'
  );
  assert.ok(pkg.scripts && typeof pkg.scripts === 'object', 'scripts must exist');
  assert.ok(pkg.dependencies && typeof pkg.dependencies === 'object', 'dependencies must exist');
  assert.ok(pkg.devDependencies && typeof pkg.devDependencies === 'object', 'devDependencies must exist');
});

test('package.json: scripts include expected commands and exact values', async () => {
  const { scripts } = await loadPkg();

  const expected = new Map([
    ['dev', 'astro dev'],
    ['build', 'astro build'],
    ['preview', 'astro preview'],
    ['astro', 'astro'],
    ['check', 'biome check .'],
    ['check:ci', 'biome ci .'],
    ['check:fix', 'biome check . --write'],
    ['check:ts', 'tsc --noEmit'],
    ['check:astro', 'astro check'],
    ['check:code', 'yarn check:ts && yarn check && yarn check:astro'],
    ['format', 'biome format . --write'],
    ['lint', 'biome lint .'],
    ['lint:fix', 'biome lint . --write'],
    // Expect Node's built-in test runner; added if missing.
    ['test', 'node --test'],
  ]);

  for (const [k, v] of expected) {
    assert.equal(
      scripts[k],
      v,
      `scripts.${k} should be exactly "${v}"`
    );
  }
});

test('package.json: dependency versions are pinned as expected', async () => {
  const { dependencies = {}, devDependencies = {} } = await loadPkg();

  // Dependencies
  assert.equal(dependencies.astro, '^5.13.5', 'astro should be ^5.13.5');

  // Dev dependencies
  assert.equal(devDependencies.typescript, '^5.9.2', 'typescript should be ^5.9.2');
  assert.equal(devDependencies.prettier, '3.3.3', 'prettier should be 3.3.3');
  assert.equal(devDependencies['@biomejs/biome'], '2.2.2', '@biomejs/biome should be 2.2.2');
  assert.equal(devDependencies['@astrojs/check'], '^0.9.4', '@astrojs/check should be ^0.9.4');

  // Sanity: versions are non-empty trimmed strings
  for (const [name, version] of Object.entries({ ...dependencies, ...devDependencies })) {
    assert.equal(typeof version, 'string', `${name} version should be a string`);
    assert.ok(version.length > 0, `${name} version must not be empty`);
    assert.equal(version, version.trim(), `${name} version should be trimmed`);
  }
});

test('package.json: resolutions are consistent with devDependencies', async () => {
  const { resolutions = {}, devDependencies = {} } = await loadPkg();
  assert.ok(resolutions && typeof resolutions === 'object', 'resolutions should exist');
  assert.equal(
    resolutions.prettier,
    devDependencies.prettier,
    'resolutions.prettier should match devDependencies.prettier'
  );
});

test('package.json: script values are cleanly formatted (no leading/trailing or double spaces)', async () => {
  const { scripts } = await loadPkg();
  for (const [key, val] of Object.entries(scripts)) {
    assert.equal(typeof val, 'string', `scripts.${key} must be a string`);
    assert.equal(val, val.trim(), `scripts.${key} should not have leading/trailing whitespace`);
    assert.doesNotMatch(val, /\s{2,}/, `scripts.${key} should not contain multiple consecutive spaces`);
  }
});