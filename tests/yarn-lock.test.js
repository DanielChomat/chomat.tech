/**
 * Detected/assumed test framework: Jest-style globals (describe/test/expect).
 * If this repository uses Vitest, these tests will also run unmodified
 * because Vitest provides Jest-compatible globals by default.
 *
 * Purpose: Validate critical entries in yarn.lock introduced/modified by the PR diff.
 * We assert exact versions, resolved URLs, integrity hashes, and key dependency lines.
 *
 * Notes:
 * - We intentionally avoid adding a lockfile parser dependency; instead we parse blocks with simple heuristics.
 * - Tests focus on the provided diff sections for:
 *   - astro@^5.13.5
 *   - vite@^6.3.6
 *   - typescript@^5.9.2
 */

const fs = require('fs');
const path = require('path');

function readLock() {
  const p = path.resolve(process.cwd(), 'yarn.lock');
  const content = fs.readFileSync(p, 'utf8');
  // Normalize line endings to ensure stable parsing across platforms
  return content.replace(/\r\n/g, '\n');
}

/**
 * Extract a lockfile "block" starting at a key line like `astro@^5.13.5:`
 * A block continues while the subsequent lines are indented (two spaces) and
 * stops before the next top-level entry (non-indented line).
 */
function extractBlock(lockText, key) {
  const keyPattern = new RegExp(`^${key.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}:\\s*$`, 'm');
  const match = lockText.match(keyPattern);
  if (\!match) return null;

  const startIdx = match.index;
  const rest = lockText.slice(startIdx);
  const lines = rest.split('\n');
  const blockLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0) {
      blockLines.push(line);
      continue;
    }
    // Continue while line is either blank or indented with at least one space
    // Yarn v1 uses two spaces; we accept any leading spaces > 0 for resiliency.
    if (/^( |\t)/.test(line) || line.trim() === '') {
      blockLines.push(line);
    } else {
      break;
    }
  }
  return blockLines.join('\n');
}

function expectLineInSection(section, label, pattern) {
  const re = new RegExp(pattern, 'm');
  if (\!re.test(section)) {
    throw new Error(`Expected ${label} to match ${pattern}, but it was not found.\nSection:\n${section}`);
  }
}

describe('yarn.lock integrity for PR changes', () => {
  let lockText;

  beforeAll(() => {
    lockText = readLock();
  });

  describe('astro@^5.13.5 block', () => {
    let section;
    const key = 'astro@^5.13.5';

    beforeAll(() => {
      section = extractBlock(lockText, key);
    });

    test('block exists', () => {
      expect(section).toBeTruthy();
    });

    test('version, resolved, integrity are exact', () => {
      expectLineInSection(section, 'version', '^\\s{2}version\\s+"5\\.13\\.7"\\s*$');
      expectLineInSection(
        section,
        'resolved',
        '^\\s{2}resolved\\s+"https:\\/\\/registry\\.yarnpkg\\.com\\/astro\\/-\\/astro-5\\.13\\.7\\.tgz#[0-9a-f]{40}"\\s*$'
      );
      expectLineInSection(
        section,
        'integrity',
        '^\\s{2}integrity\\s+sha512-Of2tST7ErbE4y1dVb4aWDXaQSIRBAfraJ4jDqaA3PzPRJOn6Ina36\\+tQ\\+8BezjYqiWwRRJdOEE07PRAJXnsddw==\\s*$'
      );
    });

    test('includes key dependencies with expected ranges', () => {
      expectLineInSection(section, 'dependencies header', '^\\s{2}dependencies:\\s*$');
      // Spot-check several dependencies to balance coverage and brittleness
      const deps = [
        ['@astrojs/compiler', '\\^2\\.12\\.2'],
        ['@astrojs/internal-helpers', '0\\.7\\.2'],
        ['@astrojs/markdown-remark', '6\\.3\\.6'],
        ['@astrojs/telemetry', '3\\.3\\.0'],
        ['esbuild', '\\^0\\.25\\.0'],
        ['vite', '\\^6\\.3\\.6'],
        ['zod', '\\^3\\.25\\.76']
      ];
      for (const [name, rangeRe] of deps) {
        expectLineInSection(
          section,
          `dependency ${name}`,
          `^\\s{4}${name}\\s+"${rangeRe}"\\s*$`
        );
      }
    });

    test('optionalDependencies include sharp "^0.34.0"', () => {
      // Ensure optionalDependencies header exists and sharp is nested beneath
      expectLineInSection(section, 'optionalDependencies header', '^\\s{2}optionalDependencies:\\s*$');
      expectLineInSection(section, 'sharp entry', '^\\s{4}sharp\\s+"\\^0\\.34\\.0"\\s*$');
    });
  });

  describe('vite@^6.3.6 block', () => {
    let section;
    const key = 'vite@^6.3.6';

    beforeAll(() => {
      section = extractBlock(lockText, key);
    });

    test('block exists', () => {
      expect(section).toBeTruthy();
    });

    test('version, resolved, integrity are exact', () => {
      expectLineInSection(section, 'version', '^\\s{2}version\\s+"6\\.3\\.6"\\s*$');
      expectLineInSection(
        section,
        'resolved',
        '^\\s{2}resolved\\s+"https:\\/\\/registry\\.yarnpkg\\.com\\/vite\\/-\\/vite-6\\.3\\.6\\.tgz#[0-9a-f]{40}"\\s*$'
      );
      expectLineInSection(
        section,
        'integrity',
        '^\\s{2}integrity\\s+sha512-0msEVHJEScQbhkbVTb\\/4iHZdJ6SXp\\/AvxL2sjwYQFfBqleHtnCqv1J3sa9zbWz\\/6kW1m9Tfzn92vW\\+kZ1WV6QA==\\s*$'
      );
    });

    test('dependencies contain expected subset', () => {
      expectLineInSection(section, 'dependencies header', '^\\s{2}dependencies:\\s*$');
      const deps = [
        ['esbuild', '\\^0\\.25\\.0'],
        ['fdir', '\\^6\\.4\\.4'],
        ['picomatch', '\\^4\\.0\\.2'],
        ['postcss', '\\^8\\.5\\.3'],
        ['rollup', '\\^4\\.34\\.9'],
        ['tinyglobby', '\\^0\\.2\\.13']
      ];
      for (const [name, rangeRe] of deps) {
        expectLineInSection(
          section,
          `dependency ${name}`,
          `^\\s{4}${name}\\s+"${rangeRe}"\\s*$`
        );
      }
    });

    test('optionalDependencies include fsevents "~2.3.3"', () => {
      expectLineInSection(section, 'optionalDependencies header', '^\\s{2}optionalDependencies:\\s*$');
      expectLineInSection(section, 'fsevents entry', '^\\s{4}fsevents\\s+"~2\\.3\\.3"\\s*$');
    });
  });

  describe('typescript@^5.9.2 block', () => {
    let section;
    const key = 'typescript@^5.9.2';

    beforeAll(() => {
      section = extractBlock(lockText, key);
    });

    test('block exists', () => {
      expect(section).toBeTruthy();
    });

    test('version, resolved, integrity are exact', () => {
      expectLineInSection(section, 'version', '^\\s{2}version\\s+"5\\.9\\.2"\\s*$');
      expectLineInSection(
        section,
        'resolved',
        '^\\s{2}resolved\\s+"https:\\/\\/registry\\.yarnpkg\\.com\\/typescript\\/-\\/typescript-5\\.9\\.2\\.tgz#[0-9a-f]{40}"\\s*$'
      );
      expectLineInSection(
        section,
        'integrity',
        '^\\s{2}integrity\\s+sha512-CWBzXQrc\\/qOkhidw1OzBTQuYRbfyxDXJMVJ1XNwUHGROVmuaeiEm3OslpZ1RV96d7SKKjZKrSJu3\\+t\\/xlw3R9A==\\s*$'
      );
    });

    test('does not declare dependencies or optionalDependencies sections', () => {
      // Typescript entry in the provided diff has only version/resolved/integrity.
      expect(/^\s{2}dependencies:\s*$/m.test(section)).toBe(false);
      expect(/^\s{2}optionalDependencies:\s*$/m.test(section)).toBe(false);
    });
  });

  describe('robustness checks', () => {
    test('gracefully handles missing keys', () => {
      const missing = extractBlock(lockText, 'nonexistent@0.0.0');
      expect(missing).toBeNull();
    });

    test('extractBlock stops at next top-level entry', () => {
      const astro = extractBlock(lockText, 'astro@^5.13.5');
      expect(astro).toMatch(/^astro@\^5\.13\.5:\n/);
      // Next block should not be included (heuristic: find another top-level key pattern).
      // We ensure the section contains at least one "non-indented" line at start and then only indented lines.
      const lines = astro.split('\n');
      const nonIndentedCount = lines.filter(l => l.trim() \!== '' && \!/^( |\t)/.test(l)).length;
      expect(nonIndentedCount).toBe(1);
    });
  });
});