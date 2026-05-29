// Open Graph image for chomat.tech. Rendered at build time into
// dist/og.png and referenced by BaseLayout's og:image / twitter:image.
//
// Newsprint palette, Geist Medium. Per-page variants (e.g.,
// /og/[slug].png) can land later — for now a single static image
// covers every share, which is plenty for v1.

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori from "satori";
import { SITE } from "../data/site.ts";

// Resolve from process.cwd() (the project root, both for `astro dev`
// and `astro build`). `import.meta.url` points at the bundled route
// in dist/ during build, which doesn't have the source assets.
const fontsDir = resolve(process.cwd(), "src/assets/fonts");

const [geistMedium, geistRegular] = await Promise.all([
    readFile(resolve(fontsDir, "Geist-Medium.ttf")),
    readFile(resolve(fontsDir, "Geist-Regular.ttf")),
]);

const BG = "#f8f5ec";
const TEXT = "#16140f";
const MUTED = "#74706a";
const ACCENT = "#0f6b66";

// Roman-numeral year for the masthead stamp. Derived from the build date
// (this route renders at build time) so it tracks each release instead of
// going stale as a hardcoded literal.
const toRomanYear = (year: number): string => {
    const numerals: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];
    let remaining = year;
    let out = "";
    for (const [value, symbol] of numerals) {
        while (remaining >= value) {
            out += symbol;
            remaining -= value;
        }
    }
    return out;
};
const ogYear = toRomanYear(new Date().getFullYear());

export const GET: APIRoute = async () => {
    const svg = await satori(
        {
            type: "div",
            props: {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "80px",
                    background: BG,
                    color: TEXT,
                    fontFamily: "Geist",
                },
                children: [
                    {
                        type: "div",
                        props: {
                            style: {
                                fontSize: 22,
                                color: MUTED,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                fontWeight: 400,
                            },
                            children: `${SITE.meta.siglum} · ${ogYear}`,
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: { display: "flex", flexDirection: "column", gap: "24px" },
                            children: [
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            fontSize: 140,
                                            fontWeight: 500,
                                            lineHeight: 0.95,
                                            letterSpacing: "-0.045em",
                                            display: "flex",
                                        },
                                        children: [
                                            SITE.hero.name,
                                            {
                                                type: "span",
                                                props: {
                                                    style: { color: ACCENT },
                                                    children: "*",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            fontSize: 36,
                                            color: MUTED,
                                            fontWeight: 400,
                                            maxWidth: "900px",
                                            lineHeight: 1.3,
                                        },
                                        children: SITE.meta.ogTagline,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                fontSize: 22,
                                color: MUTED,
                            },
                            children: [
                                {
                                    type: "div",
                                    props: { children: "chomat.tech" },
                                },
                                {
                                    type: "div",
                                    props: {
                                        style: {
                                            letterSpacing: "0.04em",
                                            textTransform: "uppercase",
                                        },
                                        children: SITE.meta.ogLocale,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            width: 1200,
            height: 630,
            fonts: [
                { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
                { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
            ],
        }
    );

    const png = new Resvg(svg).render().asPng();
    return new Response(new Uint8Array(png), {
        headers: { "Content-Type": "image/png" },
    });
};
