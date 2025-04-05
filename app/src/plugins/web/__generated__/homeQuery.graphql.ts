/**
 * @generated SignedSource<<becc8292745f43da979f05d5aae65fcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type homeQuery$variables = Record<PropertyKey, never>;
export type homeQuery$data = {
  readonly ping: boolean;
};
export type homeQuery = {
  response: homeQuery$data;
  variables: homeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ping",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "homeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "homeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "7d35b2e0eb09b52886c1b99d83afc2e3",
    "id": null,
    "metadata": {},
    "name": "homeQuery",
    "operationKind": "query",
    "text": "query homeQuery {\n  ping\n}\n"
  }
};
})();

(node as any).hash = "167c958b0dd61e0d1eb657909fa6b887";

export default node;
