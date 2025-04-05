import { loadQuery } from "react-relay";
import type { LoaderFunctionArgs } from "react-router";
import type { GraphQLTaggedNode, OperationType } from "relay-runtime";
import { createRelayLoaderEnvironment } from "./createRelayLoaderEnvironment";

export type RelayQueryLoaderArgs<Query extends OperationType> = {
  query: GraphQLTaggedNode;
  variables?: (
    loaderArgs: LoaderFunctionArgs,
  ) => Query extends OperationType ? Query["variables"] : object;
};

export type RelayQueryLoaderResponse<Query extends OperationType> = {
  recordMap: { [key: string]: {} };
  variables: Query["variables"];
  " $queryType": Query;
};

export function relayQueryLoader<Query extends OperationType>(
  args: RelayQueryLoaderArgs<Query>,
) {
  return async (
    loaderArgs: LoaderFunctionArgs,
  ): Promise<RelayQueryLoaderResponse<Query>> => {
    const relayEnvironment = createRelayLoaderEnvironment();
    const variables = args.variables?.(loaderArgs) ?? {};

    /**
     * 1. 쿼리 실행
     */
    const queryRef = loadQuery(relayEnvironment, args.query, variables);
    await queryRef.source?.toPromise();

    /**
     * 2. 쿼리가 끝난 후 Relay Environment에 들어있는 레코드를 전달
     */
    return {
      recordMap: relayEnvironment.getStore().getSource().toJSON(),
      variables,
      " $queryType": null as any,
    };
  };
}
