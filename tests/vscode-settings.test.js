/**
 * VS Code settings validation tests
 *
 * Test framework: BDD-style describe/it compatible with Jest, Vitest, or Mocha.
 * Assertions: Node's built-in 'assert'.
 * If no BDD globals are present, falls back to Node's built-in test runner (node:test).
 *
 * Covered (from PR diff):
 * - Global: editor.formatOnSave = true
 * - Global: editor.defaultFormatter = "biomejs.biome"
 * - [javascript]/[typescript]/[astro]: editor.codeActionsOnSave quickfix.biome + source.organizeImports.biome -> "explicit"
 * - [astro]: editor.formatOnSave = true
 * - [json]/[jsonc]: editor.defaultFormatter = "biomejs.biome", editor.formatOnSave = true
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

function loadSettings() {
  const filePath = path.resolve(process.cwd(), '.vscode', 'settings.json');
  assert.ok(fs.existsSync(filePath), `Expected VS Code settings at ${filePath}`);
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    err.message = `settings.json is not valid JSON: ${err.message}`;
    throw err;
  }
}

function getLanguageBlock(settings, lang) {
  const key = `[${lang}]`;
  assert.ok(settings[key], `Missing language block "${key}"`);
  return settings[key];
}

// Determine test API (Jest/Vitest/Mocha globals or Node's built-in test runner)
const hasBDD = typeof global.describe === 'function' && typeof global.it === 'function';
const nodeTest = hasBDD ? null : (() => {
  try { return require('node:test'); } catch { return null; }
})();
const describeFn = hasBDD ? global.describe : nodeTest?.describe;
const itFn = hasBDD ? global.it : nodeTest?.it;

if (\!describeFn || \!itFn) {
  // Provide a friendly error if no runner is available
  throw new Error("No test runner detected. Please run with Jest, Vitest, Mocha, or Node >=18 using node:test.");
}

const settings = loadSettings();

describeFn('VS Code settings: Biome + organize imports configuration', () => {
  itFn('is valid JSON object at the root', () => {
    assert.strictEqual(typeof settings, 'object');
    assert.ok(\!Array.isArray(settings));
  });

  itFn('enables formatOnSave globally', () => {
    assert.strictEqual(settings['editor.formatOnSave'], true);
  });

  itFn('sets global default formatter to Biome', () => {
    assert.strictEqual(settings['editor.defaultFormatter'], 'biomejs.biome');
  });

  itFn('configures JavaScript code actions to Biome explicit', () => {
    const js = getLanguageBlock(settings, 'javascript');
    const actions = js['editor.codeActionsOnSave'];
    assert.ok(actions, 'Missing "editor.codeActionsOnSave" in [javascript]');
    assert.strictEqual(actions['quickfix.biome'], 'explicit');
    assert.strictEqual(actions['source.organizeImports.biome'], 'explicit');
  });

  itFn('configures TypeScript code actions to Biome explicit', () => {
    const ts = getLanguageBlock(settings, 'typescript');
    const actions = ts['editor.codeActionsOnSave'];
    assert.ok(actions, 'Missing "editor.codeActionsOnSave" in [typescript]');
    assert.strictEqual(actions['quickfix.biome'], 'explicit');
    assert.strictEqual(actions['source.organizeImports.biome'], 'explicit');
  });

  itFn('configures Astro with formatOnSave and Biome code actions', () => {
    const astro = getLanguageBlock(settings, 'astro');
    assert.strictEqual(astro['editor.formatOnSave'], true);
    const actions = astro['editor.codeActionsOnSave'];
    assert.ok(actions, 'Missing "editor.codeActionsOnSave" in [astro]');
    assert.strictEqual(actions['quickfix.biome'], 'explicit');
    assert.strictEqual(actions['source.organizeImports.biome'], 'explicit');
  });

  itFn('uses Biome formatter and formatOnSave for JSON', () => {
    const json = getLanguageBlock(settings, 'json');
    assert.strictEqual(json['editor.defaultFormatter'], 'biomejs.biome');
    assert.strictEqual(json['editor.formatOnSave'], true);
  });

  itFn('uses Biome formatter and formatOnSave for JSONC', () => {
    const jsonc = getLanguageBlock(settings, 'jsonc');
    assert.strictEqual(jsonc['editor.defaultFormatter'], 'biomejs.biome');
    assert.strictEqual(jsonc['editor.formatOnSave'], true);
  });

  itFn('does not set editor.codeActionsOnSave at the root (should be per-language)', () => {
    assert.strictEqual(settings['editor.codeActionsOnSave'], undefined);
  });
});