import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
