import { createClient as createSubscriptionsClient } from "graphql-ws";
import type { FetchFunction, SubscribeFunction } from "relay-runtime";
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";

const GRAPHQL_ENDPOINT = "/graphql";

const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";

const fetchFn: FetchFunction = async (operation, variables, cacheConfig) => {
  const result = await fetch(GRAPHQL_ENDPOINT, {
    method: "post",
    body: JSON.stringify({
      query: operation?.text,
      variables,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    signal: cacheConfig.metadata?.signal as AbortSignal,
  }).then((response) => response.json());

  return result;
};

const subscriptionsClient = createSubscriptionsClient({
  url: `${wsProtocol}//${window.location.host}${GRAPHQL_ENDPOINT}`,
});

const subscribeFn: SubscribeFunction = (operation, variables) => {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error("Operation text cannot be empty"));
    }

    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink as any,
    );
  });
};

export const relayEnvironment = new Environment({
  network: Network.create(fetchFn, subscribeFn),
  store: new Store(new RecordSource()),
});
