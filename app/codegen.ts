import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    "./src/api-graphql/**/*.graphql",
    "!./src/api-graphql/__generated__/schema.graphql",
  ],
  generates: {
    "./src/api-graphql/__generated__/schema.graphql": {
      plugins: ["@graphql-codegen/schema-ast"],
    },
    "./src/api-graphql/__generated__/resolvers.ts": {
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
