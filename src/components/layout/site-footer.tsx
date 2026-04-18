import Link from "next/link";
import { siteContent } from "@/content/site";
import { theme } from "@/lib/theme";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/90">
      <div
        className={`${theme.wideContainer} flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between`}
      >
        <p className="max-w-xl leading-relaxed">
          {siteContent.brand.creditLead}{" "}
          <Link
            href={siteContent.brand.creditHref}
            className="font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            {siteContent.brand.creditTargetLabel}
          </Link>
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-muted/80">
          ChangeReady · einarsson.io vörumerkjafjölskylda
        </p>
      </div>
    </footer>
  );
}
