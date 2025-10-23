import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--color-surface-base)] p-[var(--space-layout)] text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[var(--radius-lg)] bg-[color:var(--color-surface-card)] p-[var(--space-layout)] shadow-sm">
        <BookOpenCheck
          aria-hidden="true"
          className="h-12 w-12 text-[color:var(--color-accent-primary)]"
        />
        <h1 className="text-4xl font-semibold tracking-tight">Starter Kit React + Next</h1>
        <p className="text-lg text-[color:var(--color-text-subtle)]">
          Explore o dashboard demonstrativo, componentes reutilizáveis e uma documentação viva alimentada por Storybook.
        </p>
        <Link
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-accent-primary)] px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-[color:var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent-primary)]"
          href="/(dashboard)/dashboard"
        >
          Acessar dashboard
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </Link>
      </div>
    </main>
  );
}
