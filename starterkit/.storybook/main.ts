import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../apps/**/*.stories.@(ts|tsx)", "../packages/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "msw-storybook-addon"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        name: "@storybook/builder-vite"
      }
    }
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../apps/web"),
      "@ui": path.resolve(__dirname, "../packages/ui")
    };
    return config;
  }
};

export default config;
