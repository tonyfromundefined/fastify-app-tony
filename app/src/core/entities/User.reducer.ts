import type { UserReducer } from "./User";

export const reducer: UserReducer = (prevState, event) => {
  switch (event.eventName) {
    case "user.created": {
      return {
        email: event.body.email,
      };
    }
    case "user.deleted": {
      return {
        ...prevState,
        deletedAt: event.eventCreatedAt,
      };
    }
  }
};
