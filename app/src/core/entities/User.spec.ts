import { userReducer } from "./User";

test("userReducer", () => {
  const deletedAt = new Date().toISOString();

  expect(
    userReducer(
      {
        email: "tony@daangn.com",
      },
      {
        entityId: "",
        entityName: "",
        eventId: "1",
        eventName: "deleted",
        eventCreatedAt: deletedAt,
        body: {},
      },
    ),
  ).toStrictEqual({
    email: "tony@daangn.com",
    deletedAt,
  });
});
