import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/graphql/__generated__/resolvers.ts": {
      config: {
        contextType: "../../defineContext#Context",
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
    "./src/graphql/__generated__/schema.graphql": {
      plugins: ["@graphql-codegen/schema-ast"],
    },
  },
  schema: [
    "./src/graphql/**/*.graphql",
    "!./src/graphql/__generated__/schema.graphql",
  ],
};

export default config;
