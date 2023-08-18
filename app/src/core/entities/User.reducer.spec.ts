import { createTestEvent } from "../test-utils";
import type { UserEvent } from "./User";
import { UserEventName } from "./User";
import { reducer } from "./User.reducer";

const entityId = "User#1";
const entityName = "User";

test("User.created", () => {
  const events: UserEvent[] = [
    createTestEvent({
      entityId,
      entityName,
      eventName: UserEventName.Created,
      body: {
        email: "tony@daangn.com",
      },
    }),
  ];

  const state = events.reduce(reducer, null as any);

  expect(state).toStrictEqual({
    email: "tony@daangn.com",
  });
});

test("User.deleted", () => {
  const events: UserEvent[] = [
    createTestEvent({
      entityId,
      entityName,
      eventName: UserEventName.Created,
      body: {
        email: "tony@daangn.com",
      },
    }),
    createTestEvent({
      entityId,
      entityName,
      eventName: UserEventName.Deleted,
      body: {},
    }),
  ];

  const state = events.reduce(reducer, null as any);

  expect(state).toStrictEqual({
    email: "tony@daangn.com",
    deletedAt: events[1].eventCreatedAt,
  });
});
