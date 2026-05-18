import type { APIRoute } from "astro";

// Generated from `Astro.site` (astro.config.mjs) so the Sitemap URL
// stays in sync with the canonical origin. Replaces a hand-written
// public/robots.txt that duplicated the production hostname.
export const GET: APIRoute = ({ site }) => {
    const sitemap = new URL("sitemap-index.xml", site).href;
    const body = `User-agent: *\nDisallow:\n\nSitemap: ${sitemap}\n`;
    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
};
