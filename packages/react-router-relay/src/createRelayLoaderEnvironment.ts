import { Environment, Network, RecordSource, Store } from "relay-runtime";

interface CreateRelayLoaderEnvironmentInput {
  url: string;
}

export function createRelayLoaderEnvironment(
  input: CreateRelayLoaderEnvironmentInput,
) {
  const network = Network.create(async (operation, variables, cacheConfig) => {
    const response = await fetch(input.url, {
      method: "post",
      body: JSON.stringify({
        query: operation?.text,
        variables,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: cacheConfig.metadata?.signal as AbortSignal,
    });

    // biome-ignore lint/suspicious/noExplicitAny:
    return (await response.json()) as Promise<any>;
  });

  const store = new Store(new RecordSource());

  const environment = new Environment({
    network,
    store,
  });

  return environment;
}
