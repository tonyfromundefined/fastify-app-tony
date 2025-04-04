import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/plugins/graphql/__generated__/resolvers.ts": {
      config: {
        contextType: "../../../Context#Context",
        enumsAsTypes: true,
        mapperTypeSuffix: "Type",
        useTypeImports: true,
      },
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-resolvers",
        "graphql-codegen-typescript-resolvers-define",
      ],
    },
    "./src/plugins/graphql/__generated__/schema.graphql": {
      plugins: ["@graphql-codegen/schema-ast"],
    },
  },
  schema: [
    "./src/plugins/graphql/**/*.graphql",
    "!./src/plugins/graphql/__generated__/schema.graphql",
  ],
};

export default config;
