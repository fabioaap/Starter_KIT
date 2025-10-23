import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { DialogExample } from "@ui/components/dialog-example";

const meta = {
  title: "UI/DialogExample",
  component: DialogExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof DialogExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InteracaoAcessivel: Story = {
  name: "Interação acessível",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole("button", { name: /abrir diálogo/i });
    await userEvent.click(trigger);
    const dialog = await canvas.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.queryByRole("dialog")).not.toBeInTheDocument());
  }
};
