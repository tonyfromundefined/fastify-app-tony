import path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import { resolvers } from "./resolvers";

const dirname = import.meta.dirname;

export default createModule({
  id: "Base",
  dirname,
  typeDefs: loadFilesSync(path.join(dirname, "./typedefs/**.graphql")),
  resolvers,
});
