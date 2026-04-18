import Link from "next/link";
import { siteContent } from "@/content/site";
import { theme } from "@/lib/theme";

export function SiteHeader() {
  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur">
      <div
        className={`${theme.wideContainer} flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between`}
      >
        <Link href="/" className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {siteContent.brand.title}
          </p>
          <p className="text-sm text-foreground/90">{siteContent.brand.subtitle}</p>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link className={theme.navLink} href="/">
            {siteContent.navigation.home}
          </Link>
          <Link className={theme.navLink} href="/mat">
            {siteContent.navigation.assessment}
          </Link>
          <Link className={theme.navLink} href="/nidurstada">
            {siteContent.navigation.results}
          </Link>
        </nav>
      </div>
    </header>
  );
}
