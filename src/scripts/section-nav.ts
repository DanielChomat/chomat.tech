// Shared active-section tracking for the in-page navigations (NavCapsule
// + MobileMenu). Both highlight the section currently under the reader;
// only *what they do* with the active section differs (NavCapsule slides a
// pill, MobileMenu toggles a class), so that part stays in each component
// while the scroll/observer logic lives here once.
//
// Imported from `.astro` <script> islands, which compile to ES modules —
// see AGENTS.md "Astro-specific gotchas".

export type SectionTrackerOptions = {
    /** Sections to observe, in document order (last = end of content). */
    sections: HTMLElement[];
    /** Fired when the active section changes; `null` means none active. */
    onActiveChange: (section: HTMLElement | null) => void;
    /**
     * End-of-content sentinel (the page footer). While it's visible the
     * last section is forced active — a short trailing section may never
     * reach the trigger band on its own.
     */
    footer?: HTMLElement | null;
};

/**
 * Observe `sections` and report the active one. "Active" = the bottommost
 * section whose top edge sits within the trigger band (top ~30% of the
 * viewport), or the last section once the footer is in view. Calls
 * `onActiveChange` only when the selection actually changes.
 */
export function trackActiveSection({
    sections,
    onActiveChange,
    footer,
}: SectionTrackerOptions): void {
    if (sections.length === 0) return;

    const visible = new Set<HTMLElement>();
    let endReached = false;
    let current: HTMLElement | null = null;

    const emit = (next: HTMLElement | null) => {
        if (next === current) return;
        current = next;
        onActiveChange(next);
    };

    const update = () => {
        if (endReached) {
            emit(sections[sections.length - 1] ?? null);
            return;
        }
        // Bottommost section currently in the trigger band (largest top).
        const chosen = Array.from(visible).reduce<HTMLElement | null>(
            (best, section) =>
                best && best.getBoundingClientRect().top >= section.getBoundingClientRect().top
                    ? best
                    : section,
            null
        );
        emit(chosen);
    };

    const sectionObs = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                const section = entry.target as HTMLElement;
                if (entry.isIntersecting) visible.add(section);
                else visible.delete(section);
            }
            update();
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );
    for (const section of sections) sectionObs.observe(section);

    if (footer) {
        const endObs = new IntersectionObserver(
            ([entry]) => {
                endReached = entry?.isIntersecting ?? false;
                update();
            },
            { threshold: 0 }
        );
        endObs.observe(footer);
    }
}

/**
 * Build a section→link map from anchors whose `href` is an in-page hash
 * (`#section`), skipping any that opt out via `data-back-to-top`. Returns
 * the map plus the sections in link order (handy for the tracker).
 */
export function mapLinksToSections(links: Iterable<HTMLAnchorElement>): {
    linkBySection: Map<HTMLElement, HTMLAnchorElement>;
    sections: HTMLElement[];
} {
    const linkBySection = new Map<HTMLElement, HTMLAnchorElement>();
    for (const link of links) {
        const id = link.getAttribute("href")?.replace(/^#/, "");
        if (!id) continue;
        const section = document.getElementById(id);
        if (section) linkBySection.set(section, link);
    }
    return { linkBySection, sections: Array.from(linkBySection.keys()) };
}
