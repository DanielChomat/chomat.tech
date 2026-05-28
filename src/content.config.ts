import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const stickerTone = z.enum(["butter", "sage", "rose", "sky", "lavender", "teal"]);
const bentoSize = z.enum(["sm", "md", "lg", "xl"]);

const projects = defineCollection({
    loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        tagline: z.string(),
        status: z.enum(["shipped", "building", "archived", "private"]),
        kind: z.enum(["personal", "client"]),
        client: z.string().optional(),
        cover: z.string().optional(),
        tech: z.array(z.string()).default([]),
        links: z
            .object({
                live: z.url().optional(),
                repo: z.url().optional(),
                caseStudy: z.string().optional(),
            })
            .optional(),
        bentoSize: bentoSize.default("sm"),
        featured: z.boolean().default(false),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        year: z.string().optional(),
        sticker: z
            .object({
                tone: stickerTone.optional(),
                text: z.string(),
            })
            .optional(),
        homeLabel: z.string().optional(),
        order: z.number().default(0),
    }),
});

const experience = defineCollection({
    loader: glob({ base: "./src/content/experience", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        company: z.string(),
        title: z.string(),
        intervals: z
            .array(
                z.object({
                    start: z.date(),
                    end: z.union([z.date(), z.literal("present")]),
                })
            )
            .min(1),
        location: z.string().optional(),
        tech: z.array(z.string()).default([]),
        nda: z.boolean().default(false),
        summary: z.string(),
        tint: z
            .enum([
                "butter",
                "sage",
                "rose",
                "sky",
                "lavender",
                "mint",
                "blossom",
                "coral",
                "peach",
                "lime",
                "teal",
                "",
            ])
            .default(""),
        order: z.number().default(0),
    }),
});

const companies = defineCollection({
    loader: glob({ base: "./src/content/companies", pattern: "**/*.json" }),
    schema: z.object({
        name: z.string(),
        logo: z.string().optional(),
        url: z.url().optional(),
        order: z.number().default(0),
    }),
});

const about = defineCollection({
    loader: glob({ base: "./src/content/about", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        location: z.string(),
        languages: z.array(
            z.object({
                code: z.string(),
            })
        ),
    }),
});

export const collections = { projects, experience, companies, about };
