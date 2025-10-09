import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/**/typedefs/*.graphql",
  generates: {
    "./src/graphql/modules/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../__generated__/graphql.ts",
        filename: "__generated__/module-types.ts",
        encapsulateModuleTypes: "prefix",
      },
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../../Context#Context",
        enumsAsTypes: true,
        mapperTypeSuffix: "Type",
        useTypeImports: true,
      },
    },
    "./src/graphql/__generated__/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
