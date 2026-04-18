import { ButtonLink } from "@/components/ui/button-link";
import { siteContent } from "@/content/site";
import { display } from "@/lib/fonts";
import { theme } from "@/lib/theme";

export function HomeIntro() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_top,rgba(177,122,82,0.14),transparent_55%),linear-gradient(135deg,rgba(20,22,28,0.95),rgba(12,13,16,0.98))] px-6 py-12 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(244,241,234,0.04),transparent_45%)]" />
      <div className="relative space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent/95">{siteContent.home.eyebrow}</p>
        <div className="space-y-4">
          <h1
            className={`${display.className} max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl`}
          >
            {siteContent.home.title}
          </h1>
          <p className={`${theme.body} max-w-2xl text-balance`}>{siteContent.home.lead}</p>
        </div>

        <ul className="grid gap-3 text-[0.95rem] text-muted sm:grid-cols-3">
          {siteContent.home.bullets.map((bullet) => (
            <li
              key={bullet}
              className="rounded-2xl border border-border/80 bg-surface-muted/55 px-4 py-3 leading-relaxed"
            >
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/mat">{siteContent.home.primaryCta}</ButtonLink>
          <p className="text-[0.95rem] leading-6 text-muted sm:max-w-sm">{siteContent.home.secondaryNote}</p>
        </div>
      </div>
    </section>
  );
}
