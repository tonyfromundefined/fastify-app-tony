import { createRelayQueryLoader } from "react-router-relay";
import type { Context } from "../../../Context";

export const relayQueryLoader = createRelayQueryLoader<Context>({
  url: "http://127.0.0.1:3000/graphql",
});
