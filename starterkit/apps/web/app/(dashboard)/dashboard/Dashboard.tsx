'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, LineChart, Users } from "lucide-react";
import { Button } from "@ui/components/ui/button";

type DashboardMetrics = {
  users: number;
  revenue: number;
};

type DashboardState =
  | { status: "loading" }
  | { status: "ready"; data: DashboardMetrics }
  | { status: "empty" }
  | { status: "error"; message: string };

const API_ENDPOINT = "/api/dashboard";
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2
});

export function Dashboard() {
  const [state, setState] = useState<DashboardState>({ status: "loading" });

  const loadMetrics = useCallback(
    async (signal?: AbortSignal) => {
      setState({ status: "loading" });

      try {
        const response = await fetch(API_ENDPOINT, {
          cache: "no-store",
          signal
        });

        if (!response.ok) {
          throw new Error("Não foi possível carregar os dados do dashboard.");
        }

        const payload = (await response.json()) as Partial<DashboardMetrics> | null;

        const normalized: DashboardMetrics = {
          users: Number(payload?.users ?? 0),
          revenue: Number(payload?.revenue ?? 0)
        };

        if (normalized.users <= 0 && normalized.revenue <= 0) {
          setState({ status: "empty" });
          return;
        }

        setState({ status: "ready", data: normalized });
      } catch (error) {
        if (signal?.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Erro desconhecido ao consultar métricas.";
        setState({ status: "error", message });
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    loadMetrics(controller.signal);
    return () => controller.abort();
  }, [loadMetrics]);

  const metrics = useMemo(() => {
    if (state.status !== "ready") {
      return [];
    }

    return [
      {
        label: "Usuários ativos",
        value: state.data.users.toLocaleString("pt-BR"),
        icon: Users,
        description: "Total de contas ativas nos últimos 30 dias."
      },
      {
        label: "Receita recorrente",
        value: currencyFormatter.format(state.data.revenue),
        icon: LineChart,
        description: "Faturamento bruto consolidado do período."
      }
    ] as const;
  }, [state]);

  const isLoading = state.status === "loading";

  return (
    <section
      aria-busy={isLoading}
      aria-live="polite"
      className="mx-auto flex w-full max-w-4xl flex-col gap-[var(--space-gap)] rounded-[var(--radius-lg)] bg-[color:var(--color-surface-card)] p-[var(--space-layout)] shadow-md ring-1 ring-black/5"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-accent-primary)]">
            Painel analítico
          </p>
          <h1 className="text-3xl font-semibold text-[color:var(--color-text-primary)]">
            Visão geral do produto
          </h1>
          <p className="text-base text-[color:var(--color-text-subtle)]">
            Monitore crescimento, receita e indicadores de adoção em tempo real.
          </p>
        </div>
        <Button
          className="mt-4 w-full sm:mt-0 sm:w-auto"
          variant="outline"
          onClick={() => loadMetrics()}
          disabled={isLoading}
        >
          Atualizar métricas
        </Button>
      </header>

      {state.status === "loading" ? (
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[color:var(--color-surface-base)] p-4 text-sm text-[color:var(--color-text-subtle)] shadow-inner">
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border-2 border-[color:var(--color-accent-primary)] border-t-transparent"
          />
          <span>Carregando métricas atualizadas...</span>
        </div>
      ) : null}

      {state.status === "ready" ? (
        <div className="grid gap-[var(--space-gap)] sm:grid-cols-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.label}
                className="flex flex-col gap-3 rounded-[var(--radius-md)] bg-[color:var(--color-surface-base)] p-6 shadow-sm ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-[color:var(--color-accent-primary)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[color:var(--color-text-subtle)]">
                    {metric.label}
                  </span>
                  <Icon aria-hidden="true" className="h-6 w-6 text-[color:var(--color-accent-primary)]" />
                </div>
                <span className="text-4xl font-semibold text-[color:var(--color-text-primary)]">
                  {metric.value}
                </span>
                <p className="text-sm text-[color:var(--color-text-subtle)]">{metric.description}</p>
                <Button variant="ghost" className="self-start px-0 text-[color:var(--color-accent-primary)]">
                  Ver detalhes
                </Button>
              </article>
            );
          })}
        </div>
      ) : null}

      {state.status === "empty" ? (
        <div className="flex flex-col items-center gap-4 rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-accent-primary)] bg-[color:var(--color-surface-card)] p-6 text-center text-sm text-[color:var(--color-text-subtle)]">
          <p>Nenhum dado disponível para o período selecionado.</p>
          <p>Tente ajustar filtros ou atualizar as métricas para coletar novos eventos.</p>
          <Button variant="outline" onClick={() => loadMetrics()} disabled={isLoading}>
            Coletar novamente
          </Button>
        </div>
      ) : null}

      {state.status === "error" ? (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-6 text-[color:var(--color-text-primary)]"
        >
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle aria-hidden="true" className="h-5 w-5" />
            <strong>Não foi possível carregar as métricas.</strong>
          </div>
          <p className="text-sm text-red-700">{state.message}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => loadMetrics()} disabled={isLoading}>
              Tentar novamente
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Dashboard;
