import type * as Types from "../../../__generated__/graphql";
import type * as gm from "graphql-modules";
interface DefinedFields {
  Query: 'ping';
};

export type Base_Query = Pick<Types.Query, DefinedFields['Query']>;

export type Base_QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;

export interface Base_Resolvers {
  Query?: Base_QueryResolvers;
};

export interface Base_MiddlewareMap {
  '*'?: {
    '*'?: gm.Middleware[];
  };
  Query?: {
    '*'?: gm.Middleware[];
    ping?: gm.Middleware[];
  };
};