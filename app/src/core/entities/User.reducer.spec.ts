import type { UserEvent } from "./User";

import { createTestEvent } from "../test-utils";
import { UserEventName } from "./User";
import { reducer } from "./User.reducer";

const entityId = "User#1";
const entityName = "User";

test("User.created", () => {
  const events: UserEvent[] = [
    createTestEvent({
      body: {
        email: "tony@daangn.com",
      },
      entityId,
      entityName,
      eventName: UserEventName.Created,
    }),
  ];

  // biome-ignore lint/suspicious/noExplicitAny:
  const state = events.reduce(reducer, null as any);

  expect(state).toStrictEqual({
    email: "tony@daangn.com",
  });
});

test("User.deleted", () => {
  const events: UserEvent[] = [
    createTestEvent({
      body: {
        email: "tony@daangn.com",
      },
      entityId,
      entityName,
      eventName: UserEventName.Created,
    }),
    createTestEvent({
      body: {},
      entityId,
      entityName,
      eventName: UserEventName.Deleted,
    }),
  ];

  // biome-ignore lint/suspicious/noExplicitAny:
  const state = events.reduce(reducer, null as any);

  expect(state).toStrictEqual({
    deletedAt: events[1].eventCreatedAt,
    email: "tony@daangn.com",
  });
});
