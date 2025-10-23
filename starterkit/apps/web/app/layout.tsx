import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starter Kit Dashboard",
  description: "Dashboard de exemplo com Next.js, shadcn/ui, Storybook e MSW."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[color:var(--color-surface-base)] text-[color:var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
