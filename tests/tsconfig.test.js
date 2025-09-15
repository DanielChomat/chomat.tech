/**
 * Test framework detected: unknown.
 * Notes:
 * - This repository appears to use the above testing library; these tests rely on global describe/it/expect APIs
 *   (compatible with Jest and Vitest). No new dev dependencies are introduced.
 * - Focus: Validate the tsconfig.json options introduced/modified in the PR diff.
 */

const fs = require('fs');
const path = require('path');

function parseJSONC(raw) {
  // Strip /* */ block comments and // line comments
  const withoutBlock = raw.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLine = withoutBlock.replace(/^\s*\/\/.*$/gm, '');
  return JSON.parse(withoutLine);
}

function resolveTsconfigPath() {
  // Allow override via env if monorepo; default to repo root tsconfig.json
  const fromEnv = process.env.TSCONFIG_PATH;
  if (fromEnv) {
    const p = path.isAbsolute(fromEnv) ? fromEnv : path.resolve(process.cwd(), fromEnv);
    if (fs.existsSync(p)) return p;
  }
  const candidates = [
    path.resolve(__dirname, '..', 'tsconfig.json'),
    path.resolve(process.cwd(), 'tsconfig.json'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('tsconfig.json not found. Set TSCONFIG_PATH env to the correct file if not at repo root.');
}

describe('tsconfig.json - configuration integrity', () => {
  const tsconfigPath = resolveTsconfigPath();
  let cfg;
  let co;

  beforeAll(() => {
    const raw = fs.readFileSync(tsconfigPath, 'utf8');
    cfg = parseJSONC(raw);
    expect(cfg && typeof cfg).toBe('object');
    expect(cfg).toHaveProperty('compilerOptions');
    co = cfg.compilerOptions;
  });

  it('extends Astro strict config', () => {
    expect(cfg.extends).toBe('astro/tsconfigs/strict');
  });

  describe('compilerOptions: strictness and safety flags', () => {
    it('contains required boolean flags set to exact values', () => {
      // Validate presence and exact boolean values for critical flags from the PR
      expect(co.allowJs).toBe(false);
      expect(co.allowSyntheticDefaultImports).toBe(true);
      expect(co.allowUnreachableCode).toBe(false);
      expect(co.allowUnusedLabels).toBe(false);

      expect(co.esModuleInterop).toBe(true);
      expect(co.forceConsistentCasingInFileNames).toBe(true);
      expect(co.isolatedModules).toBe(true);

      expect(co.noFallthroughCasesInSwitch).toBe(true);
      expect(co.noImplicitReturns).toBe(true);
      expect(co.noUnusedLocals).toBe(true);
      expect(co.noUnusedParameters).toBe(true);

      expect(co.resolveJsonModule).toBe(true);
      expect(co.skipLibCheck).toBe(true);
      expect(co.strict).toBe(true);

      expect(co.noEmit).toBe(true);
    });

    it('sets module, moduleResolution, target, and jsx as intended', () => {
      expect(co.module).toBe('ESNext');
      expect(co.moduleResolution).toBe('bundler'); // TS 5+ recommended for bundlers
      expect(co.target).toBe('esnext');
      expect(co.jsx).toBe('preserve');
    });

    it('limits lib to ES2023 + DOM only', () => {
      expect(Array.isArray(co.lib)).toBe(true);
      expect(co.lib).toEqual(expect.arrayContaining(['ES2023', 'DOM']));
      expect(co.lib.length).toBe(2);
    });
  });

  describe('root include/exclude hygiene', () => {
    it('includes the necessary type roots and source globs', () => {
      expect(Array.isArray(cfg.include)).toBe(true);
      expect(cfg.include).toEqual(expect.arrayContaining(['.astro/types.d.ts', '**/*']));
    });

    it('excludes build artifacts', () => {
      expect(Array.isArray(cfg.exclude)).toBe(true);
      expect(cfg.exclude).toEqual(expect.arrayContaining(['dist']));
    });
  });
});