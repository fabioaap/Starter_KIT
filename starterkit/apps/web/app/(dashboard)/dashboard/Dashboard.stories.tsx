import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse, delay } from "msw";
import { Dashboard } from "@/app/(dashboard)/dashboard/Dashboard";

const API_ENDPOINT = "/api/dashboard";

const meta = {
  title: "App/Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Dashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Carregando: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(API_ENDPOINT, async () => {
          await delay(1500);
          return HttpResponse.json({});
        })
      ]
    }
  }
};

export const Pronto: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(API_ENDPOINT, async () => {
          await delay(400);
          return HttpResponse.json({
            users: 1820,
            revenue: 98200
          });
        })
      ]
    }
  }
};

export const Vazio: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(API_ENDPOINT, async () => {
          await delay(250);
          return HttpResponse.json({});
        })
      ]
    }
  }
};

export const Erro: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(API_ENDPOINT, async () => {
          await delay(200);
          return HttpResponse.json(
            { message: "Serviço temporariamente indisponível." },
            { status: 500 }
          );
        })
      ]
    }
  }
};
