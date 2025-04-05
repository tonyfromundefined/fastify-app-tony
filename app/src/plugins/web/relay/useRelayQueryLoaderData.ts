import { useMemo } from "react";
import { useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
  type GraphQLTaggedNode,
  type OperationType,
  RecordSource,
} from "relay-runtime";
import type { RelayQueryLoaderResponse } from "./relayQueryLoader";

export function useRelayQueryLoaderData<Loader>(query: GraphQLTaggedNode) {
  type Query = Loader extends (
    loaderArgs: LoaderFunctionArgs,
  ) => Promise<RelayQueryLoaderResponse<infer Q>>
    ? Q
    : OperationType;

  /**
   * 1. 레코드를 전달받아 Relay Environment 컨텍스트에 Publish
   */
  const { recordMap } = useLoaderData();
  const relayEnvironment = useRelayEnvironment();

  useMemo(() => {
    const source = RecordSource.create(recordMap ?? {});
    relayEnvironment.getStore().publish(source);
  }, [relayEnvironment, recordMap]);

  /**
   * 2. useLazyLoadQuery()를 다시 호출 (Cache Hit)
   */
  const { variables } = useLoaderData();
  const data = useLazyLoadQuery<Query>(query, variables);

  return data;
}
