import { readFile } from "node:fs/promises";

/**
 * Load package.json as parsed object.
 * Throws descriptive errors on parse failures.
 */
export async function loadPackageJson(path = "package.json") {
  const raw = await readFile(path, "utf8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    const e = new Error(`Failed to parse ${path}: ${(err && err.message) || err}`);
    e.cause = err;
    throw e;
  }
}

/**
 * Simple schema checks for required keys and types.
 * Returns an array of problems; empty array means OK.
 */
export function validateBasicSchema(pkg) {
  const problems = [];
  const requiredString = (key) => {
    if (\!(key in pkg)) problems.push(`missing "${key}"`);
    else if (typeof pkg[key] \!== "string") problems.push(`"${key}" must be string`);
  };

  requiredString("name");
  requiredString("version");
  requiredString("type");

  if (\!pkg.scripts || typeof pkg.scripts \!== "object") {
    problems.push('"scripts" must be an object');
  } else {
    for (const [k, v] of Object.entries(pkg.scripts)) {
      if (typeof v \!== "string") problems.push(`script "${k}" must be string`);
    }
  }

  if (pkg.dependencies && typeof pkg.dependencies \!== "object") {
    problems.push('"dependencies" must be an object when present');
  }
  if (pkg.devDependencies && typeof pkg.devDependencies \!== "object") {
    problems.push('"devDependencies" must be an object when present');
  }

  return problems;
}