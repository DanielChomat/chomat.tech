// Display helpers shared across content-rendering components.

export type Interval = { start: Date; end: Date | "present" };

function year(d: Date): number {
    return d.getFullYear();
}

export function formatInterval(iv: Interval): string {
    const startY = year(iv.start);
    if (iv.end === "present") return `${startY}–now`;
    return `${startY}–${year(iv.end)}`;
}

export function formatIntervals(intervals: readonly Interval[]): string {
    return intervals.map(formatInterval).join(" · ");
}

export function isCurrent(intervals: readonly Interval[]): boolean {
    return intervals.some((iv) => iv.end === "present");
}

const BENTO_TO_COL: Record<string, string> = {
    sm: "col-4",
    md: "col-5",
    lg: "col-7",
    xl: "col-12",
};

export function bentoCol(size: "sm" | "md" | "lg" | "xl"): string {
    return BENTO_TO_COL[size] ?? "col-4";
}

const STICKER_PREFIX = "s-";

export function stickerClass(tone?: string): string {
    if (!tone) return "";
    // Internal palette tokens use single-letter ("lav") for lavender.
    const map: Record<string, string> = {
        butter: "s-butter",
        sage: "s-sage",
        rose: "s-rose",
        sky: "s-sky",
        lavender: "s-lav",
        teal: "s-teal",
    };
    return map[tone] ?? `${STICKER_PREFIX}${tone}`;
}

const TINT_MAP: Record<string, string> = {
    butter: "tint-butter",
    sage: "tint-sage",
    rose: "tint-rose",
    sky: "tint-sky",
    lavender: "tint-lavender",
    mint: "tint-mint",
    blossom: "tint-blossom",
    coral: "tint-coral",
    peach: "tint-peach",
    lime: "tint-lime",
    teal: "tint-teal",
};

export function tintClass(tone?: string): string {
    if (!tone) return "";
    return TINT_MAP[tone] ?? "";
}

/** Up-to-two-letter monogram from a name: "Partners Bank" → "PB". */
export function initials(name: string): string {
    return name
        .split(/\s+/)
        .map((w) => w[0] ?? "")
        .join("")
        .slice(0, 2)
        .toUpperCase();
}
