/**
 * Apex UI - Shared Admin & Dashboard Design Tokens (Nuxt 4 + Nuxt UI)
 * Template file for standardized UI styling, responsive layouts, and table configurations.
 */

export const adminDashboardBodyClass = "admin-dashboard flex flex-col gap-3 p-2 sm:p-6";
export const adminDashboardCardClass = "admin-dashboard-card rounded-lg border border-default/30 bg-default p-4 dark:border-default/20 dark:bg-elevated/55";
export const adminFilterBarClass = "admin-filter-bar flex flex-wrap items-center justify-between gap-2 rounded-md border border-default/30 bg-default p-2 dark:border-default/20 dark:bg-elevated/55";
export const adminListCardClass = "overflow-hidden rounded-md border border-default/30 bg-default p-2.5 transition duration-150 hover:border-default/45 dark:border-default/20 dark:bg-elevated/55";
export const adminMobileListCardClass = "overflow-hidden rounded-md border border-default/30 bg-default p-2 transition-[background-color,border-color] duration-200 hover:border-default/45 dark:border-default/20 dark:bg-elevated/55 dark:hover:bg-elevated/70";
export const adminEmptyStateClass = "flex flex-col items-center justify-center rounded-lg border border-dashed border-default/30 bg-default/55 px-4 py-10 text-center text-muted dark:border-default/20 dark:bg-elevated/30";

/**
 * Standard Nuxt UI Table configuration (Sticky header, zebra rows, hover highlights)
 */
export const adminTableUi = {
  root: "relative overflow-x-auto",
  base: "table-fixed border-separate border-spacing-0",
  thead: "sticky top-0 z-1 [&>tr]:bg-muted dark:[&>tr]:bg-elevated/60 [&>tr]:after:content-none",
  tbody: "[&>tr]:last:[&>td]:border-b-0 [&>tr>td:nth-child(even)]:bg-elevated/20 dark:[&>tr>td:nth-child(even)]:bg-elevated/25 [&>tr:hover>td]:bg-primary/5 dark:[&>tr:hover>td]:bg-elevated/45",
  th: "border-b border-default bg-muted dark:bg-elevated/60 py-2.5 font-semibold text-toned text-xs uppercase tracking-wide dark:border-default/30",
  td: "border-b border-default py-2.5 transition-colors dark:border-default/25",
  separator: "h-0",
} as const;

/**
 * Generates soft pastel badge tone classes for catalog items or categories based on string hash
 */
export const getCatalogItemToneClass = (categoryName?: string): string => {
  const tones = [
    "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-300",
    "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300",
    "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300",
    "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-950/40 dark:border-violet-800 dark:text-violet-300",
    "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300",
    "bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-950/40 dark:border-cyan-800 dark:text-cyan-300",
  ];

  if (!categoryName) return tones[0];
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = (hash << 5) - hash + categoryName.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % tones.length;
  return tones[index];
};
