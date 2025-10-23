import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import "../apps/web/app/globals.css";

initialize({
  onUnhandledRequest: "bypass"
});

const preview: Preview = {
  decorators: [mswDecorator],
  parameters: {
    a11y: {
      element: "#root",
      config: {},
      options: {
        runOnly: ["wcag2a", "wcag2aa"]
      }
    },
    controls: {
      expanded: true
    },
    docs: {
      autodocs: true
    }
  }
};

export default preview;
