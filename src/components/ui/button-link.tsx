import Link from "next/link";
import { theme } from "@/lib/theme";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

const variantClassMap = {
  primary: theme.primaryButton,
  secondary: theme.secondaryButton,
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={variantClassMap[variant]}>
      {children}
    </Link>
  );
}
