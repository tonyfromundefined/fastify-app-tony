import { graphql } from "react-relay";
import { useRelayQueryLoaderData } from "react-router-relay";
import type { homeQuery } from "../__generated__/homeQuery.graphql";
import { relayQueryLoader } from "../utils/relayQueryLoader";

const query = graphql`
  query homeQuery {
    ping
  }
`;

export const loader = relayQueryLoader<homeQuery>({
  query,
});

export default function Home() {
  const data = useRelayQueryLoaderData<typeof loader>(query);

  return <div>{String(data.ping)}</div>;
}
