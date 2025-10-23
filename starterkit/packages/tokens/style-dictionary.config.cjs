const StyleDictionary = require("style-dictionary");
const { registerTransforms } = require("@tokens-studio/sd-transforms");

registerTransforms(StyleDictionary);

StyleDictionary.registerFormat({
  name: "tokens-studio/ts",
  formatter: ({ dictionary }) => {
    const entries = dictionary.allTokens.map((token) => {
      const name = token.path.join(".");
      const type = token.original?.type || token.type || "";
      const description = token.description
        ? `,\n    description: ${JSON.stringify(token.description)}`
        : "";
      return `  "${name}": {\n    value: ${JSON.stringify(token.value)},\n    type: ${JSON.stringify(type)}${description}\n  }`;
    });

    return `export const tokens = {\n${entries.join(",\n")}\n} as const;\n\nexport type TokenName = keyof typeof tokens;\n`;
  }
});

module.exports = {
  source: ["tokens.json"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      buildPath: "build/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            selector: ":root"
          }
        }
      ]
    },
    ts: {
      transformGroup: "tokens-studio",
      buildPath: "build/",
      files: [
        {
          destination: "tokens.ts",
          format: "tokens-studio/ts"
        }
      ]
    }
  }
};
