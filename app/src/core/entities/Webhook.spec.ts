import { createTestEvent } from "../test-utils";
import type { WebhookEvent, WebhookState } from "./Webhook";
import { webhookReducer, WebhookTargetEvent } from "./Webhook";

const entityId = "e1";
const entityName = "Webhook";

test("Create the Webhook entity appropriately", () => {
  const events: WebhookEvent[] = [
    createTestEvent({
      entityId,
      entityName,
      eventName: "create",
      body: {
        webhookId: "1234",
        targetEvents: [WebhookTargetEvent.UserCreated],
      },
    }),
  ];

  const state = events.reduce(webhookReducer, null as any);

  const expectedState: WebhookState = {
    webhookId: "1234",
    targetEvents: [WebhookTargetEvent.UserCreated],
  };

  expect(state).toStrictEqual(expectedState);
});

test("When an `update` event fires, the state is modified accordingly.", () => {
  const events: WebhookEvent[] = [
    createTestEvent({
      entityId,
      entityName,
      eventName: "create",
      body: {
        webhookId: "1234",
        targetEvents: [WebhookTargetEvent.UserCreated],
      },
    }),
    createTestEvent({
      entityId,
      entityName,
      eventName: "update",
      body: {
        targetEvents: [],
      },
    }),
  ];

  const state = events.reduce(webhookReducer, null as any);

  const expectedState: WebhookState = {
    webhookId: "1234",
    targetEvents: [],
  };

  expect(state).toStrictEqual(expectedState);
});

test("`deletedAt` is populated when the `delete` event fires", () => {
  const events: WebhookEvent[] = [
    createTestEvent({
      entityId,
      entityName,
      eventName: "create",
      body: {
        webhookId: "1234",
        targetEvents: [WebhookTargetEvent.UserCreated],
      },
    }),
    createTestEvent({
      entityId,
      entityName,
      eventName: "delete",
      body: {},
    }),
  ];

  const state = events.reduce(webhookReducer, null as any);

  expect(state.deletedAt).not.toBeNull();
  expect(state.deletedAt).not.toBeUndefined();
});
