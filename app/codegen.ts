import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/api-graphql/__generated__/resolvers.ts": {
      config: {
        contextType: "../../defineContext#Context",
        enumsAsTypes: true,
        mapperTypeSuffix: "Type",
      },
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-resolvers",
        "graphql-codegen-typescript-resolvers-define",
      ],
    },
    "./src/api-graphql/__generated__/schema.graphql": {
      plugins: ["@graphql-codegen/schema-ast"],
    },
  },
  schema: [
    "./src/api-graphql/**/*.graphql",
    "!./src/api-graphql/__generated__/schema.graphql",
  ],
};

export default config;
