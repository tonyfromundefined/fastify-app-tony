import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    "./src/graphql-api/**/*.graphql",
    "!./src/graphql-api/__generated__/schema.graphql",
  ],
  generates: {
    "./src/graphql-api/__generated__/schema.graphql": {
      plugins: ["@graphql-codegen/schema-ast"],
    },
    "./src/graphql-api/__generated__/resolvers.ts": {
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-resolvers",
        "graphql-codegen-typescript-resolvers-define",
      ],
      config: {
        contextType: "../defineContext#Context",
        mapperTypeSuffix: "Type",
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
