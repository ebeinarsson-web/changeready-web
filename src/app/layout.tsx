import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteContent } from "@/content/site";
import { CHANGEREADY_APP_URL } from "@/config/site";
import { display, sans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(CHANGEREADY_APP_URL),
  title: {
    default: `${siteContent.brand.title} · ${siteContent.brand.subtitle}`,
    template: `%s | ${siteContent.brand.title}`,
  },
  description: siteContent.home.lead,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="is"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <PageShell>
          <SiteHeader />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
              {children}
            </div>
          </main>
          <SiteFooter />
        </PageShell>
      </body>
    </html>
  );
}
