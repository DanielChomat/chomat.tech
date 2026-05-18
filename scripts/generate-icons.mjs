// Rasterise public/favicon.svg into the PNG variants browsers want.
// One-shot. Re-run when the SVG changes; the outputs are committed.
//
//   yarn node scripts/generate-icons.mjs
//
// Background colour matches the newsprint palette --bg (#f8f5ec) so the
// rasterised icons sit on cream rather than a transparent square — better
// on iOS home screen and Android launcher.

import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const svgPath = resolve(repo, "public/favicon.svg");

const svg = await readFile(svgPath, "utf-8");

const targets = [
    { out: "public/apple-touch-icon.png", size: 180 },
    { out: "public/icon-192.png", size: 192 },
    { out: "public/icon-512.png", size: 512 },
    { out: "public/favicon-32.png", size: 32 },
];

for (const { out, size } of targets) {
    const png = new Resvg(svg, {
        background: "rgb(248, 245, 236)",
        fitTo: { mode: "width", value: size },
    })
        .render()
        .asPng();
    await writeFile(resolve(repo, out), png);
    console.log(`wrote ${out} (${size}×${size}, ${png.byteLength} bytes)`);
}
