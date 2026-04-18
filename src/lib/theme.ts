export const theme = {
  container: "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8",
  wideContainer: "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10",
  navLink:
    "rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted/70 hover:text-foreground",
  panel:
    "rounded-[22px] border border-border/80 bg-surface/95 shadow-soft backdrop-blur-sm",
  subtlePanel: "rounded-[18px] border border-border/60 bg-surface-muted/60",
  brandMark:
    "inline-flex items-center rounded-full border border-border/70 bg-surface-muted/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent",
  eyebrow:
    "text-xs font-semibold uppercase tracking-[0.22em] text-accent sm:text-[13px]",
  sectionTitle:
    "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
  body: "text-base leading-7 text-muted sm:text-lg sm:leading-8",
  bodySm: "text-sm leading-6 text-muted",
  primaryButton:
    "inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_14px_40px_rgba(177,122,82,0.22)] transition-[transform,box-shadow,background-color,border-color] hover:-translate-y-px hover:border-accent hover:bg-[color-mix(in_oklab,var(--accent)_92%,white)] hover:shadow-[0_18px_46px_rgba(177,122,82,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0",
  secondaryButton:
    "inline-flex items-center justify-center rounded-full border border-border bg-surface-muted/80 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ghostButton:
    "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground",
} as const;
