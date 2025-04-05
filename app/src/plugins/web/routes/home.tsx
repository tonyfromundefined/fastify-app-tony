import { graphql } from "react-relay";
import type { homeQuery } from "../__generated__/homeQuery.graphql";
import { relayQueryLoader } from "../relay/relayQueryLoader";
import { useRelayQueryLoaderData } from "../relay/useRelayQueryLoaderData";

const query = graphql`
  query homeQuery {
    ping
  }
`;

export const loader = relayQueryLoader<homeQuery>({
  query,
  variables: () => ({}),
});

export default function Home() {
  const data = useRelayQueryLoaderData<typeof loader>(query);

  return <div>{String(data.ping)}</div>;
}
